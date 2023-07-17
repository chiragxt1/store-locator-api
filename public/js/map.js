mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpcmFneHQxIiwiYSI6ImNsazZrbWg3bjB1YngzcG83eHd6cThqZW0ifQ.I89O1A8ijw2fUbTnF2fpTA';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9,
    center: [77.21301, 28.51918]
});

// Fetch stores from API
getStores = async () => {
    const res = await fetch('/api/v1/stores');
    const data = await res.json();

    const stores = data.data.map(store => {
        return {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [
                    store.location.coordinates[0],
                    store.location.coordinates[1]
                ]
            },
            properties: {
                storeId: store.storeId,
                icon: 'shop'
            }
        };
    });

    loadMap(stores);
}

// Load map with stores
loadMap = (stores) => {
    map.on('load', () => {

        // Add a data source containing one point feature.
        map.addSource('point', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: stores
            }
        });
         
        // Add a layer to use the image to represent the data.
        map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'point', // reference the data source
            layout: {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{storeId}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
            }
        });
    });
}

getStores();