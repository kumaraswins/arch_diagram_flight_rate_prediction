angular
    .module('SampleAPP', ['ngAnimate', 'ngMaterial', 'ngMdIcons', 'ngRoute'])
    .config(function ($mdThemingProvider, $routeProvider, $mdIconProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "../static/partials/register.html"
            }).when('/dashboard', {
                templateUrl: "../static/partials/dashboard.html"
            }).when('/users', {
                templateUrl: "../static/partials/friends.html"
            }).when('/message', {
                templateUrl: "../static/partials/messsages.html"
            }).when('/delete', {
                templateUrl: "../static/partials/trash.html"
            });
        $mdIconProvider
            .defaultIconSet("./lib/svg/avatars.svg", 128)
            .icon("menu", "./lib/svg/menu.svg", 24)
            .icon("share", "./lib/svg/share.svg", 24)
            .icon("google_plus", "./lib/svg/google_plus.svg", 512)
            .icon("hangouts", "./lib/svg/hangouts.svg", 512)
            .icon("twitter", "./lib/svg/twitter.svg", 512)
            .icon("phone", "./lib/svg/phone.svg", 512);
        var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });
        $mdThemingProvider.definePalette('customBlue', customBlueMap);
        $mdThemingProvider.theme('default')
            .primaryPalette('purple', {
                'default': '500',
                'hue-1': '50'
            })
            .accentPalette('pink');
        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey')

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    });


angular
    .module('SampleAPP')
    .controller('MainController', [
          '$scope','$rootScope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$location',
          MainController
       ]);

function MainController($scope,$rootScope, $mdBottomSheet, $mdSidenav, $mdDialog, $location) {
    
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };
    $rootScope.app = {};
    $rootScope.app.showNavBar = false;
    $scope.menu = [
        {
            link: 'dashboard',
            title: 'Dashboard',
            icon: 'dashboard'
    },
        {
            link: 'users',
            title: 'Users',
            icon: 'group'
    },
        {
            link: 'message',
            title: 'Messages',
            icon: 'message'
    }
  ];
    $scope.admin = [
        {
            link: 'delete',
            title: 'Trash',
            icon: 'delete'
    },
        {
            link: 'settings',
            title: 'Settings',
            icon: 'settings'
    }
  ];
    $scope.navigate = function (url) {
        if (url == "settings") {
            //$scope.showListBottomSheet();
            return;
        }
        $location.path("/" + url)
    }
    $scope.alert = '';
}