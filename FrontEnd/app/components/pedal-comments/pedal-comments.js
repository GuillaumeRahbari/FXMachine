'use strict';

/**
 * Created by guillaume on 08/02/2016.
 */

function PedalCommentsController (PedalSrv, $routeParams) {

    var self = this;

    self.submitComment = function () {
        PedalSrv.commentPedal(self.commentAdd, $routeParams.pedalId);
    };

    self.submitRate = function () {
        PedalSrv.ratePedal(self.rate, $routeParams.pedalId);
    };

}

/**
 * @ngdoc component
 * @name frontEndApp.component:pedalComments
 * @description
 * # pedalComments
 */
angular.module('frontEndApp')
       .component('pedalComments', {
           templateUrl: '/components/pedal-comments/pedal-comments.html',
           controller : PedalCommentsController,
           bindings   : {
               pedal: '='
           }
       });