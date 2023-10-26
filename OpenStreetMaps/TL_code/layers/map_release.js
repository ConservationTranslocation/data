	$(document).ready(function(){
		
		/*Permet de déclarer la ligne de crédits et de la réduire */
		var expandedAttribution = new ol.control.Attribution({
			collapsible: true
		});

	 
/*=============================================================================================================*/	
		
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
				this_.getMap().getView().setCenter(ol.proj.transform([2.2192, 47.754097], 'EPSG:4326', 'EPSG:3857'));
				this_.getMap().getView().setZoom(5);
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
	

/*=============================================================================================================*/	

		/* On récupère le contenu du champs caché hébergeant le GeoJson */
		var geojson_pop=document.getElementById('generated_geojson').innerHTML;
		
		/* On récupère également la valeur de ce champs, utile lorsque le champs geom de la BDD est vide
		On va l'utiliser pour effectuer des tests et générer ou non la couche vecteur avec la pop */
		var val = document.getElementById('generated_geojson').value;
		
		/* Si ce champs caché n'est pas vide (donc qu'on a bien saisi des coordonnées et calculé un champ géométrique), on créé une couche pour héberger le point pop */
		if(val!="empty"){
			/* Gestion du style pour le geojson*/	
			var size = 0;

			var styleCache_pop={}
			var style_pop = function(feature, resolution){
				var value = ""
				var size = 0;
				var style = [ new ol.style.Style({
					image: new ol.style.Circle({radius: 4.0 + size,
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
			
			/* Définition de la couche vecteur  */
			var format = new ol.format.GeoJSON();
			var features = format.readFeatures(geojson_pop, 
			{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
			var jsonSource = new ol.source.Vector();
			jsonSource.addFeatures(features);
			var lyr_pop = new ol.layer.Vector({
				source:jsonSource, 
				style: style_pop,
				title: "Population"
			});

			lyr_pop.setVisible(true);
		}  
		
		
	
/*=============================================================================================================*/	
	
		/* Définition de la source du fond de carte */
		var wmsSource = new ol.source.XYZ({
			url: 'http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=72c10d6d09604887a954ad8b7e9a8162',
			  params: {'LAYERS': 'ne:ne', 'TILED': true},
			  attributions: [new ol.Attribution({html:'[Landscape © ' + '<a href="https://www.thunderforest.com/maps/landscape/">Thunderforest</a> an <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>]  '})], 
			crossOrigin: 'anonymous'
		});

		/* Fond de carte principal */
		var wmsLayer = new ol.layer.Tile({
			source: wmsSource
		});
		
		
		/* Définition de la couche vectorielle sur laquelle on va dessiner */ 
		var vectSource = new ol.source.Vector();
		
		/* Style des points */
		var iconStyle = new ol.style.Style({
			image: new ol.style.Circle({
				radius: 6,
				fill: new ol.style.Fill({
					color: '#ff0000'
				}),
				stroke: new ol.style.Stroke({
					color: '#000000',
					width: 1
				}),
			})
		});


		/* On ajoute le point dessiné à la vectorielle et on lui applique le style adéquat */
		var vectorLayer = new ol.layer.Vector({
			source: vectSource,
			style: iconStyle
		});
		
	
/*=============================================================================================================*/	
		/* On construit la liste des couches
		Elle dépend, là encore, de la présence ou non de données dans le champs géométrique */
		var layersList;
		
		if(val!="empty"){
			layersList = [wmsLayer, vectorLayer, lyr_pop];
		} else {
			layersList = [wmsLayer, vectorLayer];
		}

/*=============================================================================================================*/	
		/* On instancie la carte */
		var map = new ol.Map({
		  controls: ol.control.defaults({attribution:false}).extend([
				expandedAttribution,  // ligne de crédits
				new ol.control.ScaleLine({}), // échelle
				new app.CenterControl() // bouton pour centrer la carte
			]),
			layers: layersList, // Les couches qu'elle contient
			target: document.getElementById('map_release'),
			renderer: 'canvas',
			view: new ol.View({
				center: [0, 0],
				zoom: 5
			})
		  });

		
		/* On s'occupe ensuite du dessin */
		
		/* Déclaration des variables 
		Coord x et y comprennent la valeur en cours de longitude latitude. 
		On va les utiliser pour mettre à jour les champs (ou ne pas y toucher) en fonction de la saisie utilisateur qui peut intervenir de plusieurs façons 
		Dans un premier temps, coord_x et coord_y sont vides */
		var lastFeature, draw, featureType, coord_x, coord_y;
		
		/* Si on récupère une perte de focus sur les rubriques coordonnées, c'est qu'il y a eu une modification de la part de l'utilisateur
		On va donc conserver les valeurs saisies dans les variables coord_x et coord_y 
		pour que le clic dans la carte hors phase d'édition et que l'absence de validation ne provoquent pas leur remise à 0 */
		$("#release_long").on('focusout', function(evt) {
			coord_x = $("#release_long").val();
		});
		
		$("#release_lat").on('focusout', function(evt) {
			coord_y = $("#release_lat").val();
		});
		
		
		/* Fonction pour supprimer le dernier élément créé */
		var removeLastFeature = function() {
			if (lastFeature){
				vectSource.removeFeature(lastFeature);
				
			}
		};
		
		/* Pour dessiner un point en cliquant sur la carte */	
		var addInteraction = function (geomtype) {
			if (draw)
				map.removeInteraction(draw);
				draw = new ol.interaction.Draw({
				source: vectSource,
				type: geomtype
			});

			if (featureType === 'Point') {
				draw.on('drawend', function (e) {
					if(val!="empty"){
						lyr_pop.setVisible(false); // on s'assure de cacher le point qui viendrait de la BDD en faisant un test pour ne le faire que si besoin
					}
					removeLastFeature(); // on s'assure toujours de nettoyer la couche 
					lastFeature = e.feature; // et de mettre à jour la variable lastFeature
				});
				map.addInteraction(draw);
				/* On écoute le clic pour récupérer les coordonnées du point que l'on vient de dessiner */
				map.on('click', function(evt) {
					var coord = evt.coordinate;
					coord2 = ol.proj.transform([coord[0], coord[1]], 'EPSG:3857', 'EPSG:4326') 
					$("#release_long").val(coord2[0].toFixed(6)); // arrondi à la 6e décimale
					$("#release_lat").val(coord2[1].toFixed(6));
				});
			} 
			else {
				map.removeInteraction(draw);
				map.on('click', function(evt) {
					$("#release_long").val(coord_x);
					$("#release_lat").val(coord_y);
				});
			}
		};
			
		/* En cochant la checkbox, on va activer la sélection par la carte 
		On utilise pour cela une variable featureType dont on change la valeur, ce qui va permettre de savoir si on doit dessiner le point ou ne rien faire 
		On va aussi gérer le contenu des rubriques longitude et latitude pour éviter que l'event sur clic ne soit activé */
		$('#activ_draw_rel').change(function (e) {
			if($(this).is(':checked')){
				featureType = "Point";
				$('#img_release, #map_release, #valid_draw_rel, #delete_draw_rel').attr("hidden", false);
				$('#delete_draw_rel').attr("class", 'btn btn-primary btn btn-danger');
				$('#valid_draw_rel').attr("class", 'btn btn-primary btn btn-primary');
				$('#img_release, #map_release, #valid_draw_rel, #delete_draw_rel').attr("display", "inline-block");
			} else {
				$('#img_release, #map_release, #valid_draw_rel, #delete_draw_rel').attr("hidden", true);
				$('#delete_draw_rel').attr("class", '');
				$('#valid_draw_rel').attr("class", '');
				$('#img_release, #map_release, #valid_draw_rel, #delete_draw_rel').attr("display", "none");
				featureType = "Nothing";
				coord_x = $("#release_long").val();
				coord_y = $("#release_lat").val();
			}
			addInteraction(featureType);
		}).change();
 
		$('#delete_draw_rel').on("click", function (e) {
			if(val!="empty"){
				lyr_pop.setVisible(false); // on s'assure de cacher le point qui viendrait de la BDD en faisant un test pour ne le faire que si besoin
			}removeLastFeature();
			lastFeature = e.feature;
			$("#release_long").val('');
			$("#release_lat").val('');
			/* Pour éviter les erreurs, on prend soin de toujours mettre à jour la valeur de coord_x et coord_y*/
			coord_x = $("#release_long").val();
			coord_y = $("#release_lat").val();
			
		}) 
		
		/* Lorsqu'on envoie le lacher en BDD  */
		$('#send_release').on("click", function (e) {
			/* On déclique et désactive Utiliser la carte */
			$('#activ_draw_rel').prop("checked", false);
			$('#activ_draw_rel').trigger('change');
			/* On recentre */
			map.getView().setCenter(ol.proj.transform([2.2192, 47.754097], 'EPSG:4326', 'EPSG:3857'));
			map.getView().setZoom(5);
		}) 
		
		/* Cette section gère la création de point à partir des données saisies */
		$('#valid_draw_rel').on("click", function () {
			/* Si les champs ne sont pas vides */
			if($("#release_long").val()!="" && $("#release_lat").val()!=""){
				/* On récupère leur valeur que l'on parse en float*/
				var lon = parseFloat(document.getElementById('release_long').value);
				var lat= parseFloat(document.getElementById('release_lat').value);
	  
				/* On créé un nouvel élément en utilisant les coordonnées */
				var iconFeature = new ol.Feature({
					geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857')),
				});
				
				/* On regarde si la couche vectorielle issue de la BDD était vide, et si ce n'est pas le cas, on la nettoie*/
				if(val!="empty"){
					lyr_pop.setVisible(false);  
				}
				
				/* On regarde si la couche vectorielle de dessin était vide, et si ce n'est pas le cas, on la nettoie*/
				var features = vectSource.getFeatures();
				if(features != null && features.length > 0){
					removeLastFeature(); 
				}  
				
				/* On s'assure que les variables ont le bon contenu (lastFeature qui permettra le nettoyage, mais aussi coord_x et coord_y) */
				lastFeature = iconFeature; 
				coord_x = $("#release_long").val();
				coord_y = $("#release_lat").val();
				/* On ajoute le nouvel élément à la couche vectorielle */
				vectSource.addFeature(iconFeature);
				/* On change le centre de la carte */
				map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
				// On définit le zoom par défaut	
				map.getView().setZoom(13);
			} else {
				$('#delete_draw_rel').trigger("click");
				map.getView().setCenter(ol.proj.transform([2.2192, 47.754097], 'EPSG:4326', 'EPSG:3857'));
				map.getView().setZoom(5);
			}
		}) 
		
		  
		/* Pour transformer la souris en pointeur quand sur la carte */
		map.on('pointermove', function(evt) {
			if (evt.dragging) {
			  return;
			}
			var pixel = map.getEventPixel(evt.originalEvent);
			var hit = map.forEachLayerAtPixel(pixel, function() {
			  return true;
			});
			map.getTargetElement().style.cursor = hit ? 'pointer' : '';
		 });

/*=============================================================================================================*/		 
	  		
		if(val!="empty" && document.getElementById('release_long').length!=1 && document.getElementById('release_lat').length!=1){
			var lon = parseFloat(document.getElementById('release_long').value);
			var lat= parseFloat(document.getElementById('release_lat').value);
			map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
			map.getView().setZoom(13);
		} else {
			map.getView().setCenter(ol.proj.transform([2.2192, 47.754097], 'EPSG:4326', 'EPSG:3857'));
		}
		
		
			 
		 
		var attribution = document.getElementsByClassName('ol-attribution')[0];
		var attributionList = attribution.getElementsByTagName('ul')[0];
		var firstLayerAttribution = attributionList.getElementsByTagName('li')[0];
	
	
	}); 
/*=============================================================================================================*/			

		 