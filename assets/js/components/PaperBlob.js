/* eslint-disable */

// Sensitive Bacterium
// using the Paperjs library
// http://paperjs.org
//
// Made by BASICS09
// http://basics09.de
//
// For MicroHuman 
// http://micro-human.org

var mypaper;

function fitPaperWraps() {
  mypaper.fit();
}

$(window).on('resize', function() {

  waitForFinalEvent(function(){
    
    fitPaperWraps();

  }, 50, "resizing-papers");

});

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

function PaperWrap( canvasElement ) {

  var mypaper = new paper.PaperScope();
  mypaper.setup( canvasElement );

  var view = mypaper.view,
    Point = mypaper.Point,
    Path = mypaper.Path,
    Group = mypaper.Group;

  // adjustable variables
  var mouseForce = 0.05;

  // other variables
  var mousePoint = new Point(-1000, -1000);

  function Bacterium(center, size, color) {
    this.build(center, size, color);
  }

  Bacterium.prototype = {
    build: function(center, radius, color) {
      var padding = Math.min(view.size.width, view.size.height) * 0.2;
      var timeScale = 1;
      var maxWidth = view.size.width - padding * 2;
      var maxHeight = view.size.height - padding * 2;
      var w = maxWidth * timeScale;
      var h = maxHeight * timeScale;

      this.fitRect = new Path.Rectangle({
        point: [view.size.width / 2 - w / 2, view.size.height / 2 - h / 2],
        size: [w, h]
      });

      this.circlePath = new Path.Circle(center, radius);

      this.group = new Group([this.circlePath]);
      //this.group.strokeColor = "black";
      this.group.position = view.center;

      this.circlePath.fillColor = color;
      this.circlePath.fullySelected = false;
      
      // Mausdistanz
      this.threshold = radius * 1.4;
      this.center = center;

      // Elemente hinzufügen
      this.circlePath.flatten(radius * 1.5);
      // wieder zum Kreis machen
      this.circlePath.smooth();
      // einpassen in das fitRect
      this.circlePath.fitBounds( this.fitRect.bounds );

      // control circle erstellen, auf den die einzelnen Punkte später zurückgreifen können
      this.controlCircle = this.circlePath.clone();
      this.controlCircle.fullySelected = false;
      this.controlCircle.visible = false;

      var rotationMultiplicator = radius / 200;

      // Settings pro segment
      this.settings = [];
      for( var i = 0; i < this.circlePath.segments.length; i++ ) {
        var segment = this.circlePath.segments[i];
        this.settings[i] = {
          relativeX: segment.point.x - this.center.x,
          relativeY: segment.point.y - this.center.y,
          offsetX: rotationMultiplicator,
          offsetY: rotationMultiplicator,
          momentum: new Point(0,0)
        };
      }
    },
    clear: function() {
      this.circlePath.remove();
      this.fitRect.remove();
    },
    animate: function(event) {
      
      this.group.rotate(-0.2, view.center);

      for( var i = 0; i < this.circlePath.segments.length; i++ ) {
        var segment = this.circlePath.segments[i];

        var settings = this.settings[i];
        var controlPoint = new Point(
          //settings.relativeX + this.center.x,
          //settings.relativeY + this.center.y
        );
        controlPoint = this.controlCircle.segments[i].point;

        // Avoid the mouse
        var mouseOffset = mousePoint.subtract(controlPoint);
        var mouseDistance = mousePoint.getDistance( controlPoint );
        var newDistance = 0;

        if( mouseDistance < this.threshold ) {
          newDistance = (mouseDistance - this.threshold) * mouseForce;
        }

        var newOffset = new Point(0, 0);
        if(mouseDistance !== 0){
          newOffset = new Point(mouseOffset.x / mouseDistance * newDistance, mouseOffset.y / mouseDistance * newDistance);
        }
        var newPosition = controlPoint.add( newOffset );

        var distanceToNewPosition = segment.point.subtract( newPosition );

        var momentumDelta = 0.001;

        settings.momentum = settings.momentum.subtract( distanceToNewPosition.divide( momentumDelta ) );
        settings.momentum = settings.momentum.multiply( momentumDelta / 10 );
        
        // Add automatic rotation        
        var amountX = settings.offsetX;
        var amountY = settings.offsetY;
        
        var sinus = Math.sin(event.time + i*2);
        var cos =  Math.cos(event.time + i*2);

        settings.momentum = settings.momentum.add( new Point(cos * -amountX, sinus * -amountY) );
        
        // go to the point, now!
        segment.point = segment.point.add( settings.momentum );

      }
    }
  };

  var radius = Math.min( view.size.width, view.size.height) / 2 * 0.7;  
  var bacterium = new Bacterium( new Point( 0, 0), radius, OAX.template.colors.blue_1 );

  view.onFrame = function(event) {
    bacterium.animate(event);
  };

  var tool = new mypaper.Tool();
  tool.onMouseMove = function(event) {
    mousePoint = event.lastPoint;
  };

  var fit = this.fit = function() {
    var $canvas = $( view.element );

    var canvasWidth = $canvas.width();
    var canvasHeight = $canvas.height();

    $canvas
      .attr("width", canvasWidth)
      .attr("height", canvasHeight);
    
    mypaper.view.viewSize = new mypaper.Size( canvasWidth, canvasHeight);

  };

  function redrawBacterium() {

    // overwrite the global paper object with the local one
    paper = mypaper;

    radius = Math.min( view.size.width, view.size.height ) / 2;
    radius = Math.floor( radius * 0.7 );

    bacterium.clear();
    bacterium = null;
    bacterium = new Bacterium( view.bounds.center, radius, OAX.template.colors.blue_1);
  }
  
  view.onResize = function(event) {
    redrawBacterium();
  };
}

export default class PaperBlob {
  constructor( settings ){
		const defaults = {
      canvas : $('#bacterium')[0]
    };
		this.options = Object.assign( defaults, settings );    
    mypaper = new PaperWrap( this.options.canvas );
  }
}