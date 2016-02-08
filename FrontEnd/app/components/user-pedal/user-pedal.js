'use strict';

/**
 * Created by guillaume on 07/02/2016.
 */

function UserPedalController ($routeParams) {
    var self = this;

    self.userId = $routeParams.userId;
}

/**
 * @ngdoc component
 * @name frontEndApp.component:userPedal
 * @description
 * # userPedal
 */
angular.module('frontEndApp')
       .component('userPedal', {
           templateUrl: 'components/user-pedal/user-pedal.html',
           bindings   : {
               pedal: '='
           },
           controller : UserPedalController
       });
