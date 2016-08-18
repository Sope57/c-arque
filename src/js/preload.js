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

$(window).on('load', function() {
    $top.css({
        'left' : ($width/2)+77 + 'px'
    });
    $top.animate({ 
        'top' : ($height/2)-100 + 'px',
        'height' : '200px' 
    }, 500);
    $right.css({
        'top' : ($height/2)+77 + 'px'
    });
    $right.delay(150).animate({ 
        'right' : ($width/2)-100 + 'px',
        'width' : '200px' 
    }, 500);
    $bottom.css({
        'left' : ($width/2)-100 + 'px'
    });
    $bottom.delay(300).animate({ 
        'bottom' : ($height/2)-100 + 'px',
        'height' : '200px' 
    }, 500);
    $left.css({
        'top' : ($height/2)-100 + 'px'
    });
    $left.delay(550).animate({ 
        'left' : ($width/2)-100 + 'px',
        'width' : '200px' 
    }, 500, function(){
        $preloadImg.fadeIn(1000, function(){
            $top.hide();
            $right.hide();
            $bottom.hide();
            $left.hide();
            $preloadImg.animate({
                'width' : '40px',
                'height' : '40px'
            }, 1000);
            $preload.animate({
                'width' : '70px',
                'height' : '50px'
            }, 1000, function() {
                $app.fadeIn(1000, function() {
                    $preload.hide();
                });
            });
        });
    });
});