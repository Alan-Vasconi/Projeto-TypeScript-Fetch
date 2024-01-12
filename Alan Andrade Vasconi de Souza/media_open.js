export function calcularMediaOpen(dados) {
    const somaOpen = dados.reduce((total, item) => total + parseFloat(item.Open), 0);
    const mediaOpen = somaOpen / dados.length;
    return mediaOpen.toFixed(2);
}
