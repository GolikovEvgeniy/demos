;(function() {

  var iphoneScreen = document.querySelector(".screen");
  //controlls
  var arrowLeft = document.querySelector(".picture-switcher__arrow--left");
  var arrowRight = document.querySelector(".picture-switcher__arrow--right");
  //actual picture number
  var actualPicture = document.querySelector(".picture-switcher__number--actual");

  var backgrounds = [
    "#009688",
    "#f44336",
    "#cddc39",
    "#ff9800",
    "#607d8b"
  ];

  function updateBackground(image, condition) {
    var currentNumber = parseInt(image.innerHTML);

    if(condition) {
      if(currentNumber >= 5) currentNumber = 0;
      currentNumber++;
    } else {
      if(currentNumber <= 1) currentNumber = 6;
      currentNumber--;
    }

    image.innerHTML = "0" + currentNumber;
    iphoneScreen.style.background = backgrounds[currentNumber - 1];
  }

  arrowRight.addEventListener("click", function(event) {
    event.preventDefault();
    updateBackground(actualPicture, true);
  });

  arrowLeft.addEventListener("click", function(event) {
    event.preventDefault();
    updateBackground(actualPicture, false);
  });
  
}());

(function() {
  //container
  var slider = document.querySelector(".community__slider-inner");
  //collection of slides
  var slides = slider.querySelectorAll(".community__slider-item");

  //controls
  var arrowLeft = document.querySelector(".community__slider-controls-arrow--left");
  var arrowRight = document.querySelector(".community__slider-controls-arrow--right");

  arrowRight.addEventListener("click", function(event) {
    event.preventDefault();

    var nextSlide = slider.firstElementChild;
    slider.appendChild(nextSlide);

  });

  arrowLeft.addEventListener("click", function(event) {
    event.preventDefault();

    var prevSlide = slider.lastElementChild;
    slider.insertBefore(prevSlide, slider.firstElementChild);

  });


}());
