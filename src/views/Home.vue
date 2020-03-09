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
      color="#72eaa4"
      size="xl"
      class="nextButton"
      @click="sendChoosen"
    >
      Neste<i class="bx bx-caret-right" />
    </vs-button>
    <vs-button transparent size="xl" color="#313131" class="exitButton" to="/thank-you">
      Logg ut
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
      return getData(`${this.$store.state.baseUrl}/imagePair`);
    },
    chooseImage(newId) {
      this.chosenImage = newId;
    },
    async sendChoosen() {
      const loading = this.$vs.loading({
        type: 'corners',
        background: '#f7f3ff',
        color: '#A581EF',
        opacity: 0.7,
      });
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
      this.images = await this.fetchImages();
      this.chosenImage = null;
      // Added for more delay to better the user experience
      await new Promise(resolve => setTimeout(resolve, 500));
      loading.close();
    },
  },
  async created() {
    const loading = this.$vs.loading({
      type: 'corners',
      background: '#f7f3ff',
      color: '#A581EF',
      opacity: 1,
    });
    this.images = await this.fetchImages();
    setTimeout(() => loading.close(), 500);
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

.exitButton {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
