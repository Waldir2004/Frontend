document.addEventListener("DOMContentLoaded", function() {
    axios.get('http://127.0.0.1:8000/get_reports')
        .then(function(response) {
            let data = response.data.resultado;
            let tableBody = document.querySelector("#lista-reportes tbody");
            tableBody.innerHTML = "";

            data.forEach((report, index) => {
                let row = tableBody.insertRow(index);
                let cellId = row.insertCell(0);
                let cellTypeReportId = row.insertCell(1);
                let cellReporterId = row.insertCell(2);
                let cellReportedUserId = row.insertCell(3);
                let cellDescription = row.insertCell(4);
                let cellActions = row.insertCell(5);

                cellId.textContent = report.id;
                cellTypeReportId.textContent = report.type_report_id;
                cellReporterId.textContent = report.reporter_id;
                cellReportedUserId.textContent = report.reported_user_id;
                cellDescription.textContent = report.description;

                let descriptionEscaped = report.description.replace(/'/g, "\\'");

                cellActions.innerHTML = `
                    <button type="button" class="btn btn-primary" onclick="showViewModal(${report.id}, ${report.type_report_id}, '${report.reporter_id}', '${report.reported_user_id}', '${descriptionEscaped}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button type="button" class="btn btn-warning" onclick="showUpdateModal(${report.id}, ${report.type_report_id}, '${report.reporter_id}', '${report.reported_user_id}', '${descriptionEscaped}')">
                        <i class="fas fa-edit"></i>
                    </button> 
                    <button type="button" class="btn btn-danger" onclick="showDeleteModal(${report.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
            });
        });
            $('#lista-reportes').DataTable({
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


        function showUpdateModal(reportId, typeReportId, reporterId, reportedUserId, description) {
            document.getElementById("update-report-id").value = reportId;
            document.getElementById("update-type_report_id").value = typeReportId;
            document.getElementById("update-reporter_id").value = reporterId;
            document.getElementById("update-reported_user_id").value = reportedUserId;
            document.getElementById("update-description").value = description;
            $('#updateReportModal').modal('show');
        }
        
        function updateReport() {
            const reportId = document.getElementById('update-report-id').value;
            const typeReportId = document.getElementById('update-type_report_id').value;
            const reporterId = document.getElementById('update-reporter_id').value;
            const reportedUserId = document.getElementById('update-reported_user_id').value;
            const description = document.getElementById('update-description').value;
        
            axios.put(`http://127.0.0.1:8000/edit_reports/${reportId}`, {
                type_report_id: typeReportId,
                reporter_id: reporterId,
                reported_user_id: reportedUserId,
                description: description
            })
            .then(response => {
                alert('Reporte actualizado exitosamente');
                $('#updateReportModal').modal('hide');  // Oculta el modal
                // Actualiza la vista si es necesario
            })
            .catch(error => {
                console.error('Error actualizando el reporte:', error);
                alert('Error al actualizar el reporte');
            });
        }

function showDeleteModal(reportId) {
    document.getElementById("delete_id").value = reportId;
    $('#deleteModal').modal('show');
}

function deleteReport() {
    const reportId = document.getElementById("delete_id").value;

    axios.delete(`http://127.0.0.1:8000/delete_reports/${reportId}`)
    .then(response => {
        $('#deleteModal').modal('hide');
        location.reload();
    })
    .catch(error => {
        console.error('Error deleting report: ', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const typeReportSelect = document.getElementById("type_report_id");

    // Aquí puedes agregar manualmente los tipos de reportes
    const options = [
        { value: 1, text: "Tipo 1" },
        { value: 2, text: "Tipo 2" }
    ];

    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.textContent = option.text;
        typeReportSelect.appendChild(opt);
    });
});

function createReport() {
    const typeReportId = document.getElementById("type_report_id").value;
    const reporterId = document.getElementById("reporter_id").value;
    const reportedUserId = document.getElementById("reported_user_id").value;
    const description = document.getElementById("description").value;

    const newReport = {
        type_report_id: parseInt(typeReportId),
        reporter_id: parseInt(reporterId),
        reported_user_id: parseInt(reportedUserId),
        description: description
    };

    if (!isNaN(newReport.type_report_id) && !isNaN(newReport.reporter_id) && !isNaN(newReport.reported_user_id) && description) {
        axios.post('http://127.0.0.1:8000/create_reports', newReport)
            .then(function (response) {
                console.log('Report created:', response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Report Created',
                    text: 'The report has been successfully created.',
                    timer: 2000
                }).then(function () {
                    window.location.reload();
                });
            })
            .catch(function (error) {
                console.error('Error creating report:', error.response.data);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error creating the report: ' + error.response.data.message
                });
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill out all fields.'
        });
    }
}

/*$(document).ready(function() {
    // Función para manejar la búsqueda y mostrar resultados
    function searchUsers(inputId, listId) {
        $(inputId).on('keyup', function() {
            var name = $(this).val();
            if (name.length > 0) {
                axios.get(`http://127.0.0.1:8000/search_users?name=${name}`)
                    .then(function(response) {
                        var userList = response.data;
                        var html = '';
                        $.each(userList, function(index, user) {
                            html += `<div class="user-item" data-id="${user.id}" data-name="${user.name}">${user.name}</div>`;
                        });
                        $(listId).html(html);
                    })
                    .catch(function(error) {
                        console.error('Error fetching users:', error);
                    });
            } else {
                $(listId).empty();
            }
        });

        // Manejar la selección de usuario de la lista
        $(document).on('click', `${listId} .user-item`, function() {
            var id = $(this).data('id');
            var name = $(this).data('name');
            $(inputId).val(name);
            $(listId).empty(); // Limpiar la lista después de la selección
        });
    }

    searchUsers('#reporter_id', '#reporter-list');
    searchUsers('#reported_user_id', '#reported-user-list');
});*/
