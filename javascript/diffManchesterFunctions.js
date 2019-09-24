/*

Autor: Joel Alejandro Rubio Aguilar.
Fecha: 13-Septiembre-2019.
Actualización: 23-Septiembre-2019.

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

    let flag_one  = 1; //Determina la trayectoria del bit uno. 
    let flag_zero = 1; //Determina la trayectoria del bit cero.

    for (let counter = 0; counter < bitsStream.length; counter++) {
        
 
        if (bitsStream[counter] === 1) {

            //CORRECTO
            if (counter === 0) {

                drawBitOneInitialDiffManchester(canvas, coordinates);

                if (counter != bitsStream.length && bitsStream[counter + 1] === 0) {

                    drawLineUp(canvas, coordinates, "diffmanchester");
                }

                /* Dibuja el bit uno en canvas. */
                printBitDiffManchester(canvas, bitsStream[counter], counter);                

                continue;
            }

            /* Si el bit anterior es un uno con bandera positiva o es un
             * bit cero y no es el segundo bit, entonces dibuja el bit uno normal.
             * Después dibuja, literalmente, el bit uno y coloca la bandera en negativo.
             * 
            */

            if (bitsStream[counter - 1] === 0 && flag_one === -1) {

                drawBitOneDiffManchester(canvas, coordinates, "alternative");

                flag_one = 1;

                if (counter != bitsStream.length && bitsStream[counter + 1] === 0) {

                    drawLineUp(canvas, coordinates, "diffmanchester");                    
                }

                printBitDiffManchester(canvas, bitsStream[counter], counter);

                continue;
            }
            

            
            if ((bitsStream[counter - 1] === 1 && flag_one === 1) || (bitsStream[counter - 1] === 0 && flag_zero === 1)) {                

                drawBitOneDiffManchester(canvas, coordinates, flag_one);                                

                if (counter != bitsStream.length && bitsStream[counter + 1] == 0) {

                    drawLineDown(canvas, coordinates, "diffmanchester");

                    flag_zero = -1;
                }                
                
                flag_one = -1;                                                             
            }                                        
            else if ((bitsStream[counter - 1] === 1 && flag_one === -1) || (bitsStream[counter - 1] === 0 && flag_zero === -1)) {                

                drawBitOneDiffManchester(canvas, coordinates, flag_one);

                flag_one = 1;                    

                if (counter != (bitsStream.length - 1) && bitsStream[counter + 1] === 0) {

                    drawLineUp(canvas, coordinates, "diffmanchester");

                    flag_zero = 1;
                }                                                                
            }

            /* Dibuja el bit uno en canvas. */
            printBitDiffManchester(canvas, bitsStream[counter], counter);

        }
        else {


            /* Si el bit es el primero, entonces dibuja una línea
            *  hacia abajo y el bit de inicio, colocando la bandera
            *  en negativo.
            */
            if (counter === 0) {

                drawLineDown(canvas, coordinates, "diffmanchester");

                drawBitZeroInitialDiffManchester(canvas, coordinates);                                

                flag_one = -1;

                if (counter != bitsStream.length && bitsStream[counter + 1] === 0) {

                    drawLineDown(canvas, coordinates, "diffmanchester");

                    flag_zero = -1;
                }

                printBitDiffManchester(canvas, bitsStream[counter], counter);

                continue;
            }



            /* Si el bit anterior es un cero y no es el segundo bit, entonces
             * dibuja una línea hacia arriba.
             *
             * En caso contrario, si el bit anterior es cero y es el segundo bit, 
             * entonces dibuja el bit cero alternativo. Luego dibuja, literalmente, 
             * el bit cero y cambia la bandera a positivo.
            */            

            if ((bitsStream[counter - 1] === 0 && flag_zero === 1) || (bitsStream[counter - 1] === 1 && flag_one === 1) ){

                drawBitZeroDiffManchester(canvas, coordinates, "normal");

                if (counter != bitsStream.length && bitsStream[counter + 1] === 0) {

                    drawLineUp(canvas, coordinates, "diffmanchester");                                   
                }            

                flag_zero = 1; //Por esta variable pasó el error de 010101011

                flag_one = 1;                
            }
            else if ((bitsStream[counter - 1] === 0 && flag_zero === -1) || (bitsStream[counter - 1] === 1 && flag_one === -1)) {

                drawBitZeroDiffManchester(canvas, coordinates, "alternative");

                if (counter != bitsStream.length && bitsStream[counter + 1] === 0) {

                    drawLineDown(canvas, coordinates, "diffmanchester");                    
                }

                flag_zero = -1; //Por esta variable pasó el error de 010101011

                flag_one = -1;                
            }
            
            /* Dibuja el bit cero en canvas. */
            printBitDiffManchester(canvas, bitsStream[counter], counter);
        }
    }    
}



/**
 * Calcula las coordenadas para el primer bit cero del
 * método de codificación manchester diferencial. Llama a la función:
 * "drawLine" para dibujarlas junto con las respectivas líneas
 * punteadas.
 *
 * @param {object} canvas
 * @param {array of int} coordinates
 */
function drawBitZeroInitialDiffManchester(canvas, coordinates) {

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
 * Calcula las coordenadas para el primer bit uno del
 * método de codificación manchester diferencial. Llama a la función:
 * "drawLine" para dibujarlas junto con las respectivas líneas
 * punteadas.
 *
 * @param {object} canvas
 * @param {array of int} coordinates
 */
function drawBitOneInitialDiffManchester(canvas, coordinates) {

    coordinates[0] += 20;
    coordinates[2] += 20;


    printDottedLine(canvas, getDottedCoordinatesP1(coordinates));

    drawLine(canvas, coordinates);


    coordinates[0] += 20;
    coordinates[3] += 20;

    drawLine(canvas, coordinates);


    coordinates[1] += 20;
    coordinates[2] += 20;

    drawLine(canvas, coordinates);    


    dottedCoordinates = getDottedCoordinatesP2(coordinates);

    dottedCoordinates[1] -= 20;
    dottedCoordinates[3] -= 20;

    printDottedLine(canvas, dottedCoordinates);
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

        drawLine(canvas, coordinates);


        let dottedCoordinates = getDottedCoordinatesP2(coordinates);

        dottedCoordinates[1] -= 20;
        dottedCoordinates[3] -= 20;

        printDottedLine(canvas, dottedCoordinates);
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


        printDottedLine(canvas, getDottedCoordinatesP2(coordinates));
    }
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
