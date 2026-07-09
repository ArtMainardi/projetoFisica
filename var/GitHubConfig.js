if (window.location.hostname.includes('github.io')) {
    const base = document.createElement("base");
    base.href = "/portfolio/";
    document.head.insertBefore(base, document.head.firstChild)
}