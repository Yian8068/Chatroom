app= angular.module("ChatApp",["firebase"]);
app.controller("ChatCtrl",function($scope,$firebase){
  var ref=new Firebase("https://chatapp-anjs.firebaseio.com/");
  var sync= $firebase(ref);
  $scope.messages=sync.$asArray();
	var clock={ 
    now: new Date()
  };
  var updateClock=function(){
    clock.now = new Date()
  };
  $scope.clock=clock;
  setInterval(function() {
		$scope.$apply(updateClock);
		}, 1000);
  $scope.addmessage=function(m,txt){
    if(m.length===0){m="Anonymous";};
    if(txt.length===0){txt="(empty)";};
    //updateClock(); 
    //var a=clock.now;
    //var c=prompt("Time",a);
    var c=clock.now.getTime().toString();
    $scope.messages.$add({text:txt,name:m,time:c});
    $scope.newMessage="";
  };
  
  $scope.deletemessage=function(msg){
    $scope.messages.$remove(msg);
  };
  $scope.editmessage=function(msg){
    msg.text=prompt("Edit Message",msg.text);
    $scope.messages.$save(msg);
  };

});
