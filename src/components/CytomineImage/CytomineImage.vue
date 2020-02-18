<template>
  <div class="container">
    <vl-map
      :data-projection="projectionName"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      @pointermove="projectedMousePosition = $event.coordinate"
      ref="map"
    >
      <vl-view
        :center.sync="center"
        :zoom.sync="zoom"
        :rotation.sync="rotation"
        :max-zoom="image.depth"
        :max-resolution="Math.pow(2, image.depth)"
        :extent="extent"
        :projection="projectionName"
        ref="view"
      />

      <vl-layer-tile :extent="extent" ref="baseLayer">
        <vl-source-zoomify
          :projection="projectionName"
          :urls="baseLayerURLs"
          :size="imageSize"
          :extent="extent"
          crossOrigin="Anonymous"
          ref="baseSource"
        />
      </vl-layer-tile>
    </vl-map>

    <button @click="$emit('chooseImage', image.id)">Velg</button>
  </div>
</template>

<script>
import { AbstractImage } from 'cytomine-client';

export default {
  name: 'CytomineImage',
  props: {
    image: Object,
  },
  data() {
    return {
      zoom: 2,
      center: [0, 0],
      rotation: 0,
      geolocPosition: undefined,
      imageServerURLs: [],
    };
  },
  computed: {
    projectionName() {
      return `CYTO-${this.image.id}`;
    },
    extent() {
      return [0, 0, this.image.width, this.image.height];
    },
    imageSize() {
      return [this.image.width, this.image.height];
    },
    baseLayerURLs() {
      const params = `&tileGroup={TileGroup}&x={x}&y={y}&z={z}&channels=0&layer=0&timeframe=0&mimeType=${this.image.mime}`;
      return this.imageServerURLs.map(url => url + params);
    },
  },
  methods: {
    async fetchImageServerURLs() {
      this.imageServerURLs = await new AbstractImage({
        id: this.image.baseImage,
      }).fetchImageServers();
    },
  },
  async created() {
    await this.fetchImageServerURLs();
  },
};
</script>

<style scoped>
.container {
  border: 1px solid black;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  margin: auto;
  padding: 15px;
}
</style>
