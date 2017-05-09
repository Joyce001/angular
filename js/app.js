angular.module('app',['ui.router','cityApp','ui.bootstrap'])
	.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('tabs', {
				url: "/tab",
				abstract: true,
				templateUrl: "tpls/tabs.html",
				controller:function($scope){
					$scope.city = '北京';
					$scope.citys = [{ id: 1, name: '北京', group: '中国' },
									{ id: 2, name: '上海', group: '中国' }, 
									{ id: 3, name: '广州', group: '中国' }];
					$scope.citysObj = {name:'圣诞节',name:'元旦',name:'新年'};				
				}
			})
			.state('tabs.alert', {
				url: "/alert",
				views: {
					'main': {
						templateUrl: "tpls/alert.html"
					}
				}
			})
			.state('tabs.hello', {
				url: "/hello",
				views: {
					'main': {
						templateUrl: "tpls/hello.html"
					}
				}
			})
		$urlRouterProvider.otherwise("/tab/alert");
	}]);
            
