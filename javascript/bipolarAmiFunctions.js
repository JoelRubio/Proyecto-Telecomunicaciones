/*

Autor: Joel Alejandro Rubio Aguilar.
Fecha: 13-Septiembre-2019.

*/


/**
 * Dibuja las líneas correspondientes a los
 * valores 1 o 0 de la codificación "Bipolar-AMI".
 * 
 * @param {object} canvas 
 * @param {array int} bits_stream 
 */
function printBipolarAmi(canvas, bitsStream) {

    //let coordinates = new Array(30, 40, 50, 40);

    let coordinates = new Array(30, 60, 50, 60);

    let flag = 1;

    for (counter = 0; counter < bitsStream.length; counter++) {

        if (bitsStream[counter] === 1) {


            /* Si es el primer bit, entonces dibuja el bit uno. Después, verifica
             * si el siguiente bit es uno, si es así, dibuja dos líneas hacia abajo.
             *
             * En caso contrario, verifica si el siguiente número es un cero, si es así,
             * imprime una línea hacia abajo.
             * 
             * Al final, cambia el valor de la bandera a negativo.
            */
            if (counter === 0) {
                
                drawBitOneBami(canvas, coordinates, 0);
                
                if (counter != bitsStream.length && bitsStream[counter + 1] === 1) {

                    drawLineDown(canvas, coordinates, "bamiDown");

                    drawLineDownBami(canvas, coordinates);
                }                
                else if (counter != bitsStream.length && bitsStream[counter + 1] === 0) {

                    drawLineDown(canvas, coordinates, "bamiDown");
                }

                flag = -1;
            }


            /* Si el bit anterior es un uno o un cero con bandera negativa, entonces
             * dibuja un bit uno con voltaje negativo. Después, verifica si el siguiente
             * bit es un uno, si es así, dibuja dos líneas hacia arriba. Si el siguiente bit
             * es un cero, procede a dibujar una línea hacia arriba. Al final coloca la bandera
             * en valor positivo.
             * 
             * En caso contrario, si el bit anterior es un uno o un cero con bandera positiva,
             * entonces dibuja un bit uno con voltaje positivo. Luego, verifica si el siguiente
             * bit es un uno, si es así, dibuja dos líneas hacia abajo, si no, dibuja una línea
             * hacia abajo. Después, coloca la bandera en negativo.
             *
            */
            if ((counter - 1) >= 0 && ((bitsStream[counter - 1] === 1 || bitsStream[counter - 1] === 0) && flag === -1)) {

                drawBitOneBami(canvas, coordinates, flag); //Uno con voltaje negativo.

                if (counter != bitsStream.length && bitsStream[counter + 1] === 1) {                                      

                    drawLineUp(canvas, coordinates, "bamiUpLarge");                    

                    drawLineUpBami(canvas, coordinates);
                }
                else if (counter != bitsStream.length && bitsStream[counter + 1] === 0) {                    
                    drawLineUp(canvas, coordinates, "bamiUpLarge"); //
                }

                flag = 1;
            }
            else if ((counter - 1) >= 0 && ((bitsStream[counter - 1] === 1 || bitsStream[counter - 1] === 0) && flag === 1)) {

                drawBitOneBami(canvas, coordinates, flag); //Uno con voltaje positivo. 

                if (counter != bitsStream.length && bitsStream[counter + 1] === 1) {

                    drawLineDown(canvas, coordinates, "bami");

                    drawLineDownBami(canvas, coordinates);
                }
                else if (counter != bitsStream.length && bitsStream[counter + 1] === 0) {
                    drawLineDown(canvas, coordinates, "bami");
                }

                flag = -1;
            }


            /* Dibuja el bit uno en canvas. */
            printBitBami(canvas, bitsStream[counter], counter);

        }
        else {


            /* Si es el primer bit, entonces dibuja el bit cero. Después, verifica
             * si el siguiente es un bit uno con bandera positiva o negativa, 
             * si es así, dibuja una línea hacia arriba o hacia abajo, respectivamente.
            */
            if (counter === 0) {

                drawBitZeroBami(canvas, coordinates, 0, counter);

                if (counter != bitsStream.length && (bitsStream[counter + 1] === 1 && flag === 1)) {

                    drawLineUp(canvas, coordinates, "bamiUpToLarge");
                }
                else if (counter != bitsStream.length && (bitsStream[counter + 1] === 1 && flag === -1)) {

                    drawLineDown(canvas, coordinates, "bami");
                }
            }
            

            /* Si el bit anterior es un cero, entonces dibuja el bit cero
             * y verifica de si el siguiente es un bit uno con bandera
             * positiva o negativa, si es así, dibuja una línea hacia arriba
             * o hacia abajo, respectivamente.
            */
            if ((counter - 1) >= 0 && bitsStream[counter - 1] === 0) {

                drawBitZeroBami(canvas, coordinates, 0, counter);

                if (counter != bitsStream.length && (bitsStream[counter + 1] === 1 && flag === 1)) {                    
                    drawLineUp(canvas, coordinates, "bamiUpLarge");                    
                }
                else if (counter != bitsStream.length && (bitsStream[counter + 1] === 1 && flag === -1)) {
                    drawLineDown(canvas, coordinates, "bami");
                }
            }


            /* Si el bit anterior es un uno con bandera positiva, entonces
            *  dibuja el bit cero y verifica si el siguiente es un bit uno,
            *  si es así, dibuja una línea hacia arriba.             
            * 
            *  En caso contrario, si el bit anterior es un uno con bandera negativa,
            *  entonces dibuja el bit cero y verifica si el bit siguiente es un uno,
            *  si es así, dibuja un línea hacia abajo.
            */
            if ((counter - 1) >= 0 && (bitsStream[counter - 1] === 1 && flag === 1)) {

                drawBitZeroBami(canvas, coordinates, flag, counter);

                if (counter != bitsStream.length && bitsStream[counter + 1] === 1) {
                    drawLineUp(canvas, coordinates, "bamiUpLarge");                    
                }
            }
            else if ((counter - 1) >= 0 && (bitsStream[counter - 1] === 1 && flag === -1)) {

                drawBitZeroBami(canvas, coordinates, flag, counter);

                if (counter != bitsStream.length && bitsStream[counter + 1] === 1) {
                    drawLineDown(canvas, coordinates, "bami");
                }
            }
            
            /* Dibuja el bit uno en canvas. */
            printBitBami(canvas, bitsStream[counter], counter);
        }
    }
}




