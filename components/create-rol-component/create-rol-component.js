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
                this.populateStates('state');
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

    populateStates(selectId, selectedState) {
        axios.get('http://127.0.0.1:8000/get_parameter_values/2')
            .then(function(response) {
                let data = response.data.resultado;
                let selectState = document.getElementById(selectId);
                selectState.innerHTML = "";

                data.forEach(param => {
                    let option = document.createElement("option");
                    option.value = param.id;
                    option.text = param.name;
                    if (param.id == selectedState) {
                        option.selected = true;
                    }
                    selectState.appendChild(option);
                });
            })
            .catch(function(error) {
                console.error('Error fetching states: ', error);
            });
    }

    attachEventListeners() {
        const registerButton = this.querySelector("button[onclick='cargarLOGICA()']");
        if (registerButton) {
            registerButton.addEventListener("click", () => this.cargarLOGICA());
        }

        const registerRoleModal = this.querySelector("#registerRoleModal");
        if (registerRoleModal) {
            $(registerRoleModal).on('show.bs.modal', () => {
                this.populateStates('state');
            });
        }
    }
}


window.customElements.define("create-rol-component", create_rol_component);
