import { baseUrl } from "./contens/api.js";
import { baseImgUrl } from "./contens/api.js";
import displayMessage from "./components/common/displayMassage.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");
console.log("id:id", id);

if (!id) {
  document.location.href = "/";
  console.log("id", id);
}

const productUrl = baseUrl + "products/" + id + "?populate=*";

console.log("url", productUrl);

(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();
    console.log("details:", details);

    document.title = details.data.attributes.name;

    const container = document.querySelector(".products");
    container.innerHTML = `
    <div class="card">
    <img src="${baseImgUrl}${details.data.attributes.images.data.attributes.url}" class="card-img-top" alt="image for ${details.data.attributes.name}">
    <div class="card-body">
      <h5 class="card-title">${details.data.attributes.name}</h5>
      <p class="card-text">
        ${details.data.attributes.description}
      </p>
      <p class="card-text"><small class="text-muted">${details.data.attributes.price}</small></p>
    </div>`;
  } catch (error) {
    displayMessage("error", error, ".container");
  }
})();
