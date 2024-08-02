class nav_component extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Asegúrate de que la ruta sea correcta
        this.cargarHTML("../../../components/nav-component/nav-component.html");
    }

    cargarHTML(url) {
        console.log("Fetching URL:", url); // Para verificar la ruta
        fetch(url)
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                this.cargarLOGICA();
            })
            .catch(error => {
                console.error("Error al cargar el archivo HTML:", error);
            });
    }

    cargarLOGICA() {
        console.log("carga_logica_nav");
    }
}

// Define el componente personalizado
window.customElements.define("nav-component", nav_component);