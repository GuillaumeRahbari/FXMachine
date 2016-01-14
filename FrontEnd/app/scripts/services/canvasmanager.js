'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.canvasManager
 * @description
 * # canvasManager
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
    .service('canvasManager', function () {

        var backgroundColor = 'rgb(58, 58, 58)';
        var lineColor_primary = 'rgb(240, 240, 240)';
        var lineColor_secondary = 'rgb(255, 58, 85)';
        var lineColor_third = 'rgb(118, 255, 68)';

        var textColor_primary = 'rgba(255,255,255,0.7)';

        var gridColor = 'rgba(145, 145, 145, 0.3)';

        var meterColor_low = 'rgb(30, 119, 7)';
        var meterColor_high = 'rgb(177, 239, 5)';
        var meterColor_saturated = 'red';





        return {

            /**
             * This function draws the background.
             * @param {AudioContext} context - The web audio context.
             */
            drawBackground: function (context) {

                context.fillStyle = backgroundColor;
                context.fillRect(0,0,context.canvas.width, context.canvas.height);

            },

            /**
             * This function defines the style of the primary line.
             * @param {AudioContext} context - The web audio context.
             */
            setPrimaryLineStyle: function (context) {

                context.fillStyle = lineColor_primary;
                context.strokeStyle = lineColor_primary;

            },

            /**
             * This function defines the style of the secondary line.
             * @param {AudioContext} context - The web audio context.
             */
            setSecondaryLineStyle: function (context) {

                context.fillStyle = lineColor_secondary;
                context.strokeStyle = lineColor_secondary;

            },

            /**
             * This function defines the style of the third line.
             * @param {AudioContext} context - The web audio context.
             */
            setThirdLineStyle: function (context) {

                context.fillStyle = lineColor_third;
                context.strokeStyle = lineColor_third;

            },

            /**
             * This function defines the color text.
             * @param {AudioContext} context - The web audio context.
             */
            setTextColorStyle: function(context){
                context.fillStyle = textColor_primary;
                context.strokeStyle = textColor_primary;

            },

            /**
             * This function defines the color meter.
             * @param {AudioContext} context - The web audio context.
             * @param {String} orientation - The vertical or horizontal orientation.
             */
            setMeterColor: function(context, orientation)
            {
                var meterColor;
                if(orientation ==='vertical')
                {
                    meterColor = context.createLinearGradient(0,0,0,context.canvas.height);

                    meterColor.addColorStop(1,meterColor_low);
                    meterColor.addColorStop(0.1,meterColor_high);
                    meterColor.addColorStop(0,meterColor_saturated);

                    context.fillStyle = meterColor;
                    context.strokeStyle = meterColor;

                }
                else if(orientation === 'horizontal')
                {
                    meterColor = context.createLinearGradient(0,0,context.canvas.width,0);
                    // Saturation value

                    // Normal value
                    meterColor.addColorStop(0,meterColor_low);
                    meterColor.addColorStop(0.9,meterColor_high);
                    meterColor.addColorStop(1,meterColor_saturated);

                    context.fillStyle = meterColor;
                    context.strokeStyle = meterColor;
                }
                else
                {
                    console.error("bad orientation given !!");
                }

            },

            /*drawForeground(context)
            {

                var grd = context.createLinearGradient(0, 0, 0, context.canvas.height);
                 grd.addColorStop(0, "rgba(255,255,255,0.3)");
                 grd.addColorStop(0.5, "rgba(0,0,0,0)");
                 grd.addColorStop(0.8, "rgba(255,255,255,0.1)");

                 var prev = context.fillStyle ;
                 context.fillStyle = grd;
                 context.fillRect(0,0,context.canvas.width, context.canvas.height);
                 context.fillStyle = prev;
            },*/

            /**
             * This function draws the grid.
             * @param {AudioContext} context - The web audio context.
             * @param {int} lineWidth - The x axis number.
             * @param {int} lineHeight - The y axis number.
             */
            drawGrid(context, lineWidth, lineHeight)
            {
                context.fillStyle = gridColor;
                context.strokeStyle = gridColor;
                context.lineWidth = 1;


                for(var i = 0 ; i < context.canvas.width; i+= lineWidth)
                {

                    context.beginPath();
                    context.moveTo(i,0);
                    context.lineTo(i, context.canvas.height);
                    context.stroke();
                    context.closePath();
                }

                for(var j = 0 ; j < context.canvas.height; j+= lineHeight)
                {

                    context.beginPath();
                    context.moveTo(0,j);
                    context.lineTo( context.canvas.width, j);
                    context.stroke();
                    context.closePath();
                }
            }


        };
    });