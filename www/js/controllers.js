angular.module('starter.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, Persistence) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  // Playlist dialog part

  // Form data for the add playlist modal
  $scope.playlistData = {};

  // Create the add playlist modal that we will use later
  $ionicModal.fromTemplateUrl('templates/add-playlist.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.addDialog = modal;
  });

  // Triggered in the add playlist modal to close it
  $scope.closeAddDialog = function() {
    $scope.addDialog.hide();
  },

  // Open the add playlist modal
  $scope.showAddDialog = function() {
    $scope.addDialog.show();
  };

  // Perform the add playlist action when the user submits the add playlist form
  $scope.doAddDialog = function() {
    var playlist = new Persistence.Entities.Playlist({title: $scope.playlistData.title});
    Persistence.add(playlist);
    $scope.$broadcast('playlistAdded', playlist);

    $scope.playlistData = '';
    $scope.closeAddDialog();
  };
})

.controller('PlaylistsCtrl', function($scope, Persistence) {
  var getPlaylists = function() {
    Persistence.getAllPlaylists().then(function (response) {
      $scope.playlists = response;
    });
  };

  getPlaylists();

  $scope.$on('playlistAdded', function(event, playlist) {
    getPlaylists();
  });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
