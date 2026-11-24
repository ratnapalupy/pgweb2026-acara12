L.Geoserver = L.FeatureGroup.extend({
    initialize: function (baseLayerUrl, options) {
        this.baseLayerUrl = baseLayerUrl;
        var defaultOptions = {
            layers: "",
            format: "image/png",
            transparent: true,
            version: "1.1.1",
            attribution: "GeoServer"
        };
        this.options = L.extend(defaultOptions, options);
    },

    wms: function () {
        return L.tileLayer.wms(this.baseLayerUrl, this.options);
    },

    legend: function () {
        var legend = L.control({ position: "bottomleft" });
        var url = this.baseLayerUrl;
        var layerName = this.options.layers;

        legend.onAdd = function () {
            var div = L.DomUtil.create("div", "info legend");
            div.style.background = "white";
            div.style.padding = "8px 10px";
            div.style.borderRadius = "4px";
            div.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";
            div.style.width = "190px";

            var judul = document.createElement("div");
            judul.innerHTML = "<b>Legenda</b>";
            judul.style.fontSize = "13px";
            judul.style.marginBottom = "6px";
            div.appendChild(judul);

            var isi = document.createElement("div");
            isi.style.maxHeight = "170px";
            isi.style.overflowY = "auto";
            isi.style.overflowX = "hidden";
            isi.innerHTML =
                '<img src="' + url +
                "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=" +
                layerName +
                "&LEGEND_OPTIONS=fontSize:11;dpi:80" +
                '" alt="Legend" style="display:block;">';
            div.appendChild(isi);

            L.DomEvent.disableScrollPropagation(div);
            L.DomEvent.disableClickPropagation(div);

            return div;
        };
        return legend;
    }
});

L.Geoserver.wms = function (baseLayerUrl, options) {
    var req = new L.Geoserver(baseLayerUrl, options);
    return req.wms();
};

L.Geoserver.legend = function (baseLayerUrl, options) {
    var req = new L.Geoserver(baseLayerUrl, options);
    return req.legend();
};