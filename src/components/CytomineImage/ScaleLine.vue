<template>
  <div class="scale-line" :class="{'interpolation': interpolation}">
    <div class="scale-line-top" :style="{width: scaleLineLength + 'px'}">
      {{scaleLength}}
    </div>
    <div class="scale-line-bottom">
    <span v-show="magnification">
      Magnification: {{magnification}}X
    </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scale-line',
  props: {
    image: Object,
    zoom: Number,
  },
  data() {
    return {
      scaleLineLength: 100,
    };
  },
  computed: {
    magnification() {
      const magnification = (2 ** (this.zoom - this.image.depth)) * this.image.magnification;
      return Math.round(magnification * 100) / 100;
    },
    resolution() {
      const resolution = this.image.resolution ? this.image.resolution : 1;
      return (2 ** (this.image.depth - this.zoom)) * resolution;
    },
    scaleLength() {
      let length = this.scaleLineLength * this.resolution;
      if (this.image.resolution) {
        let unit = 'µm';
        if (length > 1000) {
          length /= 1000;
          unit = 'mm';
        }
        return `${length.toPrecision(3)} ${unit}`;
      }
      return `${Math.round(length * 1000) / 1000} pixels`;
    },
    interpolation() {
      return this.zoom > this.image.depth;
    },
  },
};
</script>

<style scoped>
  .scale-line {
    background: white;
    position: absolute;
    padding: 0.4em 0.8em;
    display: block;
    right: 4rem;
    bottom: 1rem;
    font-size: 9px;
    min-width: 100px;
  }
  .scale-line-top {
    margin-top: 0.5em;
    box-sizing: content-box;
    border: 2px solid black;
    border-top: none;
    text-align: center;
    padding-bottom: 0.2em;
  }
  .scale-line-bottom {
    box-sizing: content-box;
    border: 2px solid black;
    border-top: none;
    border-bottom: none;
    text-align: center;
    padding-top: 0.2em;
    margin-bottom: 1em;
    min-height: 1em;
  }
  .interpolation {
    color: red;
  }
  .interpolation .scale-line-top, .interpolation .scale-line-bottom {
    border-color: red;
  }
</style>
