// 写 onload事件 
window.onload = function() {

  // 调用 为左边 竖条 设置 滚动的 方法
  left();
}

// 设置滚动
/*	
 	通过 touch事件 实现 跟随滚动
 	
 	获取一些必须知道的 值
 	moveUL
 	
 	
 	变量
 	
 	start
 		获取 起始值Y
 	move
 		获取 偏移值 Y
 		设置给 ul 偏移值 +初始值
 	end
 		记录 总的移动 距离
 * */

function left() {

  // 获取 变量
  var moveUl = document.querySelector('.content_left');

  // 获取 body的高度
  var bodyHeight = document.body.offsetHeight;

  // 获取 头部的 高度
  var headerHeight = document.querySelector('.list_header').offsetHeight;

  // 移动的逻辑

  // 定义 ul的 移动范围
  var maxY = 0;
  //  还需要 额外的 减掉 顶部的 通栏的 高度
  var minY = bodyHeight - moveUl.offsetHeight - headerHeight;

  // 定义 移动的 弹性区域
  var delayDistance = 150;

  // 移动需要使用的变量
  var startY = 0;
  var moveY = 0;
  var distanceY = 0;

  // 注册touch的 方法
  moveUl.addEventListener('touchstart', function(event) {
    // 记录起始值
    startY = event.touches[0].clientY;

    // 干掉 过渡 效果
    // 可以 添加 过渡 效果
    moveUl.style.transition = 'none';

  })
  moveUl.addEventListener('touchmove', function(event) {

    // 获取 偏移值
    moveY = event.touches[0].clientY - startY;
    // 满足 条件 才支持 让ul移动 在  最小值<  <最大值
    var currentY = distanceY + moveY;

    if(currentY < (maxY + delayDistance) && currentY > (minY - delayDistance)) {

      // 设置给 ul 
      moveUl.style.transform = 'translateY(' + (distanceY + moveY) + 'px)'
    } else {
      // 区间之外  就不做改变
    }

  })
  moveUl.addEventListener('touchend', function() {
    // 更新 distanceY的值
    distanceY = distanceY + moveY;
    // 实现 吸附 效果

    // 需要 判断 到底 是 吸到 哪里
    if(distanceY > maxY) {
      distanceY = maxY;
    } else if(distanceY < minY) {
      distanceY = minY;
    }
    // 吸附回去

    // 可以 添加 过渡 效果
    moveUl.style.transition = 'all .3s';

    // 设置给 ul
    moveUl.style.transform = 'translateY(' + (distanceY) + 'px)'

  })

  // 点击切换位置
  // 首先 为 所有 li标签 绑定 tap
  var liObjs = document.querySelectorAll('.content_left li');
  
  // 为所有的 li标签 绑定 一个 索引属性
  for(var i = 0;i<liObjs.length;i++){
  	liObjs[i].index = i;
  }

  // 循环 绑定tap 事件
  for(var i = 0; i < liObjs.length; i++) {
    heima_tap(liObjs[i], function(event) {
    	
    	
    	// 清空 所有的 li标签的 class
    	for(var j =0;j<liObjs.length;j++){
    		liObjs[j].classList.remove('current');
    	}
    	
    	// 当前点击的li标签
    	var currentLi = event.target.parentNode;
    	
    	// 添加 current class
    	currentLi.classList.add('current');
    	
    	// 通过 当前点击的 li标签 获取 index属性
    	console.log(currentLi.index);
    	console.log(currentLi.offsetHeight);
    	
    	// 使用 索引 * li 标签的 高度
//  	moveUl.style.transform = 'translateY('+currentLi.index*currentLi.offsetHeight*-1+'px)';

			// 由于事件冒泡 会触发 moveul的 touchend事件
			// 我们这里 只需要 修改 distanceY的值即可 
			// 让 moveUl的 touchend事件 进行 移动即可
			distanceY = currentLi.index*currentLi.offsetHeight*-1;
	
    	
    })
  }

}