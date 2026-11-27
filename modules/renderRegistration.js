import { registration } from "./api.js";
import { getComments, updateToken } from "./api.js";
import { commentBtnClick } from "./listeners.js";
import { renderCommentsPage } from "./render.js";

export const renderRegistration = () => {
  const loginContainer = document.getElementById("app");

  loginContainer.innerHTML = `
    <div class="container">
      <div class="login-form">
        <h2>Регистрация</h2>
        <input type="text" class="login-input" placeholder="Введите логин" />
        <input type="text" class="login-name" placeholder="Введите имя" />
        <input
          type="password"
          class="password-input"
          placeholder="Введите пароль"
        />
        <button class="reg-button">Зарегистрироваться</button>
      </div>
    </div>
    `;

  const regBtn = document.querySelector(".reg-button");
  const regLogin = document.querySelector(".login-input");
  const regName = document.querySelector(".login-name");
  const regPassword = document.querySelector(".password-input");

  regBtn.addEventListener("click", () => {
    registration(regLogin.value, regName.value, regPassword.value)
      .then((responseData) => {
        console.log(responseData);
        updateToken(responseData.user.token);
        localStorage.setItem('userName', responseData.user.name)
        renderCommentsPage();
        commentBtnClick();
        getComments();
      })
      .catch((error) => {
        alert(error.message);
      });
  });
};

