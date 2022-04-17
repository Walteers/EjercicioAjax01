const homeTownCharacters = document.getElementById('homeTownCharacters');

//Comentamos la declaracion de "Const table" ya que esta se encuentra declarda en "searchName.js"
//const table = document.getElementById('table');
const homeTownForm= document.getElementById('homeTownForm');

homeTownForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    getDataHomeTown(homeTownCharacters.value);
})



const getDataHomeTown = (homeTownData) => {

    //Instanciamos el objeto XMLHttpRequest
    let xhr;
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
    else xhr = new ActiveXObject("Microsoft.XMLHTTP");


    if (homeTownData == undefined) {
        //Abrimos la peticion en la primera recarga de la pagina(en este caso si los Hometown no estan cargados)
        xhr.open('GET', 'marvel.php');

        // Le decimos que tiene que hacer con los datos obtenidos en la peticion
        xhr.addEventListener('load', (data) => {

            //Obtenemos los datos de la peticion
            const dataJson = JSON.parse(data.target.response);

            //Obtenemos c/u de las ciudades sin repetir en "towns"
            const dataHometown = [];
            for (const heroe of dataJson) {
                //creamos un array con datos "Hometown"
                dataHometown.push(heroe.Hometown);
            }
            const towns = [... new Set(dataHometown)];
            //console.log(towns);

            //Completamos la lista SELECT
            const fragment = document.createDocumentFragment();
            for (const town of towns) {
                const listOption= document.createElement('OPTION');
                listOption.textContent= town;
                listOption.value= town;
                fragment.appendChild(listOption);
            }
            homeTownCharacters.appendChild(fragment);

        })

    } else {

        xhr.open('GET', 'marvel.php');

        // Le decimos que tiene que hacer con los datos obtenidos en la peticion
        xhr.addEventListener('load', (data) => {

            //Obtenemos los datos de la peticion
            const dataJson = JSON.parse(data.target.response);


            //Enviamos los heros a pantalla según su origen
            const fragment = document.createDocumentFragment();
            for (const heroe of dataJson) {

                //Verifico si el dato a buscar es igual al dato en el Json
                if (heroe.Hometown == homeTownData) {

                    const listRow = document.createElement('TR');
                    const nameTD = document.createElement('TD');
                    const alignmentTD = document.createElement('TD');
                    const homeTownTD = document.createElement('TD');
                    const genderTD = document.createElement('TD');
                    const fightingTD = document.createElement('TD');

                    nameTD.textContent = heroe.Name;
                    alignmentTD.textContent = heroe.Alignment;
                    homeTownTD.textContent = heroe.Hometown;
                    genderTD.textContent = heroe.Gender;
                    fightingTD.textContent = heroe.Fighting_Skills;

                    listRow.appendChild(nameTD);
                    listRow.appendChild(alignmentTD);
                    listRow.appendChild(homeTownTD);
                    listRow.appendChild(genderTD);
                    listRow.appendChild(fightingTD);

                    fragment.appendChild(listRow);
                }
                
            }  
            
            // Para eliminar datos en la tabla previamente cargados
            cleanTable(table);

            // Agregamos datos a la tabla
            table.appendChild(fragment);

        })

    }

    xhr.send();
}

getDataHomeTown();