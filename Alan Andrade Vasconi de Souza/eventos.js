import { criarTabela } from './criarTabela.js';
import { calcularMediaOpen } from './media_open.js';
import { criarGrafico } from './criarGrafico.js';
import { criarGraficoVolume } from './criarGraficoVolume.js';

document.addEventListener('DOMContentLoaded', function() {
    const abaresultado = document.querySelector('.abaresultado');
    const dataInicialInput = document.getElementById('data_inicial');
    const dataFinalInput = document.getElementById('data_final');

    function buscarDados(ticker, dataInicial, dataFinal) {
    const url = `http://localhost:8000/historico/geral-data`;

    const [minDate, maxDate] = [new Date(dataInicial), new Date(dataFinal)].sort((a, b) => a - b);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação');
            }
            return response.json();
        })
        .then(cotacao => {
            const dataFiltrada = cotacao.filter(item => {
                const itemDate = new Date(item.Date);
                return (
                    itemDate >= minDate &&
                    itemDate <= maxDate &&
                    item.Tick === ticker
                );
            });

            const mediaOpen = calcularMediaOpen(dataFiltrada);
            criarTabela(dataFiltrada, mediaOpen);
            criarGrafico(dataFiltrada);

            const dadosVolume = dataFiltrada.map(item => ({
                Date: item.Date,
                Volume: item.Volume
            }));
            criarGraficoVolume(dadosVolume);
        })
        .catch(erro => {
            Swal.fire({
                icon: 'error',
                title: 'Erro na requisição',
                text: `Ocorreu um erro na requisição: ${erro}`,
            });
        })
        .finally(() => {
            console.log('Processamento terminado');
        });
}

    
    

    const mostrarButton = document.getElementById('mostrar');
    const mostrarTabela = document.getElementById('mostrar_tabela');
    const mostrarGrafico = document.getElementById('mostrar_grafico');
    const ocultarTabela = document.getElementById('ocultar_tabela');
    const ocultarGrafico = document.getElementById('ocultar_grafico');
    const recarregarTudo = document.getElementById('recarregar');
    const escolhaSelect = document.getElementById('escolha');

    mostrarButton.addEventListener('click', () => {
        const dataInicial = new Date(dataInicialInput.value);
        const dataFinal = new Date(dataFinalInput.value);
        const escolha = escolhaSelect.value;

        if (dataInicial && dataFinal) {
            buscarDados(escolha, dataInicial, dataFinal);
            mostrarButton.style.display = 'none';
            ocultarTabela.style.display = 'inline-block';
            ocultarGrafico.style.display = 'inline-block';
        } else {
            abaresultado.innerText = 'Selecione datas válidas.';
        }
        abaresultado.style.display = 'block';
        recarregarTudo.style.display = 'inline-block';
    });

    mostrarTabela.addEventListener('click', () => {
        const tabela = document.querySelector('table');
        tabela.style.display = 'table';
        mostrarTabela.style.display = 'none';
        ocultarTabela.style.display = 'inline-block';
    });

    ocultarTabela.addEventListener('click', () => {
        const tabela = document.querySelector('table');
        tabela.style.display = 'none';
        ocultarTabela.style.display = 'none';
        mostrarTabela.style.display = 'inline-block';
    });

    mostrarGrafico.addEventListener('click', () => {
        const grafico = document.getElementById('fazer');
        grafico.style.display = 'block';
        mostrarGrafico.style.display = 'none';
        ocultarGrafico.style.display = 'inline-block';
    });

    ocultarGrafico.addEventListener('click', () => {
        const grafico = document.getElementById('fazer');
        grafico.style.display = 'none';
        ocultarGrafico.style.display = 'none';
        mostrarGrafico.style.display = 'inline-block';
    });

    
    recarregarTudo.addEventListener('click', () =>{
        setTimeout(function() {
            window.location.href = "loading_banco.html";
        }, 500);
    })
});
