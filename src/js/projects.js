$(function() {
	var $projects = $("#proyectos");
	var $slides = $(".carousel-inner .item");
	var $carousel = $("#projectSlider");
	var $projectEntrance = $("#projectEntrance");
	var $topBar = $projectEntrance.find(".top");
	var $rightBar = $projectEntrance.find(".right");
	var $bottomBar = $projectEntrance.find(".bottom");
	var $leftBar = $projectEntrance.find(".left");
	var $projectView = $("#projectView");
	var $backButton = $("#moreProjects");

	var ElementCursor = {
    	cursorElement: "",
    	currentMousePos: { x: -1, y: -1 },
    	setCursor: function (cursorId) {
        	$carousel.find('.item').css({
            	'cursor': 'none',
        	});
        	ElementCursor.cursorElement = cursorId;
        	ElementCursor.updateCursor();
    	},
    	removeCursor: function () {
        	$carousel.find('.item').css({
            	'cursor': ''
        	});
        	ElementCursor.cursorElement = '';
    	},
    	updateCursor: function () {
        	$carousel.find('.item').mousemove(function (e) {
    			ElementCursor.currentMousePos.x = e.pageX;
    			ElementCursor.currentMousePos.y = e.pageY;
            	$('#' + ElementCursor.cursorElement).css({
                	'position': 'fixed',
                	'user-select': 'none',
                	'top': ElementCursor.currentMousePos.y + 2 + 'px',
                	'left': ElementCursor.currentMousePos.x + 2 + 'px'
            	});
        	});
    	}
	};

	$carousel.carousel({
		interval: 10000,
		pause: null
	});

	$carousel.find(".carousel-indicators .active .percentage").animate({'height': '100%'}, 10000, "linear");

	$carousel.bind('slide.bs.carousel', function (e) {
		var $activeItem = $("#" + $(e.relatedTarget).attr("data-sliderId"));
		$activeItem.find(".percentage").css('height', '0px').animate({'height': '100%'}, 10000, "linear");
		$activeItem.prevAll().find(".percentage").stop().css('height', '100%');
		$activeItem.nextAll().find(".percentage").stop().css('height', '0%');
		var $windowWidth = $(window).width();
		$(e.relatedTarget).prev().find(".cursor").hide();
		if(ElementCursor.currentMousePos.x > ($windowWidth/4+30) && ElementCursor.currentMousePos.x < ($windowWidth-$windowWidth/4-30) && ElementCursor.currentMousePos.y > 60) {
			$(e.relatedTarget).find(".cursor").delay(750).slideDown(750).css({
            	'position': 'fixed',
            	'user-select': 'none',
            	'top': ElementCursor.currentMousePos.y + 2 + 'px',
            	'left': ElementCursor.currentMousePos.x + 2 + 'px'
        	});
		}
	});

	$slides.hover(function() {
		$(this).find(".cursor").slideDown(750);
		var cursor = $(this).attr("data-cursorId");
		ElementCursor.setCursor(cursor);
	}, function(){
		$(this).find(".cursor").hide();
		ElementCursor.removeCursor();
	});

	$slides.on('click', function(){
		$(".navbar").removeClass("inPage");
		$(".navbar").addClass("inProject");
		$projectEntrance.css('background-image', "url(build/images/" + $(this).attr("data-imageId") + ".jpg)");
		$projectEntrance.show();
		$carousel.carousel('pause');
		$carousel.hide();
		$topBar.animate({'left': '0px'}, 250);
		$rightBar.delay(150).animate({'top': '0px'}, 250);
		$bottomBar.delay(300).animate({'right': '0px'}, 250);
		$leftBar.delay(450).animate({'bottom': '0px'}, 250, function() {
			$projectView.show();
			$topBar.animate({ 'height' : '0px' }, 500);
			$rightBar.animate({ 'width' : '0px' }, 500);
			$bottomBar.animate({ 'height' : '0px' }, 500);
			$leftBar.animate({ 'width' : '0px' }, 500);
			$projectEntrance.css('border', '5px solid #FFF').animate({
				'width' : $projectView.find("#projectImage").outerWidth() + 'px',
				'height' : '50vh',
				'top' : $projectView.find("#projectImage").offset().top + 'px',
				'left' : $projectView.find("#projectImage").offset().left + 'px',
			}, 500, function() {
				$projects.css('height', 'auto');
				$projectView.animate({ 'opacity' : '1' }, 750, function() {
					$projectEntrance.hide();
				});
			});
		});
	});

	$projectView.find("#projectImages").hover(function(){
		$(this).find(".image").hover(function() {
			var $projectImage = $(this).attr("data-projectImage");
			$projectView.find("#projectImage").css('background-image', "url(build/images/" + $projectImage + ")");
		});
	}, function() {
		$projectView.find("#projectImage").css('background-image', "url(build/images/proyecto1.jpg)");
	});

	$backButton.on('click', function() {
		$projectEntrance.show();
		$projectView.delay(750).animate({ 'opacity' : '0' }, 500, function() {
			$projects.css('height', '100vh');
			$topBar.animate({ 'height' : '10%' }, 500);
			$rightBar.animate({ 'width' : '10%' }, 500);
			$bottomBar.animate({ 'height' : '10%' }, 500);
			$leftBar.animate({ 'width' : '10%' }, 500);
			$projectEntrance.css('border', 'none').animate({
				'width' : '100%',
				'height' : '100%',
				'top' : '0px',
				'left' : '0px',
			}, 500, function() {
				$leftBar.animate({'bottom': '-100%'}, 250);
				$bottomBar.delay(150).animate({'right': '-100%'}, 250);
				$rightBar.delay(300).animate({'top': '-100%'}, 250);
				$topBar.delay(450).animate({'left': '-100%'}, 250, function() {
					$(".navbar").removeClass("inProject");
					$(".navbar").addClass("inPage");
					$carousel.show();
					$carousel.carousel('cycle');
					$carousel.carousel('next');
					$projectEntrance.hide();
				});
			});
		});
	});
});

