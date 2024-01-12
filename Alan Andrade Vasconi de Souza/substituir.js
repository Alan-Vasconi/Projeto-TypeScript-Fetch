const nomeUsuarioLogado = localStorage.getItem('nomelogin');

if (nomeUsuarioLogado) {
    const conteudo = document.querySelector("#conteudo p");
    conteudo.textContent = conteudo.textContent.replace('User', nomeUsuarioLogado);
}
