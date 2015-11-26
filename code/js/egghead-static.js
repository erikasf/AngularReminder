var app = angular.module('egghead', []);

app.controller('MainCtrl', ['$scope', 'ItemsService', function ($scope, ItemsService) {
    $scope.newItem = { name: '', description: '', count: 0 };
    $scope.currentItem = null;

    $scope.items = ItemsService.getItems();

    $scope.addItem = function () {
        ItemsService.addItem(angular.copy($scope.newItem));
        $scope.newItem = { name: '', description: 0, count: 0 };
    };

    $scope.updateItem = function (item) {
        ItemsService.updateItem(item);
    };

    $scope.removeItem = function(item) {
        ItemsService.removeItem(item);
    };
}]);

app.factory('ItemsService', [function () {
    var items = [
        {id: 1, name: 'Item 00', description: 'This is item', count: 0},
        {id: 2, name: 'Item 01', description: 'This is item', count: 0},
        {id: 3, name: 'Item 02', description: 'This is item', count: 0}
    ];

    var getItems = function() {
        return items;
    };

    var addItem = function (item) {
        items.push(item);
    };

    var updateItem = function (item) {
        // Do nothing... it is already updated locally
    };

    var removeItem = function (item) {
        items.remove(function(i) {
            return i['id'] == item.id;
        });
		var archiveItem = function(item){
			items.archive(function(i)){
						  items.push('/archive');
						  }
		}
    };

    return {
        getItems: getItems,
        addItem: addItem,
        updateItem: updateItem,
        removeItem: removeItem
    }
}]);