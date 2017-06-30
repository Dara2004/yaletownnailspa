angular.module('subsCtrl', [])

    // inject the Subscribe service factory into our controller
    .controller('mainCtrl', ['$scope', '$http', 'Subscribers', function ($scope, $http, Subscribers) {
        $scope.formData = {};
        $scope.loading = true;

        // GET =====================================================================
        // when landing on the page, get list and show them
        // use the service to get all the subscribers
        Subscribers.get()
            .success(function (data) {
                $scope.list = data;
                $scope.loading = false;
                console.log(data);
            });

        // CREATE ==================================================================
        // when submitting the subs form, send the info to the node API
        $scope.addSubs = function () {
            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.name != undefined || $scope.formData.email != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Subscribers.create($scope.formData)
                    // if successful creation, call our get function to get all the new subs
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.list = data; // assign our new list of todos
                    });
            }
        };

        // DELETE ==================================================================
        // delete a subscriber when being unsubscribed

        $scope.deleteSub = function (id) {
            // if successful creation, call our get function to get all the remaining subs
            $scope.loading = true;
            Subscribers.delete(id)
                .success(function (data) {
                    $scope.loading = false;
                    $scope.list = data;
                })
        };


    }]);
