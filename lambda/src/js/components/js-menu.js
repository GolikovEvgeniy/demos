;(function IIFE(window, document, undefined){

  "use strict";

  function extend (target) {
    var sources = Array.prototype.slice.call( arguments, 1 );

    sources.forEach( function(source) {
      if (source === undefined) return;

      Object.keys( source ).forEach( function(key) {
        target[key] = source[key];
      });
    });

    return target;
  }



  function Menu (options) {
    this.settings = extend({
      component: ".js-menu",
      toggle: "data-menu-toggle",
      state: "is-visible"
    }, options );

    this._init();
  }

  Menu.prototype._init = function init() {
    bindEvents.call( this );
  }

  function bindEvents() {
    var components = document.querySelectorAll( this.settings.component );

    Array.prototype.forEach.call( components, function(component) {
      component.addEventListener("click", changeState.bind( this ), false);
      component.addEventListener("focus", changeState.bind( this ), false);
    }, this );
  }

  function changeState(event) {
    var target = event.target;
    var component = target.closest( this.settings.component );

    if (!target.hasAttribute( this.settings.toggle )) return;
    event.preventDefault();

    component.classList.toggle( this.settings.state );


    document.addEventListener("click", closeMenu.bind( this ), false);

    function closeMenu(event) {
      var target = event.target;
      if (target.hasAttribute( this.settings.toggle )) return;

      component.classList.remove( this.settings.state );
      document.removeEventListener("click", closeMenu.bind( this ), false);
    }
  }



  new Menu();

})(window, document);






