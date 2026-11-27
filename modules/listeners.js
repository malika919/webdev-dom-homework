import { postFetchFunction } from "./api.js";
import { commentsRender } from "./render.js";
import { validateInput } from "./utils.js";
import { comments } from "./data.js";
import { delay } from "./utils.js";
import { renderLoginForAutorization } from "./renderLogin.js";
import { isAuth } from "./api.js";

export const clickCommentContainer = () => {
  const commentsContainer = document.querySelector(".comments");
  return commentsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-button")) {
      const index = Number(e.target.dataset.index);
      const comment = comments[index];
      if (e.target) e.target.classList.add("-loading-like");
      delay(2000)
        .then(() => {
          comment.likes = comment.isLiked
            ? comment.likes - 1
            : comment.likes + 1;
          comment.isLiked = !comment.isLiked;
          comment.isLikeLoading = false;
        })
        .then(() => {
          e.target.classList.remove("-loading-like");
          commentsRender();
        });
    }
  });
};

export const commentInputClick = () => {
  const commentInput = document.querySelector(".add-form-name");
  if (!commentInput) {
    return;
  }
  return commentInput.addEventListener("input", () => {
    validateInput();
  });
};

export const commentTextClick = () => {
  const commentText = document.querySelector(".add-form-text");
  if (!commentText) {
    return;
  }
  return commentText.addEventListener("input", () => {
    validateInput();
  });
};

export const commentBtnClick = () => {
  console.log("клик");
  const commentText = document.querySelector(".add-form-text");
  const commentInput = document.querySelector(".add-form-name");
  const commentBtn = document.querySelector(".add-form-button");
  if (!commentBtn) {
    return;
  }
  return commentBtn.addEventListener("click", () => {
    if (!isAuth()) {
      alert("Авторизуйтесь, чтоб оставить комментарий");
      return;
    }
    if (commentInput.value === "" || commentText.value === "") {
      alert("Заполните поля");
      return;
    }

    commentBtn.disabled = true;
    commentBtn.textContent = "Добавление комментария...";
    postFetchFunction(commentInput.value, commentText.value)
      .then(() => {
        document.querySelector(".add-form-name").value = "";
        document.querySelector(".add-form-text").value = "";
        commentBtn.disabled = false;
        commentBtn.textContent = "Написать";

        return getComments();
      })
      .then((data) => {
        comments.length = 0;
        comments.push(...(data.comments || []));
        commentsRender();
      })
      .catch((error) => {
        alert(error.message);
        commentBtn.disabled = false;
        commentBtn.textContent = "Написать";
      });
  });
};

export const newCommentContainerClick = () => {
  const commentText = document.querySelector(".add-form-text");
  const commentsContainer = document.querySelector(".comments");
  return commentsContainer.addEventListener("click", (e) => {
    const newCommentForm = e.target.closest(".comment");
    if (e.target.classList.contains("like-button")) {
      return;
    } else if (newCommentForm) {
      const commentForm = newCommentForm.dataset.index;
      const commentArr = comments[commentForm];
      const commentName = commentArr.author.name;
      const commentTextForm = commentArr.text;
      commentText.value = `> ${commentName}, ${commentTextForm}\n\n `;
      validateInput();
      commentText.focus();
    }
  });
};

export const clickLoginBtn = () => {
  const autorizationLink = document.querySelector(".auto-link");
  if (autorizationLink) {
    autorizationLink.addEventListener("click", () => {
      renderLoginForAutorization();
    });
  }
};


