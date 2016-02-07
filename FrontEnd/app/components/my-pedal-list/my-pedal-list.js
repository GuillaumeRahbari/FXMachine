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

function MyPedalListController (PedalSrv, $scope, $timeout, $cookies) {

    var self = this;

    /**
     * This function gets all pedals.
     */
    function getAllPedals () {
        PedalSrv.getAllPedals($cookies.get('userId')).then(
            function (data) {
                self.pedals = data.data;
            },
            function (error) {
                console.log(error);
            }
        );
    }

    getAllPedals();

    $scope.$on('updatePedals', function () {
        $timeout(function () {
            getAllPedals();
        }, 500);
    });

}