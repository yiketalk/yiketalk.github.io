// 入口函数
window.onload = function() {
  console.log('我执行了');

  // 轮播图
  //banner();

  banner_super()

  // 顶部导航栏
  nav();

  // 倒计时
  time();
}

// 2016-12-30 新增 滚动方法
// 变量定义位置
/*
 		1.一般是 最顶部
 		2.原因是为了 后期维护
 		3.建议大家 全部定义在顶部
 * */
function banner_super() {

  //  定义变量

  // 变量: 移动的ul
  var moveUl = document.querySelector('.banner_imgs');

  // 变量: 屏幕宽度
  var bodyWidth = document.body.offsetWidth;

  // 变量: 索引的 li标签们
  var indexLis = document.querySelectorAll('.banner_index li');

  // 变量: 设置过渡
  var setTransition = function() {
    moveUl.style.transition = 'all .5s';
  }

  // 变量: 清除过渡
  var clearTransition = function() {
    moveUl.style.transition = 'none';
  }

  // 变量: 设置位置
  var setTransform = function(distance) {
    moveUl.style.transform = 'translateX(' + distance + 'px)';
  }

  // 变量:索引的 index
  var index = 1;

  // 变量:设置索引的方法
  var setIndex = function() {
    // 临时变量 来接收index
    var currentIndex = index;

    // 修正 判断 currentIndex是否符合要求
    if(currentIndex >= 9) {
      currentIndex = 1;
    } else if(currentIndex <= 0) {
      currentIndex = 8;
    }

    // 修改 li标签的显示
    // 清除默认的current
    for(var i = 0; i < indexLis.length; i++) {
      indexLis[i].classList.remove('current');
    }

    // 设置当前的current
    indexLis[currentIndex - 1].classList.add('current');

  }

  // 手指拨动 变量
  // 变量: 起始位置
  var startX = 0;

  // 变量: 偏移位置
  var moveX = 0;

  // 变脸:标示 是否 完成过渡
  var isEnd = true;

  // 添加touch事件
  moveUl.addEventListener('touchstart', function(event) {

      // 锁起来
      if(isEnd == false) return;

      // 记录 起始值
      startX = event.touches[0].clientX;
      // 关闭过渡
      clearTransition();
    })
    // 移动
  moveUl.addEventListener('touchmove', function(event) {
      // 锁起来
      if(isEnd == false) return;
      // 计算偏移值
      moveX = event.touches[0].clientX - startX;

      // 赋值给 ul
      setTransform(moveX + index * bodyWidth * -1);

    })
    // 结束
  moveUl.addEventListener('touchend', function(event) {
    // 说起来
//  if(isEnd == false) return;

    // 修改 标示变量
    if(isEnd == true) {
      isEnd = false;
    }

    // 判断是否需要吸附
    if(Math.abs(moveX) > bodyWidth / 4) {
      // 需要吸附
      if(moveX > 0) {
        index--;
      } else {
        index++;
      }
      
      // 将 moveX 设置为0
      moveX = 0;
      // 开启过渡
      setTransition();

      // 设置回去
      setTransform(index * -1 * bodyWidth);
    } else {
      // 开启过渡
      setTransition();

      // 设置回去
      setTransform(index * -1 * bodyWidth);
    }

    // 设置 index的 显示 
    setIndex();
  })

  // 过渡结束事件 来 进行图片的移动
  moveUl.addEventListener('transitionend', function() {

    // 修改 标示变量 为true
    isEnd = true;

    // 判断 index 是否越界
    if(index >= 9) {
      index = 1;
      // 关闭过渡
      clearTransition()
        // 瞬间跳转
      setTransform(index * -1 * bodyWidth);
    } else if(index <= 0) {
      index = 8;
      // 关闭过渡
      clearTransition()
        // 瞬间跳转
      setTransform(index * -1 * bodyWidth);
    }
  })

}

// 轮播图 
/*
 *  轮播图 使用的是 n+2来进行 无线轮播
 * 	左边的 第一张 冒充 最后一张的
 * 	右边的 最后一张 冒充 第一张的
 *  默认让用户看到的是 索引为1的那一张 需要设置 ul 默认 往左移动 一倍的 屏幕宽度
 * 
 		步骤1: 自动轮播
 			1.自动切换 ->定时器
 			2.定义变量->记录切换的张数 1 2 3
 			3.可以通过修改transform:tranlateX()
 			4.为了有动画->设置transition->设置 ul即可
 			5.判断是否越界 10 -> 0 1 2 3 4 5 6 7 8 9
 			6.通过 过渡结束事件 来判断是否月结
 			7.修改索引li标签的 显示
 * */
