// Insert your api key here
// const MY_API_KEY = "";
const LIMIT = 3;
const RATING = "g";

let offset = 0;
let pages = 1;
let SEARCH_QUERY = "";

const form = document.getElementById("form");
const gif_section = document.getElementById("gif_section");
const form_input = document.getElementById("form_input");
const load_more_btn = document.querySelector(".load_more_btn");

form.addEventListener("submit", getResults);
load_more_btn.addEventListener("click", loadMore);

async function getResults(e) {
    e.preventDefault();

    // clear gif section when user searches new term
    clearGifSection();

    SEARCH_QUERY = e.target.searchTerm.value;

    const gifs = await turnIntoJson(SEARCH_QUERY);

    checkIfLoadMoreBtnIsHidden();

    displayResults(gifs, SEARCH_QUERY);

    // Clear the searchbar back to empty str after results have been displayed
    form_input.value = "";
}

async function turnIntoJson(SEARCH_QUERY) {
    const API_URL = `http://api.giphy.com/v1/gifs/search?api_key=${MY_API_KEY}&q=${SEARCH_QUERY}&limit=${LIMIT}&rating=${RATING}&offset=${offset}`;
    const response = await fetch(API_URL);
    return await response.json();
}

function checkIfLoadMoreBtnIsHidden() {
    const load_more = load_more_btn.classList;
    if (load_more.contains("hidden")) load_more.remove("hidden");
}

function clearGifSection() {
    gif_section.innerHTML = ``;
}

function displayResults(gifs, SEARCH_QUERY) {
    gifs.data.forEach((gif) => {
        const images_object = gif.images.fixed_height.url;

        gif_section.innerHTML += `<img
            src=${images_object}
            alt="Gif of ${SEARCH_QUERY}"/>
        `;
    });
}

async function loadMore() {
    offset = pages * LIMIT;
    pages += 1;
    const newGifs = await turnIntoJson(SEARCH_QUERY);
    displayResults(newGifs, SEARCH_QUERY);
}
