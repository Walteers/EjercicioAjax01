//   Identificamos el formulario del SELECTED de 'Buscar por género'
const genderForm = document.getElementById('genderForm');

genderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getDataGender(genderForm.genderCharacters.value);
})


//---------------------------------------------------------------

const getDataGender = (genderData) => {

    //  Instanciamos un objeto XMLHttpRequest a traves de una función
    const xhr= getXHR();

    if (genderData == undefined) {
        //Abrimos la peticion en la primera recarga de la pagina(en este caso si los Gender no estan cargados)
        xhr.open('GET', 'marvel.php');

        // Le decimos que tiene que hacer con los datos obtenidos en la peticion
        xhr.addEventListener('load', (data) => {

            //Obtenemos los datos de la peticion
            const dataJson = JSON.parse(data.target.response);
            //console.table(dataJson);
            
            //  Teniendo identificado el SELECTED 'genderForm.genderCharacters' le agregamos los hijos que corresponden mediante la función 'addOptionToSelect'. Esta función retorna un fragmento, que es un conjunto de OPTION para agregar a un SELECTED
            genderForm.genderCharacters.appendChild(addOptionToSelect(dataJson, 'Gender'));
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
            table.appendChild(addTRwithTD(dataJson, 'Gender', genderData));
        })
    }
    xhr.send();
}


//---------------------------------------------------------------

//Llamamos a la funcion "getDataGender" sin parametros, para que cuando la pagina carge por primera ves, se cargen los datos necesarios de la peticion AJAX para completar los SELECT en este caso
getDataGender();
