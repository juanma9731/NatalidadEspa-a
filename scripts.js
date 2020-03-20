
/*
var anyo = new Array();
var values = new Array();
var valuesE = new Array();*/
var provincia;



/*
function prueba(){	
//myObj = JSON.parse(myjson);
console.log(myjson);
console.log(myjson.length);
console.log(myjson[0].MetaData[0].Nombre);
console.log(myjson[30].MetaData[0].Codigo);
console.log(Math.abs(myjson[30].MetaData[0].Codigo,2));
console.log(myjson[0].Data[0].Valor);
myjson.sort(function(a, b){
  var x = Math.abs(a.MetaData[0].Codigo,2);
  var y = Math.abs(b.MetaData[0].Codigo,2);
 
  return x - y;
});
console.log(myjson);
document.getElementById("prueba55").innerHTML = myjson.length;

}
*/
//Ordenar fuente de datos por Código pronvicia para facilitar la búsqueda

function sortMyjsonCodProvincia(){
	
myjson.sort(function(a, b){
  var x = Math.abs(a.MetaData[0].Codigo,2);
  var y = Math.abs(b.MetaData[0].Codigo,2);
 
  return x - y;
});	


}

//Obtener nombre provincia para un número X
function getNombre(p){
	//sortMyjsonCodProvincia();
	getGrafLineasProvincia(p);
	return myjson[p].MetaData[0].Nombre;
}

//Obtener tabla con los datos de españa
 function getDataEspana(){
//Obtenemos posibles filtros
   var h = $("#a_desde").val();
   var d = $("#a_hasta").val();

// si los filtros están vacios damos un valor por defecto
   if(d == '' && h == ''){
   	 d=2018;
   	 h=1975;
   }

//Generamos la tabla de datos
   var txt = "<center><table class='table2'><tr><td class='td2'>Año</td><td class='td2'>Valor</td> </tr>";
   for(var i = (2018 - d); i <= 2018 - h;i++){
		txt += "<tr><td class='td2'>"+ myjson[0].Data[i].Anyo +"</td><td class='td2'>" + myjson[0].Data[i].Valor + "</td></tr>";
		anyo.unshift(myjson[0].Data[i].Anyo);
		values.unshift(myjson[0].Data[i].Valor);
	}
	txt += "</table></center>";	
	document.getElementById("tit_nac").innerHTML =  "España (Tasa de Natalidad por cada 1000 habitantes)";
	document.getElementById("datos_nac").innerHTML = txt;
}


//Obtener tabla con los datos de provincia y España () llamada getDataspana
function getDataProvincia(p){

// Vaciamos vectores de valores
  var anyo = [];
  var values = [];
   //sortMyjsonCodProvincia();
   
// inicializamos la provincia
	if (provincia == 'undefined'){
		if (p != 'undefined'){
			provincia = p;
		}
	}

	
	if (p != undefined && p != provincia  ){
		provincia = p;
	}
//Obtenemos posibles filtros
   var h = $("#a_desde").val();
   var d = $("#a_hasta").val();

// si los filtros están vacios damos un valor por defecto
   if(d == '' && h == ''){
   	 d=2018;
   	 h=1975;
   }

//Generamos la tabla de datos
   var txt = "<center><table class='table2' id='tp'><tr><td class='td2'>Año</td><td class='td2'>Valor</td><td class='td2'>España</td> </tr>";
   for(var i = (2018 - d); i <= 2018 - h;i++){
		txt += "<tr><td class='td2'>"+ myjson[provincia].Data[i].Anyo +"</td><td class='td2'>" + myjson[provincia].Data[i].Valor + "</td><td class='td2'>" + myjson[0].Data[i].Valor + "</td></tr>";
		anyo.unshift(myjson[provincia].Data[i].Anyo);
		values.unshift(myjson[provincia].Data[i].Valor);
	}
	txt += "</table></center>";

//Incluimos valores en nuestros contenedores
	document.getElementById("tit_prov").innerHTML = "  "+getNombre(provincia) + " (Tasa de Natalidad por cada 1000 habitantes)";
	document.getElementById("datos_prov").innerHTML = txt;
 
	

	
}


//llamar tabla primera vez
function getTabla1(){
	getDataProvincia(provincia);
	window.scrollTo(0,1000);
}

