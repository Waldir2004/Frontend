function createActivity() {
    const title = document.getElementById("activity-title").value;
    const description = document.getElementById("activity-description").value;
    const startDate = document.getElementById("activity-start-date").value;
    const endDate = document.getElementById("activity-end-date").value;
    const schoolId = document.getElementById("activity-school-id").value;
    const stateId = document.getElementById("activity-state-id").value;

    if (title && description && startDate && endDate && schoolId && stateId) {
        axios.post('http://127.0.0.1:8000/create_activities', {
            title: title,
            description: description,
            start_date: startDate,
            end_date: endDate,
            school_id: parseInt(schoolId),
            state_id: parseInt(stateId)
        })
        .then(response => {
            console.log('Activity created:', response.data);
            $('#createActivityModal').modal('hide');
            Swal.fire({
                icon: 'success',
                title: 'Actividad Creada',
                text: 'La actividad ha sido creada exitosamente.',
                timer: 2000
            }).then(function() {
                window.location.reload(); // Recargar la página o actualizar la lista de actividades
            });
        })
        .catch(error => {
            console.error('Error creating activity:', error);
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos.'
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    fetchActivities();
});

function fetchActivities() {
    axios.get('http://127.0.0.1:8000/get_activities')
        .then(function(response) {
            let data = response.data.resultado;
            let tableBody = document.querySelector("#activities-table tbody");
            tableBody.innerHTML = "";

            function formatTimestamp(timestamp) {
                if (timestamp) {
                    let date = new Date(timestamp);
                    return date.toLocaleString();
                }
                return '';
            }

            data.forEach((activity, index) => {
                let row = tableBody.insertRow(index);
                let cellId = row.insertCell(0);
                let cellTitle = row.insertCell(1);
                let cellDescription = row.insertCell(2);
                let cellStartDate = row.insertCell(3);
                let cellEndDate = row.insertCell(4);
                let cellSchoolId = row.insertCell(5);
                let cellStateId = row.insertCell(6);
                let cellActions = row.insertCell(7);

                cellId.textContent = activity.id;
                cellTitle.textContent = activity.title;
                cellDescription.textContent = activity.description;
                cellStartDate.textContent = formatTimestamp(activity.start_date);
                cellEndDate.textContent = formatTimestamp(activity.end_date);
                cellSchoolId.textContent = activity.school_id;
                cellStateId.textContent = activity.state_id;

                cellActions.innerHTML = `
                    <button type="button" class="btn btn-primary" onclick="showViewModal(${activity.id}, '${activity.title}', '${activity.description}', '${activity.start_date}', '${activity.end_date}', '${activity.school_id}', '${activity.state_id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button type="button" class="btn btn-warning" onclick="showUpdateModal(${activity.id}, '${activity.title}', '${activity.description}', '${activity.start_date}', '${activity.end_date}', '${activity.school_id}', '${activity.state_id}')">
                        <i class="fas fa-edit"></i>
                    </button> 
                    <button type="button" class="btn btn-danger" onclick="showDeleteModal(${activity.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;

            });
            $('#activities-table').DataTable({
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
            console.error('Error fetching data: ', error);
        });
}

function showUpdateModal(id, title, description, startDate, endDate, schoolId, stateId) {
    document.getElementById("update-activity-id").value = id;
    document.getElementById("update-activity-title").value = title;
    document.getElementById("update-activity-description").value = description;
    document.getElementById("update-activity-start-date").value = startDate;
    document.getElementById("update-activity-end-date").value = endDate;
    document.getElementById("update-activity-school-id").value = schoolId;
    document.getElementById("update-activity-state-id").value = stateId;
    $('#updateModal').modal('show');
}

function populateStates(selectId, selectedState) {
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

function updateActivity() {
    const id = document.getElementById("update-activity-id").value;
    const title = document.getElementById("update-activity-title").value;
    const description = document.getElementById("update-activity-description").value;
    const startDate = document.getElementById("update-activity-start-date").value;
    const endDate = document.getElementById("update-activity-end-date").value;
    const schoolId = document.getElementById("update-activity-school-id").value;
    const stateId = document.getElementById("update-activity-state-id").value;

    if (id && title && description && startDate && endDate && schoolId && stateId) {
        axios.put(`http://127.0.0.1:8000/edit_activities/${id}`, {
            title: title,
            description: description,
            start_date: startDate,
            end_date: endDate,
            school_id: parseInt(schoolId),
            state_id: parseInt(stateId)
        })
        .then(response => {
            console.log('Activity updated:', response.data);
            $('#updateModal').modal('hide');
            Swal.fire({
                icon: 'success',
                title: 'Actividad Actualizada',
                text: 'La actividad ha sido actualizada exitosamente.',
                timer: 2000
            }).then(function() {
                window.location.reload(); // Recargar la página o actualizar la lista de actividades
            });
        })
        .catch(error => {
            console.error('Error updating activity:', error);
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos.'
        });
    }
}

function showDeleteModal(id) {
    document.getElementById("delete-activity-id").value = id;
    $('#deleteModal').modal('show');
}

function deleteActivity() {
    const id = document.getElementById("delete-activity-id").value;

    if (id) {
        axios.delete(`http://127.0.0.1:8000/delete_activities/${id}`)
        .then(response => {
            console.log('Activity deleted:', response.data);
            $('#deleteModal').modal('hide');
            Swal.fire({
                icon: 'success',
                title: 'Actividad Eliminada',
                text: 'La actividad ha sido eliminada exitosamente.',
                timer: 2000
            }).then(function() {
                window.location.reload(); // Recargar la página o actualizar la lista de actividades
            });
        })
        .catch(error => {
            console.error('Error deleting activity:', error);
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'ID de actividad no encontrado.'
        });
    }
}