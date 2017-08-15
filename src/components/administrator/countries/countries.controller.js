angular.module('job')
  .controller('CountriesController', ['_', '$scope', 'CountriesService', function (_, $scope, CountriesService) {
    $scope.sort = {country: 1};
    $scope.searchCountries = {};
    $scope.countries = [];

    $scope.getPagingCountries = function (limit) {
      if ($scope.loadPaging) {
        return;
      }

      if (!$scope.loadPage) {
        $scope.loadPaging = true;
      }

      var skip = $scope.countries.length;
      var query = _.assign({skip: skip, limit: limit}, preparationQuery());

      CountriesService.getPagingCountries(query, function (err, countries) {
        if (err) {
          return console.error(err);
        }

        Array.prototype.push.apply($scope.countries, countries);

        $scope.loadPaging = false;

        if ($scope.loadPage) {
          $scope.loadPage = false;
        }
      });
    };

    $scope.saveDescription = function (data, location) {
      CountriesService.saveCountryDescription(location, function (err) {
        if (err) {
          return console.error(err);
        }
      });
    };

    $scope.checkAlias = function(data) {
      if (!data) {
        return 'This field must not be empty!';
      }
    };

    var filterWatch = _.debounce(watchFilter, 300);

    $scope.$watchGroup(['searchCountries.country', 'sort'], filterWatch);

    function watchFilter(n, o) {
      if (!_.isEqual(n, o)) {
        $scope.countries.length = 0;
        $scope.loadPage = true;
        $scope.getPagingCountries(18);
      }
    }

    $scope.tableHeader = [{
      name: 'Country',
      class: 'col-md-3 sorting up'
    }, {
      name: 'Alias',
      class: 'col-md-3 sorting'
    }, {
      name: 'Description',
      class: 'col-md-6 background-white'
    }];

    function preparationQuery() {
      var query = {};

      if ($scope.searchCountries.country) {
        query.search = $scope.searchCountries.country;
      }

      if ($scope.sort) {
        query.sort = $scope.sort;
      }

      return query;
    }
  }]);
