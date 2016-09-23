// $(function() {
// 	var biggestHeight = "0";
// 	$(".container").each(function(){
//  	// If this elements height is bigger than the biggestHeight
//  	if ($(this).height() > biggestHeight ) {
//    	// Set the biggestHeight to this Height
//    	biggestHeight = $(this).height();
//  	}
// 	});
// 	// Set the container height
// 	$(".container").height(biggestHeight);
// });
$(function() {
    var $window = $(window);
    var $introImage = $("#introImage");
    var $animatedElements = $(".animate");
    // $window.on('scroll', function() {
    // 	var $scrolledY = $(this).scrollTop();
    // 	TweenLite.to($introImage, 0.5, {backgroundPosition : "0% " + $scrolledY * .05 + "%"});
    // });
    $(".navbar-brand").on("click", function() {
        $("#main").show();
        var $activeView = $("#main").siblings(".page.active");
        switch ($activeView.attr("id")) {
          case "proyectos":
            // $("#moreProjects").animate({
            // 	'opacity' : '0',
            // 	// 'bottom' : '25vh'
            // }, 250, function() {
            // });
            $activeView.slideUp(500);
            $(".navbar").removeClass("inPage");
            break;

          case "arte":
            $activeView.slideUp(500);
            break;

          case "contacto":
            break;

          case "default":
            break;
        }
        $(".pageButton").parent(".active").removeClass("active");
    });
    $(".pageButton").on("click", function(e) {
        // e.preventDefault();
        if ($window.width() < 768) {
            $(".navbar-toggle").click();
        }
        var $pageId = $(this).attr("data-page");
        $(this).closest("li").addClass("active");
        $(this).closest("li").siblings().removeClass("active");
        if ($pageId == "#proyectos" && $(".navbar").hasClass("inProject") != true) {
            $(".navbar").addClass("inPage");
        } else {
            $(".navbar").removeClass("inPage");
        }
        $($pageId).addClass("active").slideDown(500, function() {
            $($pageId).siblings(".page").hide();
        });
        $($pageId).siblings(".active").removeClass("active");
        switch ($pageId) {
          case "#proyectos":
            TweenMax.staggerFrom($("#proyectos .sliders .flipper"), 1.75, {
                rotationY: 90,
                opacity: 0,
                ease: Elastic.easeOut.config(1, .5),
                delay: .5
            }, .15);
            break;

          case "#arte":
            // if ($("#arte").hasClass("active") === false) {
            TweenMax.staggerFrom($("#arte .tile"), .3, {
                scale: 0,
                borderRadius: 100,
                opacity: 0,
                delay: .3
            }, .15);
            // }
            break;

          case "#contacto":
            break;

          case "default":
            break;
        }
    });
    $(".fancyButton").on("mouseenter", function(e) {
        var parentOffset = $(this).offset(), relX = e.pageX - parentOffset.left, relY = e.pageY - parentOffset.top;
        $(this).find("span").css({
            top: relY,
            left: relX
        });
    }).on("mouseout", function(e) {
        var parentOffset = $(this).offset(), relX = e.pageX - parentOffset.left, relY = e.pageY - parentOffset.top;
        $(this).find("span").css({
            top: relY,
            left: relX
        });
    });
    $(".tile").hover(function() {
        if ($window.width() > 768) {
            var moveUp = $(this).find(".details").outerHeight(true);
            TweenLite.to($(this).find(".details"), .4, {
                y: -moveUp,
                ease: Power4.easeOut
            });
            TweenLite.to($(this).find(".background"), .4, {
                y: "-15%",
                ease: Power4.easeOut
            });
        }
    }, function() {
        TweenLite.to($(this).find(".details"), .4, {
            y: 0
        });
        TweenLite.to($(this).find(".background"), .4, {
            y: "0%"
        });
    });
    $(".navigator").on("click", function(event) {
        var target = $($(this).attr("href"));
        if (target.length) {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: target.offset().top
            }, 750);
        }
    });
});

var $body = $("body");

var $preload = $(".se-pre-con");

var $preloadImg = $preload.find("img");

var $app = $(".app");

var $width = $preload.width();

var $height = $preload.height();

var $top = $preload.find(".top");

var $right = $preload.find(".right");

var $bottom = $preload.find(".bottom");

var $left = $preload.find(".left");

var $tag = $(".navbar-brand img");

