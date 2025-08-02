/**
 * Flickity fade v2.0.0
 * Fade between Flickity slides
 */

( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        require('flickity'),
        require('fizzy-ui-utils'),
    );
  } else {
    // browser global
    factory(
        window.Flickity,
        window.fizzyUIUtils,
    );
  }

}( typeof window != 'undefined' ? window : this, function factory( Flickity, utils ) {

// ---- Slide ---- //

let Slide = Flickity.Slide;

Slide.prototype.renderFadePosition = function() {
};

Slide.prototype.setOpacity = function( alpha ) {
  this.cells.forEach( ( cell ) => {
    cell.element.style.opacity = alpha;
  } );
};

// ---- Flickity ---- //

Flickity.create.fade = function() {
  this.fadeIndex = this.selectedIndex;
  this.prevSelectedIndex = this.selectedIndex;
  this.on( 'select', this.onSelectFade );
  this.on( 'dragEnd', this.onDragEndFade );
  this.on( 'settle', this.onSettleFade );
  this.on( 'activate', this.onActivateFade );
  this.on( 'deactivate', this.onDeactivateFade );
};

let proto = Flickity.prototype;

let updateSlides = proto.updateSlides;
proto.updateSlides = function() {
  updateSlides.apply( this, arguments );
  if ( !this.options.fade ) return;

  this.slides.forEach( ( slide, i ) => {
    // position cells at selected target
    let slideTargetX = slide.target - slide.x;
    let firstCellX = slide.cells[0].x;
    slide.cells.forEach( ( cell ) => {
      let targetX = cell.x - firstCellX - slideTargetX;
      this._renderCellPosition( cell, targetX );
    } );
    // set initial opacity
    let alpha = i === this.selectedIndex ? 1 : 0;
    slide.setOpacity( alpha );
  } );
};

/* ---- events ---- */

proto.onSelectFade = function() {
  // in case of resize, keep fadeIndex within current count
  this.fadeIndex = Math.min( this.prevSelectedIndex, this.slides.length - 1 );
  this.prevSelectedIndex = this.selectedIndex;
};

proto.onSettleFade = function() {
  delete this.didDragEnd;
  if ( !this.options.fade ) return;

  // set full and 0 opacity on selected & faded slides
  this.selectedSlide.setOpacity( 1 );
  let fadedSlide = this.slides[ this.fadeIndex ];
  if ( fadedSlide && this.fadeIndex !== this.selectedIndex ) {
    this.slides[ this.fadeIndex ].setOpacity( 0 );
  }
};

proto.onDragEndFade = function() {
  // set flag
  this.didDragEnd = true;
};

proto.onActivateFade = function() {
  if ( this.options.fade ) {
    this.element.classList.add('is-fade');
  }
};

proto.onDeactivateFade = function() {
  if ( !this.options.fade ) return;

  this.element.classList.remove('is-fade');
  // reset opacity
  this.slides.forEach( ( slide ) => {
    slide.setOpacity('');
  } );
};

/* ---- position & fading ---- */

let positionSlider = proto.positionSlider;
proto.positionSlider = function() {
  if ( !this.options.fade ) {
    positionSlider.apply( this, arguments );
    return;
  }

  this.fadeSlides();
  this.dispatchScrollEvent();
};

let positionSliderAtSelected = proto.positionSliderAtSelected;
proto.positionSliderAtSelected = function() {
  if ( this.options.fade ) {
    // position fade slider at origin
    this.setTranslateX( 0 );
  }
  positionSliderAtSelected.apply( this, arguments );
};

proto.fadeSlides = function() {
  if ( this.slides.length < 2 ) return;

  // get slides to fade-in & fade-out
  let indexes = this.getFadeIndexes();
  let fadeSlideA = this.slides[ indexes.a ];
  let fadeSlideB = this.slides[ indexes.b ];
  let distance = this.wrapDifference( fadeSlideA.target, fadeSlideB.target );
  let progress = this.wrapDifference( fadeSlideA.target, -this.x );
  progress /= distance;

  fadeSlideA.setOpacity( 1 - progress );
  fadeSlideB.setOpacity( progress );

  // hide previous slide
  let fadeHideIndex = indexes.a;
  if ( this.isDragging ) {
    fadeHideIndex = progress > 0.5 ? indexes.a : indexes.b;
  }
  let isNewHideIndex = this.fadeHideIndex !== undefined &&
    this.fadeHideIndex !== fadeHideIndex &&
    this.fadeHideIndex !== indexes.a &&
    this.fadeHideIndex !== indexes.b;
  if ( isNewHideIndex ) {
    // new fadeHideSlide set, hide previous
    this.slides[ this.fadeHideIndex ].setOpacity( 0 );
  }
  this.fadeHideIndex = fadeHideIndex;
};

proto.getFadeIndexes = function() {
  if ( !this.isDragging && !this.didDragEnd ) {
    return {
      a: this.fadeIndex,
      b: this.selectedIndex,
    };
  }
  if ( this.options.wrapAround ) {
    return this.getFadeDragWrapIndexes();
  } else {
    return this.getFadeDragLimitIndexes();
  }
};

proto.getFadeDragWrapIndexes = function() {
  let distances = this.slides.map( function( slide, i ) {
    return this.getSlideDistance( -this.x, i );
  }, this );
  let absDistances = distances.map( function( distance ) {
    return Math.abs( distance );
  } );
  let minDistance = Math.min( ...absDistances );
  let closestIndex = absDistances.indexOf( minDistance );
  let distance = distances[ closestIndex ];
  let len = this.slides.length;

  let delta = distance >= 0 ? 1 : -1;
  return {
    a: closestIndex,
    b: utils.modulo( closestIndex + delta, len ),
  };
};

proto.getFadeDragLimitIndexes = function() {
  // calculate closest previous slide
  let dragIndex = 0;
  for ( let i = 0; i < this.slides.length - 1; i++ ) {
    let slide = this.slides[i];
    if ( -this.x < slide.target ) {
      break;
    }
    dragIndex = i;
  }
  return {
    a: dragIndex,
    b: dragIndex + 1,
  };
};

proto.wrapDifference = function( a, b ) {
  let diff = b - a;
  if ( !this.options.wrapAround ) return diff;

  let diffPlus = diff + this.slideableWidth;
  let diffMinus = diff - this.slideableWidth;
  if ( Math.abs( diffPlus ) < Math.abs( diff ) ) {
    diff = diffPlus;
  }
  if ( Math.abs( diffMinus ) < Math.abs( diff ) ) {
    diff = diffMinus;
  }
  return diff;
};

// ---- wrapAround ---- //

let _updateWrapShiftCells = proto._updateWrapShiftCells;
proto._updateWrapShiftCells = function() {
  if ( this.options.fade ) {
    // update isWrapping
    this.isWrapping = this.getIsWrapping();
  } else {
    _updateWrapShiftCells.apply( this, arguments );
  }
};

let shiftWrapCells = proto.shiftWrapCells;
proto.shiftWrapCells = function() {
  if ( !this.options.fade ) {
    shiftWrapCells.apply( this, arguments );
  }
};

return Flickity;

} ) );
