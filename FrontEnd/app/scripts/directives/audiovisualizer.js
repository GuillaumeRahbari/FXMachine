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
        link: function(scope, element){




            var self = this;

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

            // setup a javascript node
            var javascriptNode = context.createScriptProcessor(2048, 1, 1);















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
