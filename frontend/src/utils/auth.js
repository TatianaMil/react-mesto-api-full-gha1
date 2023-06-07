//авторизция и регистрация пользователя
class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  register(newUserData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: newUserData.email,
        password: newUserData.password,
      }),
    }).then(this._getResponseData)
  }

  login(userData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    }).then(this._getResponseData)
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData)
  }
}

const auth = new Auth({
  baseUrl: "https://api.milinova.nomoredomains.rocks",
 // baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
   
  },
})

export default auth
