import { commentsRender } from "./render.js";
import { comments } from "./data.js";

const host = "https://wedev-api.sky.pro/api/v2/mmm/comments";
const postToken = "https://wedev-api.sky.pro/api/user";

let token = "";

export const updateToken = (newToken) => {
  token = newToken;
};

export const postFetchFunction = () => {
  const commentInput = document.querySelector(".add-form-name");
  const commentText = document.querySelector(".add-form-text");
  const commentBtn = document.querySelector(".add-form-button");
  return fetch("https://wedev-api.sky.pro/api/v2/malika_919/comments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: commentInput.value,
      text: commentText.value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("name должен содержать хотя бы 3 символа");
        }
        if (response.status === 500) {
          throw new Error("Сервер упал, попробуйте позже");
        }
        throw new Error("Проверьте соединение");
      } else if (response.ok) {
        return response.json();
      }
    })
    .then(() => {
      commentInput.value = "";
      commentText.value = "";
      commentBtn.disabled = false;
      commentBtn.textContent = "Написать";
      getComments();
    })
    .catch((error) => {
      if (error.message === "Failed to fetch") {
        alert("Сервер упал, попробуйте позже");
      } else {
        alert(error.message);
      }
      commentBtn.disabled = false;
      commentBtn.textContent = "Написать";
    });
};

export const getComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v2/malika_919/comments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      comments.length = 0; // Очищаем старый массив
      comments.push(...data.comments); // Добавляем новые
      commentsRender();
    });
};

export const login = (login, password) => {
  return fetch(`${postToken}/login`, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    return response.json();
  });
};

export const registration = (login, name, password) => {
  return fetch(postToken, {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  }).then((response) => {
    return response.json();
  });
};
