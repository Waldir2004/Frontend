
document.addEventListener("DOMContentLoaded", function() {
    axios.get('http://127.0.0.1:8000/get_schools')
        .then(function(response) {
            let data = response.data.resultado;
            let tableBody = document.querySelector("#lista-colegios tbody");
            tableBody.innerHTML = "";

            function mapState(state) {
                return state === 1 ? "Activo" : "Inactivo";
            }

            function formatTimestamp(timestamp) {
                if (timestamp) {
                    let date = new Date(timestamp);
                    return date.toLocaleString();
                }
                return '';
            }

            data.forEach((school, index) => {
                let row = tableBody.insertRow(index);
                let cellId = row.insertCell(0);
                let cellName = row.insertCell(1);
                let cellState = row.insertCell(2);
                let cellAdded = row.insertCell(3);
                let cellUpdated = row.insertCell(4);
                let cellDeleted = row.insertCell(5);

                cellId.textContent = school.id;
                cellName.textContent = school.name;
                cellState.textContent = mapState(school.state);
                cellAdded.textContent = formatTimestamp(school.created_at);
                cellUpdated.textContent = formatTimestamp(school.updated_at);

                cellDeleted.innerHTML = `
                    <button type="button" class="btn btn-primary" onclick="showUpdateModal(${school.id}, '${school.name}', ${school.state})">
                        Editar
                    </button> 
                    <button type="button" class="btn btn-danger" onclick="showDeleteModal(${school.id})">
                        Eliminar
                    </button>
                `;
            });
        })
        .catch(function(error) {
            console.error('Error fetching data: ', error);
        });
});

function showUpdateModal(schoolId, name, state) {
    document.getElementById("update-id").value = schoolId;
    document.getElementById("update-name").value = name;
    document.getElementById("update-state").value = state;
    $('#updateModal').modal('show');
}

function showDeleteModal(schoolId) {
    document.getElementById("delete-id").value = schoolId;
    $('#deleteModal').modal('show');
}

function updateSchool() {
    const schoolId = document.getElementById("update-id").value;
    const schoolName = document.getElementById("update-name").value;
    const schoolState = document.getElementById("update-state").value;

    axios.put(`http://127.0.0.1:8000/edit_schools/${schoolId}`, {
        name: schoolName,
        state: schoolState
    })
    .then(response => {
        $('#updateModal').modal('hide');
        location.reload();
    })
    .catch(error => {
        console.error('Error updating school: ', error);
    });
}

function deleteSchool() {
    const schoolId = document.getElementById("delete-id").value;

    axios.delete(`http://127.0.0.1:8000/delete_schools/${schoolId}`)
    .then(response => {
        $('#deleteModal').modal('hide');
        location.reload();
    })
    .catch(error => {
        console.error('Error deleting school: ', error);
    });
}

function createSchool() {
    const name = document.getElementById("name").value;
    const state = document.getElementById("state").value;

    const newSchool = {
        name: name,
        state: state
    };
    if (name !== ""){
        axios.post('http://127.0.0.1:8000/create_Schools', newSchool)
            .then(function (response) {
                console.log('School created:', response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'School Created',
                    text: 'The school has been successfully created.',
                    timer: 2000
                }).then(function () {
                    window.location.reload(); // Reload the page or handle navigation
                });
            })
            .catch(function (error) {
                console.error('Error creating school:', error);
            });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There was an error creating the school. Please try again later.'
        });
    }
}