// Pintar gráfico detalle con valores de provincia
function getGrafProvincia(p){
	
	var w = 2000;
	var h = 300;
	// Vaciamos vectores de valores
    var anyo = [];
    var values = [];
   //sortMyjsonCodProvincia();
   
// inicializamos la provincia
	if (provincia == 'undefined'){
		if (p != 'undefined'){
			provincia = p;
		}
	}

	
	if (p != undefined && p != provincia  ){
		provincia = p;
	}

//Obtenemos posibles filtros
   var hasta = $("#a_desde").val();
   var desde = $("#a_hasta").val();

// si los filtros están vacios damos un valor por defecto
   if(desde == '' && hasta == ''){
   	 desde=2018;
   	 hasta=1975;
   }

//Generamos la tabla de datos
   for(var i = (2018 - desde); i <= 2018 - hasta;i++){
		anyo.unshift(myjson[provincia].Data[i].Anyo);
		values.unshift(myjson[provincia].Data[i].Valor);
		console.log(i);
	}

//limpiamos el panel de dibujo
	$("#histograma1").empty();
	
	

//asginamos titulo al gráfico
 document.getElementById("histograma1").innerHTML = '<h2 id="h2_g" >' +getNombre(provincia) + " (Tasa de Natalidad por cada 1000 habitantes)</h2>";

	var svg = d3.select("#histograma1")
      .append('svg')
      .attr("width",w)
      .attr("height", h);

      svg.selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 30)
    .attr("height", 1000)
    .attr("fill"," SteelBlue")
    
    .attr("x", function(d, i){
      return i * 40 + 25  // Ancho de barras de 20 más 1 de espacio 
    })
    
    .attr("height", function(d){
      return d*10;
      
    })
    
    .attr("y", function(d){
      return  h - d*10 - 15; // Altura menos el dato
    })
  
    
    svg.selectAll("text")
      .data(values)
      .enter()
      .append("text")
      .text(function(d){
        return d;
      })
    .attr("x", function(d, i){
      return i * 40 + 25 // + 5
        })
    .attr("y", function(d){
      return h - d*10 - 18; // + 15
    })
    
    
     svg.selectAll("años")
      .data(anyo)
      .enter()
      .append("text")
      .text(function(d){
        return d;
      })
    .attr("x", function(d, i){
      return i * 40 + 25 // + 5
        })
    .attr("y", function(d){
      return h ; // + 15
    })
   // console.log($("#tp").length )
      if($("#tp").length){
		 getDataProvincia();
	}
	
//pintamos eje de coordenadas
  pintar_eje_grafDetalle(values,svg,h);
  

  window.scrollTo(0,700);
  
}

//Grafico Detalle Comparativa provincia Vs Total España
function getGrafComparativa(){
	
	var w = 2000;
	var h = 300;
	// Vaciamos vectores de valores
   var anyo = [];
   var  values = [];
   var valuesE = [];
   //sortMyjsonCodProvincia();
   
// inicializamos la provincia

//Obtenemos posibles filtros
   var hasta = $("#a_desde").val();
   var desde = $("#a_hasta").val();

// si los filtros están vacios damos un valor por defecto
   if(desde == '' && hasta == ''){
   	 desde=2018;
   	 hasta=1975;
   }

//Generamos la tabla de datos
   for(var i = (2018 - desde); i <= 2018 - hasta;i++){
		anyo.unshift(myjson[provincia].Data[i].Anyo);
		values.unshift(myjson[provincia].Data[i].Valor);
		valuesE.unshift(myjson[0].Data[i].Valor);
	}
	
	//limpiamos el panel de dibujo
	$("#histograma1").empty();
	//asginamos titulo al gráfico
 document.getElementById("histograma1").innerHTML = '<h2 id="h2_g" >' + getNombre(provincia) + " (Tasa de Natalidad por cada 1000 habitantes)</h2>";
 
//Instanciamos un objeto SVG
	var svg = d3.select("#histograma1")
      .append('svg')
      .attr("width",w)
      .attr("height", h);

//Pintamos los rectángulos referentes a la provincia      
      svg.selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", 1000)
    .attr("fill"," SteelBlue")
    
    .attr("x", function(d, i){
      return (i * 42)+ 25  // Ancho de barras de 20 más 1 de espacio 
    })
    
    .attr("height", function(d){
      return d*10;
      
    })
    
    .attr("y", function(d){
      return  h - d*10 - 15; // Altura menos el dato
    })
    

//Pintamos los rectángulos referentes a España
  svg.selectAll("rect2")
    .data(valuesE)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 18)
    .attr("height", 1000)
    .attr("fill","Purple")
    
    .attr("x", function(d, i){
      return (i * 42) + 45  // Ancho de barras de 20 más 1 de espacio 
    })
    
    .attr("height", function(d){
      return d*10;
      
    })
    
    .attr("y", function(d){
      return  h - d*10 - 15; // Altura menos el dato
    })    
  
