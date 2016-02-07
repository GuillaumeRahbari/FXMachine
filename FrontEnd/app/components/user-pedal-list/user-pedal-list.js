'use strict';

/**
 * Created by guillaume on 07/02/2016.
 */

function UserPedalListController () {

    var self = this;

}

/**
 * @ngdoc component
 * @name frontEndApp.component:userPedalList
 * @description
 * # userPedalList
 */
angular.module('frontEndApp')
       .component('userPedalList', {
           templateUrl: '/components/user-pedal-list/user-pedal-list.html',
           bindings   : {
               pedals: '='
           },
           controller : UserPedalListController
       });