if (window.location.hostname.includes('github.io')) {
    const base = document.createElement("base");
    base.href = "/projetoFisica/";
    document.head.insertBefore(base, document.head.firstChild)
}