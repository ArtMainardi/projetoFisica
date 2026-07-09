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

    atualizarRPM(
        resultado.rpm
    );
}

