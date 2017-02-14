function heima_tap(dom,callback) {
  var startTime = 0;
  var isMove = false;
  
  var touches = undefined;
  
  dom.addEventListener('touchstart', function(event) {
    startTime = Date.now();
    isMove = false;
    touches = event.touches;

  })
  dom.addEventListener('touchmove', function() {
    isMove = true;
  })
  dom.addEventListener('touchend', function(event) {
    var delayTime = Date.now() - startTime;

    if(delayTime >= 120) {
      return;
    }
    if(isMove == true) {
      return;
    }
    event.myTouches = touches;
    
    // 如果能到这里说明 满足条件
//  console.log('搞定了')
	// 想要传递 event 给 callback()
    callback(event)

  })
}