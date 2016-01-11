'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:signalVisualiser
 * @description
 * # signalVisualiser
 */
angular.module('frontEndApp')
  .directive('signalVisualiser', function () {
    return {
      restrict: 'A',
      scope : {analyserNode :'='},
      controller: function($scope, $element, $timeout){

          console.log("coucou")

        // The canvas context, used to draw stuff in the canvas
        var ctx = $element[0].getContext('2d');

          var canvasWidth = ctx.canvas.width;
          var canvasHeight = ctx.canvas.height;

          // STYLE ELEMENTS
          var backgroundFillStyle = 'rgb(230, 230, 230)';
          var frequencyLineStyle = 'rgb(255, 100, 100)';


        // gradient element for the meter
        var meterColor = ctx.createLinearGradient(0,0,0,10);
        // Saturation value
        meterColor.addColorStop(0,"red");
        // Normal value
        meterColor.addColorStop(1,'rgb(42, 140, 252)');
        var backgroundColor = 'rgb(230, 230, 230)';


        /**
         * The main rendering loop for a audiovisualizer
         */
        var draw = function()
        {
          //console.log("draw");
          // Getting array of all frequency values
          var array =  new Uint8Array($scope.analyserNode.frequencyBinCount);
          // Utile.. pourquoi je sais pas encore
          $scope.analyserNode.getByteTimeDomainData(array);


            console.log("draw");
            //console.log("data"+array);
            // ** Cleaning background
            ctx.fillStyle = backgroundFillStyle;
            ctx.fillRect(0,0,canvasWidth,canvasHeight);

            var widthDrawStep = canvasWidth / array.length;

            // console.log("frequencyhArray length" + frequencyArray.length);

            //** Drawing disto response line
            ctx.strokeStyle = frequencyLineStyle;
            ctx.fillStyle = frequencyLineStyle;
            ctx.lineWidth=2;
            ctx.beginPath();
            ctx.moveTo(0,canvasHeight/2);

            //   console.log("curve" + curve);
            for(var i = 0; i <= array.length-1;i++)
            {
                
                var meterHeight = array[i]*(canvasHeight/2) / 128;
                ctx.lineTo(i*widthDrawStep,  meterHeight);
            }
            ctx.stroke();

          // Re-looping
          $timeout(draw, 60)

        };

        draw();



      }
    };

    });
