/*

Autor: Joel Alejandro Rubio Aguilar.
Fecha: 13-Septiembre-2019.

*/


/**
 * Dibuja las líneas correspondientes a los
 * valores 1 o 0 de la codificación "Manchester".
 * 
 * @param {object} canvas 
 * @param {array of int} bitsStream 
 */
function printManchester(canvas, bitsStream) {

    let coordinates = new Array(30, 50, 50, 50);

    for (let counter = 0; counter < bitsStream.length; counter++) {

        if (bitsStream[counter] === 1) {

            
            /* Si el bit anterior fue uno, entonces dibuja la línea continua del bit uno desde el bit cero,
            * si no, dibuja la línea del bit uno desde el principio o desde un bit uno anterior.
            */
            if ((counter - 1) >= 0 && bitsStream[counter - 1] === 1) {
                drawBitOneManchester(canvas, coordinates, "alternative", counter);
            }
            else {
                drawBitOneManchester(canvas, coordinates, "normal", counter);
            }


            /* Dibuja una línea continua hacia abajo si el número siguiente es uno. */
            if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 1) {
                drawLineDown(canvas, coordinates, "manchester");
            }


            /* Dibuja el bit uno en canvas. */
            printBitManchester(canvas, bitsStream[counter], counter);
        }
        else {


            /* Si el bit anterior fue cero, entonces dibuja la línea continua del bit cero desde el bit uno,
            * si no, dibuja la línea del bit cero desde el principio o desde un bit cero anterior.
            */
            if ((counter - 1) >= 0 && bitsStream[counter - 1] === 0) {
                drawBitZeroManchester(canvas, coordinates, "alternative", counter);
            }
            else {
                drawBitZeroManchester(canvas, coordinates, "normal", counter);
            }


            /* Dibuja una línea continua hacia abajo si el número siguiente es uno. */
            if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 0) {                
                drawLineUp(canvas, coordinates, "manchester");
            }


            /* Dibuja el bit uno en canvas. */ 
            printBitManchester(canvas, bitsStream[counter], counter);
        }
    }
}



/**
 * Calcula las coordenadas para el bit uno del
 * método de codificación manchester. Llama a la función:
 * "drawLine" para dibujarlas junto con las respectivas líneas
 * punteadas.
 *
 * @param {object} canvas
 * @param {array of int} coordinates
 * @param {string} flag
 * @param {int} counter
 */
function drawBitOneManchester(canvas, coordinates, flag, counter) {

    if (flag == "normal") {

        coordinates[0] += 20;
        coordinates[2] += 20;

        if (counter === 0) {

            coordinates[1] += 20;
            coordinates[3] += 20;


            let dottedCoordinates = getDottedCoordinatesP1(coordinates);

            dottedCoordinates[1] -= 20;
            dottedCoordinates[3] -= 20;

            printDottedLine(canvas, dottedCoordinates);
        }

        drawLine(canvas, coordinates);


        coordinates[0] += 20;
        coordinates[3] -= 20;

        drawLine(canvas, coordinates);


        coordinates[1] -= 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);
    }
    else {

        coordinates[1] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        coordinates[0] += 20;
        coordinates[3] -= 20;

        drawLine(canvas, coordinates);


        coordinates[1] -= 20;
        coordinates[2] += 20;                

        drawLine(canvas, coordinates);
    }    

    printDottedLine(canvas, getDottedCoordinatesP2(coordinates));
}




/**
 * Calcula las coordenadas para el bit cero del
 * método de codificación manchester. Llama a la función:
 * "drawLine" para dibujarlas junto con las respectivas líneas
 * punteadas.
 *
 * @param {object} canvas
 * @param {array of int} coordinates
 * @param {string} flag
 * @param {int} counter
 */
function drawBitZeroManchester(canvas, coordinates, flag, counter) {    

    if (flag == "normal") {

        coordinates[0] += 20;
        coordinates[2] += 20;

        //Imprime la línea vertical al inicio de la codificación. 
        if (counter === 0) {            
            printDottedLine(canvas, getDottedCoordinatesP1(coordinates));
        }

        drawLine(canvas, coordinates);


        coordinates[0] += 20;
        coordinates[3] += 20;

        drawLine(canvas, coordinates);


        coordinates[1] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);
    }
    else {

        coordinates[1] -= 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        coordinates[0] += 20;
        coordinates[3] += 20;

        drawLine(canvas, coordinates);


        coordinates[2] += 20;
        coordinates[1] += 20;

        drawLine(canvas, coordinates);
    }

    let dottedCoordinates = getDottedCoordinatesP2(coordinates);

    dottedCoordinates[1] -= 20;
    dottedCoordinates[3] -= 20;

    printDottedLine(canvas, dottedCoordinates);
}




/**
 * Imprime sobre el canvas el número literal:
 * 1 ó 0, dependiendo del número que contenga
 * el contador del "for" principal de la impresión del
 * método de codificación manchester.
 *
 * @param {object} canvas
 * @param {int} bit
 * @param {int} counter
 */
function printBitManchester(canvas, bit, counter) {

    canvas.font = "15px Georgia";

    if (counter === 0) {

        canvas.fillText(bit, 65, 20);

        return;
    }

    if (counter === 1) {

        canvas.fillText(bit, 105, 20);

        return;
    }


    let coordinateX = iterateCoordinateX(105, counter, "manchester");

    canvas.fillText(bit, coordinateX, 20);
}