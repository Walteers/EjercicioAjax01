//   Identificamos el formulario del SELECTED de 'Buscar por nacionalidad'
const homeTownForm= document.getElementById('homeTownForm');

// Escuchamos el evento 'submit' del formulario de 'Buscar por nacionalidad'
homeTownForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    getDataHomeTown(homeTownCharacters.value);
})


//---------------------------------------------------------------

const getDataHomeTown = (homeTownData) => {

    //  Instanciamos un objeto XMLHttpRequest a traves de una función
    const xhr= getXHR();

    if (homeTownData == undefined) {
        //Abrimos la peticion en la primera recarga de la pagina(en este caso si los Hometown no estan cargados)
        xhr.open('GET', 'marvel.php');

        // Le decimos que tiene que hacer con los datos obtenidos en la peticion
        xhr.addEventListener('load', (data) => {

            //Obtenemos los datos de la peticion
            const dataJson = JSON.parse(data.target.response);

            //  Teniendo identificado el SELECTED 'homeTownForm.homeTownCharacters' le agregamos los hijos que corresponden mediante la función 'addOptionToSelect'. Esta función retorna un fragmento, que es un conjunto de OPTION para agregar a un SELECTED
            homeTownForm.homeTownCharacters.appendChild(addOptionToSelect(dataJson, 'Hometown'));
        })
    } else {

        xhr.open('GET', 'marvel.php');

        // Le decimos que tiene que hacer con los datos obtenidos en la peticion
        xhr.addEventListener('load', (data) => {

            //Obtenemos los datos de la peticion
            const dataJson = JSON.parse(data.target.response);           
            
            // Para eliminar datos en la tabla previamente cargados
            cleanTable(table);

            // Agregamos datos a la tabla a traves de una funcion que construye un TR con sus respectivos TD(un heroe con sus datos)
            table.appendChild(addTRwithTD(dataJson, 'Hometown', homeTownData));
        })
    }
    xhr.send();
}


//---------------------------------------------------------------

//Llamamos a la funcion "getDataHomeTown" sin parametros, para que cuando la pagina carge por primera ves, se cargen los datos necesarios de la peticion AJAX para completar los SELECT en este caso
getDataHomeTown();