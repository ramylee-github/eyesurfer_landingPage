function init() {

    controlkeyVideo();
    keyMsgMotion();
    smallVideoControl();
    tabs();
    contactControl();

    /*---------------------- 
    One page scrolling
    ---------------------*/
    var numSections = 6;
    var isAnimationFired = new Array(numSections).fill(false);

    var myFullpage = new fullpage('#mainContainer', {
        licenseKey:'OPEN-SOURCE-GPLV3-LICENSE',
        css3:true,
        autoScrolling: true,
        fitToSection: true,
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Main', 'Introduce', 'Features', 'Our Service', 'Customer Say', 'Partners'],
        showActiveTooltip: true,
        onLeave: function(origin, destination, direction){
   
             //스크롤 동작 감지 후 헤더 영역 숨김 처리 기능
                if($('body').hasClass('is-scrolled') == false) {
                    $('body').addClass('is-scrolled');
                }
                if(destination.index == 0) {
                    $('body').removeClass('is-scrolled');
                }

                //첫번째 섹션으로 이동하는 버튼 기능
                if(destination.index > 0) {
                    $('.btn-scroll-top').css('display','flex').fadeIn();

                    $('.btn-scroll-top').click(function(e) {
                        e.preventDefault();
                        fullpage_api.moveTo(1);
                        
                        return false;
                    }); 
                } else {
                    $('.btn-scroll-top').fadeOut();
                }

                if(!isAnimationFired[destination.index]){

                    if(destination.index === 1){
                        titleMotion('.surfer-section2 .tit');

                        countingMotion('.n-collected-article .num', '365', '430000000', 600);
                        countingMotion('.n-our-customer .num', '14123','14123' , 600);
                        countingMotion('.n-scraped-article .num', '167', '25000', 600);

                        textChangeEffect('.number-area .s-tit','TODAY', 'TOTAL', 1400);

                        comSlideYEffect('.feature-area dl', 1400, 'easeOutExpo', anime.stagger(400, {start: -800}), false, '300px');
                  
                        isAnimationFired[destination.index] = true;

                    } else if(destination.index === 2) {
                        titleMotion('.surfer-section3 .tit');

                        comSlideYEffect('.video-wrapper', 3500, 'easeOutQuint', -1500, false, '100px');
                        comSlideXEffect('.txt-wrapper', 3500, 'easeOutQuint', -1300, false, '-100px');

                        isAnimationFired[destination.index] = true;
                    } else if(destination.index === 3) {
                        titleMotion('.surfer-section4 .tit');

                        comSlideXEffect('.s-feature-area .s-feature-info', 3500, 'easeOutQuint', -1700, false, '-50px');
                        comSlideXEffect('.s-visual-area dl', 3500, 'easeOutQuint', -1200, false, '50px');

                        isAnimationFired[destination.index] = true;
                    } else if(destination.index === 4) {
                        titleMotion('.surfer-section5 .tit');

                        comSlideYEffect('.feedback-area li', 1400, 'easeOutExpo', anime.stagger(300, {start: -800}), false, '300px');

                        isAnimationFired[destination.index] = true;
                    } else if(destination.index === 5) {
                        titleMotion('.surfer-section6 .tit');

                        comSlideYEffect('.banner-container', 3500, 'easeOutExpo', -1000, false, '-50px');

                        isAnimationFired[destination.index] = true;
                    }
                  }
                
        },
        afterLoad: function(index, item) {
            // var activeSection = fullpage_api.getActiveSection();
            // $(activeSection.item).addClass('focus');

            // if('location.reload()' == true) {
            //     $(activeSection.item).removeClass('focus');
            //     history.replaceState({}, null, location.href + '#' + anchors);
            //     fullpage_api.moveTo(1);
            // }
          
        }
});

    /*---------------------- 
    common motion
    ---------------------*/
    /* scroll indigator motion */
    anime({
        targets: '.scroll-indigator',
        translateY: -20,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad',
        autoplay: true
    });

    /* each section's title motion */
    function titleMotion(tit) {
        var titText = document.querySelectorAll(tit);

        var title = anime.timeline({
            targets:titText,
            duration: 1200, 
            delay:anime.stagger(500, {start: -600}),
            easing: 'easeOutQuint', 
            loop:false,
            });

            title
            .add({
                translateY: -30,
                opacity:0,
            })
            .add({                                                                                                           
                translateY:0,
                opacity:1,
            });
    }

    /*  component common X/Y slide motion */
    function comSlideXEffect(nodeName, objDuration, objEasing, objdelay, objLoop, objTransformNum) {
        var obj = document.querySelectorAll(nodeName);

        var SlideYEffect = anime.timeline({
            targets: obj,
            easing: objEasing,
            round: true,
            duration:objDuration,
            delay:objdelay,
            loop:objLoop,
        })
        
        SlideYEffect
        .add({
            translateX: objTransformNum,
            opacity:0,
        })
        .add({                                                                                                           
            translateX: 0,
            opacity:1,
        });
    }
    function comSlideYEffect(nodeName, objDuration, objEasing, objdelay, objLoop, objTransformNum) {
        var obj = document.querySelectorAll(nodeName);

        var SlideYEffect = anime.timeline({
            targets: obj,
            easing: objEasing,
            round: true,
            duration:objDuration,
            delay:objdelay,
            loop:objLoop,
        })
        
        SlideYEffect
        .add({
            translateY: objTransformNum,
            opacity:0,
        })
        .add({                                                                                                           
            translateY: 0,
            opacity:1,
        });
    }

    /*  section2 counting number motion */
    function countingMotion(nodeName, objStartNum, objEndNum, objLoop) {
        var obj = document.querySelector(nodeName);

        anime({
            targets: obj,
            innerText: [0, objStartNum],
            easing: 'linear',
            round: true,
            delay:objLoop,
            endDelay: objLoop,
            loop:false,
            update: function(a) {
                var value = a.animations[0].currentValue;
                var formattedNumber = numeral(value).format("0,000,000");
                obj.innerHTML = formattedNumber;
            },
        }).finished.then(() => {
            anime({
                targets: obj,
                innerText: [objEndNum],
                easing: 'linear',
                round: true,
                update: function(a) {
                    var value = a.animations[0].currentValue;
                    var formattedNumber = numeral(value).format("0,000,000");
                    obj.innerHTML = formattedNumber;
                },
            });
        });
            
    }

    /*  section2 counting number motion */
    function textChangeEffect(nodeName, objStartText, objEndText, objLoop) {
        var obj = document.querySelectorAll(nodeName);

       anime({
            targets: obj,
            easing: 'easeOutSine',
            round: true,
            duration:500,
            update: function() {
                setTimeout(() => {
                    if(objStartText == 'TODAY') {
                        $(obj).removeClass('today');
                        $(obj).addClass('total');
                        $(obj).html(objEndText);
                    }
                }, objLoop);
                
            }
        });
    }

    /*  image fade motion */
    function imageFadeEffect(nodeName) {
        var obj = document.querySelectorAll(nodeName);

       anime({
            targets: obj,
            easing: 'easeOutSine',
            round: true,
            duration:500,
            opacity:1,
        });
    }


    

   

 


    /*---------------------- 
    key visual slide
    ---------------------*/
    var swiperKeyVisual = new Swiper('.key-visual-container', {
        spaceBetween: 0,
        speed: 600,
        loop: false,
        autoplay: {
            delay: 5000,
            waitForTransition:true,
        },
        effect: "fade",
        transformEl:".intro-msg-area p",
        pagination: {
            el: '.key-visual-pagination',
            clickable: true,
        },
        on: {
            realIndexChange : function() {
                keyMsgMotion();
                $('.intro-msg-area p').css('opacity','0');
            }
        }
    });
    var swiperKeyVisualPager = new Swiper('.key-visual-container', {
        pagination: {
            el: '.key-visual-pagination-num',
            clickable: false,
            renderBullet: function(index, className) {
                return '<div class="' + className + '">' + '<span class="visual-index">' + '0' + ([index + 1])  + '</span>' + '</div>';
            }
        },
    });
    swiperKeyVisual.controller.control = swiperKeyVisualPager;

    /*---------------------- 
    key video control
    ---------------------*/
    function controlkeyVideo() {
        var videoSlide = $('.key-visual-container .swiper-slide');
        var keyVideo = `
        <div class="video-wrapper">
            <video 
                src="video/eyesurfer_introduction2.mp4"
                loop="0" 
                muted
                playsinline
                autoplay
                preload="auto"
            >
                <source src="video/eyesurfer_introduction2.mp4" type="video/mp4">
            </video>
            </div>
        `;
        var keyVisualBtn = $('#showVideo');
        var keyVisualPager = $('.key-visual-pagination-area');
        

        $('#controlKeyVideoPlay').click(function(){
            if (videoSlide.find('.video-wrapper').length == 0) {
                videoSlide.append(keyVideo);
                $(this).parent().addClass('paused');

                keyVisualPager.css('opacity', '0');
            } else {
                videoSlide.find('.video-wrapper').remove();
                $(this).parent().removeClass('paused');

                keyVisualPager.css('opacity', '1');
            }
        });
        keyVisualBtn.click(function(){
            videoSlide.find('.video-wrapper').remove();
            $(this).parent().removeClass('paused');

            keyVisualPager.css('opacity', '1');
        });
    }

    /*---------------------- 
    key msg motion
    ---------------------*/
    function keyMsgMotion() {
        var msg = anime.timeline({
            targets:'.intro-msg-area p',
            delay: anime.stagger(500, {start: -2000}),
            duration: 2500, 
            easing: 'easeOutQuint', 
            loop:false,
            });

            msg
            .add({
                translateX: '-100px',
                opacity:0,
            })
            .add({
                translateX:0,
                opacity:1,
            });
    }


    /*---------------------- 
    small video control
    ---------------------*/
    function smallVideoControl() {
        for(i=1; i <= 6; i++) {
            $('#controlSmallVideoPlay' + i).click(function(){
                var video = $(this).prev('video').get(0);
            
                if (video.paused == true) {
                    // Play the video
                    video.play();
                    video.controls = true;
                
                    // $(this).toggleClass('pause');
                    $(this).hide();
                }
            });
        }
    }

    /*---------------------- 
    tab
    ---------------------*/
    function tabs() {
        var pageTabs = $(".tab li");
        
        pageTabs.click(function () {
            var tabsIdx = $(this).parent().parent().data("idx");
            var pageTabs = $("#tabs" + tabsIdx  + " >.tab li");
            var pageTabCont = $("#tabs" + tabsIdx + " >.tab-cont");
            var activeMidTabs = $(this).data("tit");
            
            if($(this).hasClass("active") === false) {
                pageTabs.removeClass("active");
                $(this).addClass("active");
                        

                pageTabCont.hide();
                pageTabCont.find('.s-visual-area>img').css({
                    'transform':'scale(1)',
                });

                $("#" + activeMidTabs).show();
                setTimeout(() => {
                    $("#" + activeMidTabs).find('.s-visual-area>img').css({
                        'transform':'scale(1.2)',
                    });
                }, 200);

              
            } 
        });
    }

    /*---------------------- 
    patners area slide
    ---------------------*/
    var swiperPartners = new Swiper('.banner-container', {
        slidesPerView:1,
        spaceBetween: 28,
        autoplay: {
            delay: 9000,
        },
        pagination: {
            el: ".banner-container .swiper-pagination",
            clickable: true,
        },
    });

     /*---------------------- 
     contact box control
    ---------------------*/
    function contactControl() {
        var contactBox = $(".contact-area");
        var contactBoxBtn = $(".contact-area .btn-contact");
        var dimmedLayer = $(".dimmed");
        
        contactBoxBtn.click(function () {
            if($(this).parent().hasClass("opened") === false) {
                $(this).parent().addClass("opened");

                dimmedLayer.fadeIn();
            } else {
                $(this).parent().removeClass("opened");

                dimmedLayer.fadeOut();
            }
        });

        $(dimmedLayer).mouseup(function (e){
            if(dimmedLayer.has(e.target).length === 0){
                dimmedLayer.fadeOut();
                contactBox.removeClass("opened");
            }
        });

       
    }
}

