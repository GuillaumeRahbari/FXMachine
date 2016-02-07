'use strict';

/**
 * Created by guillaume on 07/02/2016.
 */

function UserProfilController () {

    var self = this;

}

/**
 * @ngdoc component
 * @name frontEndApp.component:userProfil
 * @description
 * # userProfil
 */
angular.module('frontEndApp')
       .component('userProfil', {
           templateUrl: 'components/user-profil/user-profil.html',
           controller : UserProfilController,
           bindings   : {
               user: '='
           }
       });