;(function IIFE(window, document, undefined){
  
  "use strict";

  /**
    * Object extension helper
    */
  function extend(target) {
    //taking array of objects
    var sources = Array.prototype.slice.call( arguments, 1 );

    //looping through array
    sources.forEach( function(source) {
      if (source === undefined) return;
      
      //for each source object assign it's properties to target object
      Object.keys( source ).forEach( function(key) {
        target[key] = source[key];
      });
    });

    return target;
  }//end extend



  /**
    * Sorting component constructor
    */
  function Sorting(options) {
    this.settings = extend( {}, this.defaults, options );
    this._init();
  }

  //default settings
  Sorting.prototype.defaults = {
    component: ".js-sorting",
    link: "data-sorting-link",
    item: "data-sorting-item",
    linkState: "is-active",
    itemState: "is-hidden"
  };

  Sorting.prototype._init = function init() {
    bindEvents.call( this );
  };

  function bindEvents() {
    //caching components with same names
    var components = document.querySelectorAll( this.settings.component );

    // looping through components
    Array.prototype.forEach.call( components, function(component) {
      //attaching listeners to each component
      component.addEventListener( "click", clickHandler.bind( this ));
    }, this );//setting proper context of this
  }

  function clickHandler(event) {
    var target = event.target;

    changeLinksState.call( this, target );
    changeItemsState.call( this, target );

  }

  function changeLinksState(target) {
    //check if event target has not proper attribute
    if (!target.hasAttribute( this.settings.link )) return;

    var links = target.parentNode.children;
    Array.prototype.forEach.call( links, function(link) {
      link.classList.remove( this.settings.linkState );
    }, this );

    target.classList.add( this.settings.linkState );
  }

  function changeItemsState(target) {
    //check if event target has not proper attribute
    if (!target.hasAttribute( this.settings.link )) return;

    var currentState = target.getAttribute( this.settings.link );
    var component = target.closest( this.settings.component );
    var componentItems = component.querySelectorAll("[" + this.settings.item + "]");

    Array.prototype.forEach.call( componentItems, function(item) {
      item.classList.add( this.settings.itemState );

      //check if item contains required attribute
      if (item.getAttribute( this.settings.item ).indexOf(currentState) === 0) {
        item.classList.remove( this.settings.itemState );

      } else if (item.getAttribute( this.settings.item ).indexOf(currentState) > 0) {

        item.classList.remove( this.settings.itemState );
      }

    }, this );

  }


  //add component to global scope
  window.Sorting = Sorting;

})(window, document);
;new Sorting();