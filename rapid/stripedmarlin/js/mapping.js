<!-- Map -->							
	var map = L.map('map', {
			attributionControl: false,
			center: [10, -165],
			zoom: 3,
			layers: [darkmap, coastline],
			timeDimension: true,
			timeDimensionOptions:{
			timeInterval: "2016-01/2017-08",
			period: "P1D",
			},
	});	
		
<!-- Basemaps ---!>
	var baseMaps = {
			"Grayscale": greymap,
			"Bathymetry": world,
			"Ocean basemap": ocean,
			"Sea surface temperature": TimeLayer2,
			"Chlorophyll a": TimeLayer1,
			"Oxygen at 120 m": TimeLayer4,
			"Mixed layer thickness": TimeLayer5,
	};		
	baseMaps.Bathymetry.addTo(map);
	
<!-- Toolbar -->		
	var but1 = L.easyButton({
		states: [{
				stateName: 'zoom1',
				icon:      '<span class="mybutton">&larrfs;</span>',
				title:     'Zoom to Hawaii',
				onClick: function(btn, map) {       
					map.setView([24,-158],7);
					btn.state('zoom2');
				}
			}, {
				stateName: 'zoom2',
				icon:      '<span class="mybutton">&rarrfs;</span>',
				title:     'Zoom out to the Pacific Ocean',
				onClick: function(btn, map) {
					map.setView([26,-145],5);
					btn.state('zoom1');
				}
		}]
	});
	var but2 = L.easyButton({
							  states:[
								{
								  icon: '<span class="star">&hearts;</span>',
								  title:     'Like us on Facebook',
								  onClick: function(){window.open('http://facebook.com/LPRCtunalab', '_blank');}
								}
							  ]
							});
	var but3 = L.easyButton({
							  states:[
								{
								  icon: '<span class="star">&starf;</span>',
								  title:     'Get Involved!',
								  onClick: function(){window.open('http://www.fishtoday.org/tagit/get-involved', '_blank');}
								}
							  ]
							});									

	var butL1 = L.easyButton({
		states: [{
				stateName: 'zoom1',
				icon:      '<span class="mybutton">&rarrfs;</span>',
				title:     'Turn OFF Japanese tags',
				onClick: function(btn) {       
					migrationLayer1.hide();
					btn.state('zoom2');
				}
			}, {
				stateName: 'zoom2',
				icon:      '<span class="mybutton">&larrfs;</span>',
				title:     'Turn ON Japanese tags',
				onClick: function(btn) {
					migrationLayer1.show();
					btn.state('zoom1');
				}
		}]
	});
	var butL2 = L.easyButton({
		states: [{
				stateName: 'zoom1',
				icon:      '<span class="mybutton">&rarrfs;</span>',
				title:     'Turn OFF IATTC tags',
				onClick: function(btn) {       
					migrationLayer2.hide();
					btn.state('zoom2');
				}
			}, {
				stateName: 'zoom2',
				icon:      '<span class="mybutton">&larrfs;</span>',
				title:     'Turn ON IATTC tags',
				onClick: function(btn) {
					migrationLayer2.show();
					btn.state('zoom1');
				}
		}]
	});
	var butL3 = L.easyButton({
		states: [{
				stateName: 'zoom1',
				icon:      '<span class="mybutton">&rarrfs;</span>',
				title:     'Turn OFF Hawaii tags',
				onClick: function(btn) {       
					migrationLayer3.hide();
					btn.state('zoom2');
				}
			}, {
				stateName: 'zoom2',
				icon:      '<span class="mybutton">&larrfs;</span>',
				title:     'Turn ON Hawaii tags',
				onClick: function(btn) {
					migrationLayer3.show();
					btn.state('zoom1');
				}
		}]
	});
	var butL4 = L.easyButton({
		states: [{
				stateName: 'zoom1',
				icon:      '<span class="mybutton">&rarrfs;</span>',
				title:     'Turn OFF SPC tags',
				onClick: function(btn) {       
					migrationLayer4.hide();
					btn.state('zoom2');
				}
			}, {
				stateName: 'zoom2',
				icon:      '<span class="mybutton">&larrfs;</span>',
				title:     'Turn ON SPC tags',
				onClick: function(btn) {
					migrationLayer4.show();
					btn.state('zoom1');
				}
		}]
	});
	
	var bbar = L.easyBar([butL1,butL2,butL3,butL4]);
	//bbar.addTo(map);	      

<!-- Mouse position -->
  L.control.mousePosition({position: 'bottomleft'}).addTo(map);

