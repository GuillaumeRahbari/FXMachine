'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:waveformVisualiser
 * Directive to visualise a waveform (has to be in a CANVAS element)
 * @description
 * # waveformVisualiser
 */
angular.module('frontEndApp')
  .directive('waveformVisualiser', function () {
    return {
        restrict: 'A',
        scope: {buffer: '='},
      controller: function ($scope, $element, $timeout) {



        // The canvas context, used to draw stuff in the canvas
        var ctx = $element[0].getContext('2d');


          // FUCK YEAH
          var canvasWidth = ctx.canvas.width;//100;//$element.width;
          var canvasHeight = ctx.canvas.height;//100;//$element.height;

        // STYLE ELEMENTS
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgb(42, 140, 252)';
          ctx.fillStyle = 'rgb(230, 230, 230)';


        /**
         * The main rendering loop for a drawing the waveform
         */
        var draw = function()
        {
           // If buffer has been initialized already
            if($scope.buffer != null)
            {
                // Cleaning the canvas
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);

                // Waveform style
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);


                // Starting the drawing of a line
                ctx.beginPath();


                // Pixel size between two points
                // We draw this one quite rarely, so we can have a very precise step
                var sliceWidth = 0.01;

                var x = 0;

                // Getting a buffer channel (0 should always be available, coz there's at least one channel
                var bufferData = $scope.buffer.getChannelData(0);

                /*
                console.log("buffer number of channels" +$scope.buffer.numberOfChannels);
                console.log("bufferData element" +bufferData[800000]);
                console.log("euhh" + bufferData[80000]*100)
                console.log("bufferData length" +bufferData.length);
                */


                // step index to loop on the bufferData array
                // chosen to have the full track inside the canvas
                var bufferDataStep = parseInt( bufferData.length*sliceWidth / ctx.canvas.width );

                //console.log("bufferData index step" + bufferDataStep)
var final_i = 0;

                for(var i = 0; i < bufferData.length; i+= parseInt(bufferDataStep) ) {

// Quand j'arrive au bout de mon canvas, j'ai pas la fin de ma musique.


                    // values between -1 and 1. We reput them between [-canvasHeight/2 ; canvasHeight/2]
                    var v = (bufferData[i])*ctx.canvas.height/2;
                    // "zero" point in the middle of the canvas
                    var y = ctx.canvas.height/2 + v;

                    // drawing "zero" point
                    if(i == 0) {
                        ctx.moveTo(x, ctx.canvas.height/2);

                    } else {
                        ctx.lineTo(x,y)
                    }

                    x += sliceWidth;
                    final_i = i;
                }
                console.log("last real index" + bufferData.length)
                console.log("final index drawn" + final_i )
                ctx.stroke();
            }
        };


        // First call to draw
        draw();


            /*
            Watching for a buffer change (like a new sound has been loaded
             */
          $scope.$watch('buffer', function(newValue)
          {
            console.log("waveformVisualiser : detected change in buffer !");
              draw();
          });
      }
    };
  });
