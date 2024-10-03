// POI array with sample data
const poiArray = [
    { name: "Aire de Limours", latitude: 48.611, longitude: 2.057 },
    { name: "Barr. de Saint-Arn", latitude: 48.524, longitude: 1.798 },
    { name: "Aire des Chaudon", latitude: 48.459, longitude: 1.776 }
];

// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Function to get the current location of the user
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showDistances, showError);
    } else {
        document.getElementById("output").innerHTML = "<p class='text-red-500'>Geolocation is not supported by this browser.</p>";
    }
}

// Function to display distances from user's location to each POI
function showDistances(position) {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    let output = `<p class="font-bold">Your location: Latitude: ${userLat}, Longitude: ${userLon}</p>`;
    output += "<h2 class='mt-4 mb-2 font-semibold'>Distances to POIs:</h2><ul class='list-disc list-inside'>";

    poiArray.forEach(poi => {
        const distance = calculateDistance(userLat, userLon, poi.latitude, poi.longitude).toFixed(2);
        output += `<li>${poi.name}: ${distance} km</li>`;
    });

    output += "</ul>";
    document.getElementById("output").innerHTML = output;
}

// Function to handle errors
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("output").innerHTML = "<p class='text-red-500'>User denied the request for Geolocation.</p>";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("output").innerHTML = "<p class='text-red-500'>Location information is unavailable.</p>";
            break;
        case error.TIMEOUT:
            document.getElementById("output").innerHTML = "<p class='text-red-500'>The request to get user location timed out.</p>";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("output").innerHTML = "<p class='text-red-500'>An unknown error occurred.</p>";
            break;
    }
}

// Function to reset the output
function resetOutput() {
    document.getElementById("output").innerHTML = "";
}

// Add event listeners to the buttons
document.getElementById("calculate-btn").addEventListener("click", getUserLocation);
document.getElementById("reset-btn").addEventListener("click", resetOutput);
