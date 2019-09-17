/*

Autor: Joel Alejandro Rubio Aguilar.
Fecha: 13-Septiembre-2019.

*/


/**
 * Imprime las líneas correspondientes a los
 * valores 1 o 0 de la codificación "Differential Manchester".
 * 
 * @param {*} canvas 
 * @param {*} bitsStream 
 */
function printDiffManchester(canvas, bitsStream) {

    let coordinates = new Array(30, 45, 50, 45);

    let flag = 1; //Determina la trayectoria del bit. Si es uno, es normal _|¯; si es -1, es alternativo ¯|_.

    for (let counter = 0; counter < bitsStream.length; counter++) {

        if (counter === 0) {

            drawLineDown(canvas, coordinates, "diffmanchester");

            drawBitOneZeroDiffManchester(canvas, coordinates);

            flag = -1;
        }

        if (bitsStream[counter] === 1) {

            //Si el número anterior es uno normal o un cero.
            //
            //Imprime un número normal.
            if ((bitsStream[counter - 1] === 1 && flag === 1) || (bitsStream[counter - 1] === 0 && counter !== 1)) {

                drawBitOneDiffManchester(canvas, coordinates, flag);

                flag = -1;

                printBitDiffManchester(canvas, bitsStream[counter], counter);

                continue;
            }

            //Si el número no es el primero y si el número anterior es un uno alternativo o es un cero.
            //
            //Imprime un número alternativo.
            if ((bitsStream[counter - 1] === 1 && flag === -1) || bitsStream[counter - 1] === 0) {

                drawBitOneDiffManchester(canvas, coordinates, flag);

                if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 0) {
                    drawLineUp(canvas, coordinates, "diffmanchester");
                }

                flag = 1;
            }

            printBitDiffManchester(canvas, bitsStream[counter], counter);

        }
        else {

            //Imprime una línea hacia arriba si no es el primer número, si es un cero y es diferente del segundo número.
            if ((counter - 1) >= 0 && (bitsStream[counter - 1] === 0 && counter !== 1)) {
                drawLineUp(canvas, coordinates, "diffmanchester");
            }

            if ((counter - 1) >= 0 && (bitsStream[counter - 1] === 0 && counter === 1)) {
                drawBitZeroDiffManchester(canvas, coordinates, "alternative");

                flag = 1;

                printBitDiffManchester(canvas, bitsStream[counter], counter);

                continue;
            }

            if ((counter - 1) >= 0 && (bitsStream[counter - 1] === 1 && flag === -1)) {

                drawBitZeroDiffManchester(canvas, coordinates, "alternative");

                flag = 1;
            }
            else if ((counter - 1) >= 0 && (bitsStream[counter - 1] === 0 || flag === 1)) {

                drawBitZeroDiffManchester(canvas, coordinates, "normal");

                if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 1) {
                    flag = 1;
                }
                else {
                    flag = -1;
                }
            }


            printBitDiffManchester(canvas, bitsStream[counter], counter);
        }
    }
}


function drawBitOneZeroDiffManchester(canvas, coordinates) {

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


function drawBitOneDiffManchester(canvas, coordinates, flag) {

    if (flag === 1) {

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
    else {

        coordinates[0] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        coordinates[0] += 20;
        coordinates[3] += 20;

        drawLine(canvas, coordinates);


        coordinates[1] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        let dottedCoordinates = getDottedCoordinates(coordinates);

        dottedCoordinates[1] -= 20;
        dottedCoordinates[3] -= 20;

        printDottedLine(canvas, dottedCoordinates);
    }
}




function drawBitZeroDiffManchester(canvas, coordinates, flag) {    

    if (flag == "normal") {

        coordinates[1] -= 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        coordinates[0] += 20;
        coordinates[3] += 20;

        drawLine(canvas, coordinates);


        coordinates[1] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);;
    }
    else {

        coordinates[0] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        coordinates[0] += 20;
        coordinates[3] += 20;

        drawLine(canvas, coordinates);


        coordinates[1] += 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);
    }


    let dottedCoordinates = getDottedCoordinates(coordinates);

    dottedCoordinates[1] -= 20;
    dottedCoordinates[3] -= 20;

    printDottedLine(canvas, dottedCoordinates);
}



function printBitDiffManchester(canvas, bit, counter) {

    canvas.font = "15px Georgia";

    if (counter === 0) {

        canvas.fillText(bit, 75, 10);

        return;
    }

    if (counter === 1) {

        canvas.fillText(bit, 105, 10);

        return;
    }

    let coordinateX = 105;

    coordinateX = iterateCoordinateX(coordinateX, counter, "diffManchester");

    canvas.fillText(bit, coordinateX, 10);
}
