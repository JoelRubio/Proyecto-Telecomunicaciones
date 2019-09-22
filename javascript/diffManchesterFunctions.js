/*

Autor: Joel Alejandro Rubio Aguilar.
Fecha: 13-Septiembre-2019.

*/


/**
 * Dibuja las líneas correspondientes a los
 * valores 1 o 0 de la codificación "Differential Manchester".
 * 
 * @param {object} canvas 
 * @param {array of int} bitsStream 
 */
function printDiffManchester(canvas, bitsStream) {

    let coordinates = new Array(30, 45, 50, 45);

    let flag = 1; //Determina la trayectoria del bit. Si es uno, es normal _|¯; si es -1, es alternativo ¯|_.

    for (let counter = 0; counter < bitsStream.length; counter++) {


        /* Si el bit es el primero, entonces dibuja una línea
         * hacia abajo y el bit de inicio, colocando la bandera
         * en negativo.
        */
        if (counter === 0) {

            drawLineDown(canvas, coordinates, "diffmanchester");

            drawBitOneZeroDiffManchester(canvas, coordinates);

            flag = -1;      
            
            continue;
        }

 
        if (bitsStream[counter] === 1) {


            /* Si el bit anterior es un uno con bandera positiva o es un
             * bit cero y no es el segundo bit, entonces dibuja el bit uno normal.
             * Después dibuja, literalmente, el bit uno y coloca la bandera en negativo.
             * 
            */
            if ((bitsStream[counter - 1] === 1 && flag === 1) || (bitsStream[counter - 1] === 0 && counter !== 1)) {

                drawBitOneDiffManchester(canvas, coordinates, flag);                

                printBitDiffManchester(canvas, bitsStream[counter], counter);

                flag = -1;

                continue;
            }


            /* Si el bit anterior es un uno con bandera negativa o es un bit cero,
             * entonces dibuja el bit uno alternativo. Luego, verifica si el siguiente
             * bit es cero, si es así, dibuja una línea hacia abajo. Finalmente cambia
             * la bandera a positivo.
             * 
            */
            if ((bitsStream[counter - 1] === 1 && flag === -1) || bitsStream[counter - 1] === 0) {

                drawBitOneDiffManchester(canvas, coordinates, flag);

                if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 0) {
                    drawLineUp(canvas, coordinates, "diffmanchester");
                }

                flag = 1;
            }

            /* Dibuja el bit uno en canvas. */
            printBitDiffManchester(canvas, bitsStream[counter], counter);

        }
        else {


            /* Si el bit anterior es un cero y no es el segundo bit, entonces
             * dibuja una línea hacia arriba.
             *
             * En caso contrario, si el bit anterior es cero y es el segundo bit, 
             * entonces dibuja el bit cero alternativo. Luego dibuja, literalmente, 
             * el bit cero y cambia la bandera a positivo.
            */
            if ((counter - 1) >= 0 && (bitsStream[counter - 1] === 0 && counter !== 1)) {
                drawLineUp(canvas, coordinates, "diffmanchester");
            }
            else if ((counter - 1) >= 0 && (bitsStream[counter - 1] === 0 && counter === 1)) {

                drawBitZeroDiffManchester(canvas, coordinates, "alternative");                
                
                printBitDiffManchester(canvas, bitsStream[counter], counter);

                flag = 1;

                continue;
            }


            /* Si el bit anterior es uno y la bandera es negativa, entonces
            *  dibuja el bit zero alternativo y cambia la bandera a positivo.
            *  
            *  En caso contrario, si el bit anterior es cero o la bandera es positiva, 
            *  entonces dibuja el bit cero normal. Si el siguiente bit es uno cambia la 
            *  bandera a positivo, si no, la cambia a negativo.
            */
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
            
            /* Dibuja el bit cero en canvas. */
            printBitDiffManchester(canvas, bitsStream[counter], counter);
        }
    }
}



/**
 * Calcula las coordenadas para el primer bit del
 * método de codificación manchester diferencial. Llama a la función:
 * "drawLine" para dibujarlas junto con las respectivas líneas
 * punteadas.
 *
 * @param {object} canvas
 * @param {array of int} coordinates
 */
function drawBitOneZeroDiffManchester(canvas, coordinates) {

    coordinates[1] += 20;
    coordinates[2] += 20;

    let dottedCoordinates = getDottedCoordinatesP1(coordinates);

    dottedCoordinates[1] -= 20;
    dottedCoordinates[3] -= 20;

    printDottedLine(canvas, dottedCoordinates);

    drawLine(canvas, coordinates);


    coordinates[0] += 20;
    coordinates[3] -= 20;

    drawLine(canvas, coordinates);


    coordinates[1] -= 20;
    coordinates[2] += 20;

    drawLine(canvas, coordinates);


    printDottedLine(canvas, getDottedCoordinatesP2(coordinates));
}




/**
 * Calcula las coordenadas para el bit uno del
 * método de codificación manchester diferencial. Llama a la función:
 * "drawLine" para dibujarlas junto con las respectivas líneas
 * punteadas.
 *
 * @param {object} canvas
 * @param {array of int} coordinates
 * @param {string} flag 
 */
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


        printDottedLine(canvas, getDottedCoordinatesP2(coordinates));
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


        let dottedCoordinates = getDottedCoordinatesP2(coordinates);

        dottedCoordinates[1] -= 20;
        dottedCoordinates[3] -= 20;

        printDottedLine(canvas, dottedCoordinates);
    }
}




/**
 * Calcula las coordenadas para el bit cero del
 * método de codificación manchester diferencial. Llama a la función:
 * "drawLine" para dibujarlas junto con las respectivas líneas
 * punteadas.
 *
 * @param {object} canvas
 * @param {array of int} coordinates
 * @param {string} flag
 */
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


    let dottedCoordinates = getDottedCoordinatesP2(coordinates);

    dottedCoordinates[1] -= 20;
    dottedCoordinates[3] -= 20;

    printDottedLine(canvas, dottedCoordinates);
}



/**
 * Dibuja sobre el canvas el número literal:
 * 1 ó 0, dependiendo del número que contenga
 * el contador del "for" principal de la impresión del
 * método de codificación manchester diferencial.
 *
 * @param {object} canvas
 * @param {int} bit
 * @param {int} counter
 */
function printBitDiffManchester(canvas, bit, counter) {

    canvas.font = "15px Georgia";

    if (counter === 0) {

        canvas.fillText(bit, 65, 10);

        return;
    }

    if (counter === 1) {

        canvas.fillText(bit, 105, 10);

        return;
    }        

    let coordinateX = iterateCoordinateX(105, counter, "diffManchester");

    canvas.fillText(bit, coordinateX, 10);
}
