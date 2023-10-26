	
	/* La carte est générée au click sur l'onglet Carte */	
	$('#onglet_map').on( "click", function () {
		/* Pour éviter de doublonner la carte chaque fois que l'on clique sur l'onglet au cours d'une même requête (ce qui arrive forcément), 
		on a mis en place un compteur initialisé à 0 au moment de l'envoie de la requête (cf. query.js) 
		On récupère la valeur de ce compteur ainsi que celui du champs contenant le geojson */
		var compteur = document.getElementById('compteur').value;
		var geo = document.getElementById('generated_geojson').value;
		/* On n'affiche la carte que s'il y a bien un geojson (requête a retourné des résultats) et que le compteur est bien à 0 (première fois que l'on demande l'affichage de la carte)*/
		if(compteur==0 && geo!=""){
			/* On commence par changer le compteur en le plaçant à 1 pour verrouiller la génération de la carte */
			document.getElementById('compteur').value = 1;
		

/*============================================== Déclaration des Crédits ========================================================*/	
				 
			var expandedAttribution = new ol.control.Attribution({
				collapsible: true
			});

/*==============================================  Déclaration des Pop up ========================================================*/				
		 
			var container = document.getElementById('popup');
			var content = document.getElementById('popup-content');
								
			/* Create an overlay to anchor the popup to the map.*/
			var overlayPopup = new ol.Overlay({
				element: container
			});
			
/*============================================ Mini carte =====================================================*/	
	
			/*Permet d'afficher une carte de localisation */
			var overviewMapControl = new ol.control.OverviewMap({
				className: 'ol-overviewmap ol-custom-overviewmap',
				/* Couche qui sert de fond */
				layers: [
					new ol.layer.Tile({
						source: new ol.source.OSM({
							'url': 'http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=72c10d6d09604887a954ad8b7e9a8162'
						})
					})
				],
				collapseLabel: '\u00BB',
				label: '\u00AB',
				collapsed: true // collapsed au chargement
			});

			


/*============================================= Centrage carte =============================================*/	
			
			/* Création d'un nouveau bouton de controle (pour recentrer la carte) */
			/* Define a namespace for the application. */
			window.app = {};
			var app = window.app;
			
			/** Define the new control
			* @constructor
			* @extends {ol.control.Control}
			* @param {Object=} opt_options Control options.
			*/
			app.CenterControl = function(opt_options) {
				var options = opt_options || {};

				var button = document.createElement('button');
				button.innerHTML = 'C';

				var this_ = this;
				/* Fonction qui va permettre de recentrer et rezoomer la carte */
				var handleCenter = function(e) {
				e.preventDefault();  // sinon, il active le formulaire 
				var lon = parseFloat(document.getElementById('longitude').value);
				var lat= parseFloat(document.getElementById('latitude').value);
				 
				this_.getMap().getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
					this_.getMap().getView().setZoom(4);
				};
				 
				button.addEventListener('click', handleCenter, false);
				button.addEventListener('touchstart', handleCenter, false);

				var element = document.createElement('div');
				element.className = 'go-center ol-unselectable ol-control';
				element.appendChild(button);

				ol.control.Control.call(this, {
					element: element,
					target: options.target
				});
			};
			ol.inherits(app.CenterControl, ol.control.Control);
	
			
/*============================================= Gestion des styles ============================================*/		
		
			/* Fonction permettant de déterminer la taille des points en fonction du nombre de pop superposées */				
			function getSize(count){
				if(count==1){
					return size = 0;
				} else if (count > 1 && count < 6){
					return size = 1;
				} else if (count >= 6 && count < 10){
					return size = 2;
				} else if (count >= 10){
					return size = 4;
				}
			}
			
			
			/* Gestion du style pour le geojson*/	 
			var styleCache_pop={}
			var style_pop = function(feature, resolution){
				var value = feature.get("count_loc") // on indique la colonne qui va servir à définir la variable size = nombre de pop ayant les mêmes coordonnées
				var size = getSize(value); // on appelle la fonction getSize() 
				var style = [ new ol.style.Style({
					image: new ol.style.Circle({radius: 3.0 + size,
						stroke: new ol.style.Stroke({color: 'black', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}), fill: new ol.style.Fill({color: "red"})})
				})];
				if ("") {
					var labelText = "";
				} else {
					var labelText = ""
				}
				var key = value + "_" + labelText

				if (!styleCache_pop[key]){
					var text = new ol.style.Text({
						  font: '10px Calibri,sans-serif',
						  text: labelText,
						  textBaseline: "center",
						  textAlign: "left",
						  offsetX: 5,
						  offsetY: 3,
						  fill: new ol.style.Fill({
							color: "rgba(None, None, None, 255)"
						  }),
						});
					styleCache_pop[key] = new ol.style.Style({"text": text})
				}
				var allStyles = [styleCache_pop[key]];
				allStyles.push.apply(allStyles, style);
				return allStyles;
			};
			
			/* Style pour les sélections */
			var style_select = function(feature, resolution){
				var value = feature.get("count_loc")  
				var size = getSize(value); 
				var style = [ new ol.style.Style({
					image: new ol.style.Circle({radius: 4.0 + size,
						stroke: new ol.style.Stroke({color: 'black', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}), fill: new ol.style.Fill({color: "blue"})})
				})];
				if ("") {
					var labelText = "";
				} else {
					var labelText = ""
				}
				var key = value + "_" + labelText

				if (!styleCache_pop[key]){
					var text = new ol.style.Text({
						  font: '10px Calibri,sans-serif',
						  text: labelText,
						  textBaseline: "center",
						  textAlign: "left",
						  offsetX: 5,
						  offsetY: 3,
						  fill: new ol.style.Fill({
							color: "rgba(None, None, None, 255)"
						  }),
						});
					styleCache_pop[key] = new ol.style.Style({"text": text})
				}
				var allStyles = [styleCache_pop[key]];
				allStyles.push.apply(allStyles, style);
				return allStyles;
			};
	
	
/*============================================= Couche POP ========================================================*/	

			/* On récupère le contenu du champs caché hébergeant le GeoJson */
			var geojson_pop=document.getElementById('generated_geojson').innerHTML;
			/* On récupère également la valeur de ce champs, utile lorsque le champs geom de la BDD est vide
			On va l'utiliser pour effectuer des tests et générer ou non la couche vecteur avec la pop */
			var val = document.getElementById('generated_geojson').value;
			
			/* Si ce champs caché n'est pas vide (donc qu'on a bien saisi des coordonnées et calculé un champ géométrique), on créé une couche pour héberger le point pop */
			if(val!="empty"){
				/* Définition de la couche vecteur  */
				var format = new ol.format.GeoJSON();
				var features = format.readFeatures(geojson_pop, 
				{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
				var jsonSource = new ol.source.Vector();
				jsonSource.addFeatures(features);
				lyr_pop = new ol.layer.Vector({
					source:jsonSource, 
					style: style_pop,
					title: "Populations",
				});

				lyr_pop.setVisible(true);
			}  
			
/*============================================= Fond de carte ==================================================*/	
		
			/* Création du fond de carte - Plus il y a de couches et plus les exports vont être longs 
			On créé les couches en commençant par celle qui sera la plus en dessous pour finir par la première à être affichée */	
			var baseLayer = new ol.layer.Group({'title': 'Base maps',
				layers: 
				[			
					// Couche Aerial, créée en début de document
					new ol.layer.Tile({
						title: 'Aerial',
						source: new ol.source.BingMaps({
							imagerySet: 'Aerial',
							key: 'AmSqzaB6repg15ekooxXZa4T8tlucDxDCKWunX1n63iCv6gp32kz3LKWaua7aqVF',
						  /* La ligne attributions permet de gérer les crédits de la couche */
							attributions: [new ol.Attribution({html:'[Aerial © ' + '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors,<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>]  '})], 
						  /* Il faut rajouter cette ligne si l'on veut pouvoir exporter une image png */
							crossOrigin: 'anonymous'
						})
					}),
									
					/* Carte provenant d'ArcGIS Online - checker les droits */
					new ol.layer.Tile({
						title: 'World topo map',
						source: new ol.source.XYZ({
						  attributions: [new ol.Attribution({html: '[World Topo Map © ' + '<a href="http://services.arcgisonline.com/ArcGIS/' +'rest/services/World_Topo_Map/MapServer">ArcGIS</a>]  '})],
						  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
							  'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
							  crossOrigin: 'anonymous'
						})
					}),
					
					
					/* Nécessite une clé pour être utilisé et donc la création d'un compte sur thunderforest.com */
					new ol.layer.Tile({
						title: 'Landscape',
						source: new ol.source.XYZ({
							url: 'http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=72c10d6d09604887a954ad8b7e9a8162',
							attributions: [new ol.Attribution({html:'[Landscape © ' + '<a href="https://www.thunderforest.com/maps/landscape/">Thunderforest</a> an <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>]  '})], 
							crossOrigin: 'anonymous'
						})
					}), 
				]
			});

/*============================================ COUCHE DES SEARCH ===================================================*/	

			/* Ce groupe de couches est créé et instancié vide. Il sera rempli au clic sur le bouton de recherche */		
			var selectLayer = new ol.layer.Group({'title': 'Pop selected',
				layers: [],
			});
				
/*============================================ COUCHE DES POLYGONES ===================================================*/	
				
			/* Création de la source  */ 
			var drawingSource = new ol.source.Vector();
						
			/* Création de la couche : définition de la source et éventuellement du style à appliquer 
			Il faut lui donner un titre vide pour pouvoir l'exclure facilement de la liste des Couches que l'on récupère sans pour autant la faire apparaitre dans le switch layer*/
			var drawingLayer = new ol.layer.Vector({
				source: drawingSource,
				title:''
			});			
			
						
/*============================================ LISTE DES COUCHES ====================================================*/	
			/* Elle dépend, là encore, de la présence ou non de données dans le champs géométrique */
			var layersList;
			
			if(val!="empty"){
				layersList = [baseLayer, drawingLayer, lyr_pop, selectLayer];
			} else {
				layersList = [baseLayer, drawingLayer];
			}

 	
			/* Fonction permettant de récupérer le nom des couches */
			function getLayersList(){
				var arrayLayers=[]; // On créé un array
				/* Pour chaque couche de la carte */
				map.getLayers().forEach(function(layer, i) {
					/* dans un groupe de couches */
					if (layer instanceof ol.layer.Group) {
						/* On va récupérer le title de chaque sous-couche et placer l'ensemble dans le tableau 
						On exclu la couche polygones et toutes les couches vecteurs non issues de la base de données */
						layer.getLayers().forEach(function(sublayer, j) {
							title = sublayer.get('title');
							if(title!="" && title!="Landscape" && title!="Aerial" && title!="World topo map"  ){ 
								arrayLayers.push(title)
							}
						});
					/* Hors d'un groupe de couches */
					} else {
						title = layer.get('title');
						if(title!="" && title!="Landscape" && title!="Aerial" && title!="World topo map"  ){
							arrayLayers.push(title)
						}
					} 
				});
				return arrayLayers;
			}
		
/*============================================ CREATION DE LA CARTE ================================================*/	
			 
			var map = new ol.Map({
			  controls: ol.control.defaults({attribution:false}).extend([
					expandedAttribution,  // ligne de crédits
					new ol.control.LayerSwitcher({tipLabel: "Layers"}), // sélection des couches
					new ol.control.ScaleLine({}), // échelle
					new app.CenterControl(), // bouton pour centrer la carte
					overviewMapControl, // carte de localisation
				]),
				layers: layersList, // Les couches qu'elle contient
				target: document.getElementById('map'),
				renderer: 'canvas',
				overlays: [overlayPopup],
				view: new ol.View({
					center: [0, 0],
					zoom: 5
				})
			});

			/* Autorisation des popups */
			var NO_POPUP = 0
			var ALL_FIELDS = 1
			popupLayers = [1];
			
/*=============================================== EVENT ON HOVER ==========================================*/	
		
			var doHover = true;

			var onPointerMove = function(evt) {
				var pixel = map.getEventPixel(evt.originalEvent);
				var coord = evt.coordinate;
				var popupField = [];
				var currentFeature;
				var currentFeatureKeys;
				
				/* On va autoriser les pop-up sur toutes les couches pour que les couches issues d'un search aient automatiquement un pop-up
				Néanmoins, avec ce système, lorsque Populations est coché, le pop-up est doublonné
				Pour éviter ce problème, on va récupérer la liste des couches de la carte et modifier la fonction en fonction de l'affichage de Populations	*/
				var array=[]; // On créé un array
				/* Pour chaque couche de la carte */
				map.getLayers().forEach(function(layer, i) {
					/* dans un groupe de couches */
					if (layer instanceof ol.layer.Group) {
						/* On va récupérer le title et le statut (visible, invisible) de chaque sous-couche et placer l'ensemble dans le tableau */
						layer.getLayers().forEach(function(sublayer, j) {
							  title = sublayer.get('title');
							  status = sublayer.getVisible(); 
							  
						});
					/* Hors d'un groupe de couche*/
					} else {
						 title = layer.get('title');
						 status = layer.getVisible(); 
					}
					array.push(title + "-" + status)
				});
				
				
				/* On va ensuite regarder ce qu'il y a dans le tableau. 
				Si Populations est coché, on active les pop-up uniquement pour cette couche */
				if (array.indexOf("Populations-true")>-1){
					map.forEachFeatureAtPixel(pixel, function(feature, layer) {
						currentFeature = feature;
						/* Pointage vers la couche Populations */ 
						field = popupLayers[layersList.indexOf(layer) - 2];
						currentFeatureKeys = currentFeature.getKeys();
						if(field==ALL_FIELDS){
							for (var i=0; i<currentFeatureKeys.length; i++) {
								if (currentFeatureKeys[i] != 'geometry' && currentFeatureKeys[i] != 'count_loc' && currentFeatureKeys[i] != 'kingdom'  && currentFeatureKeys[i] !='species') {
									data = currentFeature.get(currentFeatureKeys[i]) ;
									popupField.push(data);
								}
							}
						}
						
					});  
				/* Sinon, on active le pop-up pour toutes les couches */
				} else {
					map.forEachFeatureAtPixel(pixel, function(feature, layer) {
						currentFeature = feature;
						currentFeatureKeys = currentFeature.getKeys();
						for (var i=0; i<currentFeatureKeys.length; i++) {
							if (currentFeatureKeys[i] != 'geometry' && currentFeatureKeys[i] != 'count_loc' && currentFeatureKeys[i] != 'kingdom'&& currentFeatureKeys[i] !='species') {
									data = currentFeature.get(currentFeatureKeys[i]) ;
									popupField.push(data)
							}
						}
					}); 
				}
					
			
				if (doHover) {
					if (popupField.length>0) {
						var result = popupField.sort();
						overlayPopup.setPosition(coord);
						content.innerHTML = "<strong>pop_cod : </strong>" + result.join(', ');
						container.style.display = 'block'; 
					} else {
						container.style.display = 'none';
					}
				}
			};

 			/* Lorsque le pointer survole un point */
			map.on('pointermove', function(evt) {
				/*on va appliquer les événements définis)  */
				onPointerMove(evt);
				/*changer le curseur de la souris */
				map.getTargetElement().style.cursor =
				map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
			});
			


/*=======================================================================================================================================================================================*/
/*======================================================================= RECONSTITUTION DE L'ECHELLE  ==================================================================================*/	  
/*=======================================================================================================================================================================================*/
		 		
 
		/* On a initialisé une échelle avec la carte qui va être cachée en css (display: none;) 
		Elle va nous permettre à définir la taille et la valeur de l'échelle qui sera dessinée 
		script : https://www.kreidefossilien.de/webgis/dokumentation/beispiele/export-map-to-png-with-scale */		
			
			InsertToCanvas = (function() {
				//get the canvas element
				var canvas = $('canvas').get(0); 
				//get the Scaleline div container the style-width property
				var olscale = $('.ol-scale-line-inner');  
				//Scaleline thicknes
				var line1 = 6;
				//Offset from the left
				var x_offset = 10;
				//offset from the bottom
				var y_offset = 15;
				var fontsize1 = 16;
				var font1 = fontsize1 + 'px Arial';
				// how big should the scale be (original css-width multiplied)
				var multiplier = 1;

				function WriteScaletoCanvas(e) {
					var ctx = e.context;
					var scalewidth = parseInt(olscale.css('width'),10)*multiplier;
					var scale = olscale.text();
					var scalenumber = parseInt(scale,10)*multiplier;
					var scaleunit = scale.match(/[Aa-zZ]{1,}/g);

					//Scale Text
					ctx.beginPath();
					ctx.textAlign = "left";
					ctx.strokeStyle = "rgba(243,248,243,0.1)";
					ctx.fillStyle = "#000000";
					ctx.lineWidth = 5;
					ctx.font = font1;
					ctx.strokeText([scalenumber + ' ' + scaleunit], x_offset + fontsize1 / 2, canvas.height - y_offset - fontsize1 / 2);
					ctx.fillText([scalenumber + ' ' + scaleunit], x_offset + fontsize1 / 2, canvas.height - y_offset - fontsize1 / 2);

					//Scale Dimensions
					var xzero = scalewidth + x_offset;
					var yzero = canvas.height - y_offset;
					var xfirst = x_offset + scalewidth * 1 / 4;
					var xsecond = xfirst + scalewidth * 1 / 4;
					var xthird = xsecond + scalewidth * 1 / 4;
					var xfourth = xthird + scalewidth * 1 / 4;

					// Stroke
					ctx.beginPath();
					ctx.lineWidth = line1 + 2;
					ctx.strokeStyle = "#000000";
					ctx.fillStyle = "#ffffff";
					ctx.moveTo(x_offset, yzero);
					ctx.lineTo(xzero + 1, yzero);
					ctx.stroke();

					//sections black/white
					ctx.beginPath();
					ctx.lineWidth = line1;
					ctx.strokeStyle = "#000000";
					ctx.moveTo(x_offset, yzero);
					ctx.lineTo(xfirst, yzero);
					ctx.stroke();

					ctx.beginPath();
					ctx.lineWidth = line1;
					ctx.strokeStyle = "#FFFFFF";
					ctx.moveTo(xfirst, yzero);
					ctx.lineTo(xsecond, yzero);
					ctx.stroke();

					ctx.beginPath();
					ctx.lineWidth = line1;
					ctx.strokeStyle = "#000000";
					ctx.moveTo(xsecond, yzero);
					ctx.lineTo(xthird, yzero);
					ctx.stroke();

					ctx.beginPath();
					ctx.lineWidth = line1;
					ctx.strokeStyle = "#FFFFFF";
					ctx.moveTo(xthird, yzero);
					ctx.lineTo(xfourth, yzero);
					ctx.stroke();
					
					/* Pour mettre un pseudo fond 
					ctx.beginPath();
					ctx.lineWidth = 60;
					ctx.strokeStyle = "rgba(243,248,243,0.2)";
					ctx.moveTo(x_offset - 5, yzero + 5);
					ctx.lineTo(xzero + 5, yzero + 5);
					ctx.stroke();*/
				}
				
				function postcompose() {
					map.on('postcompose', function (evt) {
						WriteScaletoCanvas(evt);
					});
				}
				
				return {
					postcompose : postcompose
				};
			})();

			/* Insertion de l'échelle */
			InsertToCanvas.postcompose();


/*=======================================================================================================================================================================================*/
/*======================================================= Color picker : changement des couleurs de couches =============================================================================*/	  
/*=======================================================================================================================================================================================*/
		 		
		/* On va d'abord définir les options et event du color picker */
		$("#custom_pop_fill").spectrum({
			color: "red", // couleur par défaut
			showButtons: false, // suppression du bouton choose
			showInput: true, // permet la saisie directe par code (rgb, hsv, # ou même nom de la couleur)
			preferredFormat: "hex", // format par défaut (ex #fffff)
			showAlpha: true, // permet de jouer sur la transparence
			showPaletteOnly: true, // les options qui suivent permettent de proposer par défaut uniquement la palette  
			togglePaletteOnly: true,
			togglePaletteMoreText: 'more', // mais de pouvoir activer plus de choix de couleurs après 
			togglePaletteLessText: 'less',
			palette: [
				["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
				["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
				["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
				["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
				["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
				["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
				["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
				["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
			], // couleurs proposées dans la palette
			/* Action effectuée dès que l'on se déplace dans le color picker */
			move: function(color) {
				$("#log_pop_fill").text(color.toHexString());
			},
			/* Au cas où, on fait la même chose pour un changement validé */
			change: function(color) {
				$("#log_pop_fill").text(color.toHexString());
			}			 
		});
		
		$("#custom_pop_stroke").spectrum({
			color: "black", // couleur par défaut
			showButtons: false, // suppression du bouton choose
			showInput: true, // permet la saisie directe par code (rgb, hsv, # ou même nom de la couleur)
			preferredFormat: "hex", // format par défaut (ex #fffff)
			showAlpha: true, // permet de jouer sur la transparence
			showPaletteOnly: true, // les options qui suivent permettent de proposer par défaut uniquement la palette  
			togglePaletteOnly: true,
			togglePaletteMoreText: 'more', // mais de pouvoir activer plus de choix de couleurs après 
			togglePaletteLessText: 'less',
			palette: [
				["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
				["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
				["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
				["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
				["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
				["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
				["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
				["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
			], // couleurs proposées dans la palette
			/* Action effectuée dès que l'on se déplace dans le color picker */
			move: function(color) {
				$("#log_pop_stroke").text(color.toHexString());
			},
			/* Au cas où, on fait la même chose pour un changement validé */
			change: function(color) {
				$("#log_pop_stroke").text(color.toHexString());
			}			 
		});
		
		
		/* On créé la fonction pour le style 
		Elle a une variable qui sera définie au moment de lancer la fonction et qui permet de récupérer l'ensemble des points pop projetés sur la carte 
		En effet, on peut travailler sur différentes couches et pour chaque couche le nombre de pops représentées par un point n'est pas forcément identique */
		function getStyle(feature){
			var style2='';
			/* On commence par définir la couleur du fond et du contour en se basant sur les variables générées par le color picker $color_stroke et $color_fill */
			var  color_stroke = $("#log_pop_stroke").text();
			var color_fill = $("#log_pop_fill").text();
			
			var stroke = new ol.style.Stroke({color: color_stroke, lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1});
			var fill = new ol.style.Fill({color: color_fill});
				
			/* On va ensuite récupérer la forme sélectionnée par l'utilisateur  */
			form=$("#form").val();
			
			/* et la taille - on utilise pour cela la variable count_loc de chaque feature pour avoir une taille qui change en fonction du nombre de pop représentées */
			var value = feature.get("count_loc") // on indique la colonne qui va servir à définir la variable size = nombre de pop ayant les mêmes coordonnées
			var original_size = getSize(value);
			size = parseInt($("#size").val()) + parseInt(original_size); // pour faire un calcul et non une concaténation, on utilise parseInt
			 	
			if(form==1){ // circle
				style2 = new ol.style.Style({
					image: new ol.style.Circle({
						radius: size,
						stroke: stroke,
						fill: fill
					})
				});
			} 
			
			else if (form==2) { // Square
				style2 = new ol.style.Style({
					image: new ol.style.RegularShape({
						fill: fill,
						stroke: stroke,
						points: 4,
						radius: size,
						angle: Math.PI / 4
					})
				});
			}
			
			else if (form==3) { // Triangle
				style2 = new ol.style.Style({
					image: new ol.style.RegularShape({
						fill: fill,
						stroke: stroke,
						points: 3,
						radius: size,
						// rotation: Math.PI / 4, - si on ne veut pas un triangle droit 
						angle: 0
					})
				});
			} 
			
			else { // Star 
				style2 = new ol.style.Style({
					image: new ol.style.RegularShape({
						fill: fill,
						stroke: stroke,
						points: 5,
						radius: size,
						radius2: 4,
						angle: 0
					})
				});
			}
			
			return style2;
		}
		
		/* On va ensuite appliquer la modification à la couche au clic sur le bouton apply */
		var apply_pop = document.getElementById('apply_pop'); // On récupère le bouton et on le place dans une variable
		
		apply_pop.addEventListener('click', function(feature) { // Lorsque l'utilisateur clique sur le bouton 
		var apply_layer = document.getElementById('layer').value; // On récupère la couche à modifier et on la place dans une variable
			/* On va ensuite parcourir les couches qui composent la map */
			map.getLayers().forEach(function(layer, i) {
				if (layer instanceof ol.layer.Group) {
					/* On va récupérer le title de chaque sous-couche et comparer avec la demande utilisateur (variable apply_layer) */
					layer.getLayers().forEach(function(sublayer, j) {
						id  = sublayer.get('title');
						if (id == apply_layer){
							sublayer.getSource().forEachFeature(function(feature){
								/*on récupère le style grâce à la fonction getStyle()*/
								style2 = getStyle(feature); 
								/* et on l'applique à chaque élément */
								feature.setStyle(style2);
							});
						}
					});
				/* Hors d'un groupe de couche*/
				} else {
					id  = layer.get('title');
					if (id == apply_layer){
						layer.getSource().forEachFeature(function(feature){
							/*on récupère le style grâce à la fonction getStyle()*/
							style2 = getStyle(feature); 
							/* et on l'applique à chaque élément */
							feature.setStyle(style2);
						});
					}
				} 
			});
			map.updateSize(); // pour rafraichir la carte - sinon elle ne se met à jour que sur un hover 
		}, false);
	
		
	
/*=======================================================================================================================================================================================*/
/*======================================================================== Export de la carte en png ====================================================================================*/	  
/*=======================================================================================================================================================================================*/
		
		
		/* Pour que ça fonctionne il faut ajouter la mention crossOrigin: 'anonymous' à chaque couche
		Plus il y a de couches et plus le chargement sera long */
		var exportPNGElement = document.getElementById('export-png');
		if ('download' in exportPNGElement) {
        	exportPNGElement.addEventListener('click', function() {
			  map.once('postcompose', function(event) {
				var canvas = event.context.canvas;
				exportPNGElement.href = canvas.toDataURL('image/png');
			  });
			  map.renderSync();
			  
			}, false);
		} 
		  

/*=======================================================================================================================================================================================*/
/*============================================================================== DESSIN =================================================================================================*/	  
/*=======================================================================================================================================================================================*/
			  
			/* tutoriel : http://embed.plnkr.co/kSFZb9/
			
			Declare interactions and listener globally so we  
			 can attach listeners to them later. */
			var sketch; //the current drawing
			var draw;
			var listener;

			/* Bouton pour tracer le polygone */
			var poly = document.getElementById('select_withMap'); 
			/* Bouton pour sauvegarder la sélection dont l'affichage dépend des actions que l'on effectue */
			var save_poly = document.getElementById('save_withMap'); 
			
			/* ol.collection to hold all selected features */
			var select = new ol.interaction.Select();
			var selectedFeatures = select.getFeatures();
		  	
			/* Au clic sur le crayon */
			poly.addEventListener('click', function() { 
				// Drawing interaction				
				draw = new ol.interaction.Draw({
					source : drawingSource,
					type : 'Polygon',
					//only draw when Ctrl is pressed.
					condition : ol.events.condition.platformModifierKeyOnly
				}); 
				
				// Add interaction to map draw + select 
				map.addInteraction(draw);
				map.addInteraction(select);
								
				/*Début du dessin */
				draw.on('drawstart',function(event){
					drawingSource.clear(); // Cette ligne permet de ne tracer qu'un seul polygone à la fois - à enlever si on veut pouvoir faire une sélection de plusieurs secteurs déconnectés 
					select.setActive(false); 
					
					/* Pour que les points soient sélectionnés au fur et à mesure de la réalisation du polygone */
					sketch = event.feature;
					listener = sketch.getGeometry().on('change',function(event){
						selectedFeatures.clear(); // Cette ligne permet de déselectionner les éléments contenus dans un précédent prolygone 
						var polygon = event.target;
						var features = lyr_pop.getSource().getFeatures();
						for (var i = 0 ; i < features.length; i++){
							if(polygon.intersectsExtent( features[i].getGeometry().getExtent()  )){
								selectedFeatures.push(features[i]);
							}
						}
					});
				},this);

				/* Fin du dessin */
				draw.on('drawend', function(event) {
					delaySelectActivate();
					selectedFeatures.clear();
					var polygon = event.feature.getGeometry();
					var features = lyr_pop.getSource().getFeatures();
					/* variable qui va permettre de générer la liste des éléments sélectionnés */
					var table = [];
					for (var i = 0 ; i < features.length; i++){
						if(polygon.intersectsExtent( features[i].getGeometry().getExtent() )){
							selectedFeatures.push(features[i]);
							table.push(features[i]['G']['pop_cod']);																
						}
					}
					/* On tri la liste et on l'affiche */
					table = table.sort();;
					document.getElementById('featureTable').innerHTML ="<b>Points sélectionnés</b> : " + table.join(", ");
					/* On affiche aussi le bouton pour sauvegarder la sélection */
					save_poly.style.display = "inline-block"; 	
				});

				function delaySelectActivate(){
				  setTimeout(function(){
					select.setActive(true)
				  },300);
				}
			});
			
			/* On va proposer le shapefile associé à la sélection */					
			save_poly.addEventListener('click', function() { 
				var writer = new ol.format.GeoJSON();
				var geojsonStr=writer.writeFeatures(selectedFeatures['a']); 
								
				/* On envoie à l'appli en ligne OGRE le geojson pour qu'elle nous renvoie le shapefile correspondant */
				var params_poly = "json="+geojsonStr;			
				var url = 'http://ogre.adc4gis.com/convertJson';
				var filename = 'selection_shp.zip';
				var request_poly = new XMLHttpRequest();
				request_poly.open('POST', url, true);
				/* Comme on utilise une requête POST on doit redéfinir le header */
				request_poly.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				request_poly.responseType = 'blob';
				/* on génère le fichier ZIP à partir de la réponse ajax */
				request_poly.onload = function() {
				   var link = document.createElement('a');
				   document.body.appendChild(link);
				   link.href = window.URL.createObjectURL(request_poly.response);
				   link.download = filename;
				   link.click();
				};
				request_poly.send(params_poly);
			}); 
								
			/* Nettoyage du dessin*/
			var clear_poly = document.getElementById('clear_withMap'); 
			clear_poly.addEventListener('click', function() { 
				drawingSource.clear(); 
				selectedFeatures.clear();
				document.getElementById('featureTable').innerHTML='';
				/* On supprime le bouton pour sauvegarder la sélection qui n'existe plus */
				save_poly.style.display = "none";
			});		

			
/*======================================= Barycentre =========================================================*/		 
				
			if(val!="empty"){
				var lon = parseFloat(document.getElementById('longitude').value);
				var lat= parseFloat(document.getElementById('latitude').value);
				map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
				map.getView().setZoom(5);
				map.updateSize();
			} else {
				map.getView().setCenter(ol.proj.transform([2.2192, 47.754097], 'EPSG:4326', 'EPSG:3857'));
			}
			

/*======================================= Search =========================================================*/				
			
			function getSelectGroup() {
				var layers = map.getLayers();
				var length = layers.getLength(), l;
				for (var i = 0; i < length; i++) {
					l = layers.item(i);
					var lt = l.get('title');
					// check for layers within groups
					if (lt === 'Pop selected') { // Title of Group
						if (l.getLayers) {
							var innerLayers = l.getLayers().getArray();
							return innerLayers;
						}
					}
				}
			}

			var search = document.getElementById('button_search'); // On récupère le bouton et on le place dans une variable
			var listOfLayers = document.getElementById('layer'); // On récupère la liste de choix proposée pour styler les couches et que l'on devra mettre à jour avec la nouvelle couche issue du search
		 
		  	search.addEventListener('click', function() { 
				var input = document.getElementById('input_search').value; // saisie utilisateur 
				var message = document.getElementById('empty_search'); // div qui affiche le nombre de résultats
				var params = "search="+input;
				/* On initialise la requête */
				var xhttp = new XMLHttpRequest();
				/* On ouvre la requête en indiquant l'URL de destination */
				xhttp.open("POST", "controller/query_map.php", true);
				/* Comme on utilise une requête POST on doit redéfinir le header */
				xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						/* Comme on reçoit un JSON on doit le caster pour que les accents passent bien */
						var data = JSON.parse(this.responseText);
						/* Et comme il s'agit d'un tableau associatif, on doit isoler les éléments dont on a besoin */
						var geojson_search = data[0].geojson;
						var nb = data[0].nb;
						if(geojson_search=="empty"){
							message.innerHTML = "Il n'y aucun résultat correspondant au mot recherché."
						} else {
							/* On créé la couche vecteur  */
							var format = new ol.format.GeoJSON();
							var features = format.readFeatures(geojson_search, 
							{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
							var jsonSource = new ol.source.Vector();
							jsonSource.addFeatures(features);
							lyr_select = new ol.layer.Vector({
								source:jsonSource, 
								style: style_select,
								title: "Selection_" + input
							});
							/* On récupère le groupe grace à la fonction */
							var collection = getSelectGroup();
							/* On y place la nouvelle cuche */
							collection.push(lyr_select);
							map.updateSize(); // pour rafraichir la carte - sinon elle ne se met à jour que sur un hover 
						
							/* On génère la liste de toutes les couches vecteurs de la carte */
							var layerList = getLayersList(); 
							/* On les mets en forme */
							var textList='';
							for (var i = 0 ; i < layerList.length; i++){
								textList += "<option>"+layerList[i]+"</option>";
						 
							}
							/* On met à jour la liste de choix permettant de styler les couches */
							listOfLayers.innerHTML = textList;
							/* On s'occupe du message indiquant le nombre de résultats */
							if(nb==1){
								message.innerHTML = "Une population correspond à votre recherche."
							} else {
								message.innerHTML = "Il y a "+ nb + " populations qui correspondent à votre recherche."
							}
						}
					}
				};
				/* Envoi des paramètres */
			xhttp.send(params);
			}, false);

/*======================================= Récupération du shapefile =========================================================*/		
			
			/* On récupère le bouton de dl et on écoute le clic */
			var zip = document.getElementById('getShp');
			zip.addEventListener('click', function() {
				/* On envoie à l'appli en ligne OGRE le geojson pour qu'elle nous renvoie le shapefile correspondant */
				var jsont = document.getElementById('generated_geojson').innerHTML;
				var params_shp = "json="+jsont;			
				var url = 'http://ogre.adc4gis.com/convertJson';
				var filename = 'pop_shp.zip';
				var request = new XMLHttpRequest();
				request.open('POST', url, true);
				/* Comme on utilise une requête POST on doit redéfinir le header */
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				request.responseType = 'blob';
				/* on génère le fichier ZIP à partir de la réponse ajax */
				request.onload = function() {
				   var link = document.createElement('a');
				   document.body.appendChild(link);
				   link.href = window.URL.createObjectURL(request.response);
				   link.download = filename;
				   link.click();
				};
				request.send(params_shp);
			}, false);	
		
/*================= Attributions =========================================================*/					 
			 
			var attribution = document.getElementsByClassName('ol-attribution')[0];
			var attributionList = attribution.getElementsByTagName('ul')[0];
			var firstLayerAttribution = attributionList.getElementsByTagName('li')[0];
		
		} else {
			console.log("rien");
		}
/*=============================================================================================================*/			
	 
	
	}); 

		 