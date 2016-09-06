$(function() {
	var $window = $(window);
	var $introImage = $("#introImage");
	var $animatedElements = $(".animate");

	$window.on('scroll', function() {
		var $scrolledY = $(this).scrollTop();
		TweenLite.to($introImage, 0.5, {backgroundPosition : "0% " + $scrolledY * .05 + "%"});
	});
	$(".navbar-brand").on('click', function() {
		$("#main").show();
		var $activeView = $("#main").siblings(".page.active");
		switch ($activeView.attr('id')) {
			case 'proyectos':
				// $("#moreProjects").animate({
				// 	'opacity' : '0',
				// 	// 'bottom' : '25vh'
				// }, 250, function() {
				// });
					$activeView.slideUp(500);
					$(".navbar").removeClass("inPage");
				break;
			case 'arte':
				$activeView.slideUp(500);
				break;
			case 'contacto':
				break;
			case 'default':
				break;
		}
		$(".pageButton").parent(".active").removeClass("active");
	});

	$(".pageButton").on('click', function(e) {
		e.preventDefault();
		var $pageId = $(this).attr('data-page');
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
			case '#proyectos':
				break;
			case '#arte':
				// if ($("#arte").hasClass("active") === false) {
					TweenMax.staggerFrom($("#arte .tile"), 0.3, {scale: 0, borderRadius: 100, opacity: 0, delay : 0.3}, 0.15)
				// }
				break;
			case '#contacto':
				break;
			case 'default':
				break;
		}
	});
	
  	$('.fancyButton').on('mouseenter', function(e) {
		var parentOffset = $(this).offset(),
      	relX = e.pageX - parentOffset.left,
      	relY = e.pageY - parentOffset.top;
		$(this).find('span').css({top:relY, left:relX})
    }).on('mouseout', function(e) {
		var parentOffset = $(this).offset(),
      	relX = e.pageX - parentOffset.left,
      	relY = e.pageY - parentOffset.top;
    	$(this).find('span').css({top:relY, left:relX})
    });

	$(".tile").hover(function(){
		if ($window.width() > 768) {
			var moveUp = $(this).find(".details").outerHeight(true);
			TweenLite.to($(this).find(".details"), 0.4, {y : -moveUp, ease : Power4.easeOut});
			TweenLite.to($(this).find(".background"), 0.4, {y : "-15%", ease : Power4.easeOut});
		}
	}, function() {
		TweenLite.to($(this).find(".details"), 0.4, {y : 0});
		TweenLite.to($(this).find(".background"), 0.4, {y : "0%"});
	});

    $('.navigator').on('click', function (event) {
        var target = $($(this).attr('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 750);
        }
    });


    $window.on('scroll', function() {
		var $windowPosition = $(this).scrollTop() +  $(this).height();
		$animatedElements.each(function() {
    		if ($windowPosition > $(this).offset().top && $(this).hasClass("animate")) {
    			$(this).removeClass("animate");
				TweenLite.from($(this), 1, jQuery.parseJSON($(this).attr("data-animation")));
    		}
		})
	});


});
