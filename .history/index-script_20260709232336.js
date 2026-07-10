const dadosMissoes = {
    1: {
        nome: "Contrato #01: Chiesetta Alpina",
        desafio: "Desafio: Energia Potencial e Torque",
        descricao: "Projete um motor capaz de bombear água potável até o topo do Morro da Antena, vencendo a gravidade e a altitude elevada.",
        imagem: "imagens/chiesetta.jpg",
        link: "/projetoFisica/missao/missao.html?id=1"
    },
    2: {
        nome: "Contrato #02: Parque Via Verde",
        desafio: "Desafio: Lei de Joule e Corrente",
        descricao: "Dimensionar o motor para os compressores das fontes de água. O sistema deve rodar por longos períodos sem superaquecer.",
        imagem: "imagens/via-verde.jpg",
        link: "/projetoFisica/missao/missao.html?id=2"
    },
    3: {
        nome: "Contrato #03: Centro Cultural SCAR",
        desafio: "Desafio: Rotação e Ressonância",
        descricao: "Ajuste o motor do sistema de exaustão e climatização do grande teatro para o concerto comemorativo da cidade, evitando ruídos por vibração.",
        imagem: "imagens/scar.jpg",
        link: "/projetoFisica/missao/missao.html?id=3"
    },
    4: {
        nome: "Contrato #04: Terminal Rodoviário",
        desafio: "Desafio: Inércia e Torque de Partida",
        descricao: "Projete o motor para as novas cancelas e portões de fluxo contínuo de ônibus. O motor precisa vencer a inércia rapidamente.",
        imagem: "imagens/rodoviaria.jpg",
        link: "/projetoFisica/missao/missao.html?id=4"
    }
};

function atualizarProgresso() {
    const concluidas = getMissoesConcluidas().length;
    const total = TOTAL_MISSOES;

    document.querySelector('.banner-right').textContent = `${concluidas}/${total} Contratos Concluídos`;

    const progressFill = document.querySelector('.progress-fill');
    const percent = Math.min((concluidas / total) * 100, 100);
    progressFill.style.width = `${percent}%`;
    progressFill.style.background = concluidas === total ? '#4caf50' : '#76be90';
}

// Executa ao carregar a página
window.addEventListener('load', function() {
    atualizarProgresso();
    atualizarPins();
    // Se houver missão selecionada via URL, carrega a sidebar também
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('missao'));
    if (id && dadosMissoes[id]) {
        selecionarMissao(id);
    }
});


function atualizarPins() {
    document.querySelectorAll('.map-pin').forEach(pin => {
        const id = parseInt(pin.dataset.missaoId);
        if (id && isMissaoConcluida(id)) {
            pin.classList.add('concluida');
        } else {
            pin.classList.remove('concluida');
        }
    });
}


function selecionarMissao(id) {
    const missao = dadosMissoes[id];
    if (!missao) return;

    const sidebar = document.getElementById('conteudo-missao');
    const vazio = document.getElementById('conteudo-vazio');
    vazio.style.display = 'none';
    sidebar.style.display = 'block';

    document.getElementById('sidebar-titulo').textContent = missao.nome;
    document.getElementById('sidebar-imagem').src = missao.imagem;
    document.getElementById('sidebar-imagem').alt = missao.nome;
    document.getElementById('sidebar-desafio').textContent = `Desafio: ${missao.desafio}`;
    document.getElementById('sidebar-descricao').textContent = missao.descricao;

    const botao = document.getElementById('sidebar-botao');
    botao.href = missao.link;

    // Verifica se já foi concluída
    const concluida = isMissaoConcluida(id);
    const statusDiv = document.getElementById('sidebar-status') || document.createElement('div');
    statusDiv.id = 'sidebar-status';
    if (concluida) {
        statusDiv.innerHTML = '<span class="badge-concluida">✅ CONCLUÍDO</span>';
        botao.textContent = '🔁 Revisitar Missão';
        botao.style.background = '#4caf50';
        botao.style.color = 'white';   // força branco
    } else {
        statusDiv.innerHTML = '<span class="badge-pendente">⏳ Pendente</span>';
        botao.textContent = '🚀 Iniciar Simulação';
        botao.style.background = '#4f685d';
        botao.style.color = 'white';   // força branco
    }
    // Insere o status antes do botão (se não existir, cria)
    const container = document.getElementById('conteudo-missao');
    if (!document.getElementById('sidebar-status')) {
        container.insertBefore(statusDiv, botao);
    } else {
        document.getElementById('sidebar-status').replaceWith(statusDiv);
    }

    // Atualiza também os pins (em caso de mudança)
    atualizarPins();
    atualizarProgresso();
}

document.getElementById('reset-progress-btn').addEventListener('click', function() {
    if (confirm('Tem certeza que deseja resetar todo o progresso das missões?')) {
        resetarProgresso();           // limpa o localStorage
        atualizarProgresso();         // atualiza banner (0/4)
        atualizarPins();              // remove classe "concluida" dos pins
        // Se a sidebar estiver mostrando alguma missão, recarrega-a
        const id = new URLSearchParams(window.location.search).get('missao');
        if (id) selecionarMissao(Number(id));
        alert('Progresso resetado com sucesso!');
    }
});