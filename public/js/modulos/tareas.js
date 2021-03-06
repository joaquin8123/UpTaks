import Swal from 'sweetalert2';
import axios from 'axios';
const tareas = document.querySelector('.listado-pendientes')
const dataTarea = document.getElementById('dataTarea');

tareas.addEventListener('click', e =>{
    if(e.target.classList.contains('fa-check-circle') || e.target.classList.contains('fa-times-circle')){
        const id = dataTarea.dataset.tarea
        Swal.fire({
            title: 'Deseas cambiar de estado esta tarea?',
            //text: "Un proyecto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Actualizar',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                const url  = `${location.origin}/proyectos/${id}`
                axios.put(url, {params: {id}})
                    .then(function(){
                        Swal.fire(
                            'Actualizado!',
                            'La tarea se ha actualizado',
                            'success'
                          )
                          setTimeout(() => {
                            window.location.href= location.href
                          }, 1000);
                    })
                    .catch(()=>{
                        Swal.fire({
                            type:'error',
                            title: 'Hubo un error',
                            text: 'No se pudo actualizar la Tarea'
                    });
                })
            }
          })
    }
    if(e.target.classList.contains('fa-trash')){
        const id = dataTarea.dataset.tarea
        Swal.fire({
            title: 'Deseas eliminar esta tarea?',
            //text: "Un proyecto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
            
            if (result.isConfirmed) {
                const url  = `${location.origin}/proyectos/eliminar-tarea/${id}`
                axios.delete(url, {params: {id}})
                    .then(function(){
                        Swal.fire(
                            'Eliminado!',
                            'La tarea se ha eliminado',
                            'success'
                          )
                          setTimeout(() => {
                              window.location.href= location.href
                          }, 1000);
                    })
                    .catch(()=>{
                        Swal.fire({
                            type:'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar la Tarea'
                    });
                })
            }
          })
    }
})

export default tareas