// js/progresso.js
const TOTAL_MISSOES = 4;

function getMissoesConcluidas() {
    return JSON.parse(localStorage.getItem('missoesConcluidas')) || [];
}

function setMissoesConcluidas(lista) {
    localStorage.setItem('missoesConcluidas', JSON.stringify(lista));
}

function isMissaoConcluida(id) {
    return getMissoesConcluidas().includes(id);
}

function concluirMissao(id) {
    const lista = getMissoesConcluidas();
    if (!lista.includes(id)) {
        lista.push(id);
        setMissoesConcluidas(lista);
    }
}

function resetarProgresso() {
    localStorage.removeItem('missoesConcluidas');
}