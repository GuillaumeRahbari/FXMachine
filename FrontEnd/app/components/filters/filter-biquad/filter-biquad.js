'use strict';

/**
 * @ngdoc component
 * @name frontEndApp.component:filterBiquad
 * @description
 * # filterBiquad
 */
angular.module('frontEndApp')
       .component('filterBiquad', {
           templateUrl: 'components/filters/filter-biquad/filter-biquad.html',
           bindings   : {
               filter: '='
           },
           controller : FilterBiquadController
       });

function FilterBiquadController ($element, canvasManager, $scope) {

    var self = this;

    var ctx = $element[0].querySelector('#biquadvisualisation').getContext('2d');

    /**
     * This function draws the canvas.
     * Called everytime something changes
     */
    var draw = function () {

        // Setting up the array values we want, and the array containers
        var frequencyArray = new Float32Array(100);
        for (let i = 0; i < frequencyArray.length; i++) {

            frequencyArray[i] = i * 400
        }

        // Frequency response
        var magResponseOutput = new Float32Array(100);
        // Phase response
        var phaseResponseOutput = new Float32Array(100);
        // Getting frequency response
        self.filter.audioNode.getFrequencyResponse(frequencyArray, magResponseOutput, phaseResponseOutput);


        // ** Cleaning background
        canvasManager.drawBackground(ctx);
        canvasManager.drawGrid(ctx, 10, 10);

        var widthDrawStep = ctx.canvas.width / frequencyArray.length;

        //** Drawing frequency response line
        canvasManager.setPrimaryLineStyle(ctx);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, ctx.canvas.height / 2);
        for (let i = 0; i <= frequencyArray.length - 1; i++) {
            // magResponseOutput goes from 0 to 1. We rescale to half of size, to handle high values properly
            var meterHeight = magResponseOutput[i] * (ctx.canvas.height / 2);
            ctx.lineTo(i * widthDrawStep, ctx.canvas.height - meterHeight);
        }
        ctx.stroke();
        ctx.closePath();


        //** Drawing zero dB line

        canvasManager.setSecondaryLineStyle(ctx);
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(0, ctx.canvas.height / 2);
        ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
        ctx.stroke();
        ctx.closePath();

        //** Drawing frequency legend TODO : marche pas top
        canvasManager.setTextColorStyle(ctx);
        ctx.font = "10px Arial";
        ctx.fillText(frequencyArray[0] + 'Hz', 0, ctx.canvas.height - 10);
        ctx.fillText(frequencyArray.length * 400 + 'Hz', ctx.canvas.width - 50, ctx.canvas.height - 10);

    };

    /*
     Watching for a buffer change (like a new sound has been loaded)
     */
    $scope.$watch('$ctrl.filter.audioNode.frequency.value', function (newValue) {
        draw();
    });
    $scope.$watch('$ctrl.filter.audioNode.Q.value', function (newValue) {
        draw();
    });
    $scope.$watch('$ctrl.filter.audioNode.gain.value', function (newValue) {
        draw();
    });
    $scope.$watch('$ctrl.filter.audioNode.type', function (newValue) {
        draw();
    });
}