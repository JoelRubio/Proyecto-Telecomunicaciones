/*

Autor: Joel Alejandro Rubio Aguilar.
Fecha: 14-Septiembre-2019.

*/



/**
 * Calcula las coordenadas para dibujar
 * una línea hacia abajo, dependiendo del
 * método de codificación de la señal.
 * 
 * @param {object} canvas
 * @param {array of int} coordinates
 * @param {string} method
 */
function drawLineDown(canvas, coordinates, method) {

    switch (method) {

        case "nrzl":
            coordinates[0] += 30;
            coordinates[3] += 30;
            break;

        case "manchester":
        case "diffmanchester":
            coordinates[0] += 20;
            coordinates[3] += 20;
            break;

        case "bami":
            coordinates[0] += 20;
            coordinates[3] += 20;
            break;
    }

    drawLine(canvas, coordinates);
}


/**
 * Calcula las coordenadas para dibujar
 * una línea hacia arriba, dependiendo del
 * método de codificación de la señal.
 * 
 * @param {object} canvas 
 * @param {array of int} coordinates 
 * @param {string} method 
 */
function drawLineUp(canvas, coordinates, method) {

    switch (method) {

        case "nrzl":
            coordinates[0] += 30;
            coordinates[3] -= 30;
            break;

        case "manchester":
        case "diffmanchester":
            coordinates[0] += 20;
            coordinates[3] -= 20;
            break;

        case "bami":
            coordinates[0] += 20;
            coordinates[3] -= 20;
            break;
    }

    drawLine(canvas, coordinates);
}


/**
 * Realiza el proceso de imprimir las líneas punteadas
 * sobre el canvas, con las respectivas coordenadas,
 * el color y el tamaño.
 * 
 * @param {object} canvas 
 * @param {array of int} coordinates 
 */
function drawLine(canvas, coordinates) {

    canvas.beginPath();

    canvas.moveTo(coordinates[0], coordinates[1]);

    canvas.lineTo(coordinates[2], coordinates[3]);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 2;

    canvas.stroke();

    //element.closePath();
}


/**
 * Calcula las coordenadas para dibujar
 * las líneas punteadas entre cada bit.
 * 
 * @param {object} canvas 
 * @param {array of int} coordinates 
 */
function printDottedLine(canvas, coordinates) {

    //Resta 30 unidades a y1 y y2.
    coordinates[1] -= 30;
    coordinates[3] -= 30;

    //Establece la diferencia entre y1 y y2 de 3 unidades.
    coordinates[1] += 2;
    coordinates[3] += 5;

    for (let counter = 0; counter < 20; counter++) {

        drawDottedLine(canvas, coordinates);

        coordinates[1] += 4;
        coordinates[3] += 4;
    }
}



function getDottedCoordinates(coordinates) {

    let dottedCoordinates = [];

    dottedCoordinates.push(coordinates[2]);
    dottedCoordinates.push(coordinates[3]);
    dottedCoordinates.push(coordinates[2]);
    dottedCoordinates.push(coordinates[3]);

    return dottedCoordinates;
}


/**
 * Suma 20 unidades al número 76, dependiendo el
 * número total de veces iteradas en el "for" principal
 * de la impresión del método de codificación.
 * 
 * @param {int} coordinate_x
 * @param {int} total 
 * @param {string} method
 * 
 * @return {int}
 */
function iterateCoordinateX(coordinateX, total, method) {

    for (let counter = 0; counter <= (total - 2); counter++) {

        switch (method) {

            case "nrzl":
                coordinateX += 30;
                break;

            case "manchester":
                coordinateX += 40;
                break;

            case "diffManchester":
                coordinateX += 40;
                break;

            case "bami":
                coordinateX += 20;
                break;
        }
    }

    return coordinateX;
}


/**
 * Realiza el proceso de imprimir las líneas punteadas
 * sobre el canvas, con las respectivas coordenadas,
 * el color y el tamaño.
 * 
 * @param {object} canvas 
 * @param {array of int} coordinates 
 */
function drawDottedLine(canvas, coordinates) {

    canvas.beginPath();

    canvas.moveTo(coordinates[0], coordinates[1]);

    canvas.lineTo(coordinates[2], coordinates[3]);

    canvas.strokeStyle = "red";

    canvas.lineWidth = 1;

    canvas.stroke();
}