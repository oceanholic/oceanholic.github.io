L.Control.BetterScale = L.Control.extend({
    options: {
        position: "bottomright",
        maxWidth: 200,
        metric: !1,
        imperial: !0,
        updateWhenIdle: !1
    },
    onAdd: function (t) {
        this._map = t;
        var e = "leaflet-control-better-scale",
            i = L.DomUtil.create("div", e),
            n = this.options,
            s = L.DomUtil.create("div", e + "-ruler", i);
        L.DomUtil.create("div", e + "-ruler-block " + e + "-upper-first-piece", s), L.DomUtil.create("div", e + "-ruler-block " + e + "-upper-second-piece", s), L.DomUtil.create("div", e + "-ruler-block " + e + "-lower-first-piece", s), L.DomUtil.create("div", e + "-ruler-block " + e + "-lower-second-piece", s);
        return this._addScales(n, e, i), this.ScaleContainer = i, t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i
    },
    onRemove: function (t) {
        t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
    },
    _addScales: function (t, e, i) {
        this._iScale = L.DomUtil.create("div", e + "-label-div", i), this._iScaleLabel = L.DomUtil.create("div", e + "-label", this._iScale), this._iScaleFirstNumber = L.DomUtil.create("div", e + "-label " + e + "-first-number", this._iScale), this._iScaleSecondNumber = L.DomUtil.create("div", e + "-label " + e + "-second-number", this._iScale)
    },
    _update: function () {
        var t = this._map.getBounds(),
            e = t.getCenter().lat,
            i = 6378137 * Math.PI * Math.cos(e * Math.PI / 180),
            n = i * (t.getNorthEast().lng - t.getSouthWest().lng) / 180,
            o = this._map.getSize(),
            s = this.options,
            a = 0;
        o.x > 0 && (a = n * (s.maxWidth / o.x)), this._updateScales(s, a)
    },
    _updateScales: function (t, e) {
        t.metric && e && this._updateMetric(e), t.imperial && e && this._updateImperial(e)
    },
    _updateMetric: function (t) {
        var e = this._getRoundNum(t);
        this._mScale.style.width = this._getScaleWidth(e / t) + "px", this._mScale.innerHTML = 1e3 > e ? e + " m" : e / 1e3 + " km"
    },
    _updateImperial: function (t) {
        var e, i, n, o, s, a = 3.2808399 * t,
            r = this._iScaleFirstNumber,
            h = this._iScaleSecondNumber,
            l = this._iScale,
            u = this._iScaleLabel;
        u.innerHTML = "0", a > 2640 ? (e = a / 5280, i = this._getRoundNum(e), o = this._getRoundNum(e / 2), l.style.width = this._getScaleWidth(i / e) + "px", r.innerHTML = o, h.innerHTML = i + "mi") : (n = this._getRoundNum(a), s = this._getRoundNum(a / 2), l.style.width = this._getScaleWidth(n / a) + "px", r.innerHTML = s, h.innerHTML = n + "ft")
    },
    _getScaleWidth: function (t) {
        return Math.round(this.options.maxWidth * t) - 10
    },
    _getRoundNum: function (t) {
        if (t >= 2) {
            var e = Math.pow(10, (Math.floor(t) + "").length - 1),
                i = t / e;
            return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i
        }
        return (Math.round(100 * t) / 100).toFixed(1)
    }
});

L.control.betterscale = function (options) {
    return new L.Control.BetterScale(options)
};

L.Control.MousePosition = L.Control.extend({
  options: {
    position: 'bottomright',
    separator: ' Lon: ',
    emptyString: '',
    lngFirst: false,
    numDigits: 4,
    lngFormatter: undefined,
    latFormatter: undefined,
    prefix: "Lat: "
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
    L.DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML=this.options.emptyString;
    return this._container;
  },

  onRemove: function (map) {
    map.off('mousemove', this._onMouseMove)
  },

  _onMouseMove: function (e) {
    var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
    var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
    var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
    var prefixAndValue = this.options.prefix + ' ' + value;
    this._container.innerHTML = prefixAndValue;
  }

});

L.Map.mergeOptions({
    positionControl: false
});

L.Map.addInitHook(function () {
    if (this.options.positionControl) {
        this.positionControl = new L.Control.MousePosition();
        this.addControl(this.positionControl);
    }
});

L.control.mousePosition = function (options) {
    return new L.Control.MousePosition(options);
};

