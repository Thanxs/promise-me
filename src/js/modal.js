function activateModal() {
    const registrationForm = document.createElement('div');
    registrationForm.classList.add('modal__registration');

    registrationForm.innerHTML = `<form class="mui-form modal__registration-form" id="auth-form">
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
                                    </form>`;
    mui.overlay('on', registrationForm);
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true});
}

function authFormHandler(event) {
    event.preventDefault();

    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;

    authWithEmailAndPassword(email, password).then(email => {
        if(email) {
            document.getElementById('user-login').innerHTML = `
                                                                        <div>${email}</div>
                                                                        <div class="header__exit">Выйти</div>
                                                                        `;
        } else {
            const btnToLogin = document.querySelector('.modal__registration-btn');
            const errorText = document.createElement('div');
            errorText.innerHTML = `<div>Вы ввели неверную почту или пароль</div>`;
            errorText.classList.add('header__login-error');
            btnToLogin.before(errorText)
        }
    });
}
