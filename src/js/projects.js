$(function() {
	var $projects = $("#proyectos");
	var $carousel = $("#projectSlider");
	var $indicators = $(".carousel-indicators");
	var $sliders = $(".carousel-indicators li");
	var $slides = $(".carousel-inner .item");
	var $snippets = $("#projectSnippets");
	var $slideInterval = 10000;
	var $projectEntrance = $("#projectEntrance");
	var $topBar = $projectEntrance.find(".top");
	var $rightBar = $projectEntrance.find(".right");
	var $bottomBar = $projectEntrance.find(".bottom");
	var $leftBar = $projectEntrance.find(".left");
	var $projectView = $("#projectView");
	var $backButton = $("#moreProjects");

	$carousel
		.carousel({
			interval: $slideInterval,
			pause: null
		})
		.find(".carousel-indicators .active .percentage")
		.animate({
			'height': '100%'
		}, $slideInterval, "linear");

	$indicators.hover(function(){
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

	$carousel.bind('slide.bs.carousel', function (e) {
		var $activeSlider = $("#" + $(e.relatedTarget).attr("data-sliderId"));
		var $activeSnippet = $("#" + $(e.relatedTarget).attr("data-snippetId"));
		$activeSlider.find(".percentage").css('height', '0px').animate({'height': '100%'}, $slideInterval, "linear");
		$activeSlider.prevAll().find(".percentage").stop().css('height', '100%');
		$activeSlider.nextAll().find(".percentage").stop().css('height', '0%');
		if ($indicators.hasClass("hovered") == false) {
			$activeSnippet.addClass("active");
			$activeSnippet.siblings().removeClass("active");
		}
	});

	$slides.on('click', function(){
		$(".navbar").removeClass("inPage");
		$(".navbar").addClass("inProject");
		$projectEntrance.css('background-image', "url(build/images/" + $(this).attr("data-imageId") + ".jpg)");
		$carousel.carousel('pause');
		var projectEntranceTimeline = new TimelineLite();
    	projectEntranceTimeline
    		.to($projectEntrance, 0, {display: "block"})
    		.to($carousel, 0, {display: "none"})
    		.to($topBar, 0.35, {left: 0})
    		.to($rightBar, 0.35, {top: 0}, "-=0.15")
    		.to($bottomBar, 0.35, {right: 0}, "-=0.15")
    		.to($leftBar, 0.35, {bottom: 0}, "-=0.15")
    		.to($topBar, 0.5, {height: 0})
    		.to($rightBar, 0.5, {width: 0}, "-=0.5")
    		.to($bottomBar, 0.5, {height: 0}, "-=0.5")
    		.to($leftBar, 0.5, {width: 0}, "-=0.5")
    		.to($projectEntrance, 0, {border: "5px solid #171717"}, "-=0.5")
    		.to($projectEntrance, 0.5, {
    			width: $projectView.find("#projectImage").outerWidth(),
    			height: "50vh",
    			top: $projectView.find("#projectImage").offset().top,
    			left: $projectView.find("#projectImage").offset().left,
    		}, "-=0.5")
    		.to($projects, 0, {height: "auto"})
    		.to($projectView, 0.75, {opacity: 1})
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
    		.to($projects, 0, {height: "100%"})
    		.to($topBar, 0.5, {height: "80px"})
    		.to($rightBar, 0.5, {width: "10%"}, "-=0.5")
    		.to($bottomBar, 0.5, {height: "80px"}, "-=0.5")
    		.to($leftBar, 0.5, {width: "10%"}, "-=0.5")
    		.to($projectEntrance, 0, {border: "0px"}, "-=0.5")
    		.to($projectEntrance, 0.5, {
    			width: "100%",
    			height: "100%",
    			top: 0,
    			left: 0,
    		}, "-=0.5")
    		.to($leftBar, 0.35, {bottom: "-100%"})
    		.to($bottomBar, 0.35, {right: "-100%"}, "-=0.15")
    		.to($rightBar, 0.35, {top: "-100%"}, "-=0.15")
    		.to($topBar, 0.35, {left: "-100%", onComplete: function() {
    			$(".navbar").removeClass("inProject");
				$(".navbar").addClass("inPage");
				$carousel.carousel('cycle');
				$carousel.carousel('next');
    		}}, "-=0.15")
    		.to($carousel, 0, {display: "block"}, "-=0.25")
    		.to($projectEntrance, 0, {display: "none"});
	});
});

