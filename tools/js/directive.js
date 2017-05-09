angular.module('poly.directive',[])
.directive("imgFit",["$interval",function($interval) {
  return {
	restrict:"A",
	scope:{},
   link:function(scope, element, attr){
      window.addEventListener( 'resize', function(){
      	var container = {w:window.innerWidth-100,h:window.innerHeight-100};
			 	var result = getFit(source,container);
			 	element[0].width = result.w;
			 	element[0].height = result.h;
			 	element[0].style.marginTop=0- result.h/2+'px';
      }, false );
      var img = new Image();
      var source ={};
		 img.onload = function() {
		 	source= {w:img.width,h:img.height};
		 	var container = {w:window.innerWidth-100,h:window.innerHeight-100};
		 	var result = getFit(source,container);
		 	element[0].width = result.w;
		 	element[0].height = result.h;
		 	element[0].style.marginTop=0- result.h/2+'px';
		 }
		var timer  = $interval(function(){
			if(element[0].src){
				$interval.cancel(timer);
			 img.src=element[0].src;
			}
	  }, 150, 10); 
		 
     function getFit(source, container) {
				var maxHeight = container.h;
				var maxWidth =  container.w;
				var heightRatio = maxHeight / source.h;
				if (heightRatio >= 1) {
					var widthRatio = maxWidth / source.w;
					if (widthRatio >= 1) {
						var widthRatio = maxWidth/ source.w;
						return {
							w: source.w,
							h: source.h,
							fit: true
						};
					} else {
						return {
							w: maxWidth,
							h: source.h * widthRatio,
							fit: false
						};
					}
				} else {
					if ((source.w * heightRatio) >= maxWidth) {
						var widthRatio = maxWidth / source.w;
						return {
							w: maxWidth,
							h: source.h * widthRatio,
							fit: false
						};
					} else {
						return {
							w: source.w * heightRatio,
							h: maxHeight,
							fit: true
						};
					}
				}
		
			}
    }
  };
}])
.directive("autoHeight",function() {
  return {
	restrict:"A",
	scope:{
		'autoHeight':'@'
	},
   link:function(scope, element, attr){
   	if(Number(scope.autoHeight)){
   		element[0].style.height=(window.innerHeight-scope.autoHeight)+"px";
      window.addEventListener( 'resize', function(){
      	element[0].style.height=(window.innerHeight-scope.autoHeight)+"px";
      }, false );
   	}
  }};
})
.directive("checkLength",function() {
  return {
	restrict:"A",
	scope:{
            model:"=ngModel",
            checkLength:'@'
    },
    link:function(scope, element, attr){
    	if("\v"=="v") { 
				element[0].onpropertychange = change; 
			}else{ 
				element[0].addEventListener("input",change,false); 
			} 
      function change(){
      	if ( scope.model&&scope.model.length > scope.checkLength) {
        	scope.$apply(scope.model=scope.model.substr(0, scope.checkLength));
       	}
      }
    }
  };
})
.directive("datePicker",['$parse',function($parse) {
  return {
	restrict:"A",
	require: '?ngModel',
	scope:{
            minDate:'@',
            dateFmt:'@',
            onPicked:'&',
            maxDateStr:'@'
            
    },
    link:function(scope, element, attr,ngModel){
      var option = {
          onpicked: function () {
          	ngModel.$setViewValue(this.value);
          	if(scope.onPicked ){
		        scope.onPicked();
		    }
          },
          oncleared: function () {
           	ngModel.$setViewValue('');
           	if(scope.onPicked ){
		       scope.onPicked();
		    }
          }
       };
       if(scope.minDate){
       	  option.minDate = '#F{$dp.$D('+scope.minDate+')}';
       }
        if(scope.dateFmt){
       	  option.dateFmt = scope.dateFmt;
       }
        if(scope.maxDateStr){
       	  option.maxDate = scope.maxDateStr;
       }
      element.bind("focus", function () {
        window.WdatePicker(option);
      });
    }
  };
}])
.directive("checkStrength",function() {
  return {
	restrict:"A",
	scope:false,
   link:function(scope, element, attr){
      element.bind("keyup onfocus onblur", function () {
        scope.$emit("pwdChange",this.value);
      });
    }
  };
})
.directive("pwdStrength",function() {
  return {
	restrict:"E",
	scope:false,
  replace:true,
  template:'<p class="pwd-strength"><span id="strength_L" ></span>'
  +'<span id="strength_M" ></span>'
  +'<span id="strength_H" ></span></p>' ,
    link:function(scope, element, attr){
       scope.$on('pwdChange',function(e,newVal){
       		var index = checkStrong(newVal);
       	   setColor(index);
       	   scope.index=index;
       });
       var defaultOptions={
       	 Ocolor:"#CCCCCC",
       	 Lcolor:"#FF0000",
       	 Mcolor:"#FF9900", 
       	 Hcolor:"#33CC00"
       }
        var options = defaultOptions;
       	 if(scope.options){
       	 	 $.extend(true, options, scope.options);
       	 }
       scope.lColor = options.Ocolor;
		   scope.mColor = options.Ocolor;
		   scope.hColor = options.Ocolor;
		   document.getElementById("strength_L").style.background=scope.lColor;  
		   document.getElementById("strength_M").style.background=scope.mColor;  
		   document.getElementById("strength_H").style.background=scope.hColor;
       function setColor(index){
	       	switch (index) {
		        	case 0:
		        		scope.lColor = options.Ocolor;
		        		scope.mColor = options.Ocolor;
		        		scope.hColor = options.Ocolor;
		        		break;
			        case 1:
			            scope.lColor = options.Lcolor;
			            scope.mColor = options.Ocolor;
		        		  scope.hColor = options.Ocolor;
			            break;
			        case 2:
			          scope.lColor = options.Mcolor;
			          scope.mColor = options.Mcolor;
			          scope.hColor = options.Ocolor;
			            break;
			        case 3:
			        case 4:
			           scope.lColor = options.Hcolor;
			           scope.mColor = options.Hcolor;
			           scope.hColor = options.Hcolor;
			          break;
		    	}
	       	document.getElementById("strength_L").style.background=scope.lColor;  
		      document.getElementById("strength_M").style.background=scope.mColor;  
		      document.getElementById("strength_H").style.background=scope.hColor;
       }
        
       
       //--密码强度检测
			function checkStrong(sValue) {
			    var modes = 0;
			    //正则表达式验证符合要求的
			    if (sValue.length < 1) return modes;
			    if (/\d/.test(sValue)) modes++; //数字
			    if (/[a-z]/.test(sValue)) modes++; //小写
			    if (/[A-Z]/.test(sValue)) modes++; //大写  
			    if (/\W/.test(sValue)) modes++; //特殊字符
			   
			   //逻辑处理
			    switch (modes) {
			        case 1:
			            return 1;
			            break;
			        case 2:
			            return 2;
			        case 3:
			        case 4:
			            return sValue.length < 8 ? 3 : 4
			            break;
			    }
			}
    }
  };
}).directive("repeatPassword", [function () {
        return {
            restrict: 'A',
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                if (ctrl) {
                    var otherInput = element.inheritedData("$formController")[attrs.repeatPassword];

                    var repeatValidator = function (value) {
                        var validity = value === otherInput.$viewValue;
                        ctrl.$setValidity("repeatPassword", validity);
                        return validity ? value : undefined;
                    };

                    ctrl.$parsers.push(repeatValidator);
                    ctrl.$formatters.push(repeatValidator);

                    otherInput.$parsers.push(function (value) {
                        ctrl.$setValidity("repeatPassword", value === ctrl.$viewValue);
                        return value;
                    });
                }
            }
        };
}]).directive('remoteValidation', function($http) {
    return {
        require : 'ngModel',
        scope:{
            remoteUrl:'@'
    		},
        link : function(scope, elm, attrs, ctrl) {
            elm.bind('blur', function() {
            		var url = baseHref+scope.remoteUrl;
                $http({method: 'GET', url: url}).
                success(function(data, status, headers, config) {
                    if(parseInt(data.data)==0){
                        ctrl.$setValidity('remote',true);
                    }else{
                        ctrl.$setValidity('remote',false);
                    }
                }).
                error(function(data, status, headers, config) {
                    ctrl.$setValidity('remote', false);
                });
            });
        }
    };
});

