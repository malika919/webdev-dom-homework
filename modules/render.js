import { errorMoment } from "./utils.js";
import { formatDate } from "./utils.js";
import { comments } from "./data.js";
import { isAuth } from "./api.js";

export const renderCommentsPage = () => {
  const app = document.getElementById("app");
  const savedName = localStorage.getItem("userName" || "");
  const formLink = isAuth()
    ? ` <div class="add-form">
          <input value="${savedName}" type="text" class="add-form-name" placeholder="Введите ваше имя" / readonly>
          <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
          <div class="add-form-row">
            <button class="add-form-button">Написать</button>
          </div>
        </div>`
    : `<p><a href='#' class='auto-link'>Авторизуйтесь</a>, чтобы добавить комментарий</p>`;

  if (!app) return;

  app.innerHTML = `
    <div id="app" class="container">
      <ul class="comments">
      </ul>
      ${formLink}
      </div>
    </div>
  `;
};

export const commentsRender = () => {
  const commentsContainer = document.querySelector(".comments");
  const commentElement = comments
    .map((comment, index) => {
      return `<li data-index="${index}" class="comment">
        <div class="comment-header">
          <div class="comment-name">${errorMoment(comment.author.name)}</div>
          <div class="commnet-date">${formatDate(comment.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${errorMoment(comment.text)}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button id='comment-like--btn' data-index='${index}' class='${comment.isLiked ? "like-button -active-like" : "like-button"}'></button>
          </div>
        </div>
      </li>`;
    })
    .join("");

  commentsContainer.innerHTML = commentElement;
};
