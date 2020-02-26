<template>
  <div>
    <h1>Hvilket av snittene ser best ut?</h1>
    <div class="images">
      <template v-for="image in images">
        <CytomineImage
          :key="image.id"
          :image="image"
          :chosen="image.id === chosenImage"
          v-on:chooseImage="chooseImage"
        />
      </template>
    </div>
    <vs-button
      v-if="chosenImage !== null"
      floating
      circle
      color="success"
      size="xl"
      class="nextButton"
    >
      Neste<i class="bx bx-caret-right" />
    </vs-button>
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
      chosenImage: null,
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
      return images.array;
    },
    chooseImage(newId) {
      this.chosenImage = newId;
      console.log(newId);
    },
    sendChoosen() {
      const looserId = this.images.find(image => image.id !== this.chosenImage).id;
      const POST = {
        user: 'string',
        winner: {
          id: this.chosenImage,
          comment: 'blabla',
        },
        loser: {
          id: looserId,
          comment: 'balblaba',
        },
      };
    },
  },
  async created() {
    this.images = await this.fetchImages(this.imageCollection);
  },
};
</script>

<style scoped lang="scss">
.images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  justify-items: stretch;
  align-content: center;
  min-height: 90vh;
}
h1 {
  color: black;
  font-weight: 400;
  font-size: 48px;
  margin-bottom: 0;
}

.nextButton {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
</style>
