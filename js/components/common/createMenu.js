import { getUsername } from "../../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
  const { pathname } = document.location;

  const container = document.querySelector(".menu-container");

  const username = getUsername();

  let authLink = `<a href="sign-in.html" class="${
    pathname === "/sign-in.html" ? "active" : ""
  }>Login</a>`;

  if (!username) {
    //authLink = `<a href="sign-in.html">Login</a>`;
    location.reload();
    window.location.href = "/sign-in.html";
  } else {
    authLink = `<button id="logout">Logout</button>
    <span>Hi${username}</span>`;
  }
  console.log(username);

  container.innerHTML = `<div class="menu">
                              <a href="/" class="${pathname === "/" ? "active" : ""}">Home</a>
                              ${authLink}   
                           </div>`;
  logoutButton();
}
