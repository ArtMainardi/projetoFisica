const currentValue = document.getElementById("current-value");
const turnsValue = document.getElementById("turns-value");
const fieldValue = document.getElementById("field-value");
const resistanceValue = document.getElementById("resistance-value");



function atualizarRPM(valor){
    const rpmDisplay = document.getElementById("rpm-display");
    const rotor = document.getElementById("rpm-rotor");

    rpmDisplay.textContent = valor;

    let duration;

    if(valor <= 0 || valor == null){
        duration = 0;
        rpmDisplay.textContent = 0;
    }else{
        duration = 60/valor;
    }

    rotor.style.animation = `rpmSpin ${duration}s linear infinite`;
}
window.addEventListener("load", atualizarRPM(0));


function atualizarEspiras(valor){
    const display = document.getElementById("coil-display");
    const group = document.getElementById("coil-group");
    display.textContent = valor;
    group.innerHTML = "";
    const slots = 12;

    const espirasPorSlot = Math.max(
        1,
        Math.floor(valor / 15)
    );

    for(let slot = 0; slot < slots; slot++){
        const angulo = (slot * 360 / slots) * Math.PI / 180;
        const centroX = 150 + Math.cos(angulo) * 72;
        const centroY = 150 + Math.sin(angulo) * 72;

        for(let e = 0; e < espirasPorSlot; e++){
            const offset = e * 4;
            const bobina = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
            );
            bobina.setAttribute(
                "x",
                centroX - 10 + offset/2
            );
            bobina.setAttribute(
                "y",
                centroY - 14 + offset/2
            );
            bobina.setAttribute(
                "width",
                20 - offset
            );
            bobina.setAttribute(
                "height",
                28 - offset
            );
            bobina.setAttribute(
                "rx",
                3
            );
            bobina.setAttribute(
                "class",
                "coil-slot"
            );
            bobina.setAttribute(
                "transform",
                `rotate(${slot*30} ${centroX} ${centroY})`
            );
            group.appendChild(bobina);
        }
    }
}
window.addEventListener("load", atualizarEspiras(0));


function atualizarValoresPainel(){
    currentValue.value = current.value;
    turnsValue.value = turns.value;
    fieldValue.value = field.value;
    resistanceValue.value = resistance.value;
}

const current = document.getElementById("current");
const turns = document.getElementById("turns");
const field = document.getElementById("field");
const resistance = document.getElementById("resistance");

[current,turns,field,resistance].forEach(slider => {
    slider.addEventListener("input", atualizarValoresPainel);
});

window.addEventListener("load", atualizarValoresPainel());


function atualizarCampoMagnetico(valor){
    const group = document.getElementById("field-lines");
    const display = document.getElementById("field-display");
    display.textContent = `${valor} T`;
    group.innerHTML = "";

    const quantidadeLinhas = Math.max(
        1,
        Math.round(valor * 5)
    );

    for(let i = 0; i < quantidadeLinhas; i++){
        const offset = (i - (quantidadeLinhas - 1)/2) * 18;
        const linha = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        linha.setAttribute(
            "d",
            `
            M120 ${125 + offset}
            Q250 ${85 + offset}
            380 ${125 + offset}
            `
        );
        linha.setAttribute(
            "class",
            "field-line"
        );
        linha.style.opacity =
            0.3 + valor * 0.4;
        linha.style.strokeWidth =
            2 + valor * 2;
        group.appendChild(linha);
    }
}
window.addEventListener("load", atualizarCampoMagnetico(0));

turns.addEventListener("input",()=>{
    atualizarEspiras(
        Number(turns.value)
    );
    document.getElementById("turns-value").textContent =
        turns.value;
});

field.addEventListener("input",()=>{
    atualizarCampoMagnetico(
        Number(field.value)
    );
    document.getElementById("field-value").textContent =
        `${field.value} T`;
});


