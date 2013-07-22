// ****************************************
// **************** TODO ******************
//
// - finish top to bottom 3 layers animation
// - make browsing directly to project work
// - slide transitions between projects
// - bottom of project slide up
// - animated gifs
// - hosting and server setup ( github pages ? )
// - 1024px 1440px ipad / iphone resolutions.
//
// ****************************************

$(document).ready(function(){
  console.log('ready');
  var scrolledToBottom = false;

  // if (window.location.href.indexOf("#") == -1){
  //   $.History.go('/');
  // }

  // $("a#about").click(function(evt){
  //   evt.preventDefault();
  //   $(".about-page").addClass('slide-in');
  // });

  // // Bind a handler for ALL hash/state changes
  // $.History.bind(function(state){
  //   // Update the current element to indicate which state we are now on
  //   // Update the page's title with our current state on the end
  //   console.log(state);
  //   // check if not on about or / routes
  //   if (window.location.href.indexOf("about") == -1 && (window.location.href.indexOf("/#/") != (window.location.href.length-3))){
  //     var stateName = state.substr(1,state.length);
  //     showProjectView(state);
  //   }
  // });

  // // Bind a handler for root state
  // $.History.bind('/',function(state){
  //   $("html").addClass('noscroll');
  //   // $("#main").addClass('home-view');
  // });

  // // Bind a handler for state: bananas
  // $.History.bind('/about',function(state){
  //   $("html").addClass('noscroll');
  //   $("#main").addClass('about-view');
  //   $("#about-link").attr('href','/');
  // });

  $win = $(window);

  function playThreeWaveAnimation(direction){

    $wave1 = $("#wave1"),
    $wave2 = $("#wave2"),
    $wave3 = $("#wave3"),
    $allwaves = $('.wave');

    $preroll = $("#top-section");
    $wrapper = $("#bottom-section");

    var inc = 300,
        dur = 800,
        delay = 0,
        winH = $win.height(),
        winW = $win.width(),
        ease = 'easeInExpo',
        finalEase = 'easeInOutExpo';

    $allwaves.css('height',winH*2).css('width',winW);

    if (direction == "up"){
      $allwaves.css('top',-winH);

      $allwaves.css('height',winH * 1.5).css('width',winW);
      $wrapper.animate({top: winH}, dur, finalEase, function(){
      });

      delay += inc;
      $.doTimeout(delay, function(){ $wave1.animate({top: winH}, dur, ease); });

      delay += inc;
      $.doTimeout(delay, function(){ $wave2.animate({top: winH}, dur, ease); });

      delay += inc*2;
      $.doTimeout(delay, function(){
        $wave3.animate({top: winH}, dur, finalEase);
        $preroll.animate({"margin-top": -$win.height()}, dur, ease);
      });
    }
    else{
      $allwaves.css('top',winH);

      $preroll.animate({"margin-top": -$win.height()*2}, dur, ease);

      delay += inc;
      $.doTimeout(delay, function(){ $wave3.animate({top: -winH}, dur, ease); });

      delay += inc;
      $.doTimeout(delay, function(){ $wave2.animate({top: -winH}, dur, ease); });

      delay += inc*2;
      $.doTimeout(delay, function(){
        $wave1.animate({top: -winH}, dur, finalEase);
        $wrapper.css({top: winH}).animate({top: 0}, dur, finalEase, function(){
          // $entry.detach();
          // $wrapper.css({overflow: 'auto', height:'auto', position: 'static'});
        });
      });
    }
  }

  $(".project-list a").mouseenter(function(evt){
    console.log('mouseenter');
    evt.preventDefault();
    t = $(evt.currentTarget);
    $(".rollover-imgs ." + t.attr('class')).addClass('active');
    // context.drawImage(images.volcom1, 100, 30, 1000, 1000);
    // context.drawImage(images.volcom2, 100, 30, 1000, 1000);
  });

  $(".project-list a").mouseleave(function(evt){
    console.log('mouseleave');
    evt.preventDefault();
    $(".rollover-imgs .active").removeClass('active');
    // canvas.width = canvas.width;
  });

  $(".project-list a").click(function(evt){
    evt.preventDefault();
    var projectUrl = $(evt.currentTarget).attr('href');
    projectUrl = projectUrl.replace('/#/caralho','');
    // $("#wave1,#wave2,#wave3").addClass('play');
    // $("#top-section,#bottom-section").addClass('slide-up');
    playThreeWaveAnimation('down');

    // $("#main").addClass('bottom-wave-anim');
    // $.History.go(projectUrl);
  });

  $(".prev-link, .next-link").click(function(evt){
    evt.preventDefault();
    var projectUrl = $(evt.currentTarget).attr('href');
    projectUrl = projectUrl.replace('/#/caralho','');
    // $.History.go(projectUrl);
  });

  // $("#plus-menu a").click(function(evt){
  //   evt.preventDefault();

  //   if ( $(document).scrollTop() > 10 ){
  //     $('html, body').animate({
  //       scrollTop: 0
  //     }, 1000, function(){
  //       playThreeWaveAnimation('up');
  //     });
  //   }
  //   else {
  //     if ($("#main.bottom-section-view").length > 0){
  //       playThreeWaveAnimation('up');
  //     }
  //     else{
  //       slideUp();
  //     }
  //   }
  // });

  // function playThreeWaveAnimation(){
  //   // at bottom of portfolio - wave up !
  //   if ($("#main.bottom-section-view").length > 0){
  //     playThreeWaveAnimation();
  //   }
  //   else{
  //     $("#main").addClass('home-view about-slide-transition');
  //     $("#main").removeClass('bottom-section-view about-view');
  //   }
  //   $.History.go('/about');
  //   $.History.go('/');
  // }

  // function showAboutView(){
  //   // at bottom of portfolio - wave up !
  //   if ($("#main.bottom-section-view").length > 0){
  //     playThreeWaveAnimation();
  //   }
  //   else{
  //     $("#main").addClass('about-view about-slide-transition');
  //     $("#main").removeClass('bottom-section-view home-view');
  //   }
  //   $.History.go('/about');
  // }

  function showProjectView(projectUrl){
    // $("#main").addClass('project-view');
    $("#main").removeClass('about-view home-view');
    $("#main").addClass('bottom-section-view');
    var projectUrl = '/caralho' + projectUrl;
    console.log(projectUrl);
    $("#project-page").fadeOut(200,function(){
      $("#project-page").load( projectUrl + " #projectmain", function(){
        // $("#main").addClass('project-view');
        bindProjectPageEvents();
        loadPrevNextAnimGif();
        $("#project-page").fadeIn(200,function(){
        });
      });
    })
  }

  var windowHeight = $(window).height();
  var docHeight = $(document).height();

  $(document).scroll(function() {
    console.log('scroll');
    if ($("#main.bottom-section-view").length > 0){
      console.log('scroll in project view');
      windowHeight = $(window).height();
      docHeight = $(document).height();
      docScrollTop = $(document).scrollTop();
      if ( !scrolledToBottom ){
        if( docScrollTop < 600 && $(".social-bar").hasClass('show')){
          $(".social-bar").removeClass('show');
        }
        else if( docScrollTop > 600 && !$(".social-bar").hasClass('show')){
          $(".social-bar").addClass('show');
        }

        if (docScrollTop > (docHeight - (3 * windowHeight)) ) {
          $('html, body').animate({
              scrollTop: docHeight
           }, 500);
           scrolledToBottom = true;
           $("#main").addClass("hide-prevnext");
        }
      }
      if (docScrollTop > (docHeight - (3 * windowHeight)) ) {
         $("#main").addClass("hide-prevnext");
      }
      else if ($("#container.hide-prevnext").length){
        $("#container.hide-prevnext").removeClass('hide-prevnext');
      }
    }
  });

  windowWidth = 1024;

  bindProjectPageEvents();


});
// END DOC READY

function bindProjectPageEvents(){

  $(".project-details .read-more").unbind().click(function(evt){
    evt.preventDefault();
    if ($(".project-details.expanded").length == 0 ){
      $(".project-details").addClass('expanded');
      $(".project-details .read-more").hide();
      $(".project-details .read-less").show();
    }
  });

  $(".project-details .read-less").unbind().click(function(evt){
    evt.preventDefault();
    if ($(".project-details.expanded").length != 0 ){
      $(".project-details").removeClass('expanded');
      $(".project-details .read-less").hide();
      $(".project-details .read-more").show();
    }
  });

  $("html").removeClass('noscroll');

}