<!-- Branding -->
	// L.control.banner().addTo(map); // Intro banner
	L.control.logo().addTo(map); // LPRC
	L.control.logo2().addTo(map); // PIFG
	L.control.logo3().addTo(map); // MCSI
	L.control.logo4().addTo(map); // Offield
	
<!-- Animation -->
    var prad = .01; //30
	var pbw = .01; // 3
	var migrationLayer1 = new L.migrationLayer({
		map: map,
		data: data1,
		pulseRadius: prad,
		pulseBorderWidth: pbw,
		arcWidth:2,
		arcLabel:true,
		arcLabelFont:'10px sans-serif',
		}
	);
	//migrationLayer1.addTo(map)
	var migrationLayer2 = new L.migrationLayer({
		map: map,
		data: data2,
		pulseRadius: prad,
		pulseBorderWidth: pbw,
		arcWidth:2,
		arcLabel:true,
		arcLabelFont:'10px sans-serif',
		}
	);
	//migrationLayer2.addTo(map)	
	var migrationLayer3 = new L.migrationLayer({
		map: map,
		data: data3,
		pulseRadius: prad,
		pulseBorderWidth: pbw,
		arcWidth:2,
		arcLabel:true,
		arcLabelFont:'10px sans-serif',
		}
	);
	//migrationLayer3.addTo(map)
	var migrationLayer4 = new L.migrationLayer({
		map: map,
		data: data4,
		pulseRadius: prad,
		pulseBorderWidth: pbw,
		arcWidth:2,
		arcLabel:true,
		arcLabelFont:'10px sans-serif',
		}
	);
	//migrationLayer4.addTo(map)	
			
<!-- Legend -->
	function getColor(d) {
		return d > 7 ? '#FF6EB4' :
			   d > 6  ? '#FF0000' :
			   d > 5  ? '#FFFF00' :
			   d > 4  ? '#FFD200' :
			   d > 3  ? '#00FF00' :
			   d > 2  ? '#008B00' :
			   d > 1  ? '#00FFFF' :
						'#9A32CD';
	}
	var legend = L.control({position: 'topright'});
	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 1, 2, 3, 4, 5, 6, 7],
			labels = [];

		// loop through our density intervals and generate a label with a colored square for each interval
		div.innerHTML = '<h4>Weeks at liberty</h4>' 
		for (var i = 0; i < grades.length; i++) {
			div.innerHTML +=
				'<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
				grades[i] + '<br>' ;
		}

		return div;
	};
//	legend.addTo(map);

<!-- Satellite layer legend -->
	// Base layer
	var legendA = L.control({
			position: 'bottomleft'
		});
		legendA.onAdd = function(map) {
			var src = alink + '?REQUEST=GetLegendGraphic&LAYER=' + alayer + '&PALETTE=' + app + '&COLORSCALERANGE=' + '17%2C32';
			var div = L.DomUtil.create('div', 'info legend');
			div.innerHTML +=
				'<img src="' + src + '" alt="legend">';
			return div;
	};	
	
	var legendB = L.control({
			position: 'bottomleft'
		});
		legendB.onAdd = function(map) {
			var src = "http://my.cmems-du.eu/thredds/wms/global-reanalysis-bio-001-029-daily?REQUEST=GetLegendGraphic&LAYER=chl&PALETTE=ferret&COLORSCALERANGE=0.01%2C4.6416"
			var div = L.DomUtil.create('div', 'info legend');
			div.innerHTML +=
				'<img src="' + src + '" alt="legend">';
			return div;
	};
	
	var legendC = L.control({
			position: 'bottomleft'
		});
		legendC.onAdd = function(map) {
			var src = "http://my.cmems-du.eu/thredds/wms/global-reanalysis-bio-001-029-daily?REQUEST=GetLegendGraphic&LAYER=o2&PALETTE=occam&COLORSCALERANGE=44.661%2C491.271"
			var div = L.DomUtil.create('div', 'info legend');
			div.innerHTML +=
				'<img src="' + src + '" alt="legend">';
			return div;
	};
	
	var legendD = L.control({
			position: 'bottomleft'
		});
		legendD.onAdd = function(map) {
			var src = "http://my.cmems-du.eu/thredds/wms/global-reanalysis-phy-001-030-daily?REQUEST=GetLegendGraphic&LAYER=mlotst&PALETTE=alg2&COLORSCALERANGE=10%2C160"
			var div = L.DomUtil.create('div', 'info legend');
			div.innerHTML +=
				'<img src="' + src + '" alt="legend">';
			return div;
	};
	
	// Overlay layer
	var olink = dlink + '?REQUEST=GetLegendGraphic&LAYER=' + dlayer + '&PALETTE=' + pp + '&COLORSCALERANGE=' + cc;
	var legendO = L.control({
			position: 'bottomleft'
		});
		legendO.onAdd = function(map) {
			var src = olink
			var div = L.DomUtil.create('div', 'info legend');
			div.innerHTML +=
				'<img src="' + src + '" alt="legend">';
			return div;
	};
		
