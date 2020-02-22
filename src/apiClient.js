/**
 * REST Countries URL to fetch countries information
 **/
const COUNTRIES_URL = "https://restcountries.eu";

/**
 * Fetches all countries that match the request
 */
const ALL_COUNTRIES_MATCHING_NAME = keywords => {
	return COUNTRIES_URL + "/rest/v2/name/" + keywords;
};

/**
 * Fetches all countries that match the code
 */
const ALL_COUNTRIES_MATCHING_CODES = codes => {
	return COUNTRIES_URL + "/rest/v2/alpha?codes=" + codes.join(';');
};

/**
 * API Client
 * Object that contains the different
 * requests we allow the user to execute
 * @return object containing the allowed methods
 */
const apiClient = {
	countries: {
		async fetchAllMatchingName(keywords) {
			return fetch(ALL_COUNTRIES_MATCHING_NAME(keywords));
		},
		async fetchAllMatchingCodes(codes) {
			return fetch(ALL_COUNTRIES_MATCHING_CODES(codes));
		},
	}
};

window.apiClient = apiClient;