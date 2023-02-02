import { baseUrl } from "./contens/api.js";
import { baseImgUrl } from "./contens/api.js";
import displayMessage from "./components/common/displayMassage.js";
import createMenu from "./components/common/createMenu.js";

const productsUrl = baseUrl + "products?populate=*";

createMenu();

(async function () {
  const productsContainer = document.querySelector(".products");
  try {
    const apiResponse = await fetch(productsUrl);
    const json = await apiResponse.json();

    console.log("1", json);
    console.log("3", apiResponse.status);

    if (Array.isArray(json.data)) {
      productsContainer.innerHTML = "";
      json.data.forEach(function (product) {
        console.log("product", product);

        productsContainer.innerHTML += `
        <div class="col-sm-6 col-lg-4 mb-4">
                <div class="card">
                <a href="detail.html?id=${product.id}">
                      <img src="${baseImgUrl}${product.attributes.images.data.attributes.url}" class="card-img-top" alt="image for ${product.attributes.name}">
                      <div class="card-body">
                        <h5 class="card-title">${product.attributes.name}</h5>
                        <p class="card-text">
                          ${product.attributes.description}
                        </p>
                        <p class="card-text"><small class="text-muted">${product.attributes.price}</small></p>
                        <p class="card-text"><small class="text-muted">${product.id}</small></p>
                      </div></a>
                    </div>`;
      });
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".products");
  }
})();
