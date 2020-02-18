<template>
  <div>
    <h1>Pat or Nat</h1>
    <div class="images">
      <template v-for="image in images">
        <CytomineImage :key="image.id" :image="image" v-on:chooseImage="chooseImage"/>
      </template>
    </div>
  </div>
</template>

<script>
import { ImageInstanceCollection } from 'cytomine-client';
import CytomineImage from '../components/CytomineImage/CytomineImage.vue';

export default {
  name: 'home',
  components: {
    CytomineImage,
  },
  data() {
    return {
      images: [],
    };
  },
  computed: {
    imageCollection() {
      // Set desired project to the first available for now...
      return new ImageInstanceCollection({
        filterKey: 'project',
        filterValue: this.$store.state.projects[0].id,
      });
    },
  },
  methods: {
    async fetchImages(collection) {
      const images = await collection.fetchAll();
      console.log(images.array);
      console.log(images.array[0]);
      return [images.array[0]];
    },
    chooseImage(args) {
      console.log(args);
    },
  },
  async created() {
    this.images = await this.fetchImages(this.imageCollection);
  },
};
</script>

<style scoped>
.images {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
