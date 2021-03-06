import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');
const dataProyecto = document.getElementById('dataProyecto');

if(btnEliminar){
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = dataProyecto.dataset.proyecto
        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                const url  = `${location.origin}/proyectos/${urlProyecto}`
                axios.delete(url, {params: {urlProyecto}})
                    .then(function(){
                        Swal.fire(
                            'Eliminado!',
                            'El proyecto se ha eliminado',
                            'success'
                          )
                          setTimeout(() => {
                              window.location.href= '/'
                          }, 2000);
                    })
                    .catch(()=>{
                        Swal.fire({
                            type:'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el Proyecto'
                    });
                })
            }
          })
    })
}
export default btnEliminar
  