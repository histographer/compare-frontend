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
import CytomineImage from '../components/CytomineImage/CytomineImage.vue';
import { postData, getData } from '../utils/requests';

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
  methods: {
    async fetchImages() {
      return getData(`${this.$store.state.baseUrl}/getImages`);
    },
    chooseImage(newId) {
      this.chosenImage = newId;
    },
    async sendChoosen() {
      const looserId = this.images.find(image => image.id !== this.chosenImage).id;
      const data = {
        chosen: {
          id: this.chosenImage,
        },
        other: {
          id: looserId,
        },
      };
      await postData(`${this.$store.state.baseUrl}/scoring`, data);
      const loading = this.$vs.loading({
        type: 'corners',
        color: '#f7f3ff',
        opacity: 1,
      });
      this.images = await this.fetchImages();
      this.chosenImage = null;
      setTimeout(() => loading.close(), 700); // Added delay for user friendliness
    },
  },
  async created() {
    const loading = this.$vs.loading({
      type: 'corners',
      color: '#f7f3ff',
      opacity: 1,
    });
    this.images = await this.fetchImages();
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
    box-shadow: none;
  }
}
</style>
