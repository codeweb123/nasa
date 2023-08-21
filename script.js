const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");

const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function updateDOM() {
  resultsArray.forEach((result) => {
    //card container
    const card = document.createElement("div");
    card.classList.add("card");
    //link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";
    //image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Pic of the day";
    image.loading = "lazy";
    image.classList.add("card-img-top");

    //card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    //card title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-tile");
    cardTitle.textContent = result.title;
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "Add to Favorites";
    saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    const date = document.createElement("strong");
    date.textContent = result.date;

    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = `${copyrightResult}`;
    footer.append(date, copyright);
    cardBody.append(cardTitle, cardText, saveText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}
// Get 10 images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDOM();
  } catch (error) {
    //catch error here
  }
}
function saveFavorite(itemUrl) {
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl))
  })
}

getNasaPictures();
