var app = angular.module("MyController", []); 
app.controller("ctrl", function ($scope, $http) {

  var finalSize = 42000;
  $scope.saludo = "";
  $scope.fileSize = 25;
  $scope.appPort=3000;
  $scope.appIp="127.0.0.1";
  $scope.username="";
 
   $scope.saludar = function() {
     var data = {
          "name": $scope.username,
          "ip":0
      };  
      $http.post("http://"+$scope.appIp+":"+$scope.appPort+"/saludar",data)
      .then(function (res) {
      }).catch(function(e){
        alert("Error al saludar " + e);
      });
    };



    $scope.createNonce = function() {
      alert("Esta apunto de crear un nuevo grupo de Nonces");
      var text = "";
      var size = (finalSize * $scope.fileSize);
      var min=65; 
      var max=90;  
      for(var i = 0; i <= size; i++){
        for (var j = 0; j<=25; j++) {
          var random =Math.floor(Math.random() * (+max - +min)) + +min; 
          var res = String.fromCharCode(random);
          text+= (res);
        }
        text+="\n";
        if (i == size) {
          writeText(text);
        }
      }
    };

    function writeText(text) {
      var textFile = null;
      var data = new Blob([text], {type: 'text/plain'});
          if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
          }
          textFile = window.URL.createObjectURL(data);
          var link = document.getElementById('downloadlink');
          link.href = textFile;
    }

var slider = document.getElementById("myRange");
var output = document.getElementById("megaSize");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
   $scope.fileSize = this.value;
}

$scope.readByLine = function() {
  var win = true;
    let initialTime = Date.now();
    var file = document.getElementById('file').files[0];
    var reader = new FileReader();
    reader.onload = function(progressEvent){
      var lines = this.result.split('\n');
      for(var i = 0; i < lines.length; i++){
        for ( var j = 0; j < lines[i].length; j++ ) {
          if (lines[i].charAt(j) == "A" && ((j+1) < lines[i].length)) {
            if (lines[i].charAt(j+1) == "Z") {
              console.log(lines[i] +": ===>" +i);
              var finalTime = Date.now();
              minar(lines[i], (finalTime - initialTime), "0");
              win = false;
              break;
            }
          }
        }
          if (i == (lines.length-1) && win) {
            var finalTime = Date.now();
            minar("No se mino", (finalTime - initialTime), "X");
          }
        }
    }
            reader.readAsText(file);
    
    };


     function minar(line, time,iswin) {
     var dataMining = {
          "name": $scope.username,
          "fileSize":$scope.fileSize,
          "line":line,
          "time":time,
          "iswin":iswin
      };  
      $http.post("http://"+$scope.appIp+":"+$scope.appPort+"/minar",dataMining)
      .then(function (res) {
      }).catch(function(e){
        alert("Error al saludar " + e);
      });
    };


});