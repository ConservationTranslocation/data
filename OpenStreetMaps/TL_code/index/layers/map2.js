/*============================================== Déclaration des Crédits  et échelle ========================================================*/		
		 
			var expandedAttribution = new ol.control.Attribution({
				collapsible: true
			});
			
			 var scaleLineControl = new ol.control.ScaleLine();

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

			 
/*==============================================  Déclaration des Pop up ========================================================*/				
		 
			var container = document.getElementById('popup');
			var content = document.getElementById('popup-content');
								
			/* Create an overlay to anchor the popup to the map.*/
			var overlayPopup = new ol.Overlay({
				element: container
			});
/*============================================= Gestion des styles ============================================*/		
		
			/* Fonction permettant de déterminer la taille des points en fonction du nombre de pop superposées */				
			function getSize(count){
				if(count==1){
					return size = 1;
				} else if (count > 1 && count < 6){
					return size = 2;
				} else if (count >= 6 && count < 10){
					return size = 3;
				} else if (count >= 10){
					return size = 5;
				}
			}
			
			
			/* Gestion du style pour le geojson*/	 
			var styleCache_pop={}
			var style_pop = function(feature, resolution){
				var value = feature.get("count_loc"); // on indique la colonne qui va servir à définir la variable size = nombre de pop ayant les mêmes coordonnées
				var type = feature.get("kingdom"); 
				if(type=="Animalia"){
					var color_fond = "#d84537";
					var rota =  Math.PI / 0 ;
				} else if(type=="Plantae"){
					var color_fond = "#23a842";
					var rota =  Math.PI / 1 ;
				} else {
					var color_fond = "#56d8ef";
					var rota =  Math.PI / 1 ;
				}
				var size = getSize(value); // on appelle la fonction getSize() 
				
				var style = [new ol.style.Style({
					image: new ol.style.RegularShape({
						fill: new ol.style.Fill({color: color_fond}),
						stroke: new ol.style.Stroke({color: 'black', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}),
						points: 3,
						radius: 3.0 + size,
						rotation: rota, 
						angle: 0
					})
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
			
		
			var params = "map=index";
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
					var geojson_animalia = data[0].geojson_animalia;
					var geojson_plantae = data[0].geojson_plantae;
					var geojson_fungi = data[0].geojson_fungi;
					var lat_index = parseInt(data[0].lat);
					var long_index = parseInt(data[0].longitude);
					
/*============================================= Couches POP ========================================================*/	
			
					/* Définition des couches vecteur  */
					var format = new ol.format.GeoJSON();
					var features = format.readFeatures(geojson_animalia, 
					{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
					var jsonSource = new ol.source.Vector();
					jsonSource.addFeatures(features);
					lyr_animalia = new ol.layer.Vector({
						source:jsonSource, 
						style: style_pop,
						title: "Animalia",
					});
					
					var features = format.readFeatures(geojson_plantae, 
					{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
					var jsonSource = new ol.source.Vector();
					jsonSource.addFeatures(features);
					lyr_plantae = new ol.layer.Vector({
						source:jsonSource, 
						style: style_pop,
						title: "Plantae",
					});
					
					var features = format.readFeatures(geojson_fungi, 
					{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
					var jsonSource = new ol.source.Vector();
					jsonSource.addFeatures(features);
					lyr_fungi = new ol.layer.Vector({
						source:jsonSource, 
						style: style_pop,
						title: "Fungi",
					});

				lyr_animalia.setVisible(true);
				lyr_plantae.setVisible(true);
				lyr_fungi.setVisible(true);
			 
			
/*============================================= Fond de carte ==================================================*/	
		
				/* Création du fond de carte - Plus il y a de couches et plus les exports vont être longs 
				On créé les couches en commençant par celle qui sera la plus en dessous pour finir par la première à être affichée */	
				var baseLayer = new ol.layer.Group({'title': 'Base maps',
					layers: 
					[	/* Nécessite une clé pour être utilisé et donc la création d'un compte sur thunderforest.com */
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
				
				
		/*============================================ LISTE DES COUCHES ====================================================*/	
					/* Elle dépend, là encore, de la présence ou non de données dans le champs géométrique */
					var layersList = [baseLayer,lyr_plantae, lyr_fungi, lyr_animalia];
			
 	
		/*============================================ CREATION DE LA CARTE ================================================*/	
					 
					var map = new ol.Map({
					  controls: ol.control.defaults({attribution:false}).extend([
							expandedAttribution,  // ligne de crédits
							scaleLineControl,
							overviewMapControl, // carte de localisation
							new ol.control.LayerSwitcher({tipLabel: "Layers"}), // sélection des couches
							new ol.control.FullScreen(), 
        				]),
						layers: layersList, // Les couches qu'elle contient
						target: document.getElementById('map'),
						renderer: 'canvas',
						overlays: [overlayPopup],
						view: new ol.View({
							center: [0,0],
							zoom: 4.6
						})
					});

					 
					/* Autorisation des popups */
					var NO_POPUP = 0
					var ALL_FIELDS = 1
					popupLayers = [1];
		
/*=============================================== EVENT ON HOVER ==========================================*/	
			/* https://www.sharmaprakash.com.np/javascript/ie-alternative-to-inludes/ 
			fonction pour voir si une valeur existe dans un tableau
			On ne peut pas utiliser la fonction includes de JS car elle ne fonctionne pas sur tous les navigateurs - IE et Opéra en fait */
			function includes(container, value) {
				var returnValue = false;
				var pos = container.indexOf(value);
				if (pos >= 0) {
					returnValue = true;
				}
				return returnValue;
			}

			var doHover = true;
			var info = document.getElementById('info');
			
			var onPointerMove = function(evt) {
				var pixel = map.getEventPixel(evt.originalEvent);
				var coord = evt.coordinate;
				var popupField = [];
				 
				var inc;
				 
				var counttab = [];
				var popupText = '';
				var title;
				var currentFeature;
				var currentFeatureKeys;
					map.forEachFeatureAtPixel(pixel, function(feature, layer) {
						currentFeature = feature;
						currentFeatureKeys = currentFeature.getKeys();
						for (var i=0; i<currentFeatureKeys.length; i++) {
							if(currentFeatureKeys[i] == 'species'){
								data = currentFeature.get(currentFeatureKeys[i]);
								nbre = currentFeature.get("nbre")
								var plus = " (" + nbre + ")";
								inc = includes(popupField, data);
								if(inc !== true  ){
									popupField.push(data+plus);
								}
							} 
						}
						
						
						popupText = popupField.join(', ');
											
					}); 
				
							
				if (doHover) {
					if (popupText) {
						overlayPopup.setPosition(coord);
						content.innerHTML = popupText ;
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
			
		

		/*======================================= Barycentre =========================================================*/		 
						
						map.getView().setCenter(ol.proj.transform([long_index, lat_index], 'EPSG:4326', 'EPSG:3857'));
						map.getView().setZoom(4.6);
						map.updateSize();
					
		 
		/*================= Attributions =========================================================*/					 
					 
					var attribution = document.getElementsByClassName('ol-attribution')[0];
					var attributionList = attribution.getElementsByTagName('ul')[0];
					var firstLayerAttribution = attributionList.getElementsByTagName('li')[0];
					
				}
			};
			/* Envoi des paramètres */
		xhttp.send(params);
		
		
		
	 
	 
	
	

		 