const alignmentCharacters = document.getElementById('alignmentCharacters');

//Comentamos la declaracion de "Const table" ya que esta se encuentra declarda en "searchName.js"
//const table = document.getElementById('table');
const alignmentForm= document.getElementById('alignmentForm');

alignmentForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    //console.log(alignmentCharacters.value);
    getDataAlignment(alignmentCharacters.value);
})



const getDataAlignment = (alignmentData) => {

    //Instanciamos el objeto XMLHttpRequest
    let xhr;
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
    else xhr = new ActiveXObject("Microsoft.XMLHTTP");


    if (alignmentData == undefined) {
        //Abrimos la peticion en la primera recarga de la pagina(en este caso si los Alignment no estan cargados)
        xhr.open('GET', 'marvel.php');

        // Le decimos que tiene que hacer con los datos obtenidos en la peticion
        xhr.addEventListener('load', (data) => {

            //Obtenemos los datos de la peticion
            const dataJson = JSON.parse(data.target.response);
            //console.table(dataJson);

            //Obtenemos c/u de los Alignment sin repetir de ".Alignment"
            const align = [];
            for (const heroe of dataJson) {
                //creamos un array con datos Alignment"
                align.push(heroe.Alignment);
            }
            const alineaciones = [... new Set(align)];
            //console.log(alineaciones);

            //Completamos la lista SELECT
            const fragment = document.createDocumentFragment();
            for (const alineacion of alineaciones) {
                const listOption= document.createElement('OPTION');
                listOption.textContent= alineacion;
                listOption.value= alineacion;
                fragment.appendChild(listOption);
            }
            alignmentCharacters.appendChild(fragment);

        })

    } else {

        xhr.open('GET', 'marvel.php');

        // Le decimos que tiene que hacer con los datos obtenidos en la peticion
        xhr.addEventListener('load', (data) => {

            //Obtenemos los datos de la peticion
            const dataJson = JSON.parse(data.target.response);


            //Enviamos los generos a pantalla
            const fragment = document.createDocumentFragment();
            for (const heroe of dataJson) {

                //Verifico si el dato a buscar es igual al dato en el Json
                if (heroe.Alignment == alignmentData) {

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

getDataAlignment();
