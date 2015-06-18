/// <reference path="../App.js" />
(function () {
    "use strict";

var app2 = angular.module('StarterApp', ['ngMaterial']);

app2.controller('AppCtrl', function($scope) {
    
        $scope.data = {
            group1: 'microsoft.com',
        };
        $scope.radioData = [
            { label: 'microsoft.com', value: 'microsoft.com' },
            { label: 'thebeebs.co.uk', value: 'yahoo.co.uk' },
        ];
        $scope.processing = false;
        $scope.result = false;
        $scope.showConfirm = function(ev){
            $scope.processing = true;
            $timeout(function () {
                $scope.processing = false;
                $scope.result = true;
            }, 3000);
        }
        
});

    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            displayItemDetails();
        });
    };

    // Displays the "Subject" and "From" fields, based on the current mail item
    function displayItemDetails() {
        var item = Office.cast.item.toItemRead(Office.context.mailbox.item);

        var from;
        if (item.itemType === Office.MailboxEnums.ItemType.Message) {
            from = Office.cast.item.toMessageRead(item).from;
        } else if (item.itemType === Office.MailboxEnums.ItemType.Appointment) {
            from = Office.cast.item.toAppointmentRead(item).organizer;
        }

        var rx = /^([\w\.]+)@([\w\.]+)$/;
        var match = rx.exec(from.emailAddress);
        $('#domain').text(match[2]);
    }
})();