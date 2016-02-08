'use strict';
/**
 * Created by guillaume on 03/02/2016.
 */

/**
 * @ngdoc component
 * @name frontEndApp.component:filterWaveshaper
 * @description
 * # filterWaveshaper
 */
angular.module('frontEndApp')
    .component('filterWaveshaper', {
        templateUrl: 'components/filters/filter-waveshaper/filter-waveshaper.html',
        bindings: {
            filter: '=',
            amount: '=',
            distotype: '=',
            harmonics: '=',
            fondfreq: '='
        },
        controller: FilterWaveshaperController
    });

function FilterWaveshaperController($element, canvasManager, $scope) {

    var self = this;

    self.fondfreq = 5;
    // Initialising scope values
    self.amount = 1;
    self.distotype = "atan";
    self.harmonics = [0, 0, 0, 0, 0, 0, 0, 0];


    var ctx = $element[0].querySelector('#distovisualisation').getContext('2d');


    /**
     * Creates the curve needed for the waveshaper audionode
     * @param amount - the amount of distorsion we want
     * @returns {Float32Array} - the curve
     */
    var makeAtanDistortionCurve = function (amount) {

        var k = amount, n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180,
            i = 0,
            x;


        for (; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1;
            //curve[i] = Math.sin(x);
            curve[i] = ( k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) ); // avant c'etait (3+k)
        }


        return curve;
    };

    /**
     * Chebyshev function
     * @param harmonics
     * @param fondamentalFreq
     * @returns {Float32Array}
     */
    var makeChebyshevDistortionCurve = function (harmonics, fondamentalFreq) {
        var n_samples = 44100,
            curve = new Float32Array(n_samples),
            i = 0,
            x;


        for (; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1;
            //curve[i] = Math.sin(x);

            //f(x) = A sin(wt + p)
            for (var u = 0; u < harmonics.length; u++) {
                var w = (u + 1) * fondamentalFreq;
                var w = (u + 1) * fondamentalFreq;
                curve[i] += harmonics[u] * Math.sin(w * x);
            }

            // gestion de la saturation de curve
            if (curve[i] > 1) curve[i] = 1;
            if (curve[i] < -1) curve[i] = -1;

        }

        return curve;
    };

    /**
     * This function draws a curve.
     * @param curve
     */
    var drawCurve = function (curve) {
        //console.log("draw");

        // We actually draw the result on a sin curve

        // ** Cleaning background
        canvasManager.drawBackground(ctx);
        canvasManager.drawGrid(ctx, 10, 10);


        var widthDrawStep = ctx.canvas.width / curve.length;

        // console.log("frequencyhArray length" + frequencyArray.length);

        var maxValue = Math.max.apply(null, curve);
        if (maxValue == 0) maxValue = 1; // If empty, we put it to 1 to draw a line

        //** Drawing disto response line
        canvasManager.setPrimaryLineStyle(ctx);

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, ctx.canvas.height / 2);

        // console.log("curve" + curve);

        for (var i = 0; i <= curve.length - 1; i++) {
            // Actually no. it goes way higher
            var meterHeight = curve[i] * (ctx.canvas.height / 2);

            ctx.lineTo(i * widthDrawStep, ctx.canvas.height / 2 - meterHeight);
        }
        ctx.stroke();
        ctx.closePath();

    };


    /**
     * Updates the value of the audioNode
     */
    var update = function () {

        if (self.distotype === undefined) {
            console.warn("degeu passage atan");
            self.distotype = "atan";
        }
        var curve;

        if (self.distotype === "atan")
            curve = makeAtanDistortionCurve(self.amount);
        else if (self.distotype === "chebyshev")
            curve = makeChebyshevDistortionCurve(self.harmonics, self.fondfreq);
        else
            console.error("bad disto type given");


        self.filter.audioNode.curve = curve;

        drawCurve(curve);
    };


    /*
     Watching for a change in the distorsion amount inputrange
     */
    $scope.$watch('$ctrl.amount', function (newValue) {
        update();
    });

    /*
     Watching for a change in the harmonics inputrange
     */
    $scope.$watch('$ctrl.harmonics', function (newValue) {
        update();

    }, true);

    /*
     Watching for a change in type
     */
    $scope.$watch('$ctrl.distotype', function (newValue) {
        update();

    }, true);


    /*
     Watching for a change in fondamental frequency
     */
    $scope.$watch('$ctrl.fondfreq', function (newValue) {
        update();


    }, true);

}