document.addEventListener("DOMContentLoaded", function () {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    function registrarUsuario(nomeUsuario, senha) {
        const novoUsuario = { nomeUsuario, senha };
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    var resposta = document.querySelector("#resposta");

    const botao_register = document.getElementById("fazer_registro");
    botao_register.addEventListener("click", function (event) {
        event.preventDefault();
        const registerUsername = document.getElementById("login-username").value;
        const registerPassword = document.getElementById("login-password").value;

        registrarUsuario(registerUsername, registerPassword);
        resposta.innerText = "Usuário registrado com sucesso!";
        document.getElementById("login-username").value = "";
        document.getElementById("login-password").value = "";
    });

    const inputUsername = document.getElementById("login-username");
    const keyIcon = document.getElementById("keyIcon");

    const originalIconClass = keyIcon.className;

    inputUsername.addEventListener("focus", function () {
        keyIcon.classList.remove("fa-beat-fade");
        if (document.getElementById("login-username").value = ""){
            keyIcon.classList.add("fa-key");
        }
    });
    inputUsername.addEventListener("blur", function () {
        keyIcon.className = originalIconClass;
    });

    const inputSenha = document.getElementById("login-password");
    const SenhaIcon = document.getElementById("login-senha");
    const originalSenhaIconClass = SenhaIcon.className;

    inputSenha.addEventListener("focus", function () {
        SenhaIcon.classList.remove("fa-beat-fade");
        SenhaIcon.classList.add("fa-lock");
    });

    inputSenha.addEventListener("blur", function () {
        SenhaIcon.className = originalSenhaIconClass;
    });

    const botao_login = document.getElementById("login");
    botao_login.addEventListener("click", function (event) {
        event.preventDefault();
        const loginUsername = document.getElementById("login-username").value;
        const loginPassword = document.getElementById("login-password").value;
        if (verificarUsuario(loginUsername, loginPassword)) {
            resposta.innerText = "Login bem-sucedido!";
            const nomelogin = loginUsername;
            localStorage.setItem('nomelogin', nomelogin);
            window.location.href = "loading.html";
        } else {
            resposta.innerText = "Registro inválido! Tente novamente.";
        }
        document.getElementById("login-username").value = "";
        document.getElementById("login-password").value = "";
        setTimeout(function () {
            resposta.innerText = "";
        }, 3000);
        
    });

    function verificarUsuario(nomeUsuario, senha) {
        const usuarioEncontrado = usuarios.find(
            (usuario) => usuario.nomeUsuario === nomeUsuario && usuario.senha === senha    
        );
        return usuarioEncontrado !== undefined;
    }
    
});
