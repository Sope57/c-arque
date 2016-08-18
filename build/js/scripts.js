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
    var $introImage = $("#introImage");
    var $window = $(window);
    $window.on("scroll", function() {
        var $scrolledY = $(this).scrollTop();
        $introImage.css("background-position", "0% " + $scrolledY * .05 + "%");
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
            switch ($pageId) {
              case "#proyectos":
                // $("#moreProjects").animate({
                // 	'opacity' : '1',
                // 	// 'bottom' : '15vh'
                // }, 750);
                break;

              case "#arte":
                break;

              case "#contacto":
                break;

              case "default":
                break;
            }
            $($pageId).siblings(".page").hide();
        });
        $($pageId).siblings(".active").removeClass("active");
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
            $(this).find(".details").css("transform", "translateY(-" + moveUp + "px)");
        }
    }, function() {
        $(this).find(".details").css("transform", "translateY(0px)");
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

$(window).on("load", function() {
    $top.css({
        left: $width / 2 + 77 + "px"
    });
    $top.animate({
        top: $height / 2 - 100 + "px",
        height: "200px"
    }, 500);
    $right.css({
        top: $height / 2 + 77 + "px"
    });
    $right.delay(150).animate({
        right: $width / 2 - 100 + "px",
        width: "200px"
    }, 500);
    $bottom.css({
        left: $width / 2 - 100 + "px"
    });
    $bottom.delay(300).animate({
        bottom: $height / 2 - 100 + "px",
        height: "200px"
    }, 500);
    $left.css({
        top: $height / 2 - 100 + "px"
    });
    $left.delay(550).animate({
        left: $width / 2 - 100 + "px",
        width: "200px"
    }, 500, function() {
        $preloadImg.fadeIn(1e3, function() {
            $top.hide();
            $right.hide();
            $bottom.hide();
            $left.hide();
            $preloadImg.animate({
                width: "40px",
                height: "40px"
            }, 1e3);
            $preload.animate({
                width: "70px",
                height: "50px"
            }, 1e3, function() {
                $app.fadeIn(1e3, function() {
                    $preload.hide();
                });
            });
        });
    });
});

$(function() {
    var $projects = $("#proyectos");
    var $slides = $(".carousel-inner .item");
    var $carousel = $("#projectSlider");
    var $slideInterval = 1e4;
    var $projectEntrance = $("#projectEntrance");
    var $topBar = $projectEntrance.find(".top");
    var $rightBar = $projectEntrance.find(".right");
    var $bottomBar = $projectEntrance.find(".bottom");
    var $leftBar = $projectEntrance.find(".left");
    var $projectView = $("#projectView");
    var $backButton = $("#moreProjects");
    var ElementCursor = {
        cursorElement: "",
        currentMousePos: {
            x: -1,
            y: -1
        },
        setCursor: function(cursorId) {
            $carousel.find(".item").css({
                cursor: "none"
            });
            ElementCursor.cursorElement = cursorId;
            ElementCursor.updateCursor();
        },
        removeCursor: function() {
            $carousel.find(".item").css({
                cursor: ""
            });
            ElementCursor.cursorElement = "";
        },
        updateCursor: function() {
            $carousel.find(".item").mousemove(function(e) {
                ElementCursor.currentMousePos.x = e.pageX;
                ElementCursor.currentMousePos.y = e.pageY;
                $("#" + ElementCursor.cursorElement).css({
                    position: "fixed",
                    "user-select": "none",
                    top: ElementCursor.currentMousePos.y + 2 + "px",
                    left: ElementCursor.currentMousePos.x + 2 + "px"
                });
            });
        }
    };
    $carousel.carousel({
        interval: $slideInterval,
        pause: null
    });
    $carousel.find(".carousel-indicators .active .percentage").animate({
        height: "100%"
    }, $slideInterval, "linear");
    $carousel.bind("slide.bs.carousel", function(e) {
        var $activeItem = $("#" + $(e.relatedTarget).attr("data-sliderId"));
        $activeItem.find(".percentage").css("height", "0px").animate({
            height: "100%"
        }, $slideInterval, "linear");
        $activeItem.prevAll().find(".percentage").stop().css("height", "100%");
        $activeItem.nextAll().find(".percentage").stop().css("height", "0%");
        var $windowWidth = $(window).width();
        $(e.relatedTarget).prev().find(".cursor").hide();
        if (ElementCursor.currentMousePos.x > $windowWidth / 5 * 2 + 20 && ElementCursor.currentMousePos.x < $windowWidth - $windowWidth / 5 - 20 && ElementCursor.currentMousePos.y > 60) {
            $(e.relatedTarget).find(".cursor").delay(750).slideDown(750).css({
                position: "fixed",
                "user-select": "none",
                top: ElementCursor.currentMousePos.y + 2 + "px",
                left: ElementCursor.currentMousePos.x + 2 + "px"
            });
        }
    });
    $slides.hover(function() {
        $(this).find(".cursor").slideDown(750);
        var cursor = $(this).attr("data-cursorId");
        ElementCursor.setCursor(cursor);
    }, function() {
        $(this).find(".cursor").hide();
        ElementCursor.removeCursor();
    });
    $slides.on("click", function() {
        $(".navbar").removeClass("inPage");
        $(".navbar").addClass("inProject");
        $projectEntrance.css("background-image", "url(build/images/" + $(this).attr("data-imageId") + ".jpg)");
        $projectEntrance.show();
        $carousel.carousel("pause");
        $carousel.hide();
        $topBar.animate({
            left: "0px"
        }, 250);
        $rightBar.delay(150).animate({
            top: "0px"
        }, 250);
        $bottomBar.delay(300).animate({
            right: "0px"
        }, 250);
        $leftBar.delay(450).animate({
            bottom: "0px"
        }, 250, function() {
            $projectView.show();
            $topBar.animate({
                height: "0px"
            }, 500);
            $rightBar.animate({
                width: "0px"
            }, 500);
            $bottomBar.animate({
                height: "0px"
            }, 500);
            $leftBar.animate({
                width: "0px"
            }, 500);
            $projectEntrance.css("border", "5px solid #FFF").animate({
                width: $projectView.find("#projectImage").outerWidth() + "px",
                height: "50vh",
                top: $projectView.find("#projectImage").offset().top + "px",
                left: $projectView.find("#projectImage").offset().left + "px"
            }, 500, function() {
                $projects.css("height", "auto");
                $projectView.animate({
                    opacity: "1"
                }, 750, function() {
                    $projectEntrance.hide();
                });
            });
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
        $projectEntrance.css({
            width: $projectView.find("#projectImage").outerWidth() + "px",
            top: $projectView.find("#projectImage").offset().top + "px",
            left: $projectView.find("#projectImage").offset().left + "px"
        }).show();
        var $delay = $("#projectName").visible() ? 0 : 750;
        $projectView.delay($delay).animate({
            opacity: "0"
        }, 500, function() {
            $projects.css("height", "100vh");
            $topBar.animate({
                height: "10%"
            }, 500);
            $rightBar.animate({
                width: "10%"
            }, 500);
            $bottomBar.animate({
                height: "10%"
            }, 500);
            $leftBar.animate({
                width: "10%"
            }, 500);
            $projectEntrance.css("border", "none").animate({
                width: "100%",
                height: "100%",
                top: "0px",
                left: "0px"
            }, 500, function() {
                $leftBar.animate({
                    bottom: "-100%"
                }, 250);
                $bottomBar.delay(150).animate({
                    right: "-100%"
                }, 250);
                $rightBar.delay(300).animate({
                    top: "-100%"
                }, 250);
                $topBar.delay(450).animate({
                    left: "-100%"
                }, 250, function() {
                    $(".navbar").removeClass("inProject");
                    $(".navbar").addClass("inPage");
                    $carousel.show();
                    $carousel.carousel("cycle");
                    $carousel.carousel("next");
                    $projectEntrance.hide();
                });
            });
        });
    });
});