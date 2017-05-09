var cityApp = angular.module('cityApp', []);
cityApp.controller('CityCtrl', ['$scope', function($scope){
	$scope.loadData = function(){
		console.log("加载数据中...");
	}
}])
.controller('CityCtrl2', ['$scope', function($scope){
	$scope.loadData2 = function(){
		console.log("加载数据中...");
	}
	$scope.ctrlFlavor = "百威";
}])
.controller('CityCtrl3', ['$scope', function($scope){
	$scope.sayHello = function(name){
		alert("hello" + name);
	}
}])
//.run(['$templateCache',function($templateCache){
//	//从浏览器缓存中获取html片段
//	$templateCache.put("hello.html","<div>hello everyone!!!!</div>");
//}])
//directive 与 controller之间的交互
cityApp.directive("helloo",function(){
	return {
		restrict:'AEMC',
		template:'<div>Hi everyone!<div ng-transclude></div></div>',
//		template:$templateCache.get("hello.html"),
//		templateUrl:'tpls/hello.html',
//		replace:true //默认为false,若设为true,则会移除用户在html中的内容
		transclude:true//若为true,则保留用户在html中定义的内容
	}
})
.directive("loader",function(){
	return {
		restrict:"AE",
		link:function(scope,element,attrs){
			element.bind('mouseenter',function(event){
				scope.$apply(attrs.howtoload);
			})
		}
	}
})
//directive指令之间的交互
.directive("superman",function(){
	return {
		scope: {},//独立作用域
		restrict:'AE',
		controller:function($scope) {	//	暴露共用的属性和方法
			$scope.abilities = [];
			this.addStrength = function() {
				$scope.abilities.push("strength");
			};
			this.addSpeed = function() {
				$scope.abilities.push("speed");
			}
			this.addLight = function() {
				$scope.abilities.push("light");
			}
			
		},
		link: function(scope, element, attrs) {
			element.addClass('btn btn-primary');
			element.bind("mouseenter", function() {
				console.log(scope.abilities);
			})
		}
	}
})
.directive("strength", function() {
	return {
		require: '^superman',
		link: function(scope, element, attrs, supermanCtrl){
			supermanCtrl.addStrength();
		}
	}
})
.directive("speed",function(){
	return{
		require:'^superman',
		link: function(scope,element,attrs, supermanCtrl){
			supermanCtrl.addSpeed();
		}
	}
})
.directive("light",function(){
	return{
		require:"^superman",
		link: function(scope, element, attrs, supermanCtrl){
			supermanCtrl.addLight();
		}
	}
})
//独立作用域scope及三种绑定策略
.directive("hello",function(){
	return{
		restrict:'AE',
		scope:{},
		template: '<div><input type="text" ng-model="userName"/>{{userName}}</div>'
	}
})
.directive("drink", function(){
	return{
		restrict:'AE',
		scope:{
			flavor:'@'//把当前属性作为字符串传递,还可以绑定来自外层scope的值,在属性值中插入{{}}即可
		},
		template:"<div>{{flavor}}</div>"
	}
})
.directive("drinktwo",function(){
	return{
		restrict:'AE',
		scope:{
			flavor:'='
		},
		template:"<input type='text' ng-model='flavor'>"
	}
})
.directive("greeting",function(){
	return{
		restrict:'AE',
		scope:{
			greet:'&'
		},
		template:'<input type="text" ng-model="userName" /><br/>'+
				'<button class="btn btn-default" ng-click="greet({name:userName})">Greeting</button><br/>'
	}
})
