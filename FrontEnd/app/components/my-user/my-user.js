'use strict';

/**
 * Created by guillaume on 07/02/2016.
 */

function UserController () {

    var self = this;

}

/**
 * @ngdoc component
 * @name frontEndApp.component:myUser
 * @description
 * # myUser
 */
angular.module('frontEndApp')
       .component('myUser', {
           templateUrl: 'components/my-user/my-user.html',
           controller : UserController,
           bindings   : {
               user: '='
           }
       });