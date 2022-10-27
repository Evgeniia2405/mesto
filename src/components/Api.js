export default class Api {
  #url;
  #header;

  constructor(config) {
    this.#url = config.url;
    this.#header = config.headers;
  }

  getUserInfo() {
    return fetch(`${this.#url}/users/me`, {
      headers: this.#header})
        .then(response => {   //получает юрл и объект опций, возвращаем промис
          if (response.ok) {
            // console.log(response)
          return response.json()
          }
      return Promise.reject(new Error(response.status))
    })
    .catch((err) => Promise.reject(err));
  }

  getInitialCards() {
    return fetch(`${this.#url}/cards`, {
      headers: this.#header})
        .then(response => {   //получает юрл и объект опций, возвращаем промис
          if (response.ok) {
            // console.log(response)
          return response.json()
          }
      return Promise.reject(new Error(response.status))
    })
    .catch((err) => Promise.reject(err));
  }

  editUserInfo(name, about) {
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers: this.#header,
      body: JSON.stringify({ name, about }),
    })
      .then(response => {   //получает юрл и объект опций, возвращаем промис
        if (response.ok) {
          // console.log(response)
        return response.json()
      }

      return Promise.reject(new Error(response.status))
    })
    .catch((err) => Promise.reject(err));
  }

  editUserAvatar(avatar) {
    return fetch(`${this.#url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.#header,
      body: JSON.stringify({ avatar }),
    })
      .then(response => {   //получает юрл и объект опций, возвращаем промис
        if (response.ok) {
          console.log(response)
        return response.json()
      }

      return Promise.reject(new Error(response.status))
    })
    .catch((err) => Promise.reject(err));
  }

  createCard(name, link) {
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      headers: this.#header,
      body: JSON.stringify({ name, link }),
    })
      .then(response => {   //получает юрл и объект опций, возвращаем промис
        if (response.ok) {
          console.log(response)
        return response.json()
      }

      return Promise.reject(new Error(response.status))
    })
    .catch((err) => Promise.reject(err));
  }


  addLikeCard(cardId) {
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.#header,
    })
      .then(response => {   //получает юрл и объект опций, возвращаем промис
        if (response.ok) {
          // console.log(response)
        return response.json()
      }

      return Promise.reject(new Error(response.status))
    })
    .catch((err) => Promise.reject(err));
  }

  removeLikeCard(cardId) {
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.#header,
    })
      .then(response => {   //получает юрл и объект опций, возвращаем промис
        if (response.ok) {
          // console.log(response)
        return response.json()
      }

      return Promise.reject(new Error(response.status))
    })
    .catch((err) => Promise.reject(err));
  }


  deleteCard(cardId) {
    return fetch(`${this.#url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.#header,
      // body: JSON.stringify({ title }),
    })
      .then(response => {   //получает юрл и объект опций, возвращаем промис
        if (response.ok) {
          // console.log(response)
        return response.json()
      }

      return Promise.reject(new Error(response.status))
    })
    .catch((err) => Promise.reject(err));
  }
}
