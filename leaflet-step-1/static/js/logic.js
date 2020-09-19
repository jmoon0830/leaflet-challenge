var myMap = L.map("map", {
    center: [
        39.82, -118.57
    ],
    zoom: 3
    });

// streetmap layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
var geojson;
var colors = ["lightgreen","green","yellow","orange","red","purple"];
d3.json(link, function(data) {
    for (var i = 0; i<data.features.length; i++) {
        var location = [data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]];
        //console.log(location);
        var titleMarker = data.features[i].properties.place;
        var magnitude = data.features[i].properties.mag;
        //console.log(titleMarker);
        var marker = L.circle(location,{
            title: titleMarker,
            fillOpacity: 0.75,
            fillColor: colorMap(),
            radius: Math.pow(magnitude,4)*1000
        }).addTo(myMap)
        marker.bindPopup("<h3> Magnitude: " + magnitude + "</h3>")
    }
    console.log(data.features);

    function colorMap() {
        var color = "";
        if (magnitude > 5) {color=colors[5]}
        else if (magnitude > 4) {color=colors[4]}
        else if (magnitude > 3) {color=colors[3]}
        else if (magnitude > 2) {color=colors[2]}
        else if (magnitude > 1) {color=colors[1]}
        else {color=colors[0]}
        return color;
    };

    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var magnitudeLimits = [0,1,2,3,4,5];
        var labels = ["<strong>Magnitude</strong>"];

        magnitudeLimits.forEach(function(limit, index) {
            if (index<(magnitudeLimits.length-1)) {
                labels.push("<li style=\"background-color: " + colors[index] + "\">" + magnitudeLimits[index] + " - " + magnitudeLimits[index+1] + "</li>");
            }
            else {
                labels.push("<li style=\"background-color: " + colors[index] + "\">" + magnitudeLimits[index] + "+</li>");
            }
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    legend.addTo(myMap);

});

// function createMap (data) {
//     //map starting point
//     var myMap = L.map("map", {
//         center: [
//             0, 0
//         ],
//         zoom: 2.1
//         });

//   // streetmap layer
//     var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//         tileSize: 512,
//         maxZoom: 18,
//         zoomOffset: -1,
//         id: "mapbox/streets-v11",
//         accessToken: API_KEY
//     }).addTo(myMap);

//     createMarkers(data);

//     function createMarkers (data) {
//         for (var i = 0; i<data.length; i++) {
//             var location = [data[i].geometry.coordinates[0],data[i].geometry.coordinates[1]];
//             console.log(location);
//             var titleMarker = data[i].properties.place;
//             console.log(titleMarker);
//             L.marker(location,{
//                 title: titleMarker
//             }).addTo(myMap)
//         }
//     };

    // test(data);
    // function test (choroplethdata) {
    //     geojson = L.choropleth(choroplethdata, {

    //         // Define what  property in the features to use
    //         valueProperty: "mag",
        
    //         // Set color scale
    //         scale: ["#ffffb2", "#b10026"],
        
    //         // Number of breaks in step range
    //         steps: 10,
        
    //         // q for quartile, e for equidistant, k for k-means
    //         mode: "q",
    //         style: {
    //           // Border color
    //           color: "#fff",
    //           weight: 1,
    //           fillOpacity: 0.8
    //         },
        
    //         // Binding a pop-up to each layer
    //         onEachFeature: function(feature, layer) {
    //           layer.bindPopup("Location: " + feature.properties.place + "<br>Magnitude:<br>" + feature.properties.mag);
    //         }
    //       }).addTo(myMap);
    //};

//}




