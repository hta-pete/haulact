$(function(){

    var $window       = $(window),    
        fsImg         = $('.img-fs'),
        startwidth    = 1920, 
        startheight   = 1080,
        ratio         = startheight/startwidth,
        imagewidth,
        imageheight,
        browserwidth,
        browserheight;

    $window.on('resize', function(){ 
                    
        fsImage();
        homeSlider(); 

    });


    function fsImage(){

        var imagewidth    = $(this).width();
        var imageheight   = $(this).height();
        var browserwidth  = $window.width();
        var browserheight = $('.hero').height();
     
        if ((browserheight/browserwidth) > ratio){
            fsImg.height(browserheight);
            fsImg.width(browserheight / ratio);
        } else {
            fsImg.width(browserwidth);
            fsImg.height(browserwidth * ratio);
        };
        fsImg.css('left', (browserwidth - fsImg.width())/2);
        fsImg.css('top', (browserheight - fsImg.height())/2);

    };
    fsImage(); 
    

    
    var lastScrollTop = $window.scrollTop();

    function scrollStuff() {

        var scrollTop = $window.scrollTop();
        var y         = (scrollTop > lastScrollTop) ? 'down' : ((scrollTop === lastScrollTop) ? 'none' : 'up');
        var bottom    = $window.height() + scrollTop == $(document).height();

        if( y == 'down' && scrollTop > 90 ){

            $('header').addClass('hide');
            $('.sub-menu--js').slideUp('fast');

        } else{

            $('header').removeClass('hide');

        }
        lastScrollTop = scrollTop;

    }
    scrollStuff();

    $window.on('scroll', scrollStuff);


  
    // Primary nav sub menu animation
    $('.has-sub-menu--js').on('click', function(){

      var sub_menu = $(this);

      sub_menu.siblings().find('.sub-menu--js').slideUp('fast', function(){

        sub_menu.find('.sub-menu--js').slideToggle('fast');

      });

    });


    function homeSlider(){

      if( $window.width() > 600 ){

        if( !$('.home-programs-slider').hasClass('slick-initialized') ) {

          $('.home-programs-slider').slick({
                infinite:true,
                dots:true,
                slidesToShow:3,
                slidesToScroll:1,
                speed: 500,
                pauseOnHover:true,
                prevArrow: false,
                nextArrow: $('.slider-next-btn')
          });

        }
          
      } else{

        if( $('.home-programs-slider').hasClass('slick-initialized') ) {

          $('.home-programs-slider').slick('unslick');

        }
        
      }

    }
    homeSlider();

    function driverStorySlider(){
        
        $('.driver-story-img-slider').slick({
                infinite:true,
                dots:false,
                slidesToShow:1,
                slidesToScroll:1,
                speed: 1000,
                prevArrow: false,
                nextArrow: $('.driver-story-next-btn'),
                fade: true
          });

    }
    driverStorySlider();

   
    $('.flipping-drivers-slide:first-child').addClass('active');

    // Animate video thumb group
    $('.flipping-drivers-slider, .driver-story-paginate .col-1-2, .driver-stories-grid .col-1-2').on('mousemove', rotateCard);

    function rotateCard(e){

      var offsetLeft = $(this).offset().left;
      var offsetTop  = $(this).offset().top;
      var mouseX     = offsetLeft + $(this).width() / 2;
      var mouseY     = offsetTop + $(this).height() / 2;
      var rotate_X;
      var rotate_Y;
      
      rotate_X = e.pageX - mouseX;
      rotate_Y = e.pageY - mouseY;

      $(this).find('img').css('transform', 'rotateX(' + -rotate_Y*0.02 + 'deg) rotateY(' + rotate_X*0.02 + 'deg) translateY(-15px) translateZ(0)');
      $(this).find('h4').css('transform', 'rotateX(' + -rotate_Y*0.02 + 'deg) rotateY(' + rotate_X*0.02 + 'deg) translateY(-30px) translateZ(40px)');
    

    }

    $('.flipping-drivers-slider, .driver-story-paginate .col-1-2, .driver-stories-grid .col-1-2').on('mouseleave', function(){
      
      $(this).find('img').css('transform', 'rotateX(' + 0 + 'deg) rotateY(' + 0 + 'deg) translateY(0) translateZ(0)');
      $(this).find('h4').css('transform', 'rotateX(' + 0 + 'deg) rotateY(' + 0 + 'deg) translateY(0) translateZ(0)');
      
    });

    


    $('.flipping-drivers-slider-next-btn').on('click', function(){

        $('.flipping-drivers-slide').removeClass('active');

    });


    var driverImages = ['img/james.jpg', 'img/john.jpg', 'img/warner.jpg'];
    var driverNames  = ['James', 'John', 'Warner'];

    var flipDrivers = function(){

        var current = 1;
        var len     = driverImages.length;

        return function(){
            var direction = 1;
            if (current >= len) current = 0;

            $('.flipping-drivers-slide').removeClass('active');

            setTimeout(function(){

                $('.flipping-drivers-slide img').attr('src', driverImages[current]);
                $('.flipping-drivers-slide h4').text('Meet ' + driverNames[current]);
                $('.flipping-drivers-slide').addClass('active');

                current += direction;

            }, 500);
            

            
        }
    }();

    $('.flipping-drivers-slider-next-btn').on('click', flipDrivers);



    $('.act-video').on('mousemove', moveThumb);

    function moveThumb(e){

      var offsetLeft = $(this).offset().left;
      var offsetTop  = $(this).offset().top;
      var mouseX     = offsetLeft + $(this).width() / 2;
      var mouseY     = offsetTop + $(this).height() / 2;
      var rotate_X;
      var rotate_Y;
      
      rotate_X = e.pageX - mouseX;
      rotate_Y = e.pageY - mouseY;

      $(this).find('.poster').css('transform', 'translateX(' + -rotate_X*0.08 + 'px) translateY(' + -rotate_Y*0.08 + 'px)');
      $('.poster-left').css('transform', 'scale(0.6) translateX(' + -rotate_X*0.03 + 'px) translateY(' + -rotate_Y*0.03 + 'px)');
      $('.poster-right').css('transform', 'scale(0.6) translateX(' + -rotate_X*0.03 + 'px) translateY(' + -rotate_Y*0.03 + 'px)');

    }

    $('.act-video').on('mouseleave', function(){
      $(this).find('.poster,.poster-left, .poster-right').css('transform', 'scale(0.6) translateX(' + 0 + 'px) translateY(' + 0 + 'px)');
      $('.poster').css('transform', 'scale(1) rotateY('+ 0 +'deg) rotateX('+ 0 +'deg)');
    });






    $('.mobile-menu-btn').on('click', function(){

      $(this).toggleClass('active');
      $('#mobile-menu, #main, body, .site-header__apply').toggleClass('active');

    });



});