// $(function() {
//     var preloadTimeline = new TimelineLite({delay : 0.25});
//     preloadTimeline.to($top, 0, {left : ($width/2)+77})
//         .to($right, 0, {top : ($height/2)+77})
//         .to($bottom, 0, {left : ($width/2)-100})
//         .to($left, 0, {top : ($height/2)-100})
//         .to($top, 1, {top : ($height/2)-100, height : 200, ease: Expo.easeOut})
//         .to($right, 1, {right : ($width/2)-100, width : 200, ease: Expo.easeOut}, "-=0.75")
//         .to($bottom, 1, {bottom : ($height/2)-101, height : 200, ease: Expo.easeOut}, "-=0.75")
//         .to($left, 1, {left : ($width/2)-100, width : 200, ease: Expo.easeOut}, "-=0.75")
//         .to($preloadImg, 1.25, {opacity : 1, ease: Power2.easeOut})
//         .to($top, 0, {display : "none"})
//         .to($right, 0, {display : "none"})
//         .to($bottom, 0, {display : "none"})
//         .to($left, 0, {display : "none"})
//         .to($preloadImg, 1.5, {width : 60, height : 60, ease: Power3.easeInOut})
//         .to($preload, 1.5, {width : 90, height : 80, ease: Power3.easeInOut}, "-=1")
//         .to($app, 1, {display : "block", opacity: 1})
//         .to($body, 0, {backgroundColor : "#FFF"})
//         .to($preload, 0, {display : "none"});
// });
$(function() {
    var preloadTimeline = new TimelineLite({
        delay: .25
    });
    preloadTimeline.to($top, 0, {
        left: $width / 2 + 77
    }).to($right, 0, {
        top: $height / 2 + 77
    }).to($bottom, 0, {
        left: $width / 2 - 100
    }).to($left, 0, {
        top: $height / 2 - 100
    }).to($top, 1, {
        top: $height / 2 - 100,
        height: 200,
        ease: Expo.easeOut
    }).to($right, 1, {
        right: $width / 2 - 100,
        width: 200,
        ease: Expo.easeOut
    }, "-=0.75").to($bottom, 1, {
        bottom: $height / 2 - 101,
        height: 200,
        ease: Expo.easeOut
    }, "-=0.75").to($left, 1, {
        left: $width / 2 - 100,
        width: 200,
        ease: Expo.easeOut
    }, "-=0.75").to($preloadImg, 1.25, {
        opacity: 1,
        ease: Power2.easeOut
    }).to($top, 0, {
        display: "none"
    }).to($right, 0, {
        display: "none"
    }).to($bottom, 0, {
        display: "none"
    }).to($left, 0, {
        display: "none"
    });
});

