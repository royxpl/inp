
function localData ($http) {
	var showData = function(){return $http.get('/api/blog');}
	var newData = function(data){return $http.post('/api/blog',data);}
	var deleteData = function(idBlog){return $http.delete('/api/blog/'+idBlog);}
	var getByIdData = function(idBlog){return $http.get('/api/blog/'+idBlog);}
	return {
      showData : showData,
      newData : newData,
      deleteData : deleteData,
      getByIdData : getByIdData
    };
}


function config ($routeProvider,$locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'homePage.html',
			controller: 'homePageCrtl',
			controllerAs: 'vm'
		})
		.when('/nuevo',{
			templateUrl: 'newBlogPage.html',
			controller: 'newPageCrtl',
			controllerAs: 'vm'
		})
		.when('/contenido/:idblog',{
			templateUrl: 'blogPage.html',
			controller: 'blogPageCrtl',
			controllerAs: 'vm'
		})
		.when('/error',{
			templateUrl: 'error.html',
		})
		.otherwise({redirectTo: '/error'});
	//$locationProvider.html5Mode({enabled: true, requireBase: false});
}
var homePageCrtl = function(localData){
	var vm = this;

	vm.getData = function(){
		localData.showData()
			.success(function(data) {
				vm.blog = data;
			})
			.error(function (e) {
				console.log(e);
			});
	}
	
	vm.getData();
}

var newPageCrtl  = function(localData){
	var vm = this;
	vm.err = "";
	vm.blog = {
		titulo: "",
		categoria : "",
		descripcion : "",
		autor : ""
	}
	vm.onSubmit = function(){
		localData.newData({
			titulo : vm.blog.titulo,
			categoria : vm.blog.categoria,
			descrpcion : vm.blog.descripcion,
			autor : vm.blog.autor
		})
			.success(function(data) {
				vm.err = "correcto";
			})
			.error(function (e) {
				vm.err = e;
			});
	};
}

var blogPageCrtl = function($location,$routeParams,localData){
	var vm = this;
	vm.err = "";
	vm.idBlog = $routeParams.idblog;
	vm.getData = function(){
		localData.getByIdData(vm.idBlog)
			.success(function(data) {
				vm.blog = data;
			})
			.error(function (e) {
				console.log(e);
			});
	}
	vm.deleteData = function(){
		localData.deleteData(vm.idBlog)
			.success(function(data) {
				vm.err = data;
			})
			.error(function (e) {
				console.log(e);
			});
	}
	vm.onclik = function(){
		vm.deleteData();
		$location.path('/');
	}
	vm.getData();
}//*/

var fomart_FH = function(){
	return function(fecha){
		var sub = fecha.substr(0,10).split('-');
		var mes = '';
		switch(parseInt(sub[1])){
			case 1 : mes = 'enero';break;
			case 2 : mes = 'febrero';break;
			case 3 : mes = 'marzo';break;
			case 4 : mes = 'abril';break;
			case 5 : mes = 'mayo';break;
			case 6 : mes = 'junio';break;
			case 7 : mes = 'julio';break;
			case 8 : mes = 'agosto';break;
			case 9 : mes = 'setiembre';break;
			case 10 : mes = 'octubre';break;
			case 11 : mes = "noviembre";break;
			case 12 : mes = 'diciembre';break;
		}
		return sub[0]+' '+mes+' '+sub[2];
	}
}

var navigation = function(){
	return {
		restrict: 'EA',
		templateUrl: 'navigation.page.html'
	};
}

angular.module('myApp',['ngRoute'])
  .controller('homePageCrtl',homePageCrtl)
  .controller('newPageCrtl',newPageCrtl)
  .controller('blogPageCrtl',blogPageCrtl)
  .service('localData', localData)
  .filter('fomart_FH',fomart_FH)
  .directive('navigation', navigation)
  .config(['$routeProvider','$locationProvider',config]);
