var App = (function(){

    var Operation = {
        identity: {
            name: "Identity",
            arity: 0
        },
        inverse: {
            name: "Inverse",
            arity: 1
        },
        addition: {
            name: "Addition",
            arity: 2
        },
        multiplication: {
            name: "Multiplication",
            arity: 2
        },
        groupOperation: {
            name: "Group Operation",
            arity: 2
        },
        generic: {
            name: "Generic Binary Operation",
            arity: 2
        }
    };

    var Law = {
        closure: {
            name: "Closure",
            description: "&forall;a, b &in; S : a &sstarf; b &in; S"
        },
        associativity: {
            name: "Associativity",
            description: "&forall;a, b, c &in; S : (a &sstarf; b) &sstarf; c = a &sstarf; (b &sstarf; c)"
        },
        commutativity: {
            name: "Commutativity",
            description: "&forall;a, b &in; S : a &sstarf; b = b &sstarf; a"
        }
    };

    var Structure = {
        "group": {
            name: "Group",
            description: "Groups model symmetry and arise in many areas of mathematics, as well as in other fields of science. Due to their ubiquity, they are among the most well-studied mathematical objects. Apart from being important in their own right, groups also act as building blocks of more complex algebraic structures, e.g., rings, fields, and vector spaces.",
            operations: [
                {
                    symbol: "e",
                    operator: Operation.identity
                }, 
                {
                    symbol: "a<sup>-1</sup>",
                    operator: Operation.inverse
                },
                { 
                    symbol: "&sstarf;",
                    operator: Operation.groupOperation
                }
            ],
            laws: [Law.associativity, Law.closure],
            family: "group-like"
        },
        "semigroup": {
            name: "Semigroup",
            description: "A semigroup is a set together with an associative binary operation.",
            operations: [
                { 
                    symbol: "&sstarf;",
                    operator: Operation.groupOperation
                }
            ],
            laws: [Law.associativity, Law.closure],
            family: "group-like"
        },
        "magma": {
            name: "Magma",
            description: "A magma is the most basic of all algebraic structures. It is simply a set and an operation which satisfies the closure property. Magmas are rarely studied on their own, but rather as building blocks of more interesting structures. E.g., a semigroup is an associative magma, and a monoid is a semigroup with an identity.",
            operations: [
                {
                    symbol: "&bull;",
                    operator: Operation.generic
                }
            ],
            laws: [Law.closure],
            family: "group-like"
        },
        "monoid": {
            name: "Monoid",
            description: "@todo",
            family: "group-like"
        },
        "ring": {
            name: "Ring",
            description: "@todo",
            family: "ring-like"
        },
        "field": {
            name: "Field",
            description: "@todo",
            family: "ring-like"
        },
        "abelian-group": {
            name: "Abelian Group",
            description: "@todo",
            family: "group-like"
        },
        "multiplicative-group": {
            name: "Multiplicative Group",
            description: "@todo",
            family: "group-like"
        },
        "lattice": {
            name: "Lattice",
            description: "@todo",
            family: "lattice-like"
        },
        "poset": {
            name: "Poset",
            description: "@todo"
        },
        "totally-ordered-set": {
            name: "Totally Ordered Set",
            description: "@todo"
        },
        "preordered-set": {
            name: "Preordered Set",
            description: "@todo"
        },
        "commutative-ring": {
            name: "Commutative Ring",
            description: "@todo",
            family: "ring-like"
        },
        "integral-domain": {
            name: "Integral Domain",
            description: "@todo",
            family: "ring-like"
        },
        "vector-space": {
            name: "Vector Space",
            description: "@todo"
        }
    };

    var structs = [];

    for (item in Structure) {
        var s = Structure[item];
        s.key = item;
        structs.push(s);
    }

    return {
        structs: structs,
        getStructure: function(name) {
            return Structure[name];
        }
    };

}());

var algebraApp = angular.module('algebraApp', ['ngRoute', 'ngSanitize']);

algebraApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })
        .when('/algebra/:structure', {
            templateUrl : 'pages/algebra.html',
            controller  : 'algebraController'
        })
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        });
});

//algebraApp.controller('aboutController', function($scope) {
//
//});

algebraApp.controller('algebraController', function($scope, $routeParams) {

    $scope.structure = App.getStructure($routeParams.structure);

});

algebraApp.controller('mainController', function($scope) {

    var structs = App.structs,
        items = {};

    _.each(structs, function(item) {

        var key = item.family || "other";
        if (!items.hasOwnProperty(key)) {
            items[key] = [];
        }
        items[key].push(item);

    });

    var arr = [];

    _.each(items, function(key, val) {
        arr.push({
            name: val,
            structures: key 
        });
    });

    $scope.structures = arr;

});
