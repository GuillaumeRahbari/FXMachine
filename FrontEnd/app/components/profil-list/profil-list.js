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

function MyProfilListControllers($scope, $http){

    var names=["Quentin Cornevin", "Remi Pourtier", "Guillaume Rahbari", "Maxime Touroute"];
    var description=["A really big noob who love cocks", "A smart good looking modest man",
    "A man who costs 5000 euros ", "A man who has never worked"];

    $scope.membersList={};
    $http.get('json/homePage.json')
        .success(function(data) {
            console.log("memberlist: ", data);
            $scope.membersList = data;
        })
        .error(function(error) {
            console.log(error);
        });

    /*this.membersList=[];
    for(var i=0;i<names.length;i++){
        var tmpArray=[];
        tmpArray.push(names[i]);
        tmpArray.push(description[i]);
        this.membersList.push(tmpArray);
    }*/

}