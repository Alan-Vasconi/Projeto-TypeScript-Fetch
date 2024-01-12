export function criarGraficoVolume(dados) {
    const canvas_grafico_volume = document.getElementById('fazer_volume');
    canvas_grafico_volume.width = canvas_grafico_volume.offsetWidth;
    canvas_grafico_volume.height = canvas_grafico_volume.offsetHeight;

    if (canvas_grafico_volume) {
        const ctx = canvas_grafico_volume.getContext('2d');
        console.log('Canvas element encontrado para o gráfico de volume:', canvas_grafico_volume);

        const labels = dados.map(item => item.Date);
        const volumeValues = dados.map(item => parseFloat(item.Volume));

        try {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Volume',
                        data: volumeValues,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 1,
                    }],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro ao criar o gráfico de volume',
                text: `Ocorreu um erro ao criar o gráfico de volume: ${error.message}`,
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Elemento Canvas para Gráfico de Volume Não Encontrado',
            text: 'O elemento canvas para o gráfico de volume não foi encontrado.',
        });
    }
}
