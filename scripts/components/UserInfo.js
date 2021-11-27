export default class UserInfo {
  constructor({ username, job }) {
    this._username = username;
    this._job = job;
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._username.textContent,
      job: this._job.textContent
    }

    return userInfo;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userdata) {
    this._username.textContent = userdata.name;
    this._job.textContent = userdata.job;
  }
}
