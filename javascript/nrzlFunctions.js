/*

Autor: Joel Alejandro Rubio Aguilar.
Fecha: 12-Septiembre-2019.

*/



/**
 * Imprime las líneas correspondientes a los
 * valores 1 o 0 de la codificación "NRZ-L".
 * 
 * @param {object} canvas 
 * @param {array of int} bitsStream 
 */
function printNrzl(canvas, bitsStream) {

    //let coordinates = new Array(30, 20, 50, 20);

    let coordinates = new Array(30, 50, 60, 50);

    for (let counter = 0; counter < bitsStream.length; counter++) {

        if (bitsStream[counter] === 1) {

            if ((counter - 1) >= 0 && bitsStream[counter - 1] === 0) {
                drawBitOneNrzl(canvas, coordinates, "alternative", counter);                
            }
            else {
                drawBitOneNrzl(canvas, coordinates, "normal", counter);                
            }            

            if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 0) {
                drawLineUp(canvas, coordinates, "nrzl");
            }

            printBitNrzl(canvas, bitsStream[counter], counter); //Imprime el número "1" en canvas.
        }
        else {

            if ((counter - 1) >= 0 && bitsStream[counter - 1] === 1) {
                drawBitZeroNrzl(canvas, coordinates, "alternative");                
            }
            else {
                drawBitZeroNrzl(canvas, coordinates, "normal");                
            }            

            if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 1) {                
                drawLineDown(canvas, coordinates, "nrzl");
            }

            printBitNrzl(canvas, bitsStream[counter], counter); //Imprime el número "0" en canvas.
        }
    }
}


/**
 * Calcula las coordenadas para el bit cero del
 * método de codificación, nrz-l. Llama a la función
 * para imprimirlas junto con las respectivas líneas 
 * punteadas.
 * 
 * @param {object} canvas 
 * @param {array of int} coordinates 
 * @param {string} flag 
 * @param {int} counter
 */
function drawBitOneNrzl(canvas, coordinates, flag, counter) {    

    if (flag == "normal") {

        if (counter === 0) {

            coordinates[1] += 30;
            coordinates[3] += 30;
        }

        coordinates[0] += 30;
        coordinates[2] += 30;        
    }
    else {

        coordinates[1] += 30;
        coordinates[2] += 30;
    }
    
    drawLine(canvas, coordinates);      


    let dottedCoordinates = getDottedCoordinates(coordinates);

    dottedCoordinates[1] -= 30;
    dottedCoordinates[3] -= 30;  

    printDottedLine(canvas, dottedCoordinates);
}



/**
 * Calcula las coordenadas para dibujar
 * la línea del bit 1.
 * 
 * @param {object} canvas 
 * @param {array of int} coordinates 
 * @param {string} flag 
 */
function drawBitZeroNrzl(canvas, coordinates, flag) {

    if (flag == "normal") {

        coordinates[0] += 30;
        coordinates[2] += 30;        
    }
    else {

        coordinates[1] -= 30;
        coordinates[2] += 30;        
    }

    drawLine(canvas, coordinates);

    printDottedLine(canvas, getDottedCoordinates(coordinates));
}



/**
 * Imprime sobre el canvas el número literal:
 * 1 ó 0, dependiendo del número que contenga
 * el contador del "for" principal de la impresión
 * método de codificación.
 * 
 * @param {object} canvas 
 * @param {int} bit_stream 
 * @param {int} counter 
 */
function printBitNrzl(canvas, bit, counter) {

    canvas.font = "15px Georgia";

    if (counter === 0) {

        canvas.fillText(bit, 73, 20);

        return;
    }

    if (counter === 1) {

        canvas.fillText(bit, 100, 20);

        return;
    }

    let coordinateX = 100;

    coordinateX = iterateCoordinateX(coordinateX, counter, "nrzl");

    canvas.fillText(bit, coordinateX, 20);
}
