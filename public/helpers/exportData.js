var url = (window.location.hostname.includes('localhost'))
? 'http://localhost:3000/api/auth/login'
: 'https://server-rest-u.herokuapp.com/api/auth/login'

async function postAuth() {
    const email = document.getElementById('email').value || '';
    const password = document.getElementById('password').value || '';

    const data = {
        email : email,
        password : password}

    /*const data = {
        email : 'user9@gmail.com',
        password : '123456'}*/

    await fetch( url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify( data )
    })
    .then(resp => {return resp.json()})
    .then((resp) => {
        if(!resp.errors){
            location.href = '../longIn.html'
        }else{
            let msg = ''
            for (let i = 0; i < resp.errors.length; i++) {
                msg += resp.errors[i]["msg"] + '\n'
            }
            console.log(resp.errors)
            console.log(msg)
            document.getElementById("messageError").innerHTML = `${msg}`;
        }

    })
    .catch(console.log) 
}

