//   Identificamos el formulario del SELECTED de 'Buscar por hábilidades de lucha'
const fightingForm= document.getElementById('fightingForm');

fightingForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    getDataFighting(fightingCharacters.value);
})


//---------------------------------------------------------------

const getDataFighting = (fightingData) => {

    //  Instanciamos un objeto XMLHttpRequest a traves de una función
    const xhr= getXHR();

    if (fightingData == undefined) {
        //Abrimos la peticion en la primera recarga de la pagina(en este caso si los Fighting no estan cargados)
        xhr.open('GET', 'marvel.php');

        // Le decimos que tiene que hacer con los datos obtenidos en la peticion
        xhr.addEventListener('load', (data) => {

            //Obtenemos los datos de la peticion
            const dataJson = JSON.parse(data.target.response);
            //console.table(dataJson);

            //  Teniendo identificado el SELECTED 'fightingForm.fightingCharacters' le agregamos los hijos que corresponden mediante la función 'addOptionToSelect'. Esta función retorna un fragmento, que es un conjunto de OPTION para agregar a un SELECTED
            fightingForm.fightingCharacters.appendChild(addOptionToSelect(dataJson, 'Fighting_Skills'));
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
            table.appendChild(addTRwithTD(dataJson, 'Fighting_Skills', fightingData));

        })

    }

    xhr.send();
}


//---------------------------------------------------------------

//Llamamos a la funcion "getDataFighting" sin parametros, para que cuando la pagina carge por primera ves, se cargen los datos necesarios de la peticion AJAX para completar los SELECT en este caso
getDataFighting();
