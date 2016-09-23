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
		if(!ticking) {
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
		var brightnessValue = 100 - (grayscaleValue * 0.75);
		$sliders.find(".fixed").last().find(".projectThumbnail")
	  		.css('webkitFilter', "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)")
  			.css('mozFilter', "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)")
  			.css('msFilter', "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)")
  			.css('oFilter', "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)")
  			.css('filter', "grayscale(" + grayscaleValue + "%) brightness(" + brightnessValue + "%)");
		
		var topIndicatorOpacity = scrolledY / windowHeight;
		var bottomIndicatorOpacity = 6 - topIndicatorOpacity;
		$scrollIndicatorUp.css("opacity", topIndicatorOpacity);
		$scrollIndicatorDown.css("opacity", bottomIndicatorOpacity);
			
		var projectMargin = (scrolledY / 31.2) * -1;
		$projectMarginer.css("margin-left", projectMargin);
	}
		
	window.addEventListener('scroll', onScroll, false);

	$window.on('resize', function() {
		if($window.width() >= 768){
			$sliders.css("height", "100%");
			$slides.css("height", "100%");
			if($sliders.find(".active")){
				$sliders.find(".active").css("width", "55%");
				$sliders.find(".active").siblings().css({
					width : "7.5%",
					display : "inline-block"	
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
			if($sliders.find(".active")){
				$sliders.find(".active").siblings().css({
					display : "none"	
				});
			}
		}
	});

	$sliders.on("mousemove", function(e){
		if($window.width() >= 768 && !$(this).hasClass("open")){
			$slides.each(function(index) {
				var $distancePercentage = (e.pageX - ($(this).offset().left + $(this).outerWidth() / 2)) * 100 / $window.width();
				var $animationSpeed = Math.abs($distancePercentage / 40) + 0.75;
				var $backgroundImageOffset = 50 + $distancePercentage / 4;
				TweenLite.to($(this).find(".projectThumbnail"), $animationSpeed, {backgroundPosition : $backgroundImageOffset + "% 50%", ease : Power1.easeOut});	
			});
		}
	});

	$projectThumbnails.on('click', function() {
		if (!$(this).closest(".slide").hasClass("active")) {
			$sliders.addClass("open");
			var $openSlider = $(this).closest(".slide");
			var $delay = 0;
			if($window.width() < 768){
				$delay = 0.5;
				$loading.css({
					display :  "block",
					opacity : 1
				});
            	TweenLite.to($('html, body'), 0.5, {scrollTop : thumbnails[$openSlider.index()].offset, onComplete : function() {
					TweenLite.to($scrollIndicator, 0.75, {opacity : 0});
					TweenLite.to($projectIndicator, 0.75, {opacity : 0});
					TweenLite.to($openSlider.find(".projectTitle"), 0.75, {opacity : 0});
					TweenLite.to($openSlider.find(".projectThumbnail .fancyButton"), 0.75, {opacity : 0});
					TweenLite.to($openSlider, 0, {zIndex : 9});
					TweenLite.to($openSlider, 0.75, {"height" : "100vh", onComplete: function() {
						TweenLite.to($loading, 0.5, {"opacity" : 0, onComplete: function() {
							$loading.css("display", "none");
						}});
						$openSlider.addClass("active").siblings().removeClass("active");
            			$openSlider.siblings().css("display", "none");
            			$sliders.css("height", "100vh");
					}});
            	}});
			} else {
				$openSlider.addClass("active").siblings().removeClass("active");
				TweenLite.to($openSlider, 0.75, {width : "55%", ease : Power2.easeOut, delay : $delay});
				TweenLite.to($openSlider.siblings(), 0.75, {width : "7.5%", ease : Power2.easeOut, delay : $delay});
				TweenLite.to($openSlider.siblings().find(".projectThumbnail"), 0.75, {height : "100%", ease : Power2.easeOut, delay : $delay});
				TweenLite.to($openSlider.siblings().find(".title"), 0.75, {height : "0%", ease : Power2.easeOut, delay : $delay});
				TweenLite.to($openSlider.siblings().find(".title .fancyButton"), 0.75, {opacity : 0, bottom : "0", ease : Power2.easeOut, delay : $delay});		
			}
			TweenLite.to($openSlider.find(".projectThumbnail"), 0.75, {height : "50%", ease : Power2.easeOut, delay : $delay});
			TweenLite.to($openSlider.find(".title"), 0.75, {height : "50%", ease : Power2.easeOut, delay : $delay});
			TweenLite.to($openSlider.find(".title .fancyButton"), 0.75, {opacity : 1, bottom : "10%", ease : Power2.easeOut, delay : $delay + 0.75});
		}
	});

	$projectClosers.on("click", function() {
		$sliders.removeClass("open");
		var $openSlider = $(this).closest(".active");
		if($window.width() < 768){
        	$openSlider.siblings().css("display", "block");
            TweenLite.to($sliders, 0, {height : windowHeight * 7});
			TweenLite.to($('html, body'), 0, {scrollTop : thumbnails[$openSlider.index()].offset});
			TweenLite.to($scrollIndicator, 0.75, {opacity : 1});
			TweenLite.to($projectIndicator, 0.75, {opacity : 1});
			TweenLite.to($openSlider.find(".projectTitle"), 0.75, {opacity : 1});
			TweenLite.to($openSlider.find(".projectThumbnail .fancyButton"), 0.75, {opacity : 1});
            TweenLite.to($openSlider, 0.75, {height : windowHeight, onComplete: function() {
    			TweenLite.to($openSlider, 0, {zIndex : $openSlider.index() + 1});
				$openSlider.removeClass("active");
            }});
		} else {
			TweenLite.to($sliders.find("li"), 0.75, {width : 100 / 7 + "%", ease : Power2.easeOut});
			$openSlider.removeClass("active");
		}
		TweenLite.to($openSlider.find(".projectThumbnail"), 0.75, {height : "100%", backgroundPosition : "50% 50%", ease : Power2.easeOut});
		TweenLite.to($openSlider.find(".title"), 0.75, {height : "0%", ease : Power2.easeOut});
		TweenLite.to($openSlider.find(".title .fancyButton"), 0.25, {opacity : 0, bottom : "0"});
	});

	$fancyButtons.on('click', function(){
		var $projectViewHeight = ($window.width() < 768 ? "320px" : "50vh");
		$entranceImage.css('background-image', "url(build/images/" + $(this).attr("data-imageId") + ".jpg)");
		var $projectImage = $(this).parent().siblings(".projectThumbnail");
		var projectEntranceTimeline = new TimelineLite();
    	projectEntranceTimeline
    		.to($projectEntrance, 0, {display: "block"})
    		.to($entranceImage, 0, {
    			width: $projectImage.outerWidth(),
    			height: $projectImage.outerHeight(),
    			top: $projectImage.offset().top,
    			left: $projectImage.offset().left,
    		})
    		.to($entranceImage, 0.5, {
    			width: "100%",
    			height: "100%",
    			top: 0,
    			left: 0,
    		})
    		.to($projectSlider, 0, {display: "none", opacity: 0})
    		.to($projectView, 0, {display: "block"})
    		.to($topBar, 0.35, {left: 0})
    		.to($rightBar, 0.35, {top: 0}, "-=0.15")
    		.to($bottomBar, 0.35, {right: 0}, "-=0.15")
    		.to($leftBar, 0.35, {bottom: 0}, "-=0.15")
    		.to($topBar, 0.5, {height: 0})
    		.to($rightBar, 0.5, {width: 0}, "-=0.5")
    		.to($bottomBar, 0.5, {height: 0}, "-=0.5")
    		.to($leftBar, 0.5, {width: 0}, "-=0.5")
    		.to($projectEntrance, 0, {border: "5px solid #171717", onComplete: function() {
    			TweenLite.to($projectEntrance, 0.5, {
    				width: $projectView.find("#projectImage").outerWidth(),
    				height: $projectViewHeight,
    				top: $projectView.find("#projectImage").offset().top,
    				left: $projectView.find("#projectImage").offset().left,
    			})
    		}}, "-=0.5")
    		.to($projectView, 0.75, {opacity: 1})
    		.to($projects, 0, {height: "auto"})
    		.to($projectEntrance, 0, {display: "none"});
	});

	$projectView.find("#projectImages").hover(function(){
		$(this).find(".image").hover(function() {
			var $projectImage = $(this).attr("data-projectImage");
			$projectView.find("#projectImage").css('background-image', "url(build/images/" + $projectImage + ")");
		});
	}, function() {
		$projectView.find("#projectImage").css('background-image', "url(build/images/proyecto1.jpg)");
	});

	$("#projectImages").find(".image").on('click', function() {
		var $projectImage = $(this).attr("data-projectImage");
		$projectView.find("#projectImage").css('background-image', "url(build/images/" + $projectImage + ")");
	});

	$backButton.on('click', function() {
		var $delay = ( $("#projectName").visible() ? 0 : 0.75);
		var projectExitTimeline = new TimelineLite({delay: $delay});
    	projectExitTimeline
    		.to($projectEntrance, 0, {
    			width: $projectView.find("#projectImage").outerWidth(),
    			top: $projectView.find("#projectImage").offset().top,
    			left: $projectView.find("#projectImage").offset().left,
    			display: "block"
    		})
    		.to($projectView, 0.5, {opacity: 0})
    		.to($projectView, 0, {display: "none"})
    		.to($projectSlider, 0, {display: "block"})
    		.to($projects, 0, {height: "100%"})
    		.to($topBar, 0.5, {height: "20%"})
    		.to($rightBar, 0.5, {width: "10%"}, "-=0.5")
    		.to($bottomBar, 0.5, {height: "10%"}, "-=0.5")
    		.to($leftBar, 0.5, {width: "10%"}, "-=0.5")
    		.to($projectEntrance, 0, {border: "0px"}, "-=0.5")
    		.to($projectEntrance, 0.5, {
    			width: "100%",
    			height: "100vh",
    			top: 0,
    			left: 0,
    		}, "-=0.5")
    		.to($projectSlider, 0, {opacity: 1})
    		.to($leftBar, 0.35, {bottom: "-100%"})
    		.to($bottomBar, 0.35, {right: "-100%"}, "-=0.15")
    		.to($rightBar, 0.35, {top: "-100%"}, "-=0.15")
    		.to($topBar, 0.35, {left: "-100%", onComplete: function() {
    			TweenLite.to($entranceImage, 0.5, {
	    			width: $sliders.find(".active .projectThumbnail").outerWidth(),
    				height: $sliders.find(".active .projectThumbnail").outerHeight(),
    				top: $sliders.find(".active .projectThumbnail").offset().top,
    				left: $sliders.find(".active .projectThumbnail").offset().left,
    				onComplete: function() {
						TweenLite.to($projectEntrance, 0, {display: "none"});
    				}
    			});
    		}}, "-=0.15");
	});
});

