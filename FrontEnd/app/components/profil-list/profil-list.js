'use strict';

/**
 * @ngdoc component
 * @name frontEndApp.component:profilList
 * @description
 * # profilList
 */
angular.module('frontEndApp')
    .component('profilList', {
        templateUrl: 'components/profil-list/profil-list.html',
        bindings   : {
            pedal: '='
        },
        controller: MyProfilListControllers
    });

function MyProfilListControllers($scope){

    this.numberOfMembers=4;
    this.names=["Quentin Cornevin", "Rémi Pourtier", "Guillaume Rahbari", "Maxime Touroute"];
    this.description=["A really big noob who love cocks", "A smart good looking modest man",
    "A man who costs 5000 euros ", "A man who has never worked"];
}