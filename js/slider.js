$(function () {
  var slider = $('.slider'),
    sliderUl = slider.find('ul'),
    sliderLis = sliderUl.find('li'),
    liWidth = slider.width();
    console.log(slider);
  sliderLis.eq(0).clone(true).appendTo('ul');
  length = sliderLis.length;
  sliderUl.css('width', (length + 1) * liWidth);
  var oLis = sliderUl.find('li');
  oLis.css('width', liWidth);
  var index = 0,
    animated = false,
    timer = null,
    duration = 2000,
    lock = true;
  play();
  function play() {
    timer = setTimeout(function () {
      toRight();
    }, duration);
  }
  function animate() {
    if (animated) {
      return;
    }
    animated = true;
    slider.find('.dots b').removeClass('active').eq(-index % length).addClass('active');
    sliderUl.animate({ left: index * liWidth }, duration/7, function () {
      animated = false;
      clearTimer();
      if (lock) {
        play();
      }
    });
  }
  function toLeft() {
    if (!animated) {
      if (index === 0) {
        sliderUl.css('left', -length * liWidth);
        index = -length;
      }
      index++;
      animate();
    }
  }
  function clearTimer() {
    clearTimeout(timer);
  }
  function toRight() {
    if (!animated) {
      if (index === -length) {
        sliderUl.css('left', 0);
        index = 0;
      }
      index--;
      console.log(index);
      animate();
    }
  }
  // slider.on('mouseover', function () {
  //   lock = false;
  //   clearTimer();
  // })
  // slider.on('mouseout', function () {
  //   lock = true;
  //   play();
  // })
  // slider.find('.left-arrow').on('swipeLeft', function () {
  //   toLeft();
  // });
  console.log(slider.swipeLeft)
  slider.find('.left-arrow').swipe(function () {
    console.log(111);
    toLeft();
  })
  slider.find('.right-arrow').on('click', function () {
    toRight();
  });
  slider.find('.dots b').on('click', function () {
    var idx = $(this).index();
    index = -idx;
    animate();
  });
});