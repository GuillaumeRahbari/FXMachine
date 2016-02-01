
'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:ProfilCtrl
 * @description
 * # ProfilCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('ProfilCtrl', function (PedalSrv) {

      // TODO Get the real pedals of the user.
      //this.pedals = PedalSrv.getAllPedals();
      this.pedals = [1,2,'cc', 'cccc'];

  });
