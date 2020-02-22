// DOM Elements of the UI we will need to manipulate
const searchInput = document.querySelector("#countries-search");
const clearSearchBtn = document.querySelector("#clear-search-btn");
const resultsList = document.querySelector("#countries-search-results-list");
const resultSnippet = document.querySelector("#countries-search-results-snippet");

// Template for a country result list item
const CountryListItem = item => {
	let container = document.createElement('div');
	container.className = 'cursor-pointer country-list-item';

	container.innerHTML =
		`<small>${item.alpha3Code}</small>
		<h4>${item.name}</h4>`
	;

	container.addEventListener('click', e => {
		resultsList.querySelectorAll('.country-list-item').forEach(item => item.classList.remove('selected'));
		container.classList.add('selected');

		showCountryDetailedSnippet(item);
	})

	return containerr;
};

// Template for a country result detailed snippet
const DetailedSnippet = item => {
	let container = document.createElement('div');
	container.className = 'country-detailed-snippet';

	container.innerHTML =
		`<div class="country-detailed-snippet-header">
			<div class="row justify-start align-start">
				<div class="country-flag">
					<img src="${item.flag}" alt="${item.name}" />
				</div>
				<div class="country-main-info">
					<div class="row justify-between align-start country-names">
						<h3 class="country-name">${item.nativeName}</h3>
						<em>${item.alpha3Code}, ${item.alpha2Code}</em>
					</div>
					<div class="country-demographic-data">
						<span>
							<i class="fas fa-city"></i> ${item.capital}
						</span>
						<span title="${item.population}">
							<i class="fas fa-users"></i> ${humanizeNumber(item.population)}
						</span>
						<span>
							<i class="fas fa-clock"></i> ${item.timezones[0]}
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="country-detailed-snippet-body">
			<div class="row card-info-row">
				<label>Languages</label>
				<div>
					${
						item.languages
							.map(l => '<strong>' + l.name + '</strong>')
							.join('<br>')
					}
				</div>
			</div>
			<div class="row card-info-row">
				<label>Currencies</label>
				<div>
					${
						item.currencies
							.map(c => {
								let symbol = c.symbol ? '<span class="tag">' + c.symbol + '</span>' : '';
								let code = c.code ? '(' + c.code + ')' : '';
								return symbol + ' <strong>' + c.name + '</strong> ' + code;
							}).join('<br>')
					}
				</div>
			</div>
			<div class="row card-info-row">
				<label>Border countries</label>
				<div id="border-countries-list">Loading...</div>
			</div>
		</div>`
	;

	return container;
};

// Make an API call to fetch countries matching the border countries codes
const fetchBorderCountries = async country => {
	const listElement = document.querySelector('#border-countries-list');
	try {
		const response = await apiClient.countries.fetchAllMatchingCodes(country.borders);
		const result = await response.json();

		if(result.length) {
			let list = document.createElement('p');
			list.className = 'border-countries-list';

			result.forEach(item => {
				let cName = document.createElement('strong');
				let cNameIcon = document.createElement('i');
				cNameIcon.className = 'fas fa-search cursor-pointer border-country-search';
				cName.innerHTML = item.name;
				cNameIcon.addEventListener('click', e => {
					searchInput.value = item.name;
					fetchAndRender(item.name);
				})
				cName.append(cNameIcon);
				list.append(cName);
			});
	
			listElement.innerHTML = '';
			listElement.appendChild(list);
		} else {
			listElement.innerHTML = 'None.';
		}
	} catch(err) {
		console.log(err);
	}
}

const showCountriesSearchResults = result => {
	resultsList.innerHTML = '';
	result.forEach(item => {
		resultsList.appendChild(CountryListItem(item))
	});
}

const emptySearchResults = () => {
	resultsList.innerHTML = 'No result found...';
}

const showCountryDetailedSnippet = country => {
	resultSnippet.innerHTML = '';
	resultSnippet.appendChild(DetailedSnippet(country));
	fetchBorderCountries(country);
}

const emptyDetailedSnippet = () => {
	resultSnippet.innerHTML = '';
}

const fetchAndRender = (terms) => {
	apiClient.countries.fetchAllMatchingName(terms)
		.then(response => response.json())
		.then(result => {
			if (result.length) {
				showCountriesSearchResults(result);
				showCountryDetailedSnippet(result[0]);
				
				resultsList.querySelector(':first-child').classList.add('selected');
			} else {
				emptySearchResults();
				emptyDetailedSnippet();
			}
		});
}