function atualizarSimulacao(){
    const I = Number(current.value);
    const N = Number(turns.value);
    const B = Number(field.value);
    const R = Number(resistance.value);

    const resultado = calcularFisicaMotor(
        N,
        I,
        B,
        R
    );

    atualizarRPM(resultado.rpm);
    atualizarTorque(resultado.torque);
    atualizarPotencia(resultado.potenciaEletrica, resultado.potenciaDissipada, resultado.potenciaMecanica);
    atualizarEficiencia(resultado.eficiencia);
}
current.addEventListener("input",()=>{
    document.getElementById("current-value").value =
    current.value;

    atualizarSimulacao();
});

turns.addEventListener("input",()=>{
    atualizarEspiras(
        Number(turns.value)
    );
    document.getElementById("turns-value").value =
    turns.value;

    atualizarSimulacao();
});

field.addEventListener("input",()=>{
    atualizarCampoMagnetico(
        Number(field.value)
    );
    document.getElementById("field-value").value =
    field.value;

    atualizarSimulacao();
});

resistance.addEventListener("input",()=>{
    document.getElementById("resistance-value").value =
    resistance.value;

    atualizarSimulacao();
});

window.addEventListener("load", atualizarSimulacao());

currentValue.addEventListener("input",()=>{
    current.value = currentValue.value;
    atualizarSimulacao();
});

turnsValue.addEventListener("input",()=>{
    turns.value = turnsValue.value;
    atualizarEspiras(Number(turns.value));
    atualizarSimulacao();
});

fieldValue.addEventListener("input",()=>{
    field.value = fieldValue.value;
    atualizarCampoMagnetico(Number(field.value));
    atualizarSimulacao();
});

resistanceValue.addEventListener("input",()=>{
    resistance.value = resistanceValue.value;
    atualizarSimulacao();
});

function atualizarTorque(torque){
    const valor = document.getElementById("torque-value");
    const arco = document.getElementById("torque-arc");
    const ponteiro = document.getElementById("torque-needle");
    valor.textContent =
        `${torque.toFixed(2)} Nm`;

    const torqueMax = 150;
    const percentual =
        Math.min(torque / torqueMax, 1);

    const comprimentoArco = 346;
    arco.style.strokeDashoffset =
        comprimentoArco -
        (comprimentoArco * percentual);
    const angulo =
        (-90) + (180 * percentual);
    ponteiro.style.transform =
        `rotate(${angulo}deg)`;
}


function atualizarPotencia(potenciaEntrada, potenciaPerdida, potenciaSaida){
    document.getElementById("power-in")
        .textContent =
        `${potenciaEntrada.toFixed(0)} W`;
    document.getElementById("power-loss")
        .textContent =
        `${potenciaPerdida.toFixed(0)} W`;
    document.getElementById("power-out")
        .textContent =
        `${potenciaSaida.toFixed(0)} W`;
    const eficiencia =
        potenciaEntrada > 0
        ? (potenciaSaida / potenciaEntrada) * 100
        : 0;
    document.getElementById("power-percent")
        .textContent =
        `${eficiencia.toFixed(1)}%`;
    document.getElementById("power-efficiency-bar")
        .style.width =
        `${eficiencia}%`;
}

function atualizarEficiencia(valor){
    const badge =
        document.getElementById(
            "efficiency-badge"
        );
    const texto =
        document.getElementById(
            "efficiency-value"
        );
    const descricao =
        document.getElementById(
            "efficiency-description"
        );
    texto.textContent =
        `${valor.toFixed(1)}%`;
    badge.className =
        "efficiency-badge";

    if(valor >= 90){
        badge.classList.add("grade-a");
        badge.textContent = "A";
        descricao.textContent =
            "Excelente rendimento";
    }
    else if(valor >= 75){
        badge.classList.add("grade-b");
        badge.textContent = "B";
        descricao.textContent =
            "Alto rendimento";
    }
    else if(valor >= 60){
        badge.classList.add("grade-c");
        badge.textContent = "C";
        descricao.textContent =
            "Bom rendimento";
    }
    else if(valor >= 45){
        badge.classList.add("grade-d");
        badge.textContent = "D";
        descricao.textContent =
            "Rendimento moderado";
    }
    else if(valor >= 25){
        badge.classList.add("grade-e");
        badge.textContent = "E";
        descricao.textContent =
            "Baixo rendimento";
    }
    else{
        badge.classList.add("grade-f");
        badge.textContent = "F";
        descricao.textContent =
            "Motor ineficiente";
    }
}


