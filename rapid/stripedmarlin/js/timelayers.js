<!-- GIS ---!>
	// Date time
	var startTime = new Date('2015-01-01T12:00:00.000Z'),
		endTime = new Date('2015-12-31T12:00:00.000Z'),
		interval = "P3D";
    var Time0 = L.TimeDimension.Util.explodeTimeRange(startTime, endTime, interval);
	
	// Chlorophyll		
	var TimeLayer1 = L.timeDimension.layer.wms(chla0, {
		updateTimeDimension: false,
	});
	// SST
	var TimeLayer2 = L.timeDimension.layer.wms(sst2, {
		updateTimeDimension: false,
	});
	// Velocity	
	var TimeLayer3 = L.timeDimension.layer.wms(ovel, {
		updateTimeDimension: false,
	});	
	// Oxygen
	var TimeLayer4 = L.timeDimension.layer.wms(dO2, {
		updateTimeDimension: false,
	});
	// Mixed layer thickness
	var TimeLayer5 = L.timeDimension.layer.wms(mlt, {
		updateTimeDimension: false,
	});

<!-- Archival Tracks ---!>
    //Start and end dates
	var startTime = new Date('2008-11-01T12:00:00.000Z'),
		endTime = new Date('2016-07-03T12:00:00.000Z'),
		interval = "P1D";		
	var TimeA = L.TimeDimension.Util.explodeTimeRange(startTime, endTime, interval);
	
	var startTime = new Date('2008-11-01T12:00:00.000Z'),
		endTime = new Date('2010-03-30T12:00:00.000Z'),
		interval = "P1D";		
	var Time1 = L.TimeDimension.Util.explodeTimeRange(startTime, endTime, interval);
	
	var startTime = new Date('2008-11-01T12:00:00.000Z'),
		endTime = new Date('2010-04-03T12:00:00.000Z'),
		interval = "P1D";		
	var Time2 = L.TimeDimension.Util.explodeTimeRange(startTime, endTime, interval);

	var startTime = new Date('2008-11-08T12:00:00.000Z'),
		endTime = new Date('2016-07-02T12:00:00.000Z'),
		interval = "P1D";		
	var Time3 = L.TimeDimension.Util.explodeTimeRange(startTime, endTime, interval);
	
	var startTime = new Date('2008-11-05T12:00:00.000Z'),
		endTime = new Date('2009-07-28T12:00:00.000Z'),
		interval = "P1D";		
	var Time4 = L.TimeDimension.Util.explodeTimeRange(startTime, endTime, interval);
	
	var startTime = new Date('2010-11-11T12:00:00.000Z'),
		endTime = new Date('2011-09-05T12:00:00.000Z'),
		interval = "P1D";		
	var Time5 = L.TimeDimension.Util.explodeTimeRange(startTime, endTime, interval);

	var startTime = new Date('2010-11-07T12:00:00.000Z'),
		endTime = new Date('2011-02-19T12:00:00.000Z'),
		interval = "P1D";		
	var Time6 = L.TimeDimension.Util.explodeTimeRange(startTime, endTime, interval);

	var startTime = new Date('2010-11-21T12:00:00.000Z'),
		endTime = new Date('2016-03-15T12:00:00.000Z'),
		interval = "P1D";		
	var Time7 = L.TimeDimension.Util.explodeTimeRange(startTime, endTime, interval);
	
	var startTime = new Date('2010-11-13T12:00:00.000Z'),
		endTime = new Date('2012-02-15T12:00:00.000Z'),
		interval = "P1D";		
	var Time8 = L.TimeDimension.Util.explodeTimeRange(startTime, endTime, interval);

	var startTime = new Date('2010-11-11T12:00:00.000Z'),
		endTime = new Date('2011-02-17T12:00:00.000Z'),
		interval = "P1D";		
	var Time9 = L.TimeDimension.Util.explodeTimeRange(startTime, endTime, interval);	
	
   //Tracks
    var icon1 = L.icon({
		iconUrl: 'css/images/icon1.png',
		iconSize: [80, 40],
		iconAnchor: [5, 25]
	});
	var customLayer1 = L.geoJson(null, {
		pointToLayer: function (feature, latLng) {
			if (feature.properties.hasOwnProperty('last')) {
				return new L.Marker(latLng, {
					icon: icon1
				});
			}
			return L.circleMarker(latLng);
		}
	});	
	var kmlLayer = omnivore.kml('data/890271.kml', null, customLayer1);
	var kmlTimeLayer1 = L.timeDimension.layer.geoJson(kmlLayer, {
		updateTimeDimension: true,
		addlastPoint: true,
		waitForReady: true
	});

    var icon2 = L.icon({
		iconUrl: 'css/images/icon2.png',
		iconSize: [80, 40],
		iconAnchor: [5, 25]
	});
	var customLayer2 = L.geoJson(null, {
		pointToLayer: function (feature, latLng) {
			if (feature.properties.hasOwnProperty('last')) {
				return new L.Marker(latLng, {
					icon: icon2
				});
			}
			return L.circleMarker(latLng);
		}
	});	
	var kmlLayer = omnivore.kml('data/890272.kml', null, customLayer2);
	var kmlTimeLayer2 = L.timeDimension.layer.geoJson(kmlLayer, {
		updateTimeDimension: true,
		addlastPoint: true,
		waitForReady: true
	});

    var icon3 = L.icon({
		iconUrl: 'css/images/icon3.png',
		iconSize: [80, 40],
		iconAnchor: [5, 25]
	});
	var customLayer3 = L.geoJson(null, {
		pointToLayer: function (feature, latLng) {
			if (feature.properties.hasOwnProperty('last')) {
				return new L.Marker(latLng, {
					icon: icon3
				});
			}
			return L.circleMarker(latLng);
		}
	});	
	var kmlLayer = omnivore.kml('data/890289.kml', null, customLayer3);
	var kmlTimeLayer3 = L.timeDimension.layer.geoJson(kmlLayer, {
		updateTimeDimension: true,
		addlastPoint: true,
		waitForReady: true
	});

    var icon4 = L.icon({
		iconUrl: 'css/images/icon4.png',
		iconSize: [80, 40],
		iconAnchor: [5, 25]
	});
	var customLayer4 = L.geoJson(null, {
		pointToLayer: function (feature, latLng) {
			if (feature.properties.hasOwnProperty('last')) {
				return new L.Marker(latLng, {
					icon: icon4
				});
			}
			return L.circleMarker(latLng);
		}
	});	
	var kmlLayer = omnivore.kml('data/890381.kml', null, customLayer4);
	var kmlTimeLayer4 = L.timeDimension.layer.geoJson(kmlLayer, {
		updateTimeDimension: true,
		addlastPoint: true,
		waitForReady: true
	});
	
    var icon5 = L.icon({
		iconUrl: 'css/images/icon5.png',
		iconSize: [80, 40],
		iconAnchor: [5, 25]
	});
	var customLayer5 = L.geoJson(null, {
		pointToLayer: function (feature, latLng) {
			if (feature.properties.hasOwnProperty('last')) {
				return new L.Marker(latLng, {
					icon: icon5
				});
			}
			return L.circleMarker(latLng);
		}
	});	
	var kmlLayer = omnivore.kml('data/990317.kml', null, customLayer5);
	var kmlTimeLayer5 = L.timeDimension.layer.geoJson(kmlLayer, {
		updateTimeDimension: true,
		addlastPoint: true,
		waitForReady: true
	});

    var icon6 = L.icon({
		iconUrl: 'css/images/icon6.png',
		iconSize: [80, 40],
		iconAnchor: [5, 25]
	});
	var customLayer6 = L.geoJson(null, {
		pointToLayer: function (feature, latLng) {
			if (feature.properties.hasOwnProperty('last')) {
				return new L.Marker(latLng, {
					icon: icon6
				});
			}
			return L.circleMarker(latLng);
		}
	});	
	var kmlLayer = omnivore.kml('data/990333.kml', null, customLayer6);
	var kmlTimeLayer6 = L.timeDimension.layer.geoJson(kmlLayer, {
		updateTimeDimension: true,
		addlastPoint: true,
		waitForReady: true
	});

    var icon7 = L.icon({
		iconUrl: 'css/images/icon7.png',
		iconSize: [80, 40],
		iconAnchor: [5, 25]
	});
	var customLayer7 = L.geoJson(null, {
		pointToLayer: function (feature, latLng) {
			if (feature.properties.hasOwnProperty('last')) {
				return new L.Marker(latLng, {
					icon: icon7
				});
			}
			return L.circleMarker(latLng);
		}
	});	
	var kmlLayer = omnivore.kml('data/990339.kml', null, customLayer7);
	var kmlTimeLayer7 = L.timeDimension.layer.geoJson(kmlLayer, {
		updateTimeDimension: true,
		addlastPoint: true,
		waitForReady: true
	});

    var icon8 = L.icon({
		iconUrl: 'css/images/icon8.png',
		iconSize: [80, 40],
		iconAnchor: [5, 25]
	});
	var customLayer8 = L.geoJson(null, {
		pointToLayer: function (feature, latLng) {
			if (feature.properties.hasOwnProperty('last')) {
				return new L.Marker(latLng, {
					icon: icon8
				});
			}
			return L.circleMarker(latLng);
		}
	});	
	var kmlLayer = omnivore.kml('data/990357.kml', null, customLayer8);
	var kmlTimeLayer8 = L.timeDimension.layer.geoJson(kmlLayer, {
		updateTimeDimension: true,
		addlastPoint: true,
		waitForReady: true
	});

    var icon9 = L.icon({
		iconUrl: 'css/images/icon9.png',
		iconSize: [80, 40],
		iconAnchor: [5, 25]
	});
	var customLayer9 = L.geoJson(null, {
		pointToLayer: function (feature, latLng) {
			if (feature.properties.hasOwnProperty('last')) {
				return new L.Marker(latLng, {
					icon: icon9
				});
			}
			return L.circleMarker(latLng);
		}
	});	
	var kmlLayer = omnivore.kml('data/990363.kml', null, customLayer9);
	var kmlTimeLayer9 = L.timeDimension.layer.geoJson(kmlLayer, {
		updateTimeDimension: true,
		addlastPoint: true,
		waitForReady: true
	});

	
<!-- PSAT Tracks ---!>

    //Start and end dates
	
	
	//Tracks