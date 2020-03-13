<template>
  <div class="container" ref="container">
    <div class="container__viewer">
      <vl-map
        :load-tiles-while-animating="true"
        :load-tiles-while-interacting="true"
        data-projection="EPSG:3857"
        class="container__viewer__image"
        ref="map"
      >
        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation" :max-zoom="maxZoom" :min-zoom="minZoom"></vl-view>

        <vl-layer-tile :extent="extent" @mounted="addOverviewMap" ref="baseLayer">
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
    </div>
    <div class="container__panels">
      <scale-line :image="image" :zoom="zoom" :client-width="clientWidth"/>

      <div class="custom-overview" ref="overview">
      </div>
    </div>
    <vs-button v-if="chosen" relief circle class="container__button chosen" active color="#b395f3">
      Valgt <i class="bx bx-check" />
    </vs-button>
    <vs-button
      v-else
      circle
      color="#b395f3"
      class="container__button"
      @click="$emit('chooseImage', image.id)"
    >
      Velg
    </vs-button>
  </div>
</template>

<script>
import View from 'ol/View';
import OverviewMap from 'ol/control/OverviewMap';

import ScaleLine from './ScaleLine.vue';

export default {
  name: 'CytomineImage',
  components: {
    ScaleLine,
  },
  props: {
    image: Object,
    chosen: Boolean,
  },
  data() {
    return {
      zoom: null,
      minZoom: null,
      center: [0, 0],
      rotation: 0,
      baseSource: null,
      clientWidth: null,
      overview: null,
    };
  },
  computed: {
    projectionName() {
      return `CYTO-${this.image.id}`;
    },
    extent() {
      return [0, -this.image.height, this.image.width, 0];
    },
    imageSize() {
      return [this.image.width, this.image.height];
    },
    imageServerURLs() {
      return this.image.imageServerURLs;
    },
    baseLayerURLs() {
      const params = `&tileGroup={TileGroup}&x={x}&y={y}&z={z}&channels=0&layer=0&timeframe=0&mimeType=${this.image.mime}`;
      return this.imageServerURLs.map(url => url + params);
    },
    maxZoom() {
      return (this.image.depth * 2) - 2;
    },
  },
  methods: {
    setInitialZoom() {
      this.zoom = 9.25;
      this.minZoom = 9.25;
    },
    setImageCenter() {
      this.center = [this.image.height / 1.25, -this.image.height / 2];
    },
    async addOverviewMap() {
      await this.$refs.map.$createPromise; // wait for ol.Map to be created
      await this.$refs.baseLayer.$createPromise; // wait for ol.Layer to be created

      this.overview = new OverviewMap({
        view: new View({
          projection: 'EPSG:4326', minZoom: -9,
        }),
        layers: [this.$refs.baseLayer.$layer],
        tipLabel: 'overview map',
        target: this.$refs.overview,
        collapsible: false,
      });
      this.$refs.map.$map.addControl(this.overview);
    },
  },
  mounted() {
    this.setInitialZoom();
    this.setImageCenter();
    const { clientWidth } = this.$refs.container;
    this.clientWidth = clientWidth; // Used to send to ScaleLine component
  },
};
</script>

<style scoped lang="scss">
@import "../../style/colors.scss";

.container {
  display: flex;
  background: $background-color;
  height: 100%;
  flex-flow: column;
  border-radius: 30px;
  margin: auto;
  width: calc(100% - 5vh);

  > .container__viewer {
    display: flex;
    height: calc(100% - 5rem);

    > .container__viewer__image {
      border-radius: 30px;
      box-shadow: 7px 7px 14px #e1dde8, -7px -7px 14px #ffffff;
      width: 100%;
      overflow: hidden;
      height: 100%;
    }
  }

  > .container__panels {
    margin-top: -4rem;
    z-index: 1;
    text-align: right;
    margin-right: 1rem;

    > .custom-overview {
      position: relative;
      left: 1rem;

    }
  }

  > .container__button {
    max-height: 5rem;
    max-width: 400px;
    box-shadow: 7px 7px 14px #e1dde8, -7px -7px 14px #ffffff;
    width: 100%;
    margin: 3rem auto auto;
    min-height: 60px;
    font-size: 24px;
  }

  > .chosen {
    box-shadow: inset 7px 7px 14px #8c6ecb, inset -7px -7px 14px #be94ff;
    background: $primary-color;
  }
}
</style>

<style lang="scss">
  .custom-overview {
    > .ol-overviewmap:not(.ol-collapsed) {
      backdrop-filter: blur(5px);
      background: rgba(255, 255, 255, .4);
      border-radius: 10px;
    }
    > .ol-overviewmap .ol-overviewmap-map {
      border: none;
    }
  }
</style>
