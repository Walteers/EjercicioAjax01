//   Identificamos el formulario del SELECTED de 'Buscar por nacionalidad'
const alignmentForm= document.getElementById('alignmentForm');

alignmentForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    //console.log(alignmentCharacters.value);
    getDataAlignment(alignmentCharacters.value);
})


//---------------------------------------------------------------

const getDataAlignment = (alignmentData) => {

    //  Instanciamos un objeto XMLHttpRequest a traves de una función
    const xhr= getXHR();

    if (alignmentData == undefined) {
        //Abrimos la peticion en la primera recarga de la pagina(en este caso si los Alignment no estan cargados)
        xhr.open('GET', 'marvel.php');

        // Le decimos que tiene que hacer con los datos obtenidos en la peticion
        xhr.addEventListener('load', (data) => {

            //Obtenemos los datos de la peticion
            const dataJson = JSON.parse(data.target.response);
            //console.table(dataJson);

            //  Teniendo identificado el SELECTED 'alignmentForm.alignmentCharacters' le agregamos los hijos que corresponden mediante la función 'addOptionToSelect'. Esta función retorna un fragmento, que es un conjunto de OPTION para agregar a un SELECTED
            alignmentForm.alignmentCharacters.appendChild(addOptionToSelect(dataJson, 'Alignment'));
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
            table.appendChild(addTRwithTD(dataJson, 'Alignment', alignmentData));
        })
    }
    xhr.send();
}


//---------------------------------------------------------------

//Llamamos a la funcion "getDataAlignment" sin parametros, para que cuando la pagina carge por primera ves, se cargen los datos necesarios de la peticion AJAX para completar los SELECT en este caso
getDataAlignment();
