import { getComments } from "./api.js";
import { clickCommentContainer } from "./listeners.js";
import { commentInputClick } from "./listeners.js";
import { commentTextClick } from "./listeners.js";
import { commentBtnClick } from "./listeners.js";
import { newCommentContainerClick } from "./listeners.js";
import { validateInput } from "./utils.js";
import { renderCommentsPage } from "./render.js";
import { clickLoginBtn } from "./listeners.js";

renderCommentsPage();
validateInput();
clickCommentContainer();
commentInputClick();
commentTextClick();
commentBtnClick();
newCommentContainerClick();
getComments();
clickLoginBtn();
