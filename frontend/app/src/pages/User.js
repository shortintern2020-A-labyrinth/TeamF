// Author: Kota Ikehara
class User {
  isLoggedIn = () => this.get('isLoggedIn') === 'true';

  set = (key, value) => localStorage.setItem(key, value);

  get = (key) => this.getLocalStorage(key);

  getLocalStorage = (key) => {
    const ret = localStorage.getItem(key);
    if (ret) {
      return ret;
    }
    return null;
  };

  signup = async (email, password, name) => {
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        user_name: name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.access_token);
        if (this.get('token') === 'undefined') {
          this.set('isLoggedIn', false);
        } else {
          this.set('isLoggedIn', true);
        }
      })
      .catch((error) => {
        alert(error.message);
        this.set('isLoggedIn', false);
      });
  };

  login = async (email, password) => {};

  logout = async () => {
    if (this.isLoggedIn()) {
      this.set('isLoggedIn', false);
    }
  };
}

export default new User();
