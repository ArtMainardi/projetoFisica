function calcularFisicaMotor(N, I, B, R, A = .05, V = 220){
    torque = N * I * A * B;
    potenciaEletrica = V * I;
    potenciaDissipada = (I**2) * R;
    potenciaMecanica = (potenciaEletrica - potenciaDissipada > 0) ? potenciaEletrica - potenciaDissipada : 0;
    eficiencia = (potenciaMecanica / potenciaEletrica > 0) ? (potenciaMecanica / potenciaEletrica) * 100 : 0;
    rpm = (eficiencia / 100) * 3600;
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
        rpm : rpm
    }
}