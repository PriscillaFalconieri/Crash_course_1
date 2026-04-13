// Initialize the map centered on Bordeaux
const map = L.map('map').setView([44.837789, -0.57918], 13);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Landmarks data
const landmarks = [
    {
        name: "Place de la Bourse",
        coords: [44.841, -0.570],
        desc: "Iconic 18th-century square known for its Mirror of Water."
    },
    {
        name: "Cathédrale Saint-André",
        coords: [44.837, -0.577],
        desc: "Gothic cathedral, consecrated in 1096."
    },
    {
        name: "Grosse Cloche",
        coords: [44.835, -0.571],
        desc: "Historic bell tower, one of the oldest in France."
    },
    {
        name: "Grand Théâtre",
        coords: [44.842, -0.574],
        desc: "Famous 18th-century opera house with an iconic colonnade."
    }
];

// Hospitals data
const hospitals = [
    {
        name: "CHU Pellegrin",
        coords: [44.831, -0.603],
        desc: "The main regional university hospital center."
    },
    {
        name: "Hôpital Saint-André",
        coords: [44.835, -0.579],
        desc: "A historic university hospital located in the city center."
    },
    {
        name: "Clinique Tivoli-Ducos",
        coords: [44.856, -0.590],
        desc: "Private multi-specialty clinic in northern Bordeaux."
    },
    {
        name: "Hôpital Haut-Lévêque",
        coords: [44.796, -0.638],
        desc: "Specialized hospital for cardiac and thoracic diseases (Pessac)."
    }
];

// Add landmark markers
landmarks.forEach(point => {
    L.marker(point.coords)
        .addTo(map)
        .bindPopup(`<h3>📍 ${point.name}</h3><p>${point.desc}</p>`);
});

// Add hospital markers (using a slightly different style if possible, or just a prefix)
hospitals.forEach(point => {
    // We could use a different icon here, but let's stick to standard for now with a distinct label
    L.marker(point.coords)
        .addTo(map)
        .bindPopup(`<h3>🏥 ${point.name}</h3><p>${point.desc}</p>`);
});
