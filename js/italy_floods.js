// Initialize the map centered on Italy
const map = L.map('map').setView([41.8719, 12.5674], 6);

// Add Dark Matter tile layer to match our theme
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

// 1. Load Italy Floods GeoJSON
fetch('data/italy_floods.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 8,
                    fillColor: "#f5a623",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: function (feature, layer) {
                const props = feature.properties;
                layer.bindPopup(`
                    <div style="color: #e7e9ea; background: #16202a; padding: 5px;">
                        <h3 style="color: #f5a623; margin: 0 0 5px 0;">Flood Event</h3>
                        <b>Year:</b> ${props.Year || 'N/A'}<br>
                        <b>Severity:</b> ${props.Severity || 'N/A'}<br>
                        <b>Dead:</b> ${props.Dead || 0}<br>
                        <b>Displaced:</b> ${props.Displaced || 0}
                    </div>
                `);
            }
        }).addTo(map);
    })
    .catch(err => console.error('Error loading Italy floods:', err));

// 2. Load Italy Hospitals GeoJSON
fetch('data/italy_hospitals.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                // Using a different style for hospitals
                return L.marker(latlng);
            },
            onEachFeature: function (feature, layer) {
                const props = feature.properties;
                layer.bindPopup(`
                    <div style="color: #e7e9ea; background: #16202a; padding: 5px;">
                        <h3 style="color: #3498db; margin: 0 0 5px 0;">🏥 Hospital</h3>
                        <b>Name:</b> ${props.name || 'Unknown'}<br>
                        <b>City:</b> ${props.city || props['addr:city'] || 'N/A'}<br>
                        <b>Type:</b> ${props.amenity || 'Hospital'}
                    </div>
                `);
            }
        }).addTo(map);
    })
    .catch(err => console.error('Error loading Italy hospitals:', err));
