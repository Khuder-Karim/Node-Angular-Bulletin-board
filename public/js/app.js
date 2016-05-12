/**
 * Created by Karim on 10.04.2016.
 */
'use strict';

angular.module('courseApp', ['ui.router', 'ngResource'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/',
                cache: false,
                views: {
                    'header': {
                        templateUrl: 'views/header.html'
                    },
                    'content': {
                        templateUrl: 'views/home.html'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                }
            })

            .state('app.login', {
                url: '/login',
                views: {
                    'content@': {
                        templateUrl: 'views/login.html'
                    }
                }
            })

            .state('app.register', {
                url: 'register',
                views: {
                    'content@': {
                        templateUrl: 'views/register.html'
                    }
                }
            })

            .state('app.adCreate', {
                url: 'create',
                views: {
                    'content@': {
                        templateUrl: 'views/adCreate.html'
                    }
                }
            })

            .state('app.adDetails', {
                url: 'ad/:id',
                views: {
                    'content@': {
                        templateUrl: 'views/adDetail.html'
                    }
                }
            })

            .state('app.profile', {
                url: 'profile',
                views: {
                    'content@': {
                        templateUrl: 'views/profile.html'
                    }
                }
            })

            .state('app.adEdit', {
                url: 'ad/:id/change',
                views: {
                    'content@': {
                        templateUrl: 'views/adEdit.html'
                    }
                }
            })

        ;

        $urlRouterProvider.otherwise('/');
    })
    .run(['SessionFactory', function(SessionFactory) {
        SessionFactory.getSession();
    }])
    .constant('baseURL', "https://bulletin-board-app.herokuapp.com/")
;