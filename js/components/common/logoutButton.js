import { clearStorage } from "../../utils/storage.js";

export default function logoutButton() {
  const button = document.querySelector("#logout");
  if (button) {
    button.onclick = function () {
      const dologout = confirm("Yes sure just fuck off!");
      if (dologout) {
        clearStorage();
        location.href = "/sign-in.html";
      }
    };
  }
}
