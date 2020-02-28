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
      color="#f7f3ff"
      size="xl"
      class="nextButton"
      @click="sendChoosen"
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
      this.fetchImages(this.imageCollection);
      this.chosenImage = null;
    },
  },
  async created() {
    const loading = this.$vs.loading({
      type: 'corners',
      color: '#f7f3ff',
      opacity: 1,
    });
    this.images = await this.fetchImages(this.imageCollection);
    setTimeout(() => loading.close(), 700); // Added delay for user friendliness
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
  min-height: 100%;
}
h1 {
  color: black;
  font-weight: 400;
  font-size: 48px;
}

.nextButton {
  position: absolute;
  right: 10px;
  bottom: 10px;
  box-shadow: 8px 8px 15px #e6e2ed, -8px -8px 15px #ffffff;

  &:hover {
    box-shadow: 0;
  }
}
</style>
