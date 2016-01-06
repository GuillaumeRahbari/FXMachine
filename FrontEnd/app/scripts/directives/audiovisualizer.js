'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:audioVisualizer
 * @description
 * # audioVisualizer
 */
angular.module('frontEndApp')
  .directive('audioVisualizer', function () {
    return {
      restrict: 'A',
        scope: {filter: '=filter', context: '=context'},
        controller: function($scope, $element, $timeout){

    // TODO: STOP HERE. GUIGIU, I NEED YOUR HELP.
            // can't get the onaudioprocess. If we get it, we're good.



            // ********* VISUALISATION. TODO. BETA.
            /*self.visualiseFilters = function()
            {
                var l = machine.filters.length;

                for(var i = 0 ; i < l ; i++) {
                    var analyser = machine.filters[i].analyser;

                    var freqDomain = new Float32Array(analyser.frequencyBinCount);
                    analyser.getFloatFrequencyData(freqDomain);
                }
            }


            self.getFrequencyValue = function (frequency) {
                var nyquist = context.sampleRate/2;
                var index = Math.round(frequency/nyquist * freqDomain.length);
                return freqDomain[index];
            }

*/



            console.log("THE  FILTER : " + $scope.filter.type.toString())
           // console.log("THE  STATE : " +  $scope.test.toString())

            var ctx = $element[0].getContext('2d');

            var t = false;

            // TODO : gerer quand c en POZE pour dessiner un autre truc

            function getAverageVolume(array) {
                var values = 0;
                var average;

                var length = array.length;
                console.log("length" + length)
                // get all the frequency amplitudes
                for (var i = 0; i < length/2; i++) {
                    values += array[i];
                }

                console.log("values" + values)
                average = values / length;
                return average;
            };



            var draw = function()
            {
                // get the average, bincount is fftsize / 2
                var array =  new Uint8Array($scope.filter.analyser.frequencyBinCount);
                $scope.filter.analyser.getByteFrequencyData(array);
                var average = getAverageVolume(array)

                console.log(array)
                // clear the current state
                ctx.clearRect(0, 0, 60, 130);

                // set the fill style
               // ctx.fillStyle=gradient;

                // create the meters
                ctx.fillRect(0,130-average,25,130);

                $timeout(draw, 60)

            };


            draw();


            // draw($scope.filter.analyzer, $scope.context);


            // function init








/* OLD CANVAS FUNNY STUFF


            var ctx = element[0].getContext('2d');

            // variable that decides if something should be drawn on mousemove
            var drawing = false;

            // the last coordinates before the current move
            var lastX;
            var lastY;

            var currentX = 0;
            var currentY = 0;

            element.bind('mousedown', function(event){
                if(event.offsetX!==undefined){
                    lastX = event.offsetX;
                    lastY = event.offsetY;
                } else {
                    lastX = event.layerX - event.currentTarget.offsetLeft;
                    lastY = event.layerY - event.currentTarget.offsetTop;
                }

                // begins new line
                ctx.beginPath();

                drawing = true;
            });
            element.bind('mousemove', function(event){
                if(drawing){
                    // get current mouse position
                    if(event.offsetX!==undefined){
                        currentX = event.offsetX;
                        currentY = event.offsetY;
                    } else {
                        currentX = event.layerX - event.currentTarget.offsetLeft;
                        currentY = event.layerY - event.currentTarget.offsetTop;
                    }

                    draw(lastX, lastY, currentX, currentY);

                    // set current coordinates to last one
                    lastX = currentX;
                    lastY = currentY;
                }

            });
            element.bind('mouseup', function(event){
                // stop drawing
                drawing = false;
            });

            // canvas reset
            function reset(){
                element[0].width = element[0].width;
            }

            function draw(lX, lY, cX, cY){
                // line from
                ctx.moveTo(lX,lY);
                // to
                ctx.lineTo(cX,cY);
                // color
                ctx.strokeStyle = "#4bf";
                // draw it
                ctx.stroke();
            }
            */
        }
    };
  });
