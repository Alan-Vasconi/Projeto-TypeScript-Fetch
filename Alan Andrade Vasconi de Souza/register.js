document.addEventListener("DOMContentLoaded", function() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    function registrarUsuario(nomeUsuario, senha) {
        const novoUsuario = { nomeUsuario, senha };
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }


    var resposta2 = document.querySelector("#resposta2");

    const botao_register = document.getElementById("fazer_registro");
    botao_register.addEventListener("click", function(){

        const registerUsername = document.getElementById("register-username").value;
        const registerPassword = document.getElementById("register-password").value;

        registrarUsuario(registerUsername, registerPassword);
        resposta2.innerText = "Usuário registrado com sucesso!";
    });
});
export { usuarios, registrarUsuario };