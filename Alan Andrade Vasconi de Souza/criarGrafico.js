const canvas_grafico = document.getElementById('fazer');
canvas_grafico.width = canvas_grafico.offsetWidth;
canvas_grafico.height = canvas_grafico.offsetHeight;

export function criarGrafico(dados) {
    if (canvas_grafico) {
        const ctx = canvas_grafico.getContext('2d');
        console.log('Canvas element encontrado:', canvas_grafico);

        const labels = dados.map(item => item.Date);
        const openValues = dados.map(item => parseFloat(item.Open));
        const highValues = dados.map(item => parseFloat(item.High));
        const lowValues = dados.map(item => parseFloat(item.Low));

        try {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Open',
                            data: openValues,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1,
                        },
                        {
                            label: 'High',
                            data: highValues,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Low',
                            data: lowValues,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 1,
                        },
                    ],
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
                title: 'Erro ao criar o gráfico',
                text: `Ocorreu um erro ao criar o gráfico: ${error.message}`,
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Elemento Canvas Não Encontrado',
            text: 'O elemento canvas não foi encontrado.',
        });
    }
}
