$(function() {
	var $introImage = $("#introImage");
	var $window = $(window);

	$window.on('scroll', function() {
		var $scrolledY = $(this).scrollTop();
		$introImage.css('background-position', '0% ' + $scrolledY * .05 + '%');
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
			switch ($pageId) {
				case '#proyectos':
					// $("#moreProjects").animate({
					// 	'opacity' : '1',
					// 	// 'bottom' : '15vh'
					// }, 750);
					break;
				case '#arte':
					break;
				case '#contacto':
					break;
				case 'default':
					break;
			}
			$($pageId).siblings(".page").hide();
		});
		$($pageId).siblings(".active").removeClass("active");
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
		var moveUp = $(this).find(".details").outerHeight(true);
		$(this).find(".details").css('transform', 'translateY(-' + moveUp + 'px)');
	}, function() {
		$(this).find(".details").css('transform', 'translateY(0px)');
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

});
