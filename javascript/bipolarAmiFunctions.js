/*

Autor: Joel Alejandro Rubio Aguilar.
Fecha: 13-Septiembre-2019.

*/


/**
 * Imprime las líneas correspondientes a los
 * valores 1 o 0 de la codificación bipolar-AMI.
 * 
 * @param {object} canvas 
 * @param {array int} bits_stream 
 */
function printBipolarAmi(canvas, bitsStream) {

    //let coordinates = new Array(30, 40, 50, 40);
    let coordinates = new Array(30, 50, 50, 50);

    let flag = 1;

    for (counter = 0; counter < bitsStream.length; counter++) {

        if (bitsStream[counter] === 1) {

            if (counter === 0) {

                drawBitOneBami(canvas, coordinates, 0); //bit one _|¯

                //Si el siguiente número es un uno.
                if (counter != bitsStream.length && bitsStream[counter + 1] === 1) {

                    drawLineDown(canvas, coordinates, "bami"); //Línea hacia abajo. ¯...|

                    drawLineDownBami(canvas, coordinates); //Línea hacia abajo del bipolar ami. |                    
                }
                //Si el siguiente número es un cero.
                else if (counter != bitsStream.length && bitsStream[counter + 1] === 0) {

                    drawLineDown(canvas, coordinates, "bami"); //Línea hacia abajo. ¯...|
                }

                flag = -1;

                printBitBami(canvas, bitsStream[counter], counter, bitsStream[0]);
            }

            if ((counter - 1) >= 0 && ((bitsStream[counter - 1] === 1 || bitsStream[counter - 1] === 0) && flag === -1)) {

                drawBitOneBami(canvas, coordinates, flag); //Uno negativo.

                if (counter != bitsStream.length && bitsStream[counter + 1] === 1) {

                    /* Dos líneas hacia arriba. */

                    drawLineUp(canvas, coordinates, "bami");

                    drawLineUpBami(canvas, coordinates);
                }
                else if (counter != bitsStream.length && bitsStream[counter + 1] === 0) {

                    /* Una líneas hacia arriba. */
                    drawLineUp(canvas, coordinates, "bami"); //
                }

                flag = 1;
            }
            else if ((counter - 1) >= 0 && ((bitsStream[counter - 1] === 1 || bitsStream[counter - 1] === 0) && flag === 1)) {

                drawBitOneBami(canvas, coordinates, flag); //Uno positivo. 

                if (counter != bitsStream.length && bitsStream[counter + 1] === 1) {

                    drawLineDown(canvas, coordinates, "bami");

                    drawLineDownBami(canvas, coordinates);
                }
                else if (counter != bitsStream.length && bitsStream[counter + 1] === 0) {

                    drawLineDown(canvas, coordinates, "bami");
                }

                flag = -1;
            }

            printBitBami(canvas, bitsStream[counter], counter, bitsStream[0]);

        }
        else {

            if (counter === 0 || ((counter - 1) >= 0 && bitsStream[counter - 1] === 0)) {

                drawBitZeroBami(canvas, coordinates);

                if (counter != bitsStream.length && (bitsStream[counter + 1] === 1 && flag === 1)) {

                    drawLineUp(canvas, coordinates, "bami");
                }
                else if (counter != bitsStream.length && (bitsStream[counter + 1] === 1 && flag === -1)) {

                    drawLineDown(canvas, coordinates, "bami");
                }
            }


            if ((counter - 1) >= 0 && (bitsStream[counter - 1] === 1 && flag === 1)) {

                drawBitZeroBami(canvas, coordinates, flag);

                if (counter != bitsStream.length && bitsStream[counter + 1] === 1) {

                    drawLineUp(canvas, coordinates, "bami");
                }
            }
            else if ((counter - 1) >= 0 && (bitsStream[counter - 1] === 1 && flag === -1)) {

                drawBitZeroBami(canvas, coordinates, flag);

                if (counter != bitsStream.length && bitsStream[counter + 1] === 1) {

                    drawLineDown(canvas, coordinates, "bami");
                }
            }

            printBitBami(canvas, bitsStream[counter], counter, bitsStream[0]);
        }
    }
}


function drawLineUpBami(canvas, coordinates) {

    coordinates[1] -= 20;
    coordinates[3] -= 20;

    drawLine(canvas, coordinates);
}

function drawLineDownBami(canvas, coordinates) {

    coordinates[1] += 20;
    coordinates[3] += 20;

    drawLine(canvas, coordinates);
}


/**
 * Verifica si la línea a dibujar es un uno
 * a partir de un 1 positivo, negativo o un cero.
 * 
 * Dependiendo de la opción, se realizarán los
 * cálculos en las coordenadas. Después, se dibujará
 * la línea.
 * 
 * @param {object} canvas 
 * @param {array of int} coordinates 
 * @param {int} flag 
 */
function drawBitOneBami(canvas, coordinates, flag) {

    if (flag === 1) {

        coordinates[1] -= 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);

        printDottedLine(canvas, getDottedCoordinates(coordinates));
    }
    else if (flag === -1) {

        coordinates[1] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        let dottedCoordinates = getDottedCoordinates(coordinates);

        dottedCoordinates[1] -= 40;
        dottedCoordinates[3] -= 40;

        printDottedLine(canvas, dottedCoordinates);
    }
    else {

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
}


/**
 * Verifica si la línea a dibujar es un cero
 * a partir de un 1 positivo, negativo o un cero.
 * 
 * Dependiendo de la opción, se realizarán los 
 * cálculos en las coordenadas. Después, se dibujará
 * la línea.
 * 
 * @param {object} canvas 
 * @param {array of int} coordinates 
 * @param {int} flag 
 */
function drawBitZeroBami(canvas, coordinates, flag) {

    let dottedCoordinates;

    if (flag === 1) {

        coordinates[1] -= 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        dottedCoordinates = getDottedCoordinates(coordinates);

        dottedCoordinates[1] -= 20;
        dottedCoordinates[3] -= 20;

        printDottedLine(canvas, dottedCoordinates);
    }
    else if (flag === -1) {

        coordinates[1] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        dottedCoordinates = getDottedCoordinates(coordinates);

        dottedCoordinates[1] -= 20;
        dottedCoordinates[3] -= 20;

        printDottedLine(canvas, dottedCoordinates);
    }
    else {

        coordinates[0] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        dottedCoordinates = getDottedCoordinates(coordinates);

        dottedCoordinates[1] -= 20;
        dottedCoordinates[3] -= 20;

        printDottedLine(canvas, dottedCoordinates);
    }
}

/* MODIFICAR LÓGICA */
function printBitBami(canvas, bit, counter, firstBit) {

    canvas.font = "15px Georgia";

    if (counter === 0) {

        if (bit === 1) {

            canvas.fillText(bit, 75, 10);
        }
        else {
            canvas.fillText(bit, 55, 10);
        }

        return;
    }

    let coordinateX;

    if (counter === 1) {

        if ((firstBit === 1 && bit === 1) || (firstBit === 1 && bit === 0)) {
            coordinateX = 95;
        }
        else {
            coordinateX = 75;
        }

        canvas.fillText(bit, coordinateX, 10);

        return;
    }

    if (firstBit === 1) {

        coordinateX = 95;

        coordinateX = iterateCoordinateX(coordinateX, counter, "bami");
    }
    else {

        coordinateX = 75;

        coordinateX = iterateCoordinateX(coordinateX, counter, "bami");
    }

    canvas.fillText(bit, coordinateX, 10);
}