// Initialize the map centered on Bordeaux
const map = L.map('map').setView([44.837789, -0.57918], 13);

// Add CartoDB Positron (Black and White) tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

// Landmarks data with images
const landmarks = [
    {
        name: "Place de la Bourse",
        coords: [44.841, -0.570],
        desc: "Iconic 18th-century square known for its Mirror of Water.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Bordeaux_-_Place_de_la_Bourse_01.jpg/800px-Bordeaux_-_Place_de_la_Bourse_01.jpg"
    },
    {
        name: "Cathédrale Saint-André",
        coords: [44.837, -0.577],
        desc: "Gothic cathedral, consecrated in 1096.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cath%C3%A9drale_Saint-Andr%C3%A9_de_Bordeaux_-_P1030948.JPG/800px-Cath%C3%A9drale_Saint-Andr%C3%A9_de_Bordeaux_-_P1030948.JPG"
    },
    {
        name: "Grosse Cloche",
        coords: [44.835, -0.571],
        desc: "Historic bell tower, one of the oldest in France.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/La_Grosse_Cloche_Bordeaux.jpg/800px-La_Grosse_Cloche_Bordeaux.jpg"
    },
    {
        name: "Grand Théâtre",
        coords: [44.842, -0.574],
        desc: "Famous 18th-century opera house with an iconic colonnade.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Bordeaux_Grand_Theatre_01.jpg/800px-Bordeaux_Grand_Theatre_01.jpg"
    }
];

// Hospitals data with images
const hospitals = [
    {
        name: "CHU Pellegrin",
        coords: [44.831, -0.603],
        desc: "The main regional university hospital center.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/H%C3%B4pital_Pellegrin_-_Bordeaux.jpg/800px-H%C3%B4pital_Pellegrin_-_Bordeaux.jpg"
    },
    {
        name: "Hôpital Saint-André",
        coords: [44.835, -0.579],
        desc: "A historic university hospital located in the city center.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/H%C3%B4pital_Saint-Andr%C3%A9_Bordeaux.jpg/800px-H%C3%B4pital_Saint-Andr%C3%A9_Bordeaux.jpg"
    },
    {
        name: "Clinique Tivoli-Ducos",
        coords: [44.856, -0.590],
        desc: "Private multi-specialty clinic in northern Bordeaux.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Clinique_Tivoli_Bordeaux.jpg/800px-Clinique_Tivoli_Bordeaux.jpg"
    },
    {
        name: "Hôpital Haut-Lévêque",
        coords: [44.796, -0.638],
        desc: "Specialized hospital for cardiac and thoracic diseases (Pessac).",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/H%C3%B4pital_Haut-L%C3%A9v%C3%AAque.jpg/800px-H%C3%B4pital_Haut-L%C3%A9v%C3%AAque.jpg"
    }
];

// Helper function to create popup content
function createPopup(point, emoji) {
    return `
        <img src="${point.image}" class="popup-img" alt="${point.name}">
        <div class="popup-text">
            <h3>${emoji} ${point.name}</h3>
            <p>${point.desc}</p>
        </div>
    `;
}

// Add landmark markers
landmarks.forEach(point => {
    L.marker(point.coords)
        .addTo(map)
        .bindPopup(createPopup(point, '📍'));
});

// Add hospital markers
hospitals.forEach(point => {
    L.marker(point.coords)
        .addTo(map)
        .bindPopup(createPopup(point, '🏥'));
});