//Pintamos los valores    
    svg.selectAll("text")
      .data(values)
      .enter()
      .append("text")
      .text(function(d){
        return d;
      })
    .attr("x", function(d, i){
      return (i * 42) + 25 // + 5
        })
    .attr("y", function(d){
      return h - d*10 - 18; // + 15
    })
    
    
     svg.selectAll("años")
      .data(anyo)
      .enter()
      .append("text")
     
      .text(function(d){
        return d;
      })
    .attr("x", function(d, i){
      return i * 42 + 25 // + 5
        })
    .attr("y", function(d){
      return h ; // + 15
    })
     
     
    console.log($("#tp").length )
      if($("#tp").length){
		 getDataProvincia();
	}
	
//pintamos eje de coordenadas
  pintar_eje_grafDetalle(values,svg,h);
  


}





//Pintar Eje de coordenadas gráfico detalle
function pintar_eje_grafDetalle(v,s,hh){
	     s.append("line") 
       .style("stroke", "black") 
       .attr("x1", 20) // x position of the first end of the line 
       .attr("y1", hh-15) // y position of the first end of the line 
       .attr("x2", 20) // x position of the second end of the line .
        .attr("y2", 0); // y position of the second end of the line 
        
      s.append("line") 
       .style("stroke", "black") 
       .attr("x1", 20) // x position of the first end of the line 
       .attr("y1", hh-15) // y position of the first end of the line 
       .attr("x2", v.length * 40 + 110) // x position of the second end of the line .
        .attr("y2", hh-15); // y position of the second end of the line 
    
    var text_eje = [0,5,10,15,20,25,30]; 
    s.selectAll("text_ejey")  
    	.data(text_eje)
    	.enter()
    	.append("text")
    	.text(function(d){
        return d;
      })
      
      .attr("x", function(d, i){
           return 2; // + 5
        })
      .attr("y", function(d){
          return hh-15 -(d*10) +5; // + 15
      })
}





// Pintar gráfico de líneas dinámico
function getGrafLineasProvincia(p){
// dimensiones del elemento SVG	
	var w = 300;
	var h = 300;
	// Vaciamos vectores de valores
   var anyo = [];
   var values = [];

// si los filtros están vacios damos un valor por defecto
   	 desde=2018;
   	 hasta=1975;

//Generamos la tabla de datos
   for(var i = (2018 - desde); i <= 2018 - hasta;i++){
		anyo.unshift(myjson[p].Data[i].Anyo);
		values.unshift(myjson[p].Data[i].Valor);
	}

	
//limpiamos el div de dibujo
	$("#histograma2").empty();
//Añadimos títilo al gráfico	
   document.getElementById("histograma2").innerHTML = '<h3 id="tit_h2">Linea de evolución temporal 1975-2018 (Tasa Natalidad: Valor por cada 1000 hab.)</h3>';
	
//Creamos elmento SVG en el contenedor
	var svg = d3.select("#histograma2")
      .append('svg')
      .attr("width",w)
      .attr("height", h)
          
 //Pintamos Linea de valores     
     var v_ant = values[0];
  for(var i =1; i< values.length;i++){ 	
    svg.append("line")
    .attr("stroke"," SteelBlue")		
   	.attr("x1", (i -1) * (6) + 15 ) 
    .attr("y1", h - v_ant*10 - 11) 
    .attr("x2", i * 6 + 15) 
    .attr("y2",  h - (values[i]*10) - 11); 
    v_ant = values[i];
  
	}

// Pintamos valores indicativos Eje Y
      svg.append("text")
      .text("1975")
      .attr("x",15)
      .attr("y", h )
      
      svg.append("text")
      .text("2018")
      .attr("x",260)
      .attr("y", h )
	
	pintar_eje_grafDinamico(svg,h);
}




//Pintar Eje de coordenadas gráfico dinámico
function pintar_eje_grafDinamico(s,hh){
	     s.append("line") 
       .style("stroke", "black") 
       .attr("x1", 15) // x position of the first end of the line 
       .attr("y1", hh-11) // y position of the first end of the line 
       .attr("x2", 15) // x position of the second end of the line .
        .attr("y2", 0); // y position of the second end of the line 
        
      s.append("line") 
       .style("stroke", "black") 
       .attr("x1", 15) // x position of the first end of the line 
       .attr("y1", hh-11) // y position of the first end of the line 
       .attr("x2", 300) // x position of the second end of the line .
        .attr("y2", hh-11); // y position of the second end of the line 
    
    var text_eje = [0,10,20,30]; 
    s.selectAll("text_ejey")  
    	.data(text_eje)
    	.enter()
    	.append("text")
    	.text(function(d){
        return d;
      })
      
      .attr("x", function(d, i){
           return 2; // + 5
        })
      .attr("y", function(d){
          return hh-11 -(d*10) ; // + 15
      })
}