function banner() {

  //  获取一些 必须知道的变量
  // 移动的ul
  var moveUl = document.querySelector('.banner_imgs');

  // 获取 body的宽度
  var bodyWidth = document.body.offsetWidth;

  // 定义变量 记录 切换的 图片索引 
  // 应该让 索引 从 1开始
  var index = 1;

  // 获取 需要修改 显示的 li标签
  var indexLis = document.querySelectorAll('.banner_index li');

  // 定时器 自动轮播
  var interId = setInterval(function() {
    // 定时器内部 索引++
    index++;

    // 添加 过渡效果
    // 过渡的持续时间 跟 定时器的 调用间隔 不要相等 必须 小于 调用间隔
    moveUl.style.transition = 'all .5s';

    // 修改 ul的 transform值 朝着 x的负方向移动
    moveUl.style.transform = 'translateX(' + index * bodyWidth * -1 + 'px)';
  }, 1000)

  // 注册 过渡 结束事件 判断 越界
  moveUl.addEventListener('transitionend', function() {
    console.log('过渡结束');
    // 判断 是否越界
    if(index >= 9) {

      // 修改 index的值  改为 1 
      index = 1;
      // 关闭 过渡效果
      moveUl.style.transition = 'none';
      // 瞬间 切换回 索引为 1 的那一张图片
      moveUl.style.transform = 'translateX(' + index * bodyWidth * -1 + 'px)';
    }
    // 添加 另外一个 方向的 判断
    else if(index <= 0) {
      // 修改index 为  0 1 2 3 4 5 6 7 8 9
      index = 8;
      // 关闭 过渡效果
      moveUl.style.transition = 'none';
      // 瞬间 切换回 索引为 1 的那一张图片
      moveUl.style.transform = 'translateX(' + index * bodyWidth * -1 + 'px)';
    }

    // 修改 索引 li标签的 显示
    // 清除 所有的 current class
    for(var i = 0; i < indexLis.length; i++) {
      indexLis[i].classList.remove('current');
    }
    // 为 索引 对应的li标签 添加 current
    // 索引为几
    // 轮播图的 索引关系  0 1 2 3 4 5 6 7 8 9
    // 索引li的 索引关系      0 1 2 3 4 5 6 7 

    indexLis[index - 1].classList.add('current');

  })

  // 轮播图 逻辑二 手指 移动 轮播

  // 起始X
  var startX = 0;
  // 移动X
  var moveX = 0;

  // 注册 事件
  moveUl.addEventListener('touchstart', function(event) {
    // 关闭定时器
    clearInterval(interId);

    // 初始值
    startX = event.touches[0].clientX;

    // 关闭过渡效果
    moveUl.style.transition = 'none';
  })

  moveUl.addEventListener('touchmove', function(event) {

    // 计算偏移值
    moveX = event.touches[0].clientX - startX;

    // 赋值给 moveUl 偏移值 +moveul的原始值 (index*width*-1)

    moveUl.style.transform = 'translateX(' + (moveX + index * bodyWidth * -1) + 'px)'

  })

  // 吸附效果
  // 开启定时器
  moveUl.addEventListener('touchend', function(event) {

    // 吸附效果
    // 当用户 移动的 偏移值 小于 1半屏幕 就 吸附会 原始 状态
    if(Math.abs(moveX) > (bodyWidth / 3)) {
      console.log('吸附');
      // 满足 吸附条件之后 需要判断
      // 一正 一负 
      if(moveX > 0) {
        index--;
      } else {
        index++;
      }

      // 添加 过渡效果
      moveUl.style.transition = 'all .5s';

      // 赋值给 移动的 ul
      moveUl.style.transform = 'translateX(' + index * -1 * bodyWidth + 'px)'
    } else {
      // 说明 没有 移动 一整张
      // 添加 过渡效果
      moveUl.style.transition = 'all .5s';

      // 赋值给 移动的 ul
      moveUl.style.transform = 'translateX(' + index * -1 * bodyWidth + 'px)'
    }

    // 开启 定时器
    interId = setInterval(function() {
      // 定时器内部 索引++
      index++;

      // 添加 过渡效果
      // 过渡的持续时间 跟 定时器的 调用间隔 不要相等 必须 小于 调用间隔
      moveUl.style.transition = 'all .5s';

      // 修改 ul的 transform值 朝着 x的负方向移动
      moveUl.style.transform = 'translateX(' + index * bodyWidth * -1 + 'px)';
    }, 1000)

  })

}

