'use strict';

/**
 * @ngdoc component
 * @name frontEndApp.component:myPedalList
 * @description
 * # myPedalList
 */
angular.module('frontEndApp')
       .component('myPedalList', {
           templateUrl: '/components/my-pedal-list/my-pedal-list.html',
           controller : MyPedalListController
       });

function MyPedalListController (PedalSrv) {

    var self = this;

    PedalSrv.getAllPedals().then(
        function (data) {
            self.pedals = data.data;
        },
        function (error) {
            console.log(error);
        }
    );

}