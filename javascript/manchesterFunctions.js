/*

Autor: Joel Alejandro Rubio Aguilar.
Fecha: 13-Septiembre-2019.

*/


/**
 * Impresión de la señal binaria para manchester.
 * 
 * @param {object} canvas 
 * @param {array of int} bits_stream 
 */
function printManchester(canvas, bitsStream) {

    let coordinates = new Array(30, 50, 50, 50);

    for (let counter = 0; counter < bitsStream.length; counter++) {

        if (bitsStream[counter] === 1) {

            if ((counter - 1) >= 0 && bitsStream[counter - 1] === 1) {
                drawBitOneManchester(canvas, coordinates, "alternative", counter);
            }
            else {

                drawBitOneManchester(canvas, coordinates, "normal", counter);
            }

            if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 1) {
                drawLineDown(canvas, coordinates, "manchester");
            }


            printBitManchester(canvas, bitsStream[counter], counter);
        }
        else {

            if ((counter - 1) >= 0 && bitsStream[counter - 1] === 0) {
                drawBitZeroManchester(canvas, coordinates, "alternative");
            }
            else {
                drawBitZeroManchester(canvas, coordinates, "normal");
            }

            if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 0) {
                drawLineUp(canvas, coordinates, "manchester");
            }


            printBitManchester(canvas, bitsStream[counter], counter);
        }
    }
}



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


    let coordinateX = 105;

    coordinateX = iterateCoordinateX(coordinateX, counter, "manchester");

    canvas.fillText(bit, coordinateX, 20);
}




/* Imprime las líneas del bit 1 correspondiente a Manchester. */
function drawBitOneManchester(canvas, coordinates, flag, counter) {

    if (flag == "normal") {

        if (counter === 0) {

            coordinates[1] += 20;
            coordinates[3] += 20;
        }

        coordinates[0] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        coordinates[0] += 20;
        coordinates[3] -= 20;

        drawLine(canvas, coordinates);


        coordinates[1] -= 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);

        printDottedLine(canvas, getDottedCoordinates(coordinates));
    }
    else if (flag == "alternative") {

        coordinates[1] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        coordinates[0] += 20;
        coordinates[3] -= 20;

        drawLine(canvas, coordinates);


        coordinates[1] -= 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);

        printDottedLine(canvas, getDottedCoordinates(coordinates));
    }
}


/* Imprime las líneas del bit 0 correspondiente a Manchester. */
function drawBitZeroManchester(canvas, coordinates, flag) {

    let dottedCoordinates;

    if (flag == "normal") {

        coordinates[0] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        coordinates[0] += 20;
        coordinates[3] += 20;

        drawLine(canvas, coordinates);


        coordinates[1] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        dottedCoordinates = getDottedCoordinates(coordinates);

        dottedCoordinates[1] -= 20;
        dottedCoordinates[3] -= 20;
    }
    else if (flag == "alternative") {

        coordinates[1] -= 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        coordinates[0] += 20;
        coordinates[3] += 20;

        drawLine(canvas, coordinates);


        coordinates[2] += 20;
        coordinates[1] += 20;

        drawLine(canvas, coordinates);


        dottedCoordinates = getDottedCoordinates(coordinates);

        dottedCoordinates[1] -= 20;
        dottedCoordinates[3] -= 20;
    }

    printDottedLine(canvas, dottedCoordinates);
}