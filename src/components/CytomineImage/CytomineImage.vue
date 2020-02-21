<template>
  <div class="container">
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      :wrapX="false"
      style="height: 400px"
      class="viewer"
    >
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

      <vl-layer-tile>
        <vl-source-xyz
          :url="tileURL"
          :max-zoom="image.magnification"
          :min-zoom="0"
          :wrapX="false"
          cross-origin="Anonymous"
          :tile-size="tileSize"
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
      zoom: 1,
      center: [0, 0],
      rotation: 0,
      imageServerURLs: [],
      baseSource: null,
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
    tileSize() {
      return [120, 120];
    },
    tileURL() {
      const params = `&x={x}&y={y}&z={z}&channels=0&layer=0&timeframe=0&mimeType=${this.image.mime}`;
      return this.imageServerURLs[0] + params;
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
  width: fit-content;

  > .viewer {
    height: 400px;
  }
}
</style>