L.Control.Custom = L.Control.extend({
        version: '1.0.1',
        options: {
            position: 'topright',
            id: '',
            title: '',
            classes: '',
            content: '',
            style: {},
            datas: {},
            events: {},
        },
        container: null,
        onAdd: function (map) {
            this.container = L.DomUtil.create('div');
            this.container.id = this.options.id;
            this.container.title = this.options.title;
            this.container.className = this.options.classes;
            this.container.innerHTML = this.options.content;

            for (var option in this.options.style)
            {
                this.container.style[option] = this.options.style[option];
            }

            for (var data in this.options.datas)
            {
                this.container.dataset[data] = this.options.datas[data];
            }


            /* Prevent click events propagation to map */
            L.DomEvent.disableClickPropagation(this.container);

            /* Prevent right click event propagation to map */
            L.DomEvent.on(this.container, 'contextmenu', function (ev)
            {
                L.DomEvent.stopPropagation(ev);
            });

            /* Prevent scroll events propagation to map when cursor on the div */
            L.DomEvent.disableScrollPropagation(this.container);

            for (var event in this.options.events)
            {
                L.DomEvent.on(this.container, event, this.options.events[event], this.container);
            }

            return this.container;
        },

        onRemove: function (map) {
            for (var event in this.options.events)
            {
                L.DomEvent.off(this.container, event, this.options.events[event], this.container);
            }
        },
});

L.control.custom = function (options) {
        return new L.Control.Custom(options);
};

L.control.logo = function () {
        return new L.Control.Custom({
                position: 'topleft',
                content : '<a href="http://tunalab.org" target="_blank"><img src="http://tunalab.org/images/logo.png" height="93" width="85"></a>',
                classes : '',
                style   :
                {
                    position: 'absolute',
                    left: '50px',
                    top: '0px',		
                    padding: '5px',
                },
            });
};

L.control.logo2 = function () {
        return new L.Control.Custom({
                position: 'topleft',
                content : '<a href="http://fishtoday.org" target="_blank"><img src="js/images/logo.png" height="80" width="195"></a>',
                classes : '',
                style   :
                {
                    position: 'absolute',
                    left: '140px',
                    top: '10px',	
                    padding: '5px',
                },
            });
};

L.control.logo3 = function () {
        return new L.Control.Custom({
                position: 'topleft',
                content : '<a href="http://www.marinecsi.org" target="_blank"><img src="http://www.marinecsi.org/wp-content/uploads/2010/05/marinecsilogo.jpg" width="51" height="90"></a>',
                classes : '',
                style   :
                {
                    position: 'absolute',
                    left: '345px',
                    top: '0px',	
                    padding: '5px',
                },
            });
};

L.control.logo4 = function () {
        return new L.Control.Custom({
                position: 'topleft',
                content : '<a href="http://www.marinecsi.org/2010/05/21/offield-center-for-billfish-studies/" target="_blank"><img src="http://www.marinecsi.org/wp-content/uploads/2010/05/ocbs-logo.png" width="100" height="91"></a>',
                classes : '',
                style   :
                {
                    position: 'absolute',
                    left: '400px',
                    top: '0px',	
                    padding: '5px',
                },
            });
};

L.control.banner = function () {
        return new L.Control.Custom({
                position: 'bottomright',
                content : 
						'<style>' +
						'.alert { '+
						'    padding: 4px 8px 8px 12px;' +					
						'    font-size: 13px;' +						
						'    background-color: #414b4d;' +
						'    opacity: 0.9;' +						
						'    color: white;}' +
						'.closebtn {' +
						'    margin-left: 15px;' +
						'    color: white;' +
						'    font-weight: bold;' +
						'    float: right;' +
						'    font-size: 22px;' +
						'    line-height: 20px;' +
						'    cursor: pointer;' +
						'    transition: 0.3s;}' +
						'.closebtn:hover {color: black;}' +
						'</style>' +
						'<div class="myheader">'+
                        '<span class="closebtn" >&times;</span> '+						
						'<b><br> Pelagics Information Dashboard - Pacific bigeye tuna <br></b> ' +
                        '</div>'   +					
						'<div class="alert">'+
						'Bigeye tuna (BE) returns over $90 million USD in 2016, representing over 80% revenue of the commercial fisheries in Hawai`i. Fishermen have seen unpredictable changes in availability linked to shifting ocean dynamics and productivity, with increasing catches to the north and south of Hawai`i. But how ocean conditions influence BE migration routes and local residency patterns is a limiting data gap. This dashboard is an attempt to investigate potential connectivity for bigeye between Hawai`i and the rest of the Pacific. Learn more about bigeye management at <a href="http://www.wpcouncil.org" target="_blank"><b>wpcouncil.org</b></a>.' +
						'<br><br>' +
						'<a href="http://www.wpcouncil.org" target="_blank"><img src="https://cdn2.webdamdb.com/1280_2IrRZdbx32P8.jpg" alt="Tuna wraggler" style="width:100%"></a>' +
						//'<iframe width="540" height="304" src="https://www.youtube.com/embed/1R8PeGKxBcw?playlist=KKkm7EW3uq0&loop=1&controls=0"></iframe>' +
                        '</div>',						
                classes : 'alert',
                style   :
                {
                    margin: '20px',
					width: '35%',					
                },
	events:
    {
        click: function()
        {
		   var div = this.parentElement;
		   div.style.opacity = "0";
		   setTimeout(function(){ div.style.display = "none"; }, 600);
        },
    }
        });
};

