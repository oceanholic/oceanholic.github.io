<!-- Basemaps --!>
var world = L.tileLayer.provider('Esri.WorldImagery',{opacity:1}),
	darkmap = L.tileLayer.provider('CartoDB.DarkMatter',{opacity:1}),
	places  = L.tileLayer.provider('CartoDB.DarkMatterOnlyLabels',{opacity:1}),
	ocean = L.esri.basemapLayer("Oceans"),
	oceanLab = L.esri.basemapLayer("OceansLabels"),
	greymap = L.esri.basemapLayer("Gray");

var coastline = L.tileLayer.wms("http://ows.emodnet-bathymetry.eu/wms", {
        layers: 'coastlines',
        format: 'image/png',
        transparent: true,
        attribution: "EMODnet Bathymetry",
        opacity: 1
    });

var	eez = L.tileLayer.wms('http://geo.vliz.be/geoserver/MarineRegions/wms?', {
		layers: 'MarineRegions:eez_boundaries',
		opacity: 1,
		transparent: true, 
		format: 'image/png',
		attribution: "Marineregions.org"});

var	longhurst = L.tileLayer.wms('http://geo.vliz.be/geoserver/MarineRegions/wms?', {
		layers: 'MarineRegions:longhurst',
		opacity: 1,
		transparent: true, 
		format: 'image/png',
		attribution: "Marineregions.org"});	
		
var spc = L.tileLayer('http://www.spc.int/ofp/mbtiles/pacific/{z}/{x}/{y}.png', {
            minZoom: 3,
            maxZoom: 11,
			opacity: 0.35,		
          });
		  
var currents = L.esri.featureLayer({
    url: 'https://services1.arcgis.com/VAI453sU9tG9rSmh/ArcGIS/rest/services/Ocean_Currents_arrow_features/FeatureServer/3',
    opacity: 0.5,
  });

var grid = L.latlngGraticule({
    showLabel: false,
	opacity: 0.5,
    dashArray: [0, 0],
    zoomInterval: [
        {start: 1, end: 2, interval: 30},
        {start: 3, end: 7, interval: 10},
        {start: 8, end: 10, interval: 5}
    ]
});  

var afad = L.esri.featureLayer({
        url: "https://geodata.hawaii.gov/arcgis/rest/services/CoastalMarine/MapServer/3",
		pointToLayer: function (geojson, latlng) {
			return L.marker(latlng, {
			  icon: L.icon({
				iconUrl: 'css/images/fad-icon.png'
			  })
			});
		  },
      });
var popupTemplate = "<h3>FAD {name}</h3>{island}<br>";
afad.bindPopup(function(e){
        return L.Util.template(popupTemplate, e.feature.properties)
      });
  
<!-- NASA GIBS ---!>
// https://map1.vis.earthdata.nasa.gov/colormaps/output/
var template =
        "http://map1.vis.earthdata.nasa.gov/wmts-webmerc/" +
        "{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.{format}";

var credits1 = 'Imagery provided by services from the Global Imagery Browse Services (GIBS), NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) '
		
var sst = L.tileLayer(template, {
			attribution: credits1,
			layer: 'GHRSST_L4_MUR_Sea_Surface_Temperature',
			format: 'png',
			time: '2016-07-04',
			tileMatrixSet: 'GoogleMapsCompatible_Level7',
			opacity: 0.75
			});

<!-- NASA PODAAC ---!>
// https://podaac.jpl.nasa.gov/dataset/JPL_OUROCEAN-L4UHfnd-GLOB-G1SST from 2010 onwards
// https://podaac.jpl.nasa.gov/dataset/MUR-JPL-L4-GLOB-v4.1 from 2002 onwards
// https://thredds.jpl.nasa.gov/thredds/wms/OceanTemperature/MUR-JPL-L4-GLOB-v4.1.nc?service=WMS&request=GetCapabilities
// https://thredds.jpl.nasa.gov/thredds/wms/OceanTemperature/MUR-JPL-L4-GLOB-v4.1.nc?REQUEST=GetLegendGraphic&LAYER=analysed_sst&PALETTE=sst_32&COLORSCALERANGE=4%2C32

// http://oceanwatch.pfeg.noaa.gov/thredds/wms/satellite/MUR/ssta/1day?service=WMS&version=1.3.0&request=GetCapabilities

var alink = 'http://oceanwatch.pfeg.noaa.gov/thredds/wms/satellite/MUR41/ssta/1day',
	app = 'sst32',
		alayer = 'analysed_sst',
		acc = '289.15%2C305.15', 
		att = '2016-08-01T09:00:00.000Z';

	alink = 'http://nrt.cmems-du.eu/thredds/wms/METOFFICE-GLO-SST-L4-NRT-OBS-SST-V2';
	att = '2016-08-01T12:00:00.000Z';
	app = 'occam';