<!-- Layer control -->		
	var overlayMaps = {
			"Coastline": coastline,		
			"Ocean places": oceanLab,
			"Exclusive Economic Zones": eez,
			"MCSI-Offield 890271": kmlTimeLayer1,
			"MCSI-Offield 890272": kmlTimeLayer2,
			"MCSI-Offield 890289": kmlTimeLayer3,
			"MCSI-Offield 890381": kmlTimeLayer4,
			"MCSI-Offield 990317": kmlTimeLayer5,
			"MCSI-Offield 990333": kmlTimeLayer6,
			"MCSI-Offield 990339": kmlTimeLayer7,
			"MCSI-Offield 990357": kmlTimeLayer8,
			"MCSI-Offield 990363": kmlTimeLayer9,
		};
	L.control.layers(baseMaps,overlayMaps,{collapsed:true}).addTo(map);
	
<!-- Time control -->
	var timeDimensionControl = new L.Control.TimeDimension({
				position: 'bottomleft',
				autoPlay: true,
				playerOptions: {
				buffer: 5,
				minBufferReady: -2,
				loop: true,
				}
	});
	
<!-- Display/ hide items -->
var tCtrlOn = 0,
	tBlay = 0, 
	tOverlay = 0;
	
	// Base change		
	map.on('baselayerchange', function(eventLayer) {
		if (eventLayer.name == 'Chlorophyll a') {
			map.removeControl(legendA);
			map.removeControl(legendC);
			map.removeControl(legendD);
			if (tOverlay == 0) map.timeDimension.setAvailableTimes(Time0, 'replace');
			timeDimensionControl.addTo(this);
			tCtrlOn = 1;
			tBay = 1;
			legendB.addTo(this);
		} else if (eventLayer.name == 'Sea surface temperature'){
			map.removeControl(legendB);
			map.removeControl(legendC);
			map.removeControl(legendD);			
			if (tOverlay == 0) map.timeDimension.setAvailableTimes(Time0, 'replace');
			timeDimensionControl.addTo(this);
			tCtrlOn = 1;
			tBlay = 1;
			legendA.addTo(this);			
		} else if (eventLayer.name == 'Oxygen at 120 m'){
			map.removeControl(legendA);
			map.removeControl(legendB);
			map.removeControl(legendD);			
			if (tOverlay == 0) map.timeDimension.setAvailableTimes(Time0, 'replace');
			timeDimensionControl.addTo(this);
			tCtrlOn = 1;
			tBlay = 1;
			legendC.addTo(this);
		} else if (eventLayer.name == 'Mixed layer thickness'){
			map.removeControl(legendA);
			map.removeControl(legendB);
			map.removeControl(legendC);			
			if (tOverlay == 0) map.timeDimension.setAvailableTimes(Time0, 'replace');
			timeDimensionControl.addTo(this);
			tCtrlOn = 1;
			tBlay = 1;
			legendD.addTo(this);				
		} else {
			map.removeControl(legendA);
			map.removeControl(legendB);
			map.removeControl(legendC);
			map.removeControl(legendD);
			if (tOverlay == 0) {map.removeControl(timeDimensionControl);}
			tCtrlOn = 0;
			tBlay = 0;
		} 
	});	
	// Overlay ON
	map.on('overlayadd', function(eventLayer) {
		if (eventLayer.name == 'Sea water velocity') {
			tOverlay = tOverlay + 1;
			if (tCtrlOn == 0){
				map.timeDimension.setAvailableTimes(Time0, 'replace');
				timeDimensionControl.addTo(this);
			} else if (tBlay ==1 & tCtrlOn ==1) {
				map.timeDimension.setAvailableTimes(Time0, 'union');
			} else {
				map.timeDimension.setAvailableTimes(Time0, 'replace');
			}
			legendO.addTo(this);
		} else if (eventLayer.name == 'MCSI-Offield 890271') {
			tOverlay = tOverlay + 1;
			if (tCtrlOn == 0){
				timeDimensionControl.addTo(this);
			} else if (tBlay ==1 & tCtrlOn ==1) {
				map.timeDimension.setAvailableTimes(Time1, 'union');
			} else {
				map.timeDimension.setAvailableTimes(Time1, 'replace');
			}		
		} else if (eventLayer.name == 'MCSI-Offield 890272') {
			tOverlay = tOverlay + 1;
			if (tCtrlOn == 0){
				timeDimensionControl.addTo(this);
			} else if (tBlay ==1 & tCtrlOn ==1) {
				map.timeDimension.setAvailableTimes(Time2, 'union');
			} else {
				map.timeDimension.setAvailableTimes(Time2, 'replace');
			} 			
		} else if (eventLayer.name == 'MCSI-Offield 890289') {
			tOverlay = tOverlay + 1;
			if (tCtrlOn == 0){
				timeDimensionControl.addTo(this);
			} else if (tBlay ==1 & tCtrlOn ==1) {
				map.timeDimension.setAvailableTimes(Time3, 'union');
			} else {
				map.timeDimension.setAvailableTimes(Time3, 'replace');
			}		
		} else if (eventLayer.name == 'MCSI-Offield 890381') {
			tOverlay = tOverlay + 1;
			if (tCtrlOn == 0){
				timeDimensionControl.addTo(this);
			} else if (tBlay ==1 & tCtrlOn ==1) {
				map.timeDimension.setAvailableTimes(Time4, 'union');
			} else {
				map.timeDimension.setAvailableTimes(Time4, 'replace');
			} 			
		} else if (eventLayer.name == 'MCSI-Offield 990317') {
			tOverlay = tOverlay + 1;
			if (tCtrlOn == 0){
				timeDimensionControl.addTo(this);
			} else if (tBlay ==1 & tCtrlOn ==1) {
				map.timeDimension.setAvailableTimes(Time5, 'union');
			} else {
				map.timeDimension.setAvailableTimes(Time5, 'replace');
			}		
		} else if (eventLayer.name == 'MCSI-Offield 990333') {
			tOverlay = tOverlay + 1;
			if (tCtrlOn == 0){
				timeDimensionControl.addTo(this);
			} else if (tBlay ==1 & tCtrlOn ==1) {
				map.timeDimension.setAvailableTimes(Time6, 'union');
			} else {
				map.timeDimension.setAvailableTimes(Time6, 'replace');
			} 			
		} else if (eventLayer.name == 'MCSI-Offield 990339') {
			tOverlay = tOverlay + 1;
			if (tCtrlOn == 0){
				timeDimensionControl.addTo(this);
			} else if (tBlay ==1 & tCtrlOn ==1) {
				map.timeDimension.setAvailableTimes(Time7, 'union');
			} else {
				map.timeDimension.setAvailableTimes(Time7, 'replace');
			}		
		} else if (eventLayer.name == 'MCSI-Offield 990357') {
			tOverlay = tOverlay + 1;
			if (tCtrlOn == 0){
				timeDimensionControl.addTo(this);
			} else if (tBlay ==1 & tCtrlOn ==1) {
				map.timeDimension.setAvailableTimes(Time8, 'union');
			} else {
				map.timeDimension.setAvailableTimes(Time8, 'replace');
			} 			
		} else if (eventLayer.name == 'MCSI-Offield 990363') {
			tOverlay = tOverlay + 1;
			if (tCtrlOn == 0){
				timeDimensionControl.addTo(this);
			} else if (tBlay ==1 & tCtrlOn ==1) {
				map.timeDimension.setAvailableTimes(Time9, 'union');
			} else {
				map.timeDimension.setAvailableTimes(Time9, 'replace');
			} 			
		}	
	});	
	// Overlay OFF
	map.on('overlayremove', function(eventLayer) {
		if (eventLayer.name == 'Sea water velocity') {
			map.removeControl(legendO);
			if (tBlay == 0 && tOverlay < 1) {map.removeControl(timeDimensionControl);}
		} else if (eventLayer.name == 'MCSI-Offield 890271' || eventLayer.name == 'MCSI-Offield 890272' || eventLayer.name == 'MCSI-Offield 890289' || eventLayer.name == 'MCSI-Offield 890381' || eventLayer.name == 'MCSI-Offield 990317' || eventLayer.name == 'MCSI-Offield 990333' || eventLayer.name == 'MCSI-Offield 990339' || eventLayer.name == 'MCSI-Offield 990357' || eventLayer.name == 'MCSI-Offield 990363') {
			tOverlay = tOverlay - 1
			if (tBlay == 0 && tOverlay < 1) {map.removeControl(timeDimensionControl);}			
		}	
	});	
