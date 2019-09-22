/*

Autor: Rubio Aguilar Joel Alejandro.
Fecha: 8-Septiembre-2019.
Actualización1: 10-Septiembre-2019.
Actualización2: 14-Septiembre-2019.

*/


$(document).ready(function () {    
    

    const regex = /^[0-1]*$/; //Expresión regular para la entrada solamente de 1s y/o 0s.
        

    // fix main menu to page on passing
    $('.main.menu').visibility({
        type: 'fixed',        
    });

    $('.overlay').visibility({
        type: 'fixed',
        offset: 80
    });

  
    /* Verifica que los valores ingresados sean solamente
     * 1s y 0s.
    */
    $("#valueEncode").on("keyup", function() {

        validateRegex(regex, "valueEncode");
    });



    /* Si presiona el botón de "codificar" se realizará
     * el proceso para imprimir la codificación de las 
     * señales con los diferentes métodos.
    */
    $(document).on("click", "#btnSubmit", function (event) {

        event.preventDefault();           
        
        let values = $("#valueEncode").val();
           
                       
        if (regex.test(values) && values != "") {

            const bitsStream = Array.from(String(values), Number);

            console.log(bitsStream);

            /* NRZ-L. */
            let nrzlCanvas = getCanvas("nrzl");


            /* Manchester. */
            let manchesterCanvas = getCanvas("manchester");


            /* Differential Manchester. */
            let diffManchesterCanvas = getCanvas("diffManchester");


            /* Bipolar AMI */
            let bamiCanvas = getCanvas("bipolarAmi");


            $("#tableBits").show();

            /* Imprime NRZ-L. */
            printNrzl(nrzlCanvas[1], bitsStream);

            /* Imprime Manchester. */
            printManchester(manchesterCanvas[1], bitsStream);

            /* Imprime Diffential Manchester. */
            printDiffManchester(diffManchesterCanvas[1], bitsStream);

            /* Imprime Bipolar AMI */
            printBipolarAmi(bamiCanvas[1], bitsStream);


            let canvasMethods = [nrzlCanvas[0], manchesterCanvas[0], diffManchesterCanvas[0], bamiCanvas[0]];

            setDataImageDownload(canvasMethods);
        }        
        
    }); 

 
    
}); //Fin de la función ready.



/**
 * Valida la entrada de los 
 * datos del usuario.
 */
function validateRegex(regex, attrToValidate) {

    if (!regex.test($("#" + attrToValidate).val())) {

        $("#" + attrToValidate).addClass("wrongInput");

        if (attrToValidate === "valueEncode") {
            $("#errorMessage").text("Ingrese valores binarios.").fadeIn();
        }        
    }
    else {

        $("#" + attrToValidate).removeClass("wrongInput");

        $("#errorMessage").fadeOut();
    }
}


/**
 * Obtiene el objeto 2d de canvas para
 * cada id.
 * 
 * @param {string} method 
 * 
 * @return {array of object}
 */
function getCanvas(method) {

    let canvas = [];

    canvas.push(document.getElementById(method));

    canvas[0].width = 800;
    //canvas.heigth = 10;

    canvas.push(canvas[0].getContext("2d"));

    return canvas;
}