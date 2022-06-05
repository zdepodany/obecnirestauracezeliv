// Slick Slider for BG
$(document).ready(function () {
  $(".welcomeSlideshow").slick({
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 2000,
    fade: true,
    cssEase: "linear",
    arrows: false,
    draggable: false,
  });
});

// Slick Slider for quotes
$(document).ready(function () {
  $(".quoteSlider").slick({
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 2000,
    arrows: false,
    draggable: true,
  });
});
