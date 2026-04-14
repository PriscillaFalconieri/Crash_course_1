// Initialize the map globally
const map = L.map('map').setView([20, 0], 2); // Center on the world

// Add tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load the GeoJSON data
fetch('flood_events.geojson')
    .then(response => response.json())
    .then(data => {
        // Create a GeoJSON layer with circle markers
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                // Style based on severity if available
                const severity = feature.properties.Severity || 1;
                const radius = severity * 3 + 2; 
                
                return L.circleMarker(latlng, {
                    radius: radius,
                    fillColor: "#0078ff",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.6
                });
            },
            onEachFeature: function (feature, layer) {
                // Add a popup with details from the properties
                const props = feature.properties;
                const popupContent = `
                    <div style="font-family: sans-serif; min-width: 200px;">
                        <h3 style="margin-top:0; color: #0078ff;">Flood Event</h3>
                        <b>Country:</b> ${props.Country}<br>
                        <b>Began:</b> ${props.Began}<br>
                        <b>Ended:</b> ${props.Ended}<br>
                        <b>Main Cause:</b> ${props.MainCause}<br>
                        <b>Severity:</b> ${props.Severity}<br>
                        <b>Dead:</b> ${props.Dead || 0}<br>
                        <b>Displaced:</b> ${props.Displaced || 0}
                    </div>
                `;
                layer.bindPopup(popupContent);
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));
