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
    <vs-button v-if="chosen" relief circle class="container__button chosen" active color="#f7f3ff">
      Valgt <i class="bx bx-check" />
    </vs-button>
    <vs-button
      v-else
      circle
      color="#f7f3ff"
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
      this.center = [width / height / 5, width / height / 5];
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
  background: $background-color;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  border-radius: 30px;
  margin: auto;
  padding: 25px 15px;
  width: calc(100% - 30px);

  > .container__viewer {
    min-height: 40rem;
    border-radius: 30px;
    box-shadow: 7px 7px 14px #e1dde8, -7px -7px 14px #ffffff;
    width: 100%;
    overflow: hidden;
    height: 100%;
  }
  > .container__button {
    max-height: 5rem;
    max-width: 400px;
    box-shadow: 7px 7px 14px #e1dde8, -7px -7px 14px #ffffff;
    width: 100%;
    color: #969696;
    margin: 1rem auto auto;
    min-height: 60px;
    font-size: 24px;
  }

  > .chosen {
    box-shadow: inset 7px 7px 14px #e1dde8, inset -7px -7px 14px #ffffff;
  }
}
</style>