var sst2 = L.tileLayer.wms(alink, 
		{
			layers: alayer,
			format: 'image/png', styles: 'boxfill/' + app, opacity: 1, 
			transparent: 'TRUE', NUMCOLORBANDS:'250', COLORSCALERANGE: acc, time: att,
			abovemaxcolor:'extend', belowmincolor:'extend',
		});	

		
<!-- EU Copernicus ---!>
// http://marine.copernicus.eu/services-portfolio/access-to-products/
// ------------------------------		
// Velocity
// ------------------------------
		
//GLOBAL_REP_PHY_001_021 - S T UVG SSH SSD 0.25 degree x 0.25 degree (33 depth levels) From 1993-01-01 to 2016-12-21 weekly-mean, monthly-mean
//GLOBAL OBSERVED OCEAN PHYSICS TEMPERATURE SALINITY HEIGHTS GEOSTROPHIC CURRENTS SEA SURFACE SALINITY AND SEA SURFACE DENSITY REPROCESSING (1993-2016)

var dlink = 'http://tds.mfcglo-obs.cls.fr/thredds/wms/dataset-armor-3d-rep-weekly',
		dlayer = 'geostrophic_sea_water_velocity',
		cc = '0%2C1.0',
		ee = '0',
		tt = '2016-07-06T00:00:00.000Z',
		ss = 'stumpvec'
		pp = 'greyscale';
		
// GLOBAL_ANALYSIS_PHYS_001_020 - T S SSH 3DUV 0.25 degree x 0.25 degree (33 depth levels) From 2014-01-01 to Present weekly-mean
// GLOBAL OBSERVED OCEAN PHYSICS TEMPERATURE SALINITY HEIGHTS AND GEOSTROPHIC CURRENTS PROCESSING
// http://marine.copernicus.eu/services-portfolio/access-to-products/?option=com_csw&view=details&product_id=GLOBAL_ANALYSIS_PHYS_001_020

	//dlink = 'http://tds.mfcglo-obs.cls.fr/thredds/wms/dataset-armor-3d-v4-cmems-v2',
		//dlayer = 'sea_water_velocity',

//  GLOBAL_ANALYSIS_FORECAST_PHY_001_024 - MLD SSH 3DUV SIT S SIUV SIC T bottomT 0.083 degree x 0.083 degree (50 depth levels) From 2006-12-27 to Present daily-mean, hourly-mean
// http://nrt.cmems-du.eu/thredds/wms/global-analysis-forecast-phy-001-024?service=WMS&request=GetCapabilities
// GLOBAL OCEAN 1/12° PHYSICS ANALYSIS AND FORECAST UPDATED DAILY

	dlink = 'http://nrt.cmems-du.eu/thredds/wms/global-analysis-forecast-phy-001-024',
		dlayer = 'sea_water_velocity',
		ee = '-0.49402499198913574',
		tt = '2016-07-04T12:00:00.000Z',
		pp = 'greyscale';

		
// Sea water velocity
// ------------------------------
var ovel = L.tileLayer.wms(dlink, 
		{
			layers: dlayer,
			format: 'image/png', styles: ss + '/' + pp, opacity: 0.9, 
			transparent: 'TRUE', NUMCOLORBANDS:'250', COLORSCALERANGE: cc, ELEVATION: ee, time: tt,
			abovemaxcolor:'extend', belowmincolor:'extend',
		});		


// ------------------------------		
// Mixed layer depth
// ------------------------------		
// http://my.cmems-du.eu/thredds/wms/global-reanalysis-phy-001-030-daily?service=WMS&request=GetCapabilities

var blink = 'http://my.cmems-du.eu/thredds/wms/global-reanalysis-phy-001-030-daily',
		blayer = 'mlotst', // ocean_mixed_layer_thickness_defined_by_sigma_theta
		bcc = '10%2C160', 
		btt = '2016-07-16T12:00:00.000Z',
		bpp = 'alg2';

var mlt = L.tileLayer.wms(blink, 
		{
			layers: blayer,
			format: 'image/png', styles: 'boxfill/' + bpp, opacity: 0.6, 
			transparent: 'TRUE', NUMCOLORBANDS:'250', COLORSCALERANGE: bcc, time: btt,
			abovemaxcolor:'extend', belowmincolor:'extend',
		});	

		
