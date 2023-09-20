'Use strict'

$(document).ready(function(){
    var numProducto = 1;
    var tabla = $('#tablaDatos tbody');

    //Agregar Nuevo Producto

    function formCaracteriticas (nombre, agregados, classForm){
        let div = `
        <div>
            <form action="" method="post" onsubmit="return false;" class="${classForm}">
                <label for="${nombre}">${agregados}</label><br>
                <input type="text" name="${nombre}" class="${nombre}"><br>

                <input type="button" value="Cancelar">
                <input type="submit" value="Guardar"><br>
            </form>
        </div>
        `
        return div;
    }

    function agregarProducto(numProducto){
        var producto_nuevo = `
        <div>
            <div class="seleccionProducto">
                <button class="div_Producto">Producto</button>
                <div class="info" style="display: none;">
                    <button class="input nombre">Nombre</button>
                    <button class="input descripcion">Descripcion</button>
                    <button class="input imagen">imagen</button>
                    <button class="input borrar">borrar</button>  
                </div>
            </div>
            <div class="contenedor_respuesta">
                ${formCaracteriticas("nombre", "Nombre", "form formNombre")}
                ${formCaracteriticas("descripcion", "Descripcion", "form formDescripcion")}
                ${formCaracteriticas("imagen", "Imagen", "form formImagen")}
            </div>
        </div>
        `;
        var selector = $("#tablaAgregable");
        selector.append(producto_nuevo);
        return producto_nuevo;
    }
    
    $('#agregar').on("click", function(){
        numProducto++
        agregarProducto(numProducto);
    });

    //Cunado se opreima el boton de editar se despliegen las opciones hay mismo en la fila
    
    $(document).on("click", '.div_Producto', function(){
        var caracteristicasInfo = $(this).parent().find('.info');
        var nombreProducto = $(this); 
        var info = $(".info");

        info.each(function() {
            var displayValue = $(this).css('display');
            if(displayValue == 'block'){
                $(this).css("display", "none");
                $(this).parent().find(".div_Producto").css("display", "block");//visivilisar el nombre al hacer click en salir
            }
        });

       
        $(caracteristicasInfo).css("display", "block");//visivilisar el nombre al hacer click en salir
        $(nombreProducto).css("display", "none");
        $('#salir').css('display', 'block');//para que se vea boton de salida 
    });

    
    //Salir del producto (OPCIONES)

    $(document).on("click", '#salir', function(event){
        $('.info').each(function() {
            var displayValue = $(this).css('display');
            if(displayValue == 'block'){
                var selector = $(this).parent();

                selector.find('.info').css("display", "none");//visivilisar el nombre al hacer click en salir
                selector.find('.div_Producto').css("display", "block");
                $('#salir').css('display', 'none');//para que se vea boton de salida 
            }
        });
    }); 

    $(document).on("click", '.boton', function(){
        
        

        var that = $(this);
        var claseDeBoton = that.attr("class");
        var ubicacion_producto = that.parent().parent().parent();
        var contenedor = ubicacion_producto.find('.contenedor_respuesta');

        
        

        if(claseDeBoton == 'boton nombre'){
            console.log(contenedor.find('.formNombre'));
            ubicacion_producto.find('.seleccionProducto').css("display", 'none');//hacer invisible el panel de seleccion de caracteristicas
            contenedor.find('.formNombre').css("display", 'block');//hacer vicible los formularios 
        }
        if(claseDeBoton == 'boton descripcion'){
            ubicacion_producto.find('.seleccionProducto').css("display", 'none');
            contenedor.find('.formDescripcion').css("display", 'block');
        }
        if(claseDeBoton == 'boton imagen'){
            ubicacion_producto.find('.seleccionProducto').css("display", 'none');
            contenedor.find('.form formImagen').css("display", 'block');
        }


        //Eliminar el producto si se oprime el boton de borrar

        if(claseDeBoton == 'boton borrar'){
            let cat = that.parent().parent().parent();
            cat.remove();
            $('#salir').css('display', 'none');//para que se vea boton de salida 
        }       
    });
});