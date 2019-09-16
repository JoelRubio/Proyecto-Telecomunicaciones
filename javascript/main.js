/*

Autor: Rubio Aguilar Joel Alejandro.
Fecha: 8-Septiembre-2019.
Actualización1: 10-Septiembre-2019.
Actualización2: 14-Septiembre-2019.

*/


$(document).ready(function () {    
    
    /*
    $("#top_menu").on("scroll", function() {

        $("#top_menu").toggleClass("fixed", $("#top_menu").scrollTop > 10);
    });*/

    const regex = /^[0-1]*$/; //Expresión regular para la entrada solamente de 1s y/o 0s.
    

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
    $("#btnSubmit").on("click", function (event) {

        event.preventDefault();


        let values = $("#valueEncode").val();        


       /* Verifica que los valores ingresados sean solamente
        * 1s y 0s.
       */
        $("#valueEncode").on("keyup", function() {

            validateRegex(regex, "valueEncode");
        });
                

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
function validateRegex(regex, idToValidate) {

    if (!regex.test($("#" + idToValidate).val())) {

        $("#" + idToValidate).addClass("wrongInput");

        $("#errorMessage").text("Ingrese valores binarios.").fadeIn();
    }
    else {

        $("#" + idToValidate).removeClass("wrongInput");

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