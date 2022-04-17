const nameForm = document.getElementById('nameForm');
const nameCharacters = document.getElementById('nameCharacters');
const table = document.getElementById('table');

// Teniendo localizado el formulario(nameForm) escuchamos el evento "submit"(clickeando en el boton) y llamamos a la funcion "getData(id)" con el "id" para buscar el personaje
nameForm.addEventListener('submit', (e) => {
    //Prevenimos la recarga de la pagina por el "submit"
    e.preventDefault();

    getDataName(nameCharacters.children[nameCharacters.selectedIndex].value);
    // con la siguiente instruccion hacemos lo mismo
    //getData(characters.value);
})


const getDataName = (id) => {
    //Instanciamos el objeto XMLHttpRequest
    let xhr;
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
    else xhr = new ActiveXObject("Microsoft.XMLHTTP");

    //Preguntamos primero si la pagina se cargo por primera vez o enviamos una peticion al clickear en button(submit). Se abren las peticiones en cada caso del IF
    if (id == undefined) {
        //Abrimos la petición AJAX
        xhr.open('GET', 'marvel.php');

        //Le decimos que tiene que hacer con los datos una ves cargada(load) la peticion completa
        xhr.addEventListener('load', (data) => {
            const dataJson = JSON.parse(data.target.response);
            //console.log(dataJson);

            //Creamos los SELECT
            const fragment = document.createDocumentFragment();
            for (const heroes of dataJson) {
                const option = document.createElement('OPTION');
                option.value = heroes.ID;
                option.textContent = heroes.Name;
                fragment.appendChild(option);
            }
            nameCharacters.appendChild(fragment);
        })

    } else {

        // Con el "id" seleccionado abrimos la petición AJAX
        xhr.open('GET', `marvel.php?id=${id}`);

        //Le decimos que tiene que hacer con los datos una ves cargada(load) la peticion completa
        xhr.addEventListener('load', (data) => {
            const dataJson = JSON.parse(data.target.response);

            const fragment = document.createDocumentFragment();
            for (const heroe of dataJson) {
                const row = document.createElement('TR');
                const dataName = document.createElement('TD');
                const dataAlignment = document.createElement('TD');
                const dataHomeTown = document.createElement('TD');
                const dataGender = document.createElement('TD');
                const dataFighting = document.createElement('TD');

                dataName.textContent = heroe.Name;
                dataAlignment.textContent = heroe.Alignment;
                dataHomeTown.textContent = heroe.Hometown;
                dataGender.textContent = heroe.Gender;
                dataFighting.textContent = heroe.Fighting_Skills;

                row.appendChild(dataName);
                row.appendChild(dataAlignment);
                row.appendChild(dataHomeTown);
                row.appendChild(dataGender);
                row.appendChild(dataFighting);

                fragment.appendChild(row);
            }

            // Para eliminar datos en la tabla previamente cargados
            cleanTable(table);
            
            table.appendChild(fragment);


        })

    }

    // Enviamos la peticion AJAX
    xhr.send();
}

//Llamamos a la funcion "getData" sin parametros, para que cuando la pagina carge por primera ves, se cargen los datos necesarios de la peticion AJAX para completar los SELECT en este caso
getDataName();