// 导航栏 
/*
 	1. 使用的是 滚动事件
 		获取 滚动的距离
 		滚动的距离 / 轮播图的 高度  => 0-1的 小数
 		小数 设置给 header rgba(1,2,3,0-1的修改)
 * */
function nav() {
  //  获取一些 必须知道的值

  // 需要修改的 dom元素
  var headerDom = document.querySelector('.jd_header');

  // 轮播图的 高度
  var banner_height = document.querySelector('.jd_banner').offsetHeight;

  console.log(headerDom + "|" + banner_height);

  //  注册事件
  window.onscroll = function(event) {
    console.log(document.body.scrollTop);

    // 计算透明度
    var percent = document.body.scrollTop / banner_height;
    console.log(percent);

    // 可能会 超过1
    // 最大 也只能 为 0.9
    if(percent > 0.9) {
      percent = 0.9;
    }

    // 赋值给 headerDom即可 
    headerDom.style.backgroundColor = 'rgba(209,55,67,' + percent + ')';
  }

}

// 倒计时
/*
 	1. 使用 定时器 实现倒计时 interval
 		修改 元素的 显示效果
 	2. 准备一个 总的时间 为了方便计算 使用 秒
 		2000
 	3.修改显示的时候 需要把 秒 换算成 时分秒
 	4.找到 对应的 标签元素 并 修改 显示的 内容
 * */
function time() {
  // 准备一个 倒计时的 总时间 小时 换算为 秒
  var totalSec = 5 * 60 * 60;
  //var totalSec = 5;

  // 获取 需要修改的 dom元素
  var liObjs = document.querySelectorAll('.second_kill ul li');
  console.log(liObjs);

  // 封装 格式化 秒 并 设置给 li标签的 代码
  var setTime = function() {
    // 秒->时分秒
    // 3780 -> 时分秒
    // 3780 几个 3600 1
    // Math.floor(3780/3600)
    var hour = Math.floor(totalSec / 3600);

    // 3780 把 可以设置到 时的 秒数 舍去
    // 3780%3600 ->180
    // 180->minute  
    //  Math.floor(180/60);
    var minute = Math.floor(totalSec % 3600 / 60);

    // 3789秒
    // 3789%60 获取 剩余的 秒

    var second = totalSec % 60;

    //  console.log(hour + "|" + minute + "|" + second);

    // 设置给 li标签 有几个 需要设置的 6
    // 设置小时
    // 假设 有 14个小时
    // 小时的 十分位  14/10 取整
    liObjs[0].innerHTML = Math.floor(hour / 10);
    // 小时的 个位 14%10 余 4
    liObjs[1].innerHTML = hour % 10;

    // 设置分钟
    // 假设 有 54个小时
    // 分钟的 十分位  54/10   5.4取整
    liObjs[3].innerHTML = Math.floor(minute / 10);
    // 分钟的 个位 14%10 余 4
    liObjs[4].innerHTML = minute % 10;

    // 设置秒
    // 假设 有 54个小时
    // 分钟的 十分位  54/10   5.4取整
    liObjs[6].innerHTML = Math.floor(second / 10);
    // 分钟的 个位 14%10 余 4
    liObjs[7].innerHTML = second % 10;
  }

  // 默认设置一次
  setTime();

  // 开启倒计时  1000号码 返回值
  // 获取 返回值的 目的是为了 一会 关闭定时器
  var interId = setInterval(function() {

    // 判断 时间 是否 执行完毕 
    if(totalSec == 0) {
      console.log('哥们 你错过了时机  等下次吧');
      //  干掉定时器
      clearInterval(interId);

      // 跳出 方法
      return;
    }

    // 时间 递减
    totalSec--;

    // 都去 调用一次 设置时间 的 代码
    setTime();

  }, 10);

}