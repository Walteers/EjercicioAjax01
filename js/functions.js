// Para eliminar datos en la tabla previamente cargados
const cleanTable = (table) => {
    if (table.children[1]) {
        for (let i = table.children.length; i > 1; i--) {
            table.removeChild(table.children[i - 1]);
        }
    }
}