/**
 * Calcula las coordenadas para dibujar
 * una línea hacia arriba del bit del método
 * bipolar AMI.
 * 
 * @param {object} canvas 
 * @param {coordinates} coordinates 
 */
function drawLineUpBami(canvas, coordinates) {

    coordinates[1] -= 20;
    coordinates[3] -= 20;

    drawLine(canvas, coordinates);
}


/**
 * Calcula las coordenadas para dibujar
 * una línea hacia abajo del bit del método
 * bipolar AMI.
 *
 * @param {object} canvas
 * @param {coordinates} coordinates
 */
function drawLineDownBami(canvas, coordinates) {

    coordinates[1] += 20;
    coordinates[3] += 20;

    drawLine(canvas, coordinates);
}


/**
 * Verifica si la línea a dibujar es un bit uno
 * a partir de un 1 positivo, negativo o un cero.
 * 
 * Dependiendo de la opción, se realizarán los
 * cálculos en las coordenadas. Después, se dibujará
 * la línea del bit y también las líneas punteadas de la codificación.
 * 
 * @param {object} canvas 
 * @param {array of int} coordinates 
 * @param {int} flag 
 */
function drawBitOneBami(canvas, coordinates, flag) {

    if (flag === 1) {                

        coordinates[1] -= 20;
        coordinates[2] += 30;

        drawLine(canvas, coordinates);        
        

        printDottedLine(canvas, getDottedCoordinatesP2(coordinates));
    }
    else if (flag === -1) {        

        coordinates[1] += 20;
        coordinates[2] += 30;

        drawLine(canvas, coordinates);
        

        let dottedCoordinates = getDottedCoordinatesP2(coordinates);

        dottedCoordinates[1] -= 40;
        dottedCoordinates[3] -= 40;

        printDottedLine(canvas, dottedCoordinates);
    }
    else {        

        let dottedCoordinates;


        coordinates[0] += 20;
        coordinates[2] += 20;

        dottedCoordinates = getDottedCoordinatesP1(coordinates);

        drawLine(canvas, coordinates);


        coordinates[0] += 20;
        coordinates[3] -= 20;

        drawLine(canvas, coordinates);


        coordinates[1] -= 20;
        coordinates[2] += 20;

        drawLine(canvas, coordinates);


        dottedCoordinates[1] -= 20;
        dottedCoordinates[3] -= 20;

        printDottedLine(canvas, dottedCoordinates); //Dibuja las líneas verticales al inicio de la codificación.

        printDottedLine(canvas, getDottedCoordinatesP2(coordinates)); //Dibuja las líneas verticales de cualquier número binario.
    }
}


/**
 * Verifica si la línea a dibujar es un bit cero
 * a partir de un 1 positivo, negativo o un cero.
 * 
 * Dependiendo de la opción, se realizarán los 
 * cálculos en las coordenadas. Después, se dibujará
 * la línea del bit y también las líneas punteadas de la codificación.
 * 
 * @param {object} canvas 
 * @param {array of int} coordinates 
 * @param {int} flag 
 * @param {int} counter
 */
function drawBitZeroBami(canvas, coordinates, flag, counter) {

    let dottedCoordinates;

    if (flag === 1) {

        coordinates[1] -= 20;
        coordinates[2] += 30;                
    }
    else if (flag === -1) {

        coordinates[1] += 20;
        coordinates[2] += 30;                
    }
    else {        

        if (counter === 0) {            

            coordinates[0] += 20;
            coordinates[2] += 40;            

            //Dibuja las líneas verticales al inicio de la codificación.

            dottedCoordinates = getDottedCoordinatesP1(coordinates);            

            dottedCoordinates[1] -= 20;
            dottedCoordinates[3] -= 20;

            printDottedLine(canvas, dottedCoordinates);
        }        
        else if (counter === 1) {

            coordinates[0] += 40;
            coordinates[2] += 30;
        }
        else {

            coordinates[0] += 30;
            coordinates[2] += 30;
        }                                    
    }

    drawLine(canvas, coordinates);


    //dibuja las líneas verticales después del primer dígito binario.

    dottedCoordinates = getDottedCoordinatesP2(coordinates);

    dottedCoordinates[1] -= 20;
    dottedCoordinates[3] -= 20;

    printDottedLine(canvas, dottedCoordinates);
}



/**
 * Imprime sobre el canvas el número literal:
 * 1 ó 0, dependiendo del número que contenga
 * el contador del "for" principal de la impresión del
 * método de codificación bipolar AMI.
 *
 * @param {object} canvas
 * @param {int} bit
 * @param {int} counter
 */
function printBitBami(canvas, bit, counter) {

    canvas.font = "15px Georgia";

    if (counter === 0) {

        canvas.fillText(bit, 66, 10);

        return;
    }
    

    if (counter === 1) {              

        canvas.fillText(bit, 100, 10);

        return;
    }
    

    let coordinateX = iterateCoordinateX(100, counter, "bami");    

    canvas.fillText(bit, coordinateX, 10);
}
