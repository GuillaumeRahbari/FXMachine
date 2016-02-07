'use strict';

/**
 * Created by guillaume on 07/02/2016.
 */

function UsersListController (UserSrv) {

    var self = this;

    UserSrv.getAll().then(
        function (response) {
            self.users = response.data;
        },
        function (error) {
            console.log(error);
        }
    )

}

/**
 * @ngdoc component
 * @name frontEndApp.component:usersList
 * @description
 * # usersList
 */
angular.module('frontEndApp')
       .component('usersList', {
           templateUrl: 'components/users-list/users-list.html',
           controller : UsersListController
       });