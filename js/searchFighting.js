const fightingCharacters = document.getElementById('fightingCharacters');

//Comentamos la declaracion de "Const table" ya que esta se encuentra declarda en "searchName.js"
//const table = document.getElementById('table');
const fightingForm= document.getElementById('fightingForm');

fightingForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    getDataFighting(fightingCharacters.value);
})



const getDataFighting = (fightingData) => {

    //Instanciamos el objeto XMLHttpRequest
    let xhr;
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
    else xhr = new ActiveXObject("Microsoft.XMLHTTP");


    if (fightingData == undefined) {
        //Abrimos la peticion en la primera recarga de la pagina(en este caso si los Fighting no estan cargados)
        xhr.open('GET', 'marvel.php');

        // Le decimos que tiene que hacer con los datos obtenidos en la peticion
        xhr.addEventListener('load', (data) => {

            //Obtenemos los datos de la peticion
            const dataJson = JSON.parse(data.target.response);
            //console.table(dataJson);

            //Obtenemos c/u de las hábilidades de lucha sin repetir de ".Fighting_Skills"
            const fightingAll = [];
            for (const heroe of dataJson) {
                //creamos un array con datos de ".Fighting_Skills"
                fightingAll.push(heroe.Fighting_Skills);
            }
            //Creamos un array de datos de  ".Fighting_Skills" sin repetir y los ordenamos con .sort()
            const fightingOnly = [... new Set(fightingAll)].sort((a,b)=> a-b);
            //console.log(fightingOnly);

            //Completamos la lista SELECT
            const fragment = document.createDocumentFragment();
            for (const fightingCore of fightingOnly) {
                const listOption= document.createElement('OPTION');
                listOption.textContent= fightingCore;
                listOption.value= fightingCore;
                fragment.appendChild(listOption);
            }
            fightingCharacters.appendChild(fragment);

        })

    } else {

        xhr.open('GET', 'marvel.php');

        // Le decimos que tiene que hacer con los datos obtenidos en la peticion
        xhr.addEventListener('load', (data) => {

            //Obtenemos los datos de la peticion
            const dataJson = JSON.parse(data.target.response);


            //Enviamos los datos de Fighting a pantalla
            const fragment = document.createDocumentFragment();
            for (const heroe of dataJson) {

                //Verifico si el dato a buscar es igual al dato en el Json
                if (heroe.Fighting_Skills == fightingData) {

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

getDataFighting();
