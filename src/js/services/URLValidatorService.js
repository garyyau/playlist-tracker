class URLValidatorService {
	constructor($http) {
		this.$http = $http;
	}
	isValid(url) {
		return this.$http.get(url)
						 .then((res) => true)
						 .catch((e) => {
							return false;
						 });
	}
}
URLValidatorService.$inject = ['$http'];


module.exports = URLValidatorService;
