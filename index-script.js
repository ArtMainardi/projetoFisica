const dadosMissoes = {
    1: {
        nome: "Contrato #01: Chiesetta Alpina",
        desafio: "Desafio: Energia Potencial e Torque",
        descricao: "Projete um motor capaz de bombear água potável até o topo do Morro da Antena, vencendo a gravidade e a altitude elevada.",
        imagem: "imagens/chiesetta.jpg",
        link: "missao/missao.html?id=1"
    },
    2: {
        nome: "Contrato #02: Parque Via Verde",
        desafio: "Desafio: Lei de Joule e Corrente",
        descricao: "Dimensionar o motor para os compressores das fontes de água. O sistema deve rodar por longos períodos sem superaquecer.",
        imagem: "imagens/via-verde.jpg",
        link: "missao/missao.html?id=2"
    },
    3: {
        nome: "Contrato #03: Centro Cultural SCAR",
        desafio: "Desafio: Rotação e Ressonância",
        descricao: "Ajuste o motor do sistema de exaustão e climatização do grande teatro para o concerto comemorativo da cidade, evitando ruídos por vibração.",
        imagem: "imagens/scar.jpg",
        link: "missao/missao.html?id=3"
    },
    4: {
        nome: "Contrato #04: Terminal Rodoviário",
        desafio: "Desafio: Inércia e Torque de Partida",
        descricao: "Projete o motor para as novas cancelas e portões de fluxo contínuo de ônibus. O motor precisa vencer a inércia rapidamente.",
        imagem: "imagens/rodoviaria.jpg",
        link: "missao/missao.html?id=4"
    }
};

function selecionarMissao(id) {
    const missao = dadosMissoes[id];

    // Esconde a mensagem de "vazio" e mostra o bloco de conteúdo
    document.getElementById("conteudo-vazio").style.display = "none";
    document.getElementById("conteudo-missao").style.display = "block";

    // Injeta as informações da missão clicada na barra lateral
    document.getElementById("sidebar-titulo").innerText = missao.nome;
    document.getElementById("sidebar-desafio").innerText = missao.desafio;
    document.getElementById("sidebar-descricao").innerText = missao.descricao;
    document.getElementById("sidebar-imagem").src = missao.imagem;
    document.getElementById("sidebar-botao").href = missao.link;

    document.getElementById("sidebar-missao").classList.add("missao-ativa");
}