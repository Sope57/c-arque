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
    $window.on("scroll", function() {
        var $scrolledY = $(this).scrollTop();
        TweenLite.to($introImage, .5, {
            backgroundPosition: "0% " + $scrolledY * .05 + "%"
        });
    });
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
        e.preventDefault();
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
    $window.on("scroll", function() {
        var $windowPosition = $(this).scrollTop() + $(this).height();
        $animatedElements.each(function() {
            if ($windowPosition > $(this).offset().top && $(this).hasClass("animate")) {
                $(this).removeClass("animate");
                TweenLite.from($(this), 1, jQuery.parseJSON($(this).attr("data-animation")));
            }
        });
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
    }).to($top, .75, {
        top: $height / 2 - 100,
        height: 200,
        ease: Power3.easeOut
    }).to($right, .75, {
        right: $width / 2 - 100,
        width: 200,
        ease: Power3.easeOut
    }, "-=0.5").to($bottom, .75, {
        bottom: $height / 2 - 101,
        height: 200,
        ease: Power3.easeOut
    }, "-=0.5").to($left, .75, {
        left: $width / 2 - 100,
        width: 200,
        ease: Power3.easeOut
    }, "-=0.5").to($preloadImg, 1.5, {
        opacity: 1
    }).to($top, 0, {
        display: "none"
    }).to($right, 0, {
        display: "none"
    }).to($bottom, 0, {
        display: "none"
    }).to($left, 0, {
        display: "none"
    }).to($preloadImg, 1, {
        width: 60,
        height: 60
    }).to($preload, 1, {
        width: 90,
        height: 80
    }, "-=1").to($app, 1, {
        display: "block",
        opacity: 1
    }).to($body, 0, {
        backgroundColor: "#FFF"
    }).to($preload, 0, {
        display: "none"
    });
});

$(function() {
    var $projects = $("#proyectos");
    var $carousel = $("#projectSlider");
    var $indicators = $(".carousel-indicators");
    var $sliders = $(".carousel-indicators li");
    var $slides = $(".carousel-inner .item");
    var $snippets = $("#projectSnippets");
    var $slideInterval = 1e4;
    var $projectEntrance = $("#projectEntrance");
    var $topBar = $projectEntrance.find(".top");
    var $rightBar = $projectEntrance.find(".right");
    var $bottomBar = $projectEntrance.find(".bottom");
    var $leftBar = $projectEntrance.find(".left");
    var $projectView = $("#projectView");
    var $backButton = $("#moreProjects");
    $carousel.carousel({
        interval: $slideInterval,
        pause: null
    }).find(".carousel-indicators .active .percentage").animate({
        height: "100%"
    }, $slideInterval, "linear");
    $indicators.hover(function() {
        $(this).addClass("hovered");
        $(this).find("li").hover(function() {
            $($(this).attr("data-snippet")).addClass("active");
            $($(this).attr("data-snippet")).siblings().removeClass("active");
        });
    }, function() {
        $(this).removeClass("hovered");
        $($(this).find("li.active").attr("data-snippet")).addClass("active");
        $($(this).find("li.active").attr("data-snippet")).siblings().removeClass("active");
    });
    $carousel.bind("slide.bs.carousel", function(e) {
        var $activeSlider = $("#" + $(e.relatedTarget).attr("data-sliderId"));
        var $activeSnippet = $("#" + $(e.relatedTarget).attr("data-snippetId"));
        $activeSlider.find(".percentage").css("height", "0px").animate({
            height: "100%"
        }, $slideInterval, "linear");
        $activeSlider.prevAll().find(".percentage").stop().css("height", "100%");
        $activeSlider.nextAll().find(".percentage").stop().css("height", "0%");
        if ($indicators.hasClass("hovered") == false) {
            $activeSnippet.addClass("active");
            $activeSnippet.siblings().removeClass("active");
        }
    });
    $slides.on("click", function() {
        $(".navbar").removeClass("inPage");
        $(".navbar").addClass("inProject");
        $projectEntrance.css("background-image", "url(build/images/" + $(this).attr("data-imageId") + ".jpg)");
        $carousel.carousel("pause");
        var projectEntranceTimeline = new TimelineLite();
        projectEntranceTimeline.to($projectEntrance, 0, {
            display: "block"
        }).to($carousel, 0, {
            display: "none"
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
            border: "5px solid #171717"
        }, "-=0.5").to($projectEntrance, .5, {
            width: $projectView.find("#projectImage").outerWidth(),
            height: "50vh",
            top: $projectView.find("#projectImage").offset().top,
            left: $projectView.find("#projectImage").offset().left
        }, "-=0.5").to($projects, 0, {
            height: "auto"
        }).to($projectView, .75, {
            opacity: 1
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
        }).to($projects, 0, {
            height: "100%"
        }).to($topBar, .5, {
            height: "80px"
        }).to($rightBar, .5, {
            width: "10%"
        }, "-=0.5").to($bottomBar, .5, {
            height: "80px"
        }, "-=0.5").to($leftBar, .5, {
            width: "10%"
        }, "-=0.5").to($projectEntrance, 0, {
            border: "0px"
        }, "-=0.5").to($projectEntrance, .5, {
            width: "100%",
            height: "100%",
            top: 0,
            left: 0
        }, "-=0.5").to($leftBar, .35, {
            bottom: "-100%"
        }).to($bottomBar, .35, {
            right: "-100%"
        }, "-=0.15").to($rightBar, .35, {
            top: "-100%"
        }, "-=0.15").to($topBar, .35, {
            left: "-100%",
            onComplete: function() {
                $(".navbar").removeClass("inProject");
                $(".navbar").addClass("inPage");
                $carousel.carousel("cycle");
                $carousel.carousel("next");
            }
        }, "-=0.15").to($carousel, 0, {
            display: "block"
        }, "-=0.25").to($projectEntrance, 0, {
            display: "none"
        });
    });
});