// ------------------------------		
// Ocean biochem
// ------------------------------

// GLOBAL_REANALYSIS_BIO_001_029 GLOBAL OCEAN BIOGEOCHEMISTRY HINDCAST MODEL
// CHL PHYC O2 NO3 PO4 SI FE PP
// 0.25 degree x 0.25 degree (75 depth levels)
// From 1993-01-01 to 2018-12-25 daily-mean,monthly-mean
//http://my.cmems-du.eu/thredds/wms/global-reanalysis-bio-001-029-daily?service=WMS&request=GetCapabilities

// Oxygen
// ------------------------------	
var blink = 'http://my.cmems-du.eu/thredds/wms/global-reanalysis-bio-001-029-daily',
		blayer = 'o2',
		bcc = '44.661%2C491.271', // 1 to 6 ml/L
		bee = '-120.0', 
		btt = '2016-07-16T12:00:00.000Z',
		bpp = 'occam';

var dO2 = L.tileLayer.wms(blink, 
		{
			layers: blayer,
			format: 'image/png', styles: 'boxfill/' + bpp, opacity: 0.6, 
			transparent: 'TRUE', NUMCOLORBANDS:'250', COLORSCALERANGE: bcc, ELEVATION: bee, time: btt,
			abovemaxcolor:'extend', belowmincolor:'extend',
		});	

		
// Chlorophyll
// ------------------------------
//http://my.cmems-du.eu/thredds/wms/global-reanalysis-bio-001-029-daily?&service=WMS&request=GetMap&layers=chl&styles=boxfill%2Frainbow&format=image%2Fpng%20&transparent=true&version=1.3.0&height=1024&width=2048&NUMCOLORBANDS=250&logScale=true&bbox=-180%2C-90%2C180%2C90&crs=CRS%3A84&abovemaxcolor=extend&belowmincolor=0x000000&COLORSCALERANGE=0.02%2C3.0&elevation=-0.5057600140571594

var blayer = 'chl',
	bcc = '0.01%2C4.6416',
	bpp = 'ferret';	
	// Updated Oct 19, 2019
	var blink = 'http://my.cmems-du.eu/thredds/wms/global-reanalysis-bio-001-029-daily',
		bee = '-0.5057600140571594', 
		btt = '2016-07-16T12:00:00.000Z';
	// Temporal range from 1993-01-01 to 2018-12-25
	
var chla0 = L.tileLayer.wms(blink, 
		{
			layers: blayer,
			format: 'image/png', styles: 'boxfill/' + bpp, opacity: 1, 
			transparent: 'TRUE', NUMCOLORBANDS:'250', COLORSCALERANGE: bcc, ELEVATION: bee, time: btt,
			abovemaxcolor:'extend', belowmincolor:'extend',
		});		


// Chlorophyll
// ------------------------------
	var blink = 'http://cmems-oc.isac.cnr.it/thredds/wms/dataset-oc-glo-chl-multi-l4-gsm_4km_monthly-rep-v02',
		btt = '2016-06-01T00:00:00.000Z';
		
var chla = L.tileLayer.wms(blink, 
		{
			layers: blayer,
			format: 'image/png', styles: 'boxfill/' + bpp, opacity: 1, 
			transparent: 'TRUE', NUMCOLORBANDS:'250', COLORSCALERANGE: bcc, time: btt,
			abovemaxcolor:'extend', belowmincolor:'extend',
		});

	var blink = 'http://cmems-oc.isac.cnr.it/thredds/wms/dataset-oc-glo-chl-multi-l4-gsm_4km_monthly-rt-v02',
		btt = '2017-06-01T00:00:00.000Z';
		
var chla1 = L.tileLayer.wms(blink, 
		{
			layers: blayer,
			format: 'image/png', styles: 'boxfill/' + bpp, opacity: 1, 
			transparent: 'TRUE', NUMCOLORBANDS:'250', COLORSCALERANGE: bcc, time: btt,
			abovemaxcolor:'extend', belowmincolor:'extend',
		});

	var blink = 'http://cmems-oc.isac.cnr.it/thredds/wms/dataset-oc-glo-chl-multi-l4-gsm_4km_8days-rep-v02',
		btt = '2016-06-01T00:00:00.000Z';
		
var chla2 = L.tileLayer.wms(blink, 
		{
			layers: blayer,
			format: 'image/png', styles: 'boxfill/' + bpp, opacity: 1, 
			transparent: 'TRUE', NUMCOLORBANDS:'250', COLORSCALERANGE: bcc, time: btt,
			abovemaxcolor:'extend', belowmincolor:'extend',
		});

		