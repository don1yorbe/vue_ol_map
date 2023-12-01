<template>
  <div id="map"></div>
  <div id="popup" class="ol-popup">
    <h3 id="popup-name"></h3>
    <p id="popup-description"></p>
  </div>
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import { useDataStore } from "@/stores/data"

export default {
  name: `Map`,
  mounted() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2
      })
    });


    const vectorSource = new VectorSource();

    const store = useDataStore()
    const points = store.getCoordinates()
    console.log(points);
    points.forEach(point => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(point.coordinates)),
        name: point.name,
        description: point.description
      });
      vectorSource.addFeature(feature);
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({
            color: 'white',
            width: 2
          })
        })
      })
    });

    this.map.addLayer(vectorLayer);

    // Create a popup overlay
    const popupOverlay = new Overlay({
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.map.addOverlay(popupOverlay);

    // Display popup on click event
    this.map.on('click', (event) => {
      const feature = this.map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      if (feature) {
        const coordinates = feature.getGeometry().getCoordinates();
        const name = feature.get('name');
        const description = feature.get('description');
        popupOverlay.setPosition(coordinates);
        document.getElementById('popup-name').textContent = name;
        document.getElementById('popup-description').textContent = description;
        popupOverlay.getElement().style.display = 'block';
      } else {
        popupOverlay.getElement().style.display = 'none';
      }
    });
  }
};
</script>

<style scoped>
#map {
  margin: 0;
  padding: 0;
  height: 500px;
  padding: 1.5rem;
}

.ol-popup {
  position: absolute;
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 150px;
}

.ol-popup h3 {
  margin-top: 0;
}

.ol-popup p {
  margin-bottom: 0;
}
</style>