var svTodo = angular.module('app.todos');

svTodo.factory('svTodo',['$http',function($http){

    return {
        getTodos :    function getTodos (){
            return $http.get('/todos/datas');
        },
        updateTodo : function(todo){
            return  $http.put('/todos/update',todo);
        },
        createTodo: function(todo){
            return $http.post('/todos/create',todo);
        },
        deleteTodo: function(id){
            return $http.delete('/todos/delete/'+id);
        }
    }

}])