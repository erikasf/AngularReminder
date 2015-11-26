var app = angular.module('egghead', ['firebase']);

// Beofre you get started, enter the name of a valid Firebase.
// Ie you need one, sign up for a free account at http://bit.ly/firebase-egghead
app.constant('FIREBASE_URI', 'https://feuerslack.firebaseio.com/');

app.controller('MainCtrl', ['$scope', 'ItemsService', function ($scope, ItemsService) {
    $scope.newItem = { name: '', description: '', count: 0 };
    $scope.currentItem = null;

    $scope.items = ItemsService.getItems();

    $scope.addItem = function () {
        ItemsService.addItem(angular.copy($scope.newItem));
        $scope.newItem = { name: '', description: '', count: 0 };
    };

    $scope.updateItem = function (id) {
        ItemsService.updateItem(id);
    };

    $scope.removeItem = function (id) {
        ItemsService.removeItem(id);
    };
}]);

app.factory('ItemsService', ['$firebase', 'FIREBASE_URI', function ($firebase, FIREBASE_URI) {
    var ref = new Firebase(FIREBASE_URI);
    var items = $firebase(ref);

    var getItems = function () {
        return items;
    };


    var addItem = function (item) {
        items.$add(item);
    };

    var updateItem = function (id) {
        items.$save(id);
    };

    var removeItem = function (id) {
        items.$remove(id);
    };

    return {
        getItems: getItems,
        addItem: addItem,
        updateItem: updateItem,
        removeItem: removeItem
    }
}]);