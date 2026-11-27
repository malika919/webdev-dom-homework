import { getComments, updateToken } from "./api.js";
import { login } from "./api.js";
import { commentBtnClick } from "./listeners.js";
import { renderCommentsPage } from "./render.js";
import { renderRegistration } from "./renderRegistration.js";

export const renderLoginForAutorization = () => {
  const loginContainer = document.getElementById("app");

  loginContainer.innerHTML = `
    <div class="container">
      <div class="login-form">
        <h2>Вход</h2>
        <input type="text" class="login-input" placeholder="Введите логин" />
        <input
          type="password"
          class="password-input"
          placeholder="Введите пароль"
        />
        <button class="login-button">Войти</button>
        <button class="reg-button">Зарегистрироваться</button>
      </div>
    </div>
    `;

  const loginBtn = document.querySelector(".login-button");
  const loginInput = document.querySelector(".login-input");
  const passwordInput = document.querySelector(".password-input");
  loginInput.value = "";
  passwordInput.value = "";

  loginBtn.addEventListener("click", () => {
    if (!loginInput.value.trim() || !passwordInput.value.trim()) {
      alert("Заполните поля");
      return;
    }
    login(loginInput.value, passwordInput.value)
      .then((responseData) => {
        console.log(responseData);
        updateToken(responseData.user.token);
        renderCommentsPage();
        getComments();
        commentBtnClick();
      })
      .catch((error) => {
        alert(error.message);
      });
  });

  const regBtn = document.querySelector(".reg-button");
  const regLogin = document.querySelector(".login-input");
  const regName = document.querySelector(".login-name");
  const regPassword = document.querySelector(".password-input");

  regBtn.addEventListener("click", () => {
    renderRegistration();
  });
};
