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
    var preloadTimeline = new TimelineLite({delay : 0.25});
    preloadTimeline.to($top, 0, {left : ($width/2)+77})
        .to($right, 0, {top : ($height/2)+77})
        .to($bottom, 0, {left : ($width/2)-100})
        .to($left, 0, {top : ($height/2)-100})
        .to($top, 0.75, {top : ($height/2)-100, height : 200, ease: Power3.easeOut})
        .to($right, 0.75, {right : ($width/2)-100, width : 200, ease: Power3.easeOut}, "-=0.5")
        .to($bottom, 0.75, {bottom : ($height/2)-101, height : 200, ease: Power3.easeOut}, "-=0.5")
        .to($left, 0.75, {left : ($width/2)-100, width : 200, ease: Power3.easeOut}, "-=0.5")
        .to($preloadImg, 1.5, {opacity : 1})
        .to($top, 0, {display : "none"})
        .to($right, 0, {display : "none"})
        .to($bottom, 0, {display : "none"})
        .to($left, 0, {display : "none"})
        .to($preloadImg, 1, {width : 60, height : 60})
        .to($preload, 1, {width : 90, height : 80}, "-=1")
        .to($app, 1, {display : "block", opacity: 1})
        .to($body, 0, {backgroundColor : "#FFF"})
        .to($preload, 0, {display : "none"});
});