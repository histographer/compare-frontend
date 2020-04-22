<template>
  <div class="content">
    <div class="content__header">
      <p class="project"><i class="bx bx-list-ul" style="margin-right: 5px;"/>{{ currentProject.name }}</p>
      <h1>Hvilket av snittene ser best ut?</h1>
      <div class="buttons">
        <vs-button transparent size="xl" color="#313131" @click="changeProject">
          <i class="bx bx-edit" style="margin-right: 5px;"/>Bytt prosjekt
        </vs-button>
        <vs-button transparent size="xl" color="#313131" to="/thank-you">
          <i class="bx bx-log-out" style="margin-right: 5px;"/>Logg ut
        </vs-button>
      </div>
    </div>
    <div class="images">
      <template v-for="(image, index) in images">
        <CytomineImage
          :key="image.id"
          :image="image"
          :index="index"
          :chosen="image.id === chosenImage"
          v-on:chooseImage="chooseImage"
          :ref="`image-${index}`"
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
    <vs-button
      transparent
      color="#afafaf"
      size="xl"
      class="skipButton"
      @click="skipPair"
    >
      Ingen sikker forskjell
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
  computed: {
    currentProject() {
      return this.$store.state.currentProject;
    },
  },
  methods: {
    async fetchImages() {
      let uriComponent;
      if (this.$store.state.skipped.length > 0) {
        const skipped = `[${this.$store.state.skipped.map(skippedPair => `[${skippedPair}]`)}]`;
        uriComponent = `?projectId=${this.$store.state.currentProject.id}&skipped=${encodeURIComponent(skipped)}`;
      } else {
        uriComponent = `?projectId=${this.$store.state.currentProject.id}`;
      }
      let response = await getData(`${this.$store.state.baseUrl}/imagePair${uriComponent}`);
      if (response.status === 404) {
        // Go to logout-page since the user is done with all the available comparisons
        await this.$router.push({ name: 'thank-you' });
      }
      response = await response.json();
      return response;
    },
    chooseImage(newId) {
      this.chosenImage = newId;
    },
    async sendChoosen() {
      const loading = this.$vs.loading({
        type: 'points',
        background: '#f7f3ff',
        color: '#b395f3',
        opacity: 0.5,
      });
      const looserId = this.images.find(image => image.id !== this.chosenImage).id;
      const data = {
        projectId: this.$store.state.currentProject.id,
        chosen: {
          id: this.chosenImage,
        },
        other: {
          id: looserId,
        },
      };
      await postData(`${this.$store.state.baseUrl}/scoring`, data);
      await this.$store.commit('addToSkipped', this.images.map(image => image.id));
      this.images = await this.fetchImages();
      await this.$store.commit('increaseAmountDone');
      this.chosenImage = null;
      // Added for more delay to better the user experience
      await new Promise(resolve => setTimeout(resolve, 800));
      loading.close();

      // Set initial zoom and center incase the new images contain one of the same images as before
      Object.keys(this.$refs).forEach((ref) => {
        this.$refs[ref][0].setInitialZoom();
        this.$refs[ref][0].setImageCenter();
      });

      const { amountDone } = this.$store.state;
      this.$vs.notification({
        duration: 6000,
        position: 'bottom-left',
        sticky: true,
        border: '#b395f3',
        title: `Du har gjort ${amountDone} ${amountDone === 1 ? 'sammenligning' : 'sammenligninger'}`,
        text: 'Godt jobba! For hver sammenligning du gjør får vi en bedre forståelse av hvordan snittene er rangert mellom hverandre.',
      });
    },
    async skipPair() {
      const loading = this.$vs.loading({
        type: 'points',
        background: '#f7f3ff',
        color: '#b395f3',
        opacity: 0.5,
      });
      await this.$store.commit('addToSkipped', this.images.map(image => image.id));
      this.images = await this.fetchImages();
      this.chosenImage = null;
      await new Promise(resolve => setTimeout(resolve, 800));
      loading.close();

      // Set initial zoom and center incase the new images contain one of the same images as before
      Object.keys(this.$refs).forEach((ref) => {
        this.$refs[ref][0].setInitialZoom();
        this.$refs[ref][0].setImageCenter();
      });
    },
    async changeProject() {
      await getData(`${this.$store.state.baseUrl}/session?logout=true`);
      await this.$router.push('/session');
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
body {
  overflow-y: hidden;
}

.content {
  display: flex;
  height: 100%;
  flex-flow: column;
}
.content__header {
  display: grid;
  grid-template-columns: 1.2fr 2fr 1.2fr;
  justify-items: center;
  align-items: center;
  > h1 {
    font-weight: 400;
  }
}
.images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0;
  justify-items: stretch;
  margin: 0 25px;
  height: calc(90% - 30px);
}

.nextButton {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  box-shadow: 8px 8px 15px #e6e2ed, -8px -8px 15px #ffffff;

  &:hover {
    box-shadow: none;
  }
}

.skipButton {
  margin: -3.5rem auto 0 auto;
  width: fit-content;
}

@media only screen and (max-width: 1200px) {
  .skipButton {
    width: 140px;
  }
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
}

.project {
  font-size: 1rem;
}
</style>
