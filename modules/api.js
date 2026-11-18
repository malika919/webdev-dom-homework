export const postFetchFunction = (name, text) => {
  return fetch("https://wedev-api.sky.pro/api/v1/malika_919/comments", {
    method: "POST",
    body: JSON.stringify({ name, text }),
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 400)
        throw new Error("Имя или текст слишком короткие");
      if (response.status === 500)
        throw new Error("Сервер упал, попробуйте позже");
      throw new Error("Проверьте соединение");
    }
    return response.json();
  });
};

export const getComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/malika_919/comments").then(
    (response) => {
      if (!response.ok) throw new Error("Ошибка сервера");
      return response.json();
    },
  );
};
