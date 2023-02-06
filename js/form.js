import { baseUrl } from "./contens/api.js";
import { saveToken, saveUser } from "./utils/storage.js";
import displayMessage from "./components/common/displayMassage.js";

const form = document.querySelector("#contactForm");
const email = document.querySelector("#email");

const password = document.querySelector("#password");

const massage = document.querySelector(".massage-container");

form.addEventListener("submit", validateForm);

function validateForm(event) {
  event.preventDefault();

  massage.innerHTML = "";

  const usernameValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0) {
    return displayMessage("message", "Mising username", ".massage-container");
  }
  if (passwordValue.length === 0) {
    return displayMessage("message", "Mising password", ".massage-container");
  }
  login(usernameValue, passwordValue);
}

async function login(email, password) {
  const url = baseUrl + "auth/local";
  const data = JSON.stringify({ identifier: email, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    if (json.user) {
      displayMessage("message", "Sucsessfully logged in", ".massage-container");

      saveToken(json.jwt);
      saveUser(json.user);
      //location.href = "/index.html";

      //url to Sucsessfully logged in
      location.href = "/sucsses.html";
    }
    if (json.error) {
      displayMessage("message", "Invalid username or password", ".massage-container");
    }
  } catch (error) {
    console.log(error);
    displayMessage(
      "message",
      "SyntaxError: 405 Unexpected token `Method Not Allowed`",
      ".massage-container"
    );
  }
}
