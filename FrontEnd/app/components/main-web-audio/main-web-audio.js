/**
 * Created by guillaume on 03/02/2016.
 */

/**
 * @ngdoc component
 * @name frontEndApp.component:mainWebAudio
 * @description
 * # mainWebAudio
 */
angular.module('frontEndApp')
       .component('mainWebAudio', {
           templateUrl: 'components/main-web-audio/main-web-audio.html',
           bindings   : {
               webaudio:'='
           }
       });