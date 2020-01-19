function getAuthForm() {
    return `
            <form class="mui-form modal__registration-form" id="auth-form">
                          <legend class="modal__registration-title">Вход</legend>
                          <div class="mui-textfield mui-textfield--float-label">
                            <input type="email" id="email">
                            <label for="email">Email</label>
                          </div>
                          <div class="mui-textfield mui-textfield--float-label">
                            <input type="password" id="password">
                            <label for="password">Пароль</label>
                          </div>                          
                          <button type="submit" class="mui-btn mui--bg-accent modal__registration-btn">Войти</button>
            </form>
    `
}

function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyCdVcWhQIw_5Qv7aUHy2rUl5-Dgqdz8W-Y';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
            method: 'POST',
            body: JSON.stringify({
                email, password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/JSON'
            }
        })
        .then(response => response.json())
        .then(data => data.email);
}

