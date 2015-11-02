;(function() {
  var wow = new WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 150
  });
  wow.init();
}());

(function() {
  document.addEventListener("DOMContentLoaded", function() {
    "use strict";

    var links = document.querySelectorAll(".page-intro__button");
    var i = links.length;
    var root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body;
    var easeInOutCubic = function(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t + b
      return c/2*((t-=2)*t*t + 2) + b
    };

    while (i--) 
      links.item(i).addEventListener("click", function(e) {
        var startTime;
        var startPos = root.scrollTop;
        var endPos = document.getElementById(/[^#]+$/.exec(this.href)[0]).getBoundingClientRect().top;
        var maxScroll = root.scrollHeight - window.innerHeight;
        var scrollEndValue = startPos + endPos < maxScroll ? endPos : maxScroll - startPos;
        var duration = 1100;
        var scroll = function(timestamp) {
          startTime = startTime || timestamp
          var elapsed = timestamp - startTime;
          var progress = easeInOutCubic(elapsed, startPos, scrollEndValue, duration);
          root.scrollTop = progress;
          elapsed < duration && requestAnimationFrame(scroll);
        }   
        requestAnimationFrame(scroll);
        e.preventDefault();
      }) 
  });
}());

(function() {
  "use strict";

  var items = document.querySelectorAll('.my-work__gallery-item');

  animate(items);

  each(".my-work__filter-item a", function(el) {
    el.addEventListener('click', function(e) {
      each(".my-work__filter-item a", function(elem) {
        elem.classList.remove("active");
      });
      this.classList.add("active");
      e.preventDefault();
      filterLinks(el);
    });
  });

  function filterLinks(element) {
    var el = element.dataset.id;
    var linksTolowerCase = el.toLowerCase();
    
    if (el === 'all') {

      each('.view', function(e) {
        e.classList.remove('view');
      });

      animate(items);

    } else {
      
      each('.view', function(e) {
        e.classList.remove('view');
      });
    }
    
    animate(document.querySelectorAll('.' + linksTolowerCase));
  };
  
  function each(el, callback) {
    var allDivs = document.querySelectorAll(el),
      alltoArr = Array.prototype.slice.call(allDivs);
    Array.prototype.forEach.call(alltoArr, function(selector, index) {
      if (callback) return callback(selector);
    });
  };
  
  function animate(item) {
    (function show(counter) {
        setTimeout(function() {
        item[counter].classList.add('view');
        counter++;
        if (counter < item.length) show(counter);
      }, 100);
    })(0);
  };
}());

