/*

Autor: Joel Alejandro Rubio Aguilar.
Fecha: 12-Septiembre-2019.

*/



/**
 * Impresión de la señal binaria para NRZ-L.
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

                drawBitOneNrzl(canvas, coordinates, "alternative");

                printBitNrzl(canvas, bitsStream[counter], counter); //Imprime el número "1" en canvas.
            }
            else {

                drawBitOneNrzl(canvas, coordinates, "normal");

                printBitNrzl(canvas, bitsStream[counter], counter); //Imprime el número "1" en canvas.
            }


            if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 0) {
                drawLineDown(canvas, coordinates, "nrzl");
            }
        }
        else {

            if ((counter - 1) >= 0 && bitsStream[counter - 1] === 1) {

                drawBitZeroNrzl(canvas, coordinates, "alternative", counter);

                printBitNrzl(canvas, bitsStream[counter], counter); //Imprime el número "0" en canvas.
            }
            else {

                drawBitZeroNrzl(canvas, coordinates, "normal", counter);

                printBitNrzl(canvas, bitsStream[counter], counter); //Imprime el número "0" en canvas.
            }

            if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 1) {
                drawLineUp(canvas, coordinates, "nrzl");
            }
        }
    }
}


/**
 * Calcula las coordenadas para dibujar
 * la línea del bit 1.
 * 
 * @param {object} canvas 
 * @param {array of int} coordinates 
 * @param {string} flag 
 */
function drawBitOneNrzl(canvas, coordinates, flag) {

    if (flag == "normal") {

        coordinates[0] += 30;
        coordinates[2] += 30;

        drawLine(canvas, coordinates);

        printDottedLine(canvas, getDottedCoordinates(coordinates));
    }
    else if (flag == "alternative") {

        coordinates[1] -= 30;
        coordinates[2] += 30;

        drawLine(canvas, coordinates);

        printDottedLine(canvas, getDottedCoordinates(coordinates));

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
function drawBitZeroNrzl(canvas, coordinates, flag, counter) {

    if (flag == "normal") {

        if (counter === 0) {

            coordinates[1] += 30;
            coordinates[3] += 30;
        }

        coordinates[0] += 30;
        coordinates[2] += 30;

        drawLine(canvas, coordinates);

        let example = [];

        example.push(coordinates[2]);
        example.push(coordinates[3]);
        example.push(coordinates[2]);
        example.push(coordinates[3]);

        example[1] -= 30;
        example[3] -= 30;

        printDottedLine(canvas, example);

    }
    else if (flag == "alternative") {

        coordinates[1] += 30;
        coordinates[2] += 30;

        drawLine(canvas, coordinates);

        let example = [];

        example.push(coordinates[2]);
        example.push(coordinates[3]);
        example.push(coordinates[2]);
        example.push(coordinates[3]);

        example[1] -= 30;
        example[3] -= 30;

        printDottedLine(canvas, example);
    }

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
