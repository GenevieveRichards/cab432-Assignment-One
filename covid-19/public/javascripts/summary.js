function getColor(d) {
    return d > 650000 ? '#00441b' :
        d > 400000 ? '#006d2c' :
            d > 300000 ? '#238b45' :
                d > 200000 ? '#41ab5d' :
                    d > 100000 ? '#74c476' :
                        d > 50000 ? '#a1d99b' :
                            d > 250000 ? '#c7e9c0' :
                                d > 10000 ? '#e5f5e0' :
                                    '#f7fcf5';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.4
    };
}

function highlightFeature(e) {
    var layer = e.target;
    const code = layer.feature.properties.code
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    fetch(`/restrictions/summary/${code}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            info.update(layer.feature.properties, data)
        })


}
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function totimeseriesdata(e) {
    const code = e.target.feature.properties.code;
    window.location = "/state/" + code

}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: totimeseriesdata
    });
}


