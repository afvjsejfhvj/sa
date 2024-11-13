function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let textCerto = document.getElementById('certo');
    let textErro = document.getElementById('erro');

    let usuario = usuarios.find(usuario => usuario.username === email && usuario.key === btoa(password));

    if (usuario) {
        // Define o login como true
        usuario.login = true;

        // Atualiza o local storage com o usuário modificado
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));

        console.log('sessionStorage atualizado:', sessionStorage.getItem('usuarioLogado'));

        textErro.innerHTML = " ";
        textCerto.innerHTML = "Login feito com sucesso";

        setTimeout(() => {
            console.log("redireciona para index.html");
            window.location.href = 'index.html';
        }, 50);
    } else {
        textErro.innerHTML = "Senha ou email incorreto";
        textCerto.innerHTML = " ";
        document.getElementById('mensagem').innerText = 'usuário ou senha incorretos';
        console.log("login com erro");
        return;
    }
}