<template>
  <div class="container">
    <h2>Resultat</h2>
    <div class="container__form">
      <vs-checkbox class="checkbox" color="rgb(59,222,200)" v-model="moreThanOneRanking">
        Mer enn én rangering
        <template #icon>
          <i class="bx bx-check" />
        </template>
      </vs-checkbox>
      <vs-select v-model="sorting" color="#b395f3">
        <vs-option label="Score høy-lav" value="score_highlow">
          Score høy-lav
        </vs-option>
        <vs-option label="Score lav-høy" value="score_lowhigh">
          Score lav-høy
        </vs-option>
        <vs-option label="Antall rangeringer høy-lav" value="rankings_highlow">
          Antall rangeringer høy-lav
        </vs-option>
        <vs-option label="Antall rangeringer lav-høy" value="rankings_lowhigh">
          Antall rangeringer lav-høy
        </vs-option>
      </vs-select>
    </div>
    <div class="container__results">
      <div class="container__results__header">
        <h2>ID</h2>
        <h2>Score</h2>
        <h2>Antall rangeringer</h2>
      </div>
      <div class="container__results__content">
        <rank-entry
          v-for="(entry, index) in entries"
          :key="index"
          :id="entry.id"
          :score="entry.score"
          :rankings="entry.rankings"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RankEntry from '../components/Ranking/RankEntry.vue';
import { getData } from '../utils/requests';

export default {
  name: 'Ranking',
  components: {
    RankEntry,
  },
  data() {
    return {
      moreThanOneRanking: false,
      sorting: 'score_highlow',
      all: [],
      entries: [],
    };
  },
  methods: {
    async getAll() {
      this.all = await getData(`${this.$store.state.baseUrl}/ranking`);
      this.updateEntries();
    },
    sort(array) {
      if (this.sorting === 'score_highlow') {
        // Sort from high to low score
        return array.sort((a, b) => (a.score < b.score ? 1 : -1));
      }
      if (this.sorting === 'score_lowhigh') {
        // Sort from low to high score
        return array.sort((a, b) => (a.score > b.score ? 1 : -1));
      }
      if (this.sorting === 'rankings_highlow') {
        // Sort from high to low rankings
        return array.sort((a, b) => (a.rankings < b.rankings ? 1 : -1));
      }
      // Sort from low to high rankings
      return array.sort((a, b) => (a.rankings > b.rankings ? 1 : -1));
    },
    filter(array) {
      if (this.moreThanOneRanking) {
        return array.filter(entry => entry.rankings > 1);
      }
      return array;
    },
    updateEntries() {
      this.entries = [...this.all];
      this.entries = this.filter(this.entries);
      this.entries = this.sort(this.entries);
    },
  },
  watch: {
    moreThanOneRanking() {
      this.updateEntries();
    },
    sorting() {
      this.updateEntries();
    },
  },
  async created() {
    this.getAll();
  },
};
</script>

<style lang="scss" scoped>
.container {
  > h2 {
    margin: 4rem;
    font-weight: 500;
  }

  > .container__form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
}

.container__results {
  margin: 2rem 12rem 0 12rem;
}

.container__results__header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 1rem;

  > h2 {
    font-weight: 300;
    font-size: 25px;
  }
}

.container__results__content {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #c4c4c4;
  }
}
</style>

<style lang="scss">
@import "../style/colors.scss";
.checkbox > div {
  border: none;

  > input:hover {
    box-shadow: 2px 2px 4px #d2cfd9, -2px -2px 4px #ffffff;
  }
}

.checkbox > div input.vs-checkbox ~ .vs-checkbox-mask {
  box-shadow: 2px 2px 4px #d2cfd9, -2px -2px 4px #ffffff;
  bottom: 2px;
}

.checkbox > div > .vs-checkbox:checked ~ .vs-checkbox-mask {
  background-color: $primary-color;
  box-shadow: none;

  &:after {
    box-shadow: inset 2px 2px 4px #987fcf, inset -2px -2px 4px #ceabff;
    background-color: $primary-color;
  }
}

.checkbox > div .vs-checkbox-mask:before {
  content: none;
}

.checkbox > div > input.vs-checkbox:hover ~ .vs-checkbox-mask {
  background: none;
}

.checkbox > div > input.vs-checkbox:checked ~ .vs-checkbox-mask i:not(.vs-icon-check) {
  transform: scale(1.7);
}

.checkbox > .vs-checkbox-label {
  font-size: 24px;
}

.checkbox > .vs-checkbox-con {
  width: 30px;
  height: 30px;
}
</style>
