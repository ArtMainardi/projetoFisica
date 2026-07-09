function calcularFisicaMotor(N, I, B, R, A = .05, V = 220){
    let torque = N * I * A * B;
    let potenciaEletrica = V * I;
    let potenciaDissipada = (I**2) * R;
    let potenciaMecanica = (potenciaEletrica - potenciaDissipada > 0) ? potenciaEletrica - potenciaDissipada : 0;
    let eficiencia = (potenciaMecanica / potenciaEletrica > 0) ? (potenciaMecanica / potenciaEletrica) * 100 : 0;
    let rpm = Math.round(
        (eficiencia / 100) * 3600
    );
    console.log({
        torque : torque,
        potenciaEletrica : potenciaEletrica,
        potenciaDissipada : potenciaDissipada,
        eficiencia : eficiencia,
        rpm : rpm
    });
    return {
        torque : torque,
        potenciaEletrica : potenciaEletrica,
        potenciaDissipada : potenciaDissipada,
        eficiencia : eficiencia,
        potenciaMecanica : potenciaMecanica,
        rpm : rpm
    }
}