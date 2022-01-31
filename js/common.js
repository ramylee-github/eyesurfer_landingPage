function init() {

    controlkeyVideo();
    keyMsgMotion();
    smallVideoControl();
    tabs();
    contactControl();

    /*---------------------- 
    One page scrolling
    ---------------------*/
    const pageName = ['Main', 'Introduce', 'Features', 'Our Service', 'Customer Say', 'Partners'];

    const swiperV = new Swiper('.container', {
        direction: 'vertical',
        spaceBetween: 0,
        hashNavigation: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: false,
        },
        mousewheel: {
            releaseOnEdges: true,
        },
        speed: 600,
        loop: false,
        pagination: {
            el: '.container-pagination',
            clickable: true,
            renderBullet: function(index, className) {
                return '<div class="' + className + '">' + '<span class="page-name">' + (pageName[index])  + '</span>' + '</div>';
            }
        },
        update: function(a) {
            
        },
        on: {
            slideChange: function() {
                if(document.body.classList.contains('is-scrolled') == false) {
                    document.body.classList.add('is-scrolled');
                }
                if(swiperV.realIndex == 0) {
                    document.body.classList.remove('is-scrolled');
                }

                if(swiperV.realIndex > 0) {
                    $('.btn-scroll-top').css('display','flex').fadeIn();

                    $('.btn-scroll-top').click(function () {
                        swiperV.slideTo(0, 800);  
                        
                        return false;
                    }); 
                } else {
                    $('.btn-scroll-top').fadeOut();
                }
            },
        },
    });

    /*---------------------- 
    common motion
    ---------------------*/
    /* scroll indigator motion */
    anime({
        targets: '.scroll-indigator',
        translateY: -20,
        direction: 'alternate',
        loop: 15,
        easing: 'easeInOutQuad',
        autoplay: true
    });

    /* serach icon motion */
    // function searchIconMotion() {
    //     var searchIcon = anime.timeline({
    //         targets: '.search-icon',
    //         delay: function(el, i) { return i * 200 },
    //         duration: 500, 
    //         easing: 'easeOutExpo', 
    //         loop: true 
    //         });
    
    //         searchIcon
    //         .add({
    //         scale: 1.5,
    //         easing: 'spring',
    //         })
    //         .add({
    //         rotate: '1turn'
    //         })
    //         .add({
    //         translateX: 0,
    //         scale: 1
    //     });
    // }

    /* each section's title motion */
    function titleMotion(tit) {
        var titText = document.querySelectorAll(tit);

        var title = anime.timeline({
            targets:titText,
            duration: 1200, 
            delay: anime.stagger(400),
            easing: 'easeOutQuint', 
            loop:false,
            });

            title
            .add({
                translateY: -200,
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
            endDelay: objLoop + 1000,
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
    each section motions call area
    ---------------------*/

    /*  section1 */
    // swiperV.once('init', function() {
    //     if(swiperV.realIndex == 0) {
    //         var searchArea = $('.search-input');

    //         searchArea.on('mouseenter', function() {
    //             searchIconMotion();
    //         });
            
    //     }
    // });

    /*  section2 */
    swiperV.once('realIndexChange', function() {
        if(swiperV.activeIndex == 1) {
            titleMotion('.surfer-section2 .tit');

            countingMotion('.n-collected-article .num', '365', '430000000', 1700);
            countingMotion('.n-our-customer .num', '14123','14123' , 2300);
            countingMotion('.n-scraped-article .num', '167', '25000', 2600);

            textChangeEffect('.number-area .s-tit','TODAY', 'TOTAL', 4500);

            comSlideYEffect('.feature-area dl', 1400, 'easeOutExpo', anime.stagger(400), false, '300px');
        }
    });

    /*  section3 */
    swiperV.once('realIndexChange', function() {
        if(swiperV.activeIndex == 2) {
            titleMotion('.surfer-section3 .tit');

            // comSlideYEffect('.video-wrapper', 2000, 'easeOutBack', 100, false, -300);
            comSlideYEffect('.video-wrapper', 3500, 'easeOutQuint', -900, false, '-1000px');
            comSlideXEffect('.txt-wrapper', 3500, 'easeOutQuint', -100, false, '-500px');
        }
    });

    /*  section4 */
    swiperV.once('realIndexChange', function() {
        // if(swiperV.realIndex == 3) {
        //     console.log(swiperV.activeIndex);
        //     titleMotion('.surfer-section4 .tit');
        //     comSlideXEffect('.s-feature-area .s-feature-info', 3500, 'easeOutQuint', -800, false, '-500px');
        //     comSlideXEffect('.s-visual-area dl', 3500, 'easeOutQuint', 100, false, '500px');
        // }
    });

    /*  section5 */
    swiperV.once('realIndexChange', function() {
        if(swiperV.realIndex == 4) {
            titleMotion('.surfer-section5 .tit');
        }
    });



    swiperV.on('activeIndexChange', function() {
        for(i=1; i<=5; i++) {
            console.log(swiperV.realIndex);
        }

        if(swiperV.realIndex == 3) {
            titleMotion('.surfer-section4 .tit');
            comSlideXEffect('.s-feature-area .s-feature-info', 3500, 'easeOutQuint', -800, false, '-500px');
            comSlideXEffect('.s-visual-area dl', 3500, 'easeOutQuint', 100, false, '500px');
        } else if(swiperV.realIndex == 4){
            titleMotion('.surfer-section5 .tit');
        }
    });

   

 


    /*---------------------- 
    key visual slide
    ---------------------*/
    var swiperKeyVisual = new Swiper('.key-visual-container', {
        spaceBetween: 0,
        speed: 600,
        loop: false,
        autoplay: {
            delay: 7000,
            waitForTransition:true,
        },
        effect: "fade",
        pagination: {
            el: '.key-visual-pagination',
            clickable: true,
        },
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
            delay: -800,
            duration: 2500, 
            easing: 'easeOutQuint', 
            loop:false,
            });

            msg
            .add({
                translateX: '-500px',
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
                        

                pageTabCont.hide()
                pageTabCont.find('.s-visual-area').fadeOut();
                $("#" + activeMidTabs).show()
                $("#" + activeMidTabs).find('.s-visual-area').fadeIn();
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
            delay: 5000,
        },
        pagination: {
        el: ".swiper-pagination",
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

