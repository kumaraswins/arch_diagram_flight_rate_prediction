angular.module('SampleAPP')
    .controller('RegisterController', ['$scope','$rootScope', '$http', '$location', 'DataService', RegisterController]);

function RegisterController($scope,$rootScope, $http, $location, DataService) {
    $scope.user = {};
    $scope.selectedDate = '';
    $scope.data = []
    $scope.selectedDateList = [];
    $scope.trainedStatus = ""
    $http.get("/static/js/controller/data.json")
    .then(function(response) {
        $scope.data =  response.data.data;
    });
    
    /**
     * Train data
     */
    $scope.trainData = function(){
        $http.get("/train")
        .then(function(response) {
            $scope.trainedStatus = response.data;
        }); 
    }
    var updateUi = function(oJson){
        $scope.flightList  = [];
        for(var  i=0;i<$scope.selectedDateList.length;i++){
            var oData = {"date":"","price":"",'time':""}
            var date = $scope.selectedDateList[i].split('.')
            var time = date[0].split('T')
            oData["date"] = time[0];
            oData["time"] =time[1];
            oData["price"] = parseInt(oJson[i]);
            $scope.flightList.push(oData);
        }
        $scope.showTable = true;
    }
    /**
     * 
     */
    var predict = function () {
        $http({
            method: 'POST',
            url: '/predict',
            data: $scope.selectedDateList
        }).then(function successCallback(response) {
            updateUi(response.data);
        }, function errorCallback(response) {
            console.error("Error");
        });
    }

    $scope.dateSelection = function(){
        $scope.selectedDateList.length = 0
        var selectedDate = $scope.selectedDate.split('T');
        for(var i=0;i<$scope.data.length;i++){
            var dateData = $scope.data[i].split('T');
            if(selectedDate[0] == dateData[0]){
                $scope.selectedDateList.push($scope.data[i])
            }
        }   
        predict();
    }
}