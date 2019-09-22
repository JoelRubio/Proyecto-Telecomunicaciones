/*

Autor: Joel Alejandro Rubio Aguilar.
Fecha: 12-Septiembre-2019.

*/



/**
 * Dibuja las líneas correspondientes a los
 * valores 1 o 0 de la codificación "NRZ-L".
 * 
 * @param {object} canvas 
 * @param {array of int} bitsStream 
 */
function printNrzl(canvas, bitsStream) {

    //let coordinates = new Array(30, 20, 50, 20);

    let coordinates = new Array(20, 50, 50, 50);

    for (let counter = 0; counter < bitsStream.length; counter++) {

        if (bitsStream[counter] === 1) {

            /* Si el bit anterior fue cero, entonces dibuja la línea continua del bit uno desde el bit cero,
             * si no, dibuja la línea del bit uno desde el principio o desde un bit uno anterior.
            */
            if ((counter - 1) >= 0 && bitsStream[counter - 1] === 0) {
                drawBitOneNrzl(canvas, coordinates, "alternative", counter);                
            }
            else {
                drawBitOneNrzl(canvas, coordinates, "normal", counter);                
            }            


            /* Dibuja una línea continua hacia arriba si el número siguiente es cero. */
            if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 0) {
                drawLineUp(canvas, coordinates, "nrzl");
            }

            /* Dibuja el bit uno en canvas. */
            printBitNrzl(canvas, bitsStream[counter], counter);
        }
        else {            


            /* Si el bit anterior fue uno, entonces dibuja la línea continua del bit cero desde el bit uno,
            * si no, dibuja la línea del bit cero desde el principio o desde un bit cero anterior.
            */
            if ((counter - 1) >= 0 && bitsStream[counter - 1] === 1) {
                drawBitZeroNrzl(canvas, coordinates, "alternative", counter);                
            }
            else {
                drawBitZeroNrzl(canvas, coordinates, "normal", counter);                
            }            


            /* Dibuja una línea continua hacia arriba si el número siguiente es cero. */
            if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 1) {                
                drawLineDown(canvas, coordinates, "nrzl");
            }         

            /* Dibuja el bit cero en canvas. */
            printBitNrzl(canvas, bitsStream[counter], counter);
        }
    }
}



/**
 * Calcula las coordenadas para el bit uno del
 * método de codificación nrz-l. Llama a la función
 * para dibujarlas junto con las respectivas líneas 
 * punteadas.
 * 
 * @param {object} canvas 
 * @param {array of int} coordinates 
 * @param {string} flag 
 * @param {int} counter
 */
function drawBitOneNrzl(canvas, coordinates, flag, counter) {    

    if (flag == "normal") {

        coordinates[0] += 30;
        coordinates[2] += 30;        

        if (counter === 0) {            

            coordinates[1] += 30;
            coordinates[3] += 30;            

            //Imprime la línea vertical al inicio de la codificación.

            let dottedCoordinates = getDottedCoordinatesP1(coordinates);

            dottedCoordinates[1] -= 30;
            dottedCoordinates[3] -= 30;

            printDottedLine(canvas, dottedCoordinates);
        }        
    }
    else {

        coordinates[1] += 30;
        coordinates[2] += 30;
    }
    
    drawLine(canvas, coordinates);      


    let dottedCoordinates = getDottedCoordinatesP2(coordinates);

    dottedCoordinates[1] -= 30;
    dottedCoordinates[3] -= 30;  

    printDottedLine(canvas, dottedCoordinates);
}



/**
 * Calcula las coordenadas para el bit cero del
 * método de codificación nrz-l. Llama a la función
 * para dibujarlas junto con las respectivas líneas
 * punteadas.
 * 
 * @param {object} canvas 
 * @param {array of int} coordinates 
 * @param {string} flag 
 * @param {int} counter
 */
function drawBitZeroNrzl(canvas, coordinates, flag, counter) {

    if (flag == "normal") {

        coordinates[0] += 30;
        coordinates[2] += 30;
        
        //Imprime la línea vertical al inicio de la codificación.         
        if (counter === 0) {                       
            printDottedLine(canvas, getDottedCoordinatesP1(coordinates));
        }
    }
    else {

        coordinates[1] -= 30;
        coordinates[2] += 30;        
    }

    drawLine(canvas, coordinates);

    printDottedLine(canvas, getDottedCoordinatesP2(coordinates));
}



/**
 * Imprime sobre el canvas el número literal:
 * 1 ó 0, dependiendo del número que contenga
 * el contador del "for" principal de la impresión del
 * método de codificación nrz-l.
 * 
 * @param {object} canvas 
 * @param {int} bit 
 * @param {int} counter 
 */
function printBitNrzl(canvas, bit, counter) {

    canvas.font = "15px Georgia";

    if (counter === 0) {

        canvas.fillText(bit, 63, 20);

        return;
    }

    if (counter === 1) {

        canvas.fillText(bit, 90, 20);

        return;
    }    

    let coordinateX = iterateCoordinateX(90, counter, "nrzl");

    canvas.fillText(bit, coordinateX, 20);
}
