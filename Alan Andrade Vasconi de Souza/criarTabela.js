export function criarTabela(dados, mediaOpen) {
    const abaresultado = document.querySelector('.abaresultado');
    abaresultado.innerHTML = '';

    if (dados.length === 0) {
        abaresultado.innerText = 'Nenhum dado disponível.';
        return;
    }

    const tabela = document.createElement('table');
    const thlinha = tabela.insertRow();
    const campos = ['Date', 'Open', 'High', 'Low', 'Close', 'Adj Close', 'Volume'];

    for (const campo of campos) {
        const thc = document.createElement('th');
        thc.textContent = campo;
        thlinha.appendChild(thc);
        thlinha.classList.add('thlinha');
    }

    for (const item of dados) {
        const linha = tabela.insertRow();
    
        for (const campo of campos) {
            const celula = linha.insertCell();
    
            if (campo === 'Date') {
                const dataFormatada = new Date(item[campo]).toLocaleDateString('pt-BR');
                celula.textContent = dataFormatada;
            } else if (!isNaN(item[campo]) && campo !== 'Volume') {
                const valorFormatado = `R$ ${Number(item[campo]).toFixed(2).replace('.', ',')}`;
                celula.textContent = valorFormatado;
            } else {
                celula.textContent = item[campo];
            }
    
            celula.classList.add('celula-td');
        }
    }
    
    
    
    

    abaresultado.appendChild(tabela);
    abaresultado.style.display = 'block';

    const mediaResultadoDiv = document.querySelector('.media_resultado');
    mediaResultadoDiv.classList.add('media');

    if (!isNaN(mediaOpen)) {
        mediaResultadoDiv.textContent = `Média Open: ${Number(mediaOpen).toFixed(2)}`;
    } else {
        mediaResultadoDiv.textContent = `Média Open: Valor inválido`;
    }
}
