function signUp(){
    const user = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password01 = document.getElementById('password01').value;
    const textCerto = document.getElementById('certo')
    const textErro = document.getElementById('erro')

    //recupera lista de usuários armazenada em local storage ou cria uma lista vazia 
    //de usuários caso não haja nenhum usuario cadastrado
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

    //Verificar se email ja cadastrado
    let existentUser = usuarios.find(usuario => usuario.email === email)

    if(existentUser){
        textErro.innerHTML ="Usuário já cadastrado";
        return
    }

    //criar novo usuário que será armazenado na nossa lista local
    let newUser = {
        id: Date.now(),
        username: user,
        key: btoa(password),
        playlist: [],
        login: false
    }

    //colocando objeto no local Storage
    usuarios.push(newUser)

    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    textCerto.innerHTML = "Usuário cadastrado com sucesso ";


    if(!user || !password || !password){
        textErro.innerHTML ="Por favor, preencha todos os campos.";
        textCerto.innerHTML = " ";
    }else if(password != password01){
        textErro.innerHTML ="As senhas devem ser iguais";
        textCerto.innerHTML = " ";
    }else{
    // localStorage.setItem("username",user);
    // localStorage.setItem("key",password);
    textErro.innerHTML =" ";
    textCerto.innerHTML = "Cadastro feito com sucesso";

    

    setTimeout(() => {
        window.location.href = "./Entrar.html"
    }, 30)
}}