const parametros = new URLSearchParams(
    window.location.search
);
const idRecebido = Number(
    parametros.get("id")
);
const missao =
    dadosMissoes[idRecebido];


function carregarMissao() {
    // Verifica se a missão existe
    if (!missao) {
        console.error("Missão não encontrada! ID:", idRecebido);
        return;
    }

    // Atualiza o cabeçalho
    document.getElementById("mission-title").textContent = missao.nome;
    document.getElementById("mission-subtitle").textContent = missao.subtitulo;

    // Atualiza a imagem
    const img = document.getElementById("mission-image");
    img.src = missao.imagem;
    img.alt = missao.nome;

    // Atualiza os requisitos (apenas 4 itens: torque, rpm, eficiência, potência)
    const req = missao.requisitos;
    document.getElementById("mission-requirements").innerHTML = `
        <div class="challenge-title">⚙️ ${missao.desafio}</div>
        <p class="challenge-description">${missao.descricao}</p>
        <div class="requirements-grid">
            <div class="requirement-item highlight">
                <span>💪 Torque mínimo</span>
                <strong>${req.torqueMin} Nm</strong>
            </div>
            <div class="requirement-item highlight">
                <span>🚀 RPM mínimo</span>
                <strong>${req.rpmMin}</strong>
            </div>
            <div class="requirement-item highlight">
                <span>⚡ Potência mín.</span>
                <strong>${req.potenciaMin} W</strong>
            </div>
            <div class="requirement-item highlight">
                <span>📊 Eficiência mín.</span>
                <strong>${req.eficienciaMin}%</strong>
            </div>
        </div>
    `;
}

window.addEventListener(
    "load",
    carregarMissao
);

document.getElementById("finish-btn").addEventListener("click", function() {
    // Obtém os valores atuais da simulação
    const I = Number(current.value);
    const N = Number(turns.value);
    const B = Number(field.value);
    const R = Number(resistance.value);
    const resultado = calcularFisicaMotor(N, I, B, R);

    const req = missao.requisitos;
    const aprovado = 
        resultado.torque >= req.torqueMin &&
        resultado.rpm >= req.rpmMin &&
        resultado.eficiencia >= req.eficienciaMin &&
        resultado.potenciaMecanica >= req.potenciaMin;

    if (aprovado) {
        alert("✅ Missão concluída com sucesso! Contrato finalizado.");
        // Você pode adicionar efeitos, liberar próxima missão, etc.
    } else {
        let mensagem = "❌ Você ainda não atingiu todos os requisitos:\n";
        if (resultado.torque < req.torqueMin) mensagem += `- Torque: ${resultado.torque.toFixed(1)} Nm (mínimo ${req.torqueMin})\n`;
        if (resultado.rpm < req.rpmMin) mensagem += `- RPM: ${resultado.rpm} (mínimo ${req.rpmMin})\n`;
        if (resultado.eficiencia < req.eficienciaMin) mensagem += `- Eficiência: ${resultado.eficiencia.toFixed(1)}% (mínimo ${req.eficienciaMin}%)\n`;
        if (resultado.potenciaMecanica < req.potenciaMin) mensagem += `- Potência: ${resultado.potenciaMecanica.toFixed(0)} W (mínimo ${req.potenciaMin} W)`;
        alert(mensagem);
    }
});