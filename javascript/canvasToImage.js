/*
Autor: Joel Alejandro Rubio Aguilar. 
Fecha: 14-Septiembre-2019

*/


/**
 * Llama a la función que convierte de canvas
 * a una imagen para cada método de codificación de 
 * señal.
 * 
 * @param {array of objects} canvasMethods
 */
function setDataImageDownload(canvasMethods) {

    downloadCanvasToImage("downloadNrzl", canvasMethods[0]);

    downloadCanvasToImage("downloadManchester", canvasMethods[1]);

    downloadCanvasToImage("downloadDiffManchester", canvasMethods[2]);

    downloadCanvasToImage("downloadBipolarAmi", canvasMethods[3]);
}


/**
 * Asigna el link de la imagen al id
 * de la etiqueta <a>.
 * 
 * @param {string} idLink 
 * @param {object} canvas 
 */
function downloadCanvasToImage(idLink, canvas) {

    let canvasToImage = canvas.toDataURL("image/png");

    let imageData = canvasToImage.replace(/^data:image\/png/, "data:application/octet-stream");

    $("#" + idLink).attr("href", imageData);
}