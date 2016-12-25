var app = angular.module('app.todos',['xeditable']);
//angular.module

app.controller('todosController',['$scope','svTodo',function($scope,svTodo){
    $scope.todos = [];

    $scope.loading = true;

    svTodo.getTodos().success(function(data){
        $scope.todos = data;
        $scope.loading = false;
    });

    $scope.newTodo = {};

    $scope.removeTodo = function(todo){

        $scope.loading = true;
        svTodo.deleteTodo(todo.id).success(function(data){
            $scope.todos = data;
            $scope.loading = false;
        });
    }

    $scope.updateTodo = function(todo){
        $scope.loading = true;
        svTodo.updateTodo(todo).success(function(data){
            $scope.todos = data;
            $scope.loading = false;
        });
    }

    $scope.createTodo = function(){
        $scope.loading = true;
        svTodo.createTodo($scope.newTodo).success(function(data){
            $scope.todos = data;
            $scope.loading = false;
            $scope.newTodo = {};
        });

    }
}]);