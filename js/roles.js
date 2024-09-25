document.addEventListener("DOMContentLoaded", function() {
    // Fetch roles and populate the table
    axios.get('http://127.0.0.1:8000/get_rol')
        .then(function(response) {
            let data = response.data.resultado;
            let tableBody = document.querySelector("#lista-roles tbody");
            tableBody.innerHTML = ""; // Clear existing rows

            data.forEach((role, index) => {
                let row = tableBody.insertRow(index);

                // Create cells in the order specified in the HTML
                let cellId = row.insertCell(0);
                let cellName = row.insertCell(1);
                let cellState = row.insertCell(2);
                let cellActions = row.insertCell(3);

                // Populate cells with role data
                cellId.textContent = role.id;
                cellName.textContent = role.name;
                cellState.textContent = role.state;

                // Add action buttons
                cellActions.innerHTML = 
                    `<button type="button" class="btn btn-warning" onclick="showUpdateRoleModal(${role.id}, '${role.name}', '${role.state}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="btn btn-danger" onclick="showDeleteRoleModal(${role.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>`;
            });

            // Initialize DataTables after adding rows
            $('#lista-roles').DataTable({
                language: {
                    "decimal": "",
                    "emptyTable": "No hay información",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
                    "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
                    "infoFiltered": "(Filtrado de _MAX_ entradas totales)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ entradas",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "No se encontraron resultados",
                    "paginate": {
                        "first": "Primero",
                        "last": "Último",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    }
                }
            });
        })
        .catch(function(error) {
            console.error('Error fetching roles: ', error);
        });
});


function showUpdateRoleModal(roleId, name, state) {
    document.getElementById("update-role-id").value = roleId;
    document.getElementById("update-role-name").value = name;
    populateStates("update-state", state);
    $('#updateRoleModal').modal('show');
}

function updateRole() {
    let role = {
        id: document.getElementById("update-role-id").value,
        name: document.getElementById("update-role-name").value,
        state: document.getElementById("update_state").value
    };

    axios.put(`http://127.0.0.1:8000/edit_rol/${role.id}`, role)
        .then(function(response) {
            alert(response.data.resultado);
            $('#updateRoleModal').modal('hide');
            location.reload(); // Refresh the page to show updated role list
        })
        .catch(function(error) {
            console.error('Error updating role: ', error);
        });
}

function showDeleteRoleModal(roleId) {
    document.getElementById("delete-role-id").value = roleId;
    $('#deleteRoleModal').modal('show');
}

function deleteRole() {
    let roleId = document.getElementById("delete-role-id").value;

    axios.put(`http://127.0.0.1:8000/delete_rol/${roleId}`)
        .then(function(response) {
        alert(response.data.resultado);
            $('#deleteRoleModal').modal('hide');
            location.reload(); // Refresh the page to show updated role list
        })
        .catch(function(error) {
            console.error('Error deleting role: ', error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    populateStates();
});

function populateStates() {
    const stateSelect = document.getElementById("state");
    const updatestateSelect = document.getElementById("update_state");

    const options = [
        { value: 1, text: "Activo" },  // value as integer
        { value: 2, text: "Inactivo" } // value as integer
    ];

    stateSelect.innerHTML = ""; // Clear existing options
    updatestateSelect.innerHTML = ""; // Clear existing options

    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.textContent = option.text;
        stateSelect.appendChild(opt.cloneNode(true)); // Clone option to add to both select elements
        updatestateSelect.appendChild(opt);
    });
}
