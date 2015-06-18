/// <reference path="../App.js" />
(function () {
    "use strict";

var app2 = angular.module('StarterApp', ['ngMaterial']);

app2.controller('AppCtrl', function($scope, $http) {
    
        $scope.data = {
            group1: 'microsoft.com',
        };
        $scope.radioData = [];
        $scope.tests = 
               { "Name": "thebeebs.co.uk", "Test1": "Pass", "Test2": "Pass", "Test3": "Pass", "Test4": "Pass", "Test5": "Pass", "ResultText": "Your site is edge compatible.", "Passed": true }
        ;
        $scope.processing = false;
        $scope.result = false;
        $scope.load = function (sites) {
            for (var i = 0; i < sites.length; i++) {
                $scope.radioData.push(sites[i])
                $scope.data.group1 = sites[i].value;
            }
        }
        $scope.showConfirm = function (ev) {
            $scope.processing = true;
            
            //https://sitescanapi.azurewebsites.net
            $http.get('../../api/sites/?site=' + $scope.data.group1).
                                success(function (data) {
                                    $scope.processing = false;
                                    $scope.tests = data;
                                    console.log("Got It");
                                    console.log(data);
                                }).
                               error(function (data) {
                                   console.log("Yikes");
                                   console.log(data);
                               });
        }
        
});

    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
            var scope = angular.element(document.getElementById('body')).scope();
            var sites = [
            { label: 'microsoft.com', value: 'microsoft.com' },
            { label: 'remote.co.uk', value: 'remote.co.uk' },
            ];
            var sites = getUsersSites();
            scope.load(sites);
        });
    };

    // Displays the "Subject" and "From" fields, based on the current mail item
    function getUsersSites() {
        var item = Office.cast.item.toItemRead(Office.context.mailbox.item);

        var from;
        if (item.itemType === Office.MailboxEnums.ItemType.Message) {
            from = Office.cast.item.toMessageRead(item).from;
        } else if (item.itemType === Office.MailboxEnums.ItemType.Appointment) {
            from = Office.cast.item.toAppointmentRead(item).organizer;
        }

        var rx = /^([\w\.]+)@([\w\.]+)$/;
        var match = rx.exec(from.emailAddress);
        var site = match[2];

        return [
           { label: site, value: 'http://www.' + site }           
        ];
    }
})();