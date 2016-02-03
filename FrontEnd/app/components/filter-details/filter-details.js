'use strict';

/**
 * Created by guillaume on 03/02/2016.
 */

/**
 * @ngdoc component
 * @name frontEndApp.component:filterDetails
 * @description
 * # filterDetails
 */
angular.module('frontEndApp')
       .component('filterDetails', {
           templateUrl: 'components/filter-details/filter-details.html',
           bindings   : {
               filter: '='
           },
           controller : FilterDetailsController
       });

function FilterDetailsController (uuidGenerator, JsPlumb, $timeout, $element) {

    var self = this;

    /**
     * A unique id for every filter details container.
     * @type {*|String}
     */
    self.uuid = uuidGenerator.generateUUID();

    /**
     * A toggle variable
     * @type {boolean}
     */
    self.show = false;

    /**
     * This function shows the filter details container.
     */
    self.showFilter = function () {
        angular.element('div[uuid=' + self.uuid + ']').collapse('show');
        JsPlumb.revalidate($element.offsetParent().children(0).children(2));
        self.show = true;
    };

    /**
     * This function hides the filter details container.
     */
    self.hideFilter = function () {
        angular.element('div[uuid=' + self.uuid + ']').collapse('hide');
        $timeout(function () {
            JsPlumb.revalidate($element.offsetParent().children(0).children(2));

        }, 500);
        self.show = false;
    };
}