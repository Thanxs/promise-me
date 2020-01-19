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

