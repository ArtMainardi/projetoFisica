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
    document.getElementById("current-value").textContent =
        `${current.value} A`;
    document.getElementById("turns-value").textContent =
        turns.value;
    document.getElementById("field-value").textContent =
        `${field.value} T`;
    document.getElementById("resistance-value").textContent =
        `${resistance.value} Ω`;
}

const current = document.getElementById("current");
const turns = document.getElementById("turns");
const field = document.getElementById("field");
const resistance = document.getElementById("resistance");

[current,turns,field,resistance].forEach(slider => {
    slider.addEventListener("input", atualizarValoresPainel);
});

window.addEventListener("load", atualizarValoresPainel());