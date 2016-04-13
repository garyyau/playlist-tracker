class URLValidatorService {
	constructor($http) {
		this.$http = $http;
	}
	isValid(url) {
		console.log(url);
		return this.$http.get(url).then(() => true, () => false);
	}
}
URLValidatorService.$inject = ['$http'];


module.exports = URLValidatorService;
