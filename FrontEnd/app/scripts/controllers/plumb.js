'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:PlumbCtrl
 */
angular.module('frontEndApp')
    .controller('PlumbCtrl', function($scope) {

    // define a module with library id, schema id, etc.
    function module(library_id, schema_id, title, description, x, y) {
        this.library_id = library_id;
        this.schema_id = schema_id;
        this.title = title;
        this.description = description;
        this.x = x;
        this.y = y;
    }

    // module should be visualized by title, icon
    $scope.library = [];

    // library_uuid is a unique identifier per module type in the library
    $scope.library_uuid = 0;

    // state is [identifier, x position, y position, title, description]
    $scope.schema = [];

    // schema_uuid should always yield a unique identifier, can never be decreased
    $scope.schema_uuid = 0;

    // todo: find out how to go back and forth between css and angular
    $scope.library_topleft = {
        x: 15,
        y: 145,
        item_height: 50,
        margin: 5,
    };

    $scope.module_css = {
        width: 150,
        height: 100, // actually variable
    };

    $scope.redraw = function() {
        $scope.schema_uuid = 0;
        jsPlumb.detachEveryConnection();
        $scope.schema = [];
        $scope.library = [];
        $scope.addModuleToLibrary("Sum", "Aggregates an incoming sequences of values and returns the sum",
            $scope.library_topleft.x+$scope.library_topleft.margin,
            $scope.library_topleft.y+$scope.library_topleft.margin);
        $scope.addModuleToLibrary("Camera", "Hooks up to hardware camera and sends out an image at 20 Hz",
            $scope.library_topleft.x+$scope.library_topleft.margin,
            $scope.library_topleft.y+$scope.library_topleft.margin+$scope.library_topleft.item_height);
    };

    // add a module to the library
    $scope.addModuleToLibrary = function(title, description, posX, posY) {
        console.log("Add module " + title + " to library, at position " + posX + "," + posY);
        var library_id = $scope.library_uuid++;
        var schema_id = -1;
        var m = new module(library_id, schema_id, title, description, posX, posY);
        $scope.library.push(m);
    };

    // add a module to the schema
    $scope.addModuleToSchema = function(library_id, posX, posY) {
        console.log("Add module " + title + " to schema, at position " + posX + "," + posY);
        var schema_id = $scope.schema_uuid++;
        var title = "Unknown";
        var description = "Likewise unknown";
        for (var i = 0; i < $scope.library.length; i++) {
            if ($scope.library[i].library_id == library_id) {
                title = $scope.library[i].title;
                description = $scope.library[i].description;
            }
        }
        var m = new module(library_id, schema_id, title, description, posX, posY);
        $scope.schema.push(m);
    };

    $scope.removeState = function(schema_id) {
        console.log("Remove state " + schema_id + " in array of length " + $scope.schema.length);
        for (var i = 0; i < $scope.schema.length; i++) {
            // compare in non-strict manner
            if ($scope.schema[i].schema_id == schema_id) {
                console.log("Remove state at position " + i);
                $scope.schema.splice(i, 1);
            }
        }
    };

    $scope.init = function() {
        jsPlumb.bind("ready", function() {
            console.log("Set up jsPlumb listeners (should be only done once)");
            jsPlumb.bind("connection", function (info) {
                $scope.$apply(function () {
                    console.log("Possibility to push connection into array");
                });
            });
        });
    }
});
