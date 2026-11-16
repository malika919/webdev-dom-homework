import { getComments } from "./api.js";
import { clickCommentContainer } from "./listeners.js";
import { commentInputClick } from "./listeners.js";
import { commentTextClick } from "./listeners.js";
import { commentBtnClick } from "./listeners.js";
import { newCommentContainerClick } from "./listeners.js";
import { validateInput } from "./utils.js";

const commentsContainer = document.querySelector(".comments");
validateInput();
clickCommentContainer();
commentsContainer.innerHTML = "Загрузка...";
commentInputClick();
commentTextClick();
commentBtnClick();
newCommentContainerClick();
commentsContainer.disabled = true;
commentsContainer.innerHTML =
  "<p style='color: white; text-align: center;'>Загрузка...</p>";

getComments();
