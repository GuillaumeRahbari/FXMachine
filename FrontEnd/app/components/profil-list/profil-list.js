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
        }
    });