$(function() {
    var $window = $(window);
    var $projects = $("#proyectos");
    var $loading = $projects.find(".loading");
    var $scrollIndicator = $projects.find(".scrollIndicator");
    var $scrollIndicatorUp = $scrollIndicator.find(".up");
    var $scrollIndicatorDown = $scrollIndicator.find(".down");
    var $projectIndicator = $projects.find(".projectIndicator");
    var $projectMarginer = $projectIndicator.find(".marginer");
    var $projectSlider = $projects.find("#projectSlider");
    var $sliders = $projectSlider.find(".sliders");
    var $slides = $sliders.find(".slide");
    var $projectClosers = $sliders.find(".close");
    var $projectThumbnails = $sliders.find(".projectThumbnail");
    var $fancyButtons = $sliders.find(".title .fancyButton");
    var $projectEntrance = $projects.find("#projectEntrance");
    var $entranceImage = $projectEntrance.find(".entranceImage");
    var $topBar = $projectEntrance.find(".top");
    var $rightBar = $projectEntrance.find(".right");
    var $bottomBar = $projectEntrance.find(".bottom");
    var $leftBar = $projectEntrance.find(".left");
    var $projectView = $("#projectView");
    var $backButton = $("#moreProjects");
    var windowHeight = 640;
    var thumbnails = [];
    var thumbnailOffset = 640 * -1;
    $projectThumbnails.each(function(index) {
        var thumbnailImage = {};
        thumbnailOffset = thumbnailOffset + windowHeight;
        thumbnailImage.offset = thumbnailOffset;
        thumbnailImage.object = $(this);
        thumbnails.push(thumbnailImage);
    });
    // 	function updateThumbnailBackgrounds() {
    // 		var scrolledY = $window.scrollTop();
    // 	var thumbnailPosition = scrolledY - thumbnails[$sliders.find(".fixed").last().next().index()].offset;
    // 	if (thumbnailPosition >= 0) {
    // 		thumbnails[$sliders.find(".fixed").last().next().index()].object.closest("li").addClass("fixed");
    // 	} else if (thumbnailPosition < -640) {
    // 		thumbnails[$sliders.find(".fixed").last().index()].object.closest("li").removeClass("fixed");
    // 	}
    // 	var grayscaleValue = 100 - (scrolledY - thumbnails[$sliders.find(".fixed").last().index()].offset) / 6.4;
    // 	var brightnessValue = 100 - (grayscaleValue * 0.75);
    // 	$sliders.find(".fixed").last().next().find(".projectThumbnail")
    //  			.css('webkitFilter', "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)")
    //  			.css('mozFilter', "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)")
    //  			.css('msFilter', "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)")
    //  			.css('oFilter', "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)")
    //  			.css('filter', "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)");
    // 	var topIndicatorOpacity = scrolledY / windowHeight;
    // 	var bottomIndicatorOpacity = 6 - topIndicatorOpacity;
    // 	$scrollIndicatorUp.css("opacity", topIndicatorOpacity);
    // 	$scrollIndicatorDown.css("opacity", bottomIndicatorOpacity);
    // 	var projectMargin = (scrolledY / 31.2) * -1;
    // 	$projectMarginer.css("margin-left", projectMargin);
    // 	}
    // $window.on('scroll', function() {
    // 	if($window.width() < 768){
    // 		window.requestAnimationFrame(updateThumbnailBackgrounds);
    // 	}
    // });
    var latestKnownScrollY = 0;
    var ticking = false;
    function onScroll() {
        latestKnownScrollY = window.scrollY;
        requestTick();
    }
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(update);
        }
        ticking = true;
    }
    function update() {
        ticking = false;
        var scrolledY = latestKnownScrollY;
        var thumbnailPosition = scrolledY - thumbnails[$sliders.find(".fixed").last().next().index()].offset;
        if (thumbnailPosition >= 0) {
            thumbnails[$sliders.find(".fixed").last().next().index()].object.closest("li").addClass("fixed");
        } else if (thumbnailPosition < -640) {
            thumbnails[$sliders.find(".fixed").last().index()].object.closest("li").removeClass("fixed");
        }
        var grayscaleValue = (scrolledY - thumbnails[$sliders.find(".fixed").last().index()].offset) / 6.4;
        var brightnessValue = 100 - grayscaleValue * .75;
        $sliders.find(".fixed").last().find(".projectThumbnail").css("webkitFilter", "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)").css("mozFilter", "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)").css("msFilter", "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)").css("oFilter", "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)").css("filter", "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)");
        var topIndicatorOpacity = scrolledY / windowHeight;
        var bottomIndicatorOpacity = 6 - topIndicatorOpacity;
        $scrollIndicatorUp.css("opacity", topIndicatorOpacity);
        $scrollIndicatorDown.css("opacity", bottomIndicatorOpacity);
        var projectMargin = scrolledY / 31.2 * -1;
        $projectMarginer.css("margin-left", projectMargin);
    }
    window.addEventListener("scroll", onScroll, false);
    $window.on("resize", function() {
        if ($window.width() >= 768) {
            $sliders.css("height", "100%");
            $slides.css("height", "100%");
            if ($sliders.find(".active")) {
                $sliders.find(".active").css("width", "55%");
                $sliders.find(".active").siblings().css({
                    width: "7.5%",
                    display: "inline-block"
                });
            }
        } else {
            if ($sliders.is(".open")) {
                $sliders.css("height", "100vh");
            } else {
                $sliders.css("height", windowHeight * 7 + "px");
            }
            $slides.css("height", windowHeight + "px");
            $projectThumbnails.css("background-position", "50% 50%");
            if ($sliders.find(".active")) {
                $sliders.find(".active").siblings().css({
                    display: "none"
                });
            }
        }
    });
    $sliders.on("mousemove", function(e) {
        if ($window.width() >= 768 && !$(this).hasClass("open")) {
            $slides.each(function(index) {
                var $distancePercentage = (e.pageX - ($(this).offset().left + $(this).outerWidth() / 2)) * 100 / $window.width();
                var $animationSpeed = Math.abs($distancePercentage / 40) + .75;
                var $backgroundImageOffset = 50 + $distancePercentage / 4;
                TweenLite.to($(this).find(".projectThumbnail"), $animationSpeed, {
                    backgroundPosition: $backgroundImageOffset + "% 50%",
                    ease: Power1.easeOut
                });
            });
        }
    });
    $projectThumbnails.on("click", function() {
        if (!$(this).closest(".slide").hasClass("active")) {
            $sliders.addClass("open");
            var $openSlider = $(this).closest(".slide");
            var $delay = 0;
            if ($window.width() < 768) {
                $delay = .5;
                $loading.css({
                    display: "block",
                    opacity: 1
                });
                TweenLite.to($("html, body"), .5, {
                    scrollTop: thumbnails[$openSlider.index()].offset,
                    onComplete: function() {
                        TweenLite.to($scrollIndicator, .75, {
                            opacity: 0
                        });
                        TweenLite.to($projectIndicator, .75, {
                            opacity: 0
                        });
                        TweenLite.to($openSlider.find(".projectTitle"), .75, {
                            opacity: 0
                        });
                        TweenLite.to($openSlider.find(".projectThumbnail .fancyButton"), .75, {
                            opacity: 0
                        });
                        TweenLite.to($openSlider, 0, {
                            zIndex: 9
                        });
                        TweenLite.to($openSlider, .75, {
                            height: "100vh",
                            onComplete: function() {
                                TweenLite.to($loading, .5, {
                                    opacity: 0,
                                    onComplete: function() {
                                        $loading.css("display", "none");
                                    }
                                });
                                $openSlider.addClass("active").siblings().removeClass("active");
                                $openSlider.siblings().css("display", "none");
                                $sliders.css("height", "100vh");
                            }
                        });
                    }
                });
            } else {
                $openSlider.addClass("active").siblings().removeClass("active");
                TweenLite.to($openSlider, .75, {
                    width: "55%",
                    ease: Power2.easeOut,
                    delay: $delay
                });
                TweenLite.to($openSlider.siblings(), .75, {
                    width: "7.5%",
                    ease: Power2.easeOut,
                    delay: $delay
                });
                TweenLite.to($openSlider.siblings().find(".projectThumbnail"), .75, {
                    height: "100%",
                    ease: Power2.easeOut,
                    delay: $delay
                });
                TweenLite.to($openSlider.siblings().find(".title"), .75, {
                    height: "0%",
                    ease: Power2.easeOut,
                    delay: $delay
                });
                TweenLite.to($openSlider.siblings().find(".title .fancyButton"), .75, {
                    opacity: 0,
                    bottom: "0",
                    ease: Power2.easeOut,
                    delay: $delay
                });
            }
            TweenLite.to($openSlider.find(".projectThumbnail"), .75, {
                height: "50%",
                ease: Power2.easeOut,
                delay: $delay
            });
            TweenLite.to($openSlider.find(".title"), .75, {
                height: "50%",
                ease: Power2.easeOut,
                delay: $delay
            });
            TweenLite.to($openSlider.find(".title .fancyButton"), .75, {
                opacity: 1,
                bottom: "10%",
                ease: Power2.easeOut,
                delay: $delay + .75
            });
        }
    });
    $projectClosers.on("click", function() {
        $sliders.removeClass("open");
        var $openSlider = $(this).closest(".active");
        if ($window.width() < 768) {
            $openSlider.siblings().css("display", "block");
            TweenLite.to($sliders, 0, {
                height: windowHeight * 7
            });
            TweenLite.to($("html, body"), 0, {
                scrollTop: thumbnails[$openSlider.index()].offset
            });
            TweenLite.to($scrollIndicator, .75, {
                opacity: 1
            });
            TweenLite.to($projectIndicator, .75, {
                opacity: 1
            });
            TweenLite.to($openSlider.find(".projectTitle"), .75, {
                opacity: 1
            });
            TweenLite.to($openSlider.find(".projectThumbnail .fancyButton"), .75, {
                opacity: 1
            });
            TweenLite.to($openSlider, .75, {
                height: windowHeight,
                onComplete: function() {
                    TweenLite.to($openSlider, 0, {
                        zIndex: $openSlider.index() + 1
                    });
                    $openSlider.removeClass("active");
                }
            });
        } else {
            TweenLite.to($sliders.find("li"), .75, {
                width: 100 / 7 + "%",
                ease: Power2.easeOut
            });
            $openSlider.removeClass("active");
        }
        TweenLite.to($openSlider.find(".projectThumbnail"), .75, {
            height: "100%",
            backgroundPosition: "50% 50%",
            ease: Power2.easeOut
        });
        TweenLite.to($openSlider.find(".title"), .75, {
            height: "0%",
            ease: Power2.easeOut
        });
        TweenLite.to($openSlider.find(".title .fancyButton"), .25, {
            opacity: 0,
            bottom: "0"
        });
    });
    $fancyButtons.on("click", function() {
        var $projectViewHeight = $window.width() < 768 ? "320px" : "50vh";
        $entranceImage.css("background-image", "url(build/images/" + $(this).attr("data-imageId") + ".jpg)");
        var $projectImage = $(this).parent().siblings(".projectThumbnail");
        var projectEntranceTimeline = new TimelineLite();
        projectEntranceTimeline.to($projectEntrance, 0, {
            display: "block"
        }).to($entranceImage, 0, {
            width: $projectImage.outerWidth(),
            height: $projectImage.outerHeight(),
            top: $projectImage.offset().top,
            left: $projectImage.offset().left
        }).to($entranceImage, .5, {
            width: "100%",
            height: "100%",
            top: 0,
            left: 0
        }).to($projectSlider, 0, {
            display: "none",
            opacity: 0
        }).to($projectView, 0, {
            display: "block"
        }).to($topBar, .35, {
            left: 0
        }).to($rightBar, .35, {
            top: 0
        }, "-=0.15").to($bottomBar, .35, {
            right: 0
        }, "-=0.15").to($leftBar, .35, {
            bottom: 0
        }, "-=0.15").to($topBar, .5, {
            height: 0
        }).to($rightBar, .5, {
            width: 0
        }, "-=0.5").to($bottomBar, .5, {
            height: 0
        }, "-=0.5").to($leftBar, .5, {
            width: 0
        }, "-=0.5").to($projectEntrance, 0, {
            border: "5px solid #171717",
            onComplete: function() {
                TweenLite.to($projectEntrance, .5, {
                    width: $projectView.find("#projectImage").outerWidth(),
                    height: $projectViewHeight,
                    top: $projectView.find("#projectImage").offset().top,
                    left: $projectView.find("#projectImage").offset().left
                });
            }
        }, "-=0.5").to($projectView, .75, {
            opacity: 1
        }).to($projects, 0, {
            height: "auto"
        }).to($projectEntrance, 0, {
            display: "none"
        });
    });
    $projectView.find("#projectImages").hover(function() {
        $(this).find(".image").hover(function() {
            var $projectImage = $(this).attr("data-projectImage");
            $projectView.find("#projectImage").css("background-image", "url(build/images/" + $projectImage + ")");
        });
    }, function() {
        $projectView.find("#projectImage").css("background-image", "url(build/images/proyecto1.jpg)");
    });
    $("#projectImages").find(".image").on("click", function() {
        var $projectImage = $(this).attr("data-projectImage");
        $projectView.find("#projectImage").css("background-image", "url(build/images/" + $projectImage + ")");
    });
    $backButton.on("click", function() {
        var $delay = $("#projectName").visible() ? 0 : .75;
        var projectExitTimeline = new TimelineLite({
            delay: $delay
        });
        projectExitTimeline.to($projectEntrance, 0, {
            width: $projectView.find("#projectImage").outerWidth(),
            top: $projectView.find("#projectImage").offset().top,
            left: $projectView.find("#projectImage").offset().left,
            display: "block"
        }).to($projectView, .5, {
            opacity: 0
        }).to($projectView, 0, {
            display: "none"
        }).to($projectSlider, 0, {
            display: "block"
        }).to($projects, 0, {
            height: "100%"
        }).to($topBar, .5, {
            height: "20%"
        }).to($rightBar, .5, {
            width: "10%"
        }, "-=0.5").to($bottomBar, .5, {
            height: "10%"
        }, "-=0.5").to($leftBar, .5, {
            width: "10%"
        }, "-=0.5").to($projectEntrance, 0, {
            border: "0px"
        }, "-=0.5").to($projectEntrance, .5, {
            width: "100%",
            height: "100vh",
            top: 0,
            left: 0
        }, "-=0.5").to($projectSlider, 0, {
            opacity: 1
        }).to($leftBar, .35, {
            bottom: "-100%"
        }).to($bottomBar, .35, {
            right: "-100%"
        }, "-=0.15").to($rightBar, .35, {
            top: "-100%"
        }, "-=0.15").to($topBar, .35, {
            left: "-100%",
            onComplete: function() {
                TweenLite.to($entranceImage, .5, {
                    width: $sliders.find(".active .projectThumbnail").outerWidth(),
                    height: $sliders.find(".active .projectThumbnail").outerHeight(),
                    top: $sliders.find(".active .projectThumbnail").offset().top,
                    left: $sliders.find(".active .projectThumbnail").offset().left,
                    onComplete: function() {
                        TweenLite.to($projectEntrance, 0, {
                            display: "none"
                        });
                    }
                });
            }
        }, "-=0.15");
    });
});