class create_rol_component extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.cargarHTML("../../../components/create-rol-component/create-rol-component.html");
    }

    cargarHTML(url) {
        console.log("Fetching URL:", url);
        fetch(url)
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                this.attachEventListeners();
                this.populateModules();
            })
            .catch(error => {
                console.error("Error al cargar el archivo HTML:", error);
            });
    }

    cargarLOGICA() {
        let role = {
            name: document.getElementById("role-name").value,
            state: document.getElementById("state").value
        };

        axios.post('http://127.0.0.1:8000/create_rol', role)
            .then(function(response) {
                alert(response.data.resultado);
                $('#registerRoleModal').modal('hide');
                location.reload();
            })
            .catch(function(error) {
                console.error('Error creating role: ', error);
            });
    }

    populateModules() {
        axios.get('http://127.0.0.1:8000/get_modules')  // Asume que tienes una API que devuelve los módulos
            .then(response => {
                const modules = response.data.resultado;  // Acceder a la propiedad 'resultado'
                const modulesList = document.getElementById('modules-list');
    
                // Limpiar cualquier contenido anterior en la lista de módulos
                modulesList.innerHTML = '';
    
                modules.forEach(module => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = module.id;
                    checkbox.id = `module-${module.id}`;
                    checkbox.classList.add('form-check-input');
    
                    const label = document.createElement('label');
                    label.htmlFor = `module-${module.id}`;
                    label.classList.add('form-check-label');
                    label.innerText = module.name;
    
                    const div = document.createElement('div');
                    div.classList.add('form-check');
                    div.appendChild(checkbox);
                    div.appendChild(label);
    
                    modulesList.appendChild(div);
                });
            })
            .catch(error => {
                console.error("Error al obtener los módulos:", error);
            });
    }

    attachEventListeners() {
        const registerButton = this.querySelector("#register-role-button");
        if (registerButton) {
            registerButton.addEventListener("click", () => this.cargarLOGICA());
        }
    
        const registerRoleModal = this.querySelector("#registerRoleModal");
        if (registerRoleModal) {
            $(registerRoleModal).on('show.bs.modal', () => {
                this.populateModules();
            });
        }
    }
}


window.customElements.define("create-rol-component", create_rol_component);
