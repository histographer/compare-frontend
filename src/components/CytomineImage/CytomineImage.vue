<template>
  <div class="container" ref="container">
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      class="container__viewer"
    >
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

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
    <vs-button
      v-if="chosen"
      flat
      circle
      class="container__button"
      active
      color="#A581EF"
    >
      Valgt <i class="bx bx-check" />
    </vs-button>
    <vs-button
      v-else
      flat
      circle
      color="#A581EF"
      class="container__button"
      @click="$emit('chooseImage', image.id)"
    >
      Velg
    </vs-button>
  </div>
</template>

<script>
import { AbstractImage } from 'cytomine-client';

export default {
  name: 'CytomineImage',
  props: {
    image: Object,
    chosen: Boolean,
  },
  data() {
    return {
      zoom: null,
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
    setInitialZoom() {
      let zoom = 1;
      let { width } = this.image;
      const { clientWidth } = this.$refs.container;
      while (width > clientWidth) {
        zoom += (clientWidth / width) * 1.75;
        width -= clientWidth;
      }
      this.zoom = zoom;
    },
    setImageCenter() {
      const { width, height } = this.image;
      this.center = [(width / height) / 5, (width / height) / 5];
    },
  },
  async created() {
    await this.fetchImageServerURLs();
    this.setInitialZoom();
    this.setImageCenter();
  },
};
</script>

<style scoped lang="scss">
@import "../../style/colors.scss";

.container {
  display: grid;
  box-shadow: 0 5px 25px -3px rgba(0,0,0, 0.25);
  background: white;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  border-radius: 30px;
  margin: auto;
  padding: 25px 15px;
  width: calc(100% - 30px);

  > .container__viewer {
    min-height: 40rem;
    box-shadow: 0 0 10px -5px rgba(0,0,0, 0.25);
    border-radius: 30px;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
   > .container__button {
     max-height: 5rem;
     max-width: 400px;
     width: 100%;
     margin: auto;
     min-height: 60px;
     font-size: 24px;
   }
}
</style>
