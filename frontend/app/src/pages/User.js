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
      .then((response) => {
        if(response.status === 401){
          alert('認証に失敗しました。メールアドレスとパスワードをご確認ください。');
        }
        else if(response.status !== 201){
          alert('送信に失敗しました');
        }
        return response.json();
      })
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

  signin = async (email, password) => {
    await fetch('http://localhost:4000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if(response.status === 401){
          alert('認証に失敗しました。メールアドレスとパスワードをご確認ください。');
        }
        else if(response.status !== 200){
          alert('送信に失敗しました');
        }
        return response.json();
      })
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

  logout = async () => {
    if (this.isLoggedIn()) {
      this.set('isLoggedIn', false);
      this.set('token', '');
    }
  };
}

export default new User();
