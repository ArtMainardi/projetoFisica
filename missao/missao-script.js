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

atualizarRPM(6000)