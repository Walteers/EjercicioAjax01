//  Identificamos el formulario del SELECT de busqueda por nombre
const nameForm = document.getElementById('nameForm');
// Identificamos la TABLE
const table = document.getElementById('table');

//---------------------------------------------------------------


//  Teniendo localizado el formulario(nameForm) escuchamos el evento "submit"(clickeando en el boton) y llamamos a la funcion "getData(id)" con el "id" para buscar el personaje
nameForm.addEventListener('submit', (e) => {
    //  Prevenimos la recarga de la pagina por el "submit"
    e.preventDefault();

    //  Llamamos a la funcion `'getDataName' con el ID como argumento para poder hacer una peticion Ajax y que nos devuelva los datos por el nombre
    getDataName(nameCharacters.children[nameCharacters.selectedIndex].value);
    //  Con la siguiente instruccion hacemos lo mismo
    //getData(characters.value);
})


//---------------------------------------------------------------

const getDataName = (id) => {
    //  Instanciamos un objeto XMLHttpRequest a traves de una función
    const xhr = getXHR();

    //Preguntamos primero si la pagina se cargo por primera vez o enviamos una peticion al clickear en button(submit). Se abren las peticiones en cada caso del IF
    if (id == undefined) {
        //Abrimos la petición AJAX
        xhr.open('GET', 'marvel.php');

        //Le decimos que tiene que hacer con los datos una ves cargada(load) la peticion completa
        xhr.addEventListener('load', (data) => {
            const dataJson = JSON.parse(data.target.response);
            //  Con la siguiente instrucción hariamos lo mismo que con la anterior, accediendo a la propiedad 'responseText' del objeto 'xhr'
            //const dataJasonOb= xhr.responseText;            

            //  Al SELECT nameCharacters le agregamos todos los hijos(OPTION) a traves de un loop
            const fragment = document.createDocumentFragment();
            for (const heroes of dataJson) {
                const option = document.createElement('OPTION');
                option.value = heroes.ID;
                option.textContent = heroes.Name;
                fragment.appendChild(option);
            }
            nameForm.nameCharacters.appendChild(fragment);

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


//---------------------------------------------------------------

//Llamamos a la funcion "getData" sin parametros, para que cuando la pagina carge por primera ves, se cargen los datos necesarios de la peticion AJAX para completar los SELECT en este caso
getDataName();