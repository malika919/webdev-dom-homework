import { registration, updateToken, getComments } from "./api.js"; // Добавь updateToken и getComments
import { renderCommentsPage } from "./render.js"; // Добавь renderCommentsPage

export const renderRegistration = () => {
  console.log("Функция renderRegistration вызвана!");
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
    console.log("кнопка нажата");
    registration(regLogin.value, regName.value, regPassword.value)
      .then((responseData) => {
        console.log(responseData);
        updateToken(responseData.user.token);
        renderCommentsPage();
        getComments();
      })
      .catch((error) => {
        alert(error.message);
      });
  });
};
