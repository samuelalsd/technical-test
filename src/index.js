import "./styles.css";

// DOM Elements of the UI we will need to manipulate
const searchInput = document.querySelector("#countries-search");
const clearSearchBtn = document.querySelector("#clear-search-btn");

// Listen to keyup on search input
searchInput.addEventListener("keyup", e => {
  if (e.target.value) {
    searchInput.parentNode.classList.add("not-empty");
    renderSearchResults(e.target.value);
  } else {
    searchInput.parentNode.classList.remove("not-empty");
  }
});

// Render search results
const renderSearchResults = keywords => {
  if (keywords) {
    fetchAndRender(keywords);
  } else {
    emptySearchResults();
    emptyDetailedSnippet();
  }
};

// Clear search on user request (click on the dedicated button)
clearSearchBtn.addEventListener("click", e => {
  searchInput.value = "";
  searchInput.parentNode.classList.remove("not-empty");
});

// Trigger application dark mode
const darkModeTrigger = document.querySelector("#dark-mode-trigger");
darkModeTrigger.addEventListener("click", e => {
  darkModeTrigger.classList.toggle("enabled");
  document.querySelector("body").classList.toggle("dark-mode");
});
