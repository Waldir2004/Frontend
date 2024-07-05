// function login() {
//     let email = document.getElementById("email.txt").value;
//     let contra = document.getElementById("clave.txt").value;
//     let rol = document.getElementById('rol').value;
//     axios({
//         method:'GET',
//         url: 'http://127.0.0.1:8000/login/'+email,
//     }).then(function(response){
//         let datos=response.data;
//         let i=0, m='';
//         for ( i=0;i<datos.length ;i++){
//             if (email==datos[i].email && contra==datos[i].contraseña){
//                 if (rol == "Administrador"){
//                     localStorage.setItem('nombre',datos[i].nombre)
//                     localStorage.setItem('rol',rol)
//                     localStorage.setItem('id_usuario',datos[i].id_usuario)
//                     Swal.fire({
//                         position: "center",
//                         icon: "success",
//                         title: "Bienvenido Usuario",
//                         showConfirmButton: false,
//                         timer: 2000,
//                         });
//                         setTimeout(function () {
//                         window.location = "../html/Admin/dashboard.html";
//                         }, 2000);
//                     }
//                 }
//                 if(rol=="Coordinador"){
//                     localStorage.setItem('nombre',datos[i].nombre)
//                     localStorage.setItem('rol',rol)
//                     localStorage.setItem('id_usuario',datos[i].id_usuario)
//                     Swal.fire({
//                         position: "center",
//                         icon: "success",
//                         title: " Bienveniodo Coordinador",
//                         showConfirmButton: false,
//                         timer: 2000,
//                         });
//                         setTimeout(function () {
//                         window.location = "../html/Coordinador/dashboard.html";
//                         }, 2000);
//                     } 
//                     if(rol=="Estudiante"){
//                         localStorage.setItem('nombre',datos[i].nombre)
//                         localStorage.setItem('rol',rol)
//                         localStorage.setItem('id_usuario',datos[i].id_usuario)
//                         Swal.fire({
//                             position: "center",
//                             icon: "success",
//                             title: " Bienvenido Estudiante",
//                             showConfirmButton: false,
//                             timer: 2000,
//                             });
//                             setTimeout(function () {
//                             window.location = "../html/Estudiante/dashboard.html";
//                             }, 2000);
//                         }
                
//                 }
//             }
//         )}


function login(event){
    event.preventDefault(); 
    let email = document.getElementById("email").value;
    let contra = document.getElementById("clave").value;
    let rol = document.getElementById('rol').value;

    if (email && contra) {
        if (rol == "Administrador") {
            window.location.href = "html/Admin/dashboard.html";
        } else if (rol == "Coordinador") {
            window.location.href = "html/Coordinador/dashboard.html";
        } else if (rol == "Estudiante") {
            window.location.href = "html/Estudiante/dashboard.html";
        } else {
            alert("Rol no reconocido");
        }
    } else {
        alert("Por favor, complete todos los campos.");
    }
}