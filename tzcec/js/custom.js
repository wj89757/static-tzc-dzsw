// ------- PRELOADER -------//
$(window).load(function() {
  $('.preloader').fadeOut("slow"); // set duration in brackets  
  // 白云飘动效果
  $("#far-clouds").clouds({
    fps: 30,
    speed: 0.7,
    dir: "left"
  });

  $("#near-clouds").clouds({
    fps: 30,
    speed: 1,
    dir: "left"
  });
});

/* HTML document is loaded. DOM is ready. 
-------------------------------------------*/
$(function() {
  // ------- JQUERY 登录&注册---- //
  $("#modal-custom").iziModal({
    overlayClose: false,
    width: 600,
    autoOpen: false,
    headerColor: '#0096BF',
    overlayColor: 'rgba(0, 0, 0, 0.6)',
  });

  $(document).on('click', '.trigger-custom', function(event) {
    event.preventDefault();
    $('#modal-custom').iziModal('open');
  });

  $('#reg').validate({
    rules: {
      login_username: {
        required: true,
        minlength: 2,
      },
      login_password: {
        required: true,
        minlength: 6,
      },
      reg_username: {
        required: true,
        minlength: 2,
      },
      reg_password: {
        required: true,
        minlength: 6,
      },
      passwordcheck: {
        required: true,
        minlength: 6,
        equalTo: "#reg_password"
      },
      reg_email: {
        required: true,
        email: true,
      },
    },
    messages: {
      login_username: {
        required: '账号不得为空！',
        minlength: '账号不得小于{0}位！',
      },
      login_password: {
        required: '密码不得为空！',
        minlength: '密码不得小于{0}位！',
      },
      reg_username: {
        required: '账号不得为空！',
        minlength: '账号不得小于{0}位！',
      },
      reg_password: {
        required: '密码不得为空！',
        minlength: '密码不得小于{0}位！',
      },
      passwordcheck:{
        required: '密码不得为空！',
        minlength: '密码不得小于{0}位！',
        equalTo : '请输入相同的密码！',
      },
      reg_email: {
        required: '邮箱不得为空！',
        email: '请输入正确的邮箱地址！',
      },
    },
  });


  $("#modal-custom").on('click', 'header a', function(event) {
    event.preventDefault();
    var index = $(this).index();
    $(this).addClass('active').siblings('a').removeClass('active');
    $(this).parents("div").find("section").eq(index).removeClass('hide').siblings('section').addClass('hide');

    if ($(this).index() === 0) {
      $("#modal-custom .iziModal-content .icon-close").css('background', '#3284C3');
    } else {
      $("#modal-custom .iziModal-content .icon-close").attr('style', '');
    }
  });


  // --------- HIDE MOBILE MENU AFTER CLIKING ON A LINK ------- //
  $('.navbar-collapse a').click(function() {
    $(".navbar-collapse").collapse('hide');
  });

  // --------- PORTFOLIO IMAGE ----- //
  $('#portfolio a').nivoLightbox({
    effect: 'fadeScale',
  });

  // ------- WOW ANIMATED ------ //
  wow = new WOW({
    mobile: false
  });
  wow.init();

  // ------- GOOGLE MAP ----- //
  // loadGoogleMap();

  // ------- JQUERY PARALLAX ---- //
  function initParallax() {
    $('#home').parallax("100%", 0.3);
    $('#team').parallax("100%", 0.3);
    $('#contact').parallax("100%", 0.1);

  }
  initParallax();

  $('.wechat').mouseenter(function(){
    $('.wechatcode').show();
  });
  $('.wechat').mouseleave(function(){
    $('.wechatcode').hide();
  });

});