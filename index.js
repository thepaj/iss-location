// making the map and tiles
const myMap = L.map('mapid').setView([0, 0], 1);
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);

// making an marker with an icon
const myIcon = L.icon({
    iconUrl: 'iss200.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], { icon: myIcon }).addTo(myMap);

const url = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstTime = true;
async function getISS() {
    const response = await fetch(url);
    const data = await response.json();
    const { latitude, longitude } = data;

    marker.setLatLng([latitude, longitude]);

    if (firstTime) {
        myMap.setView([latitude, longitude], 4);
        firstTime = false;
    }

    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);
}

getISS();

setInterval(getISS, 1000);