// Initialize the map centered on the world
const map = L.map('map').setView([20, 0], 2);

// Add Dark Matter tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

// Load the Global GeoJSON data from the data/ directory
fetch('data/flood_events.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                const severity = feature.properties.Severity || 1;
                const radius = severity * 2 + 2; 
                
                return L.circleMarker(latlng, {
                    radius: radius,
                    fillColor: "#3498db",
                    color: "#fff",
                    weight: 0.5,
                    opacity: 1,
                    fillOpacity: 0.6
                });
            },
            onEachFeature: function (feature, layer) {
                const props = feature.properties;
                layer.bindPopup(`
                    <div style="color: #e7e9ea; background: #16202a; padding: 5px;">
                        <h3 style="color: #3498db; margin: 0 0 5px 0;">Flood Event</h3>
                        <b>Country:</b> ${props.Country}<br>
                        <b>Began:</b> ${props.Began}<br>
                        <b>Main Cause:</b> ${props.MainCause}<br>
                        <b>Severity:</b> ${props.Severity}
                    </div>
                `);
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error loading Global GeoJSON:', error));
