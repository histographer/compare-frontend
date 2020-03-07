<template>
  <div class="container">
    <h2>Resultat fra prosjekt 251</h2>
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
        <h2>Navn</h2>
        <h2>Score</h2>
        <h2>Antall rangeringer</h2>
      </div>
      <div class="container__results__content">
        <rank-entry v-for="(entry, index) in results" :key="index" :name="entry.name" :score="entry.score" :rankings="entry.rankings" />
      </div>
    </div>
  </div>
</template>

<script>
import RankEntry from '../components/Ranking/RankEntry.vue';

export default {
  name: 'Ranking',
  components: {
    RankEntry,
  },
  data() {
    return {
      moreThanOneRanking: false,
      sorting: 'score_highlow',
    };
  },
  computed: {
    results() {
      const all = [];
      for (let i = 1; i < 20; i += 1) {
        all.push({
          name: `Snitt nummer ${i}`,
          score: i,
          rankings: i,
        });
      }
      return all;
    },
  },
  watch: {
    moreThanOneRanking() {
      console.log('send new post request');
    },
    sorting() {
      console.log('send new post request');
    },
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
    padding-left: 3rem;
    padding-right: 4rem;

    > h2 {
      font-weight: 300;
      font-size: 25px;
    }
  }

  .container__results__content {
    display: grid;
    grid-template-columns: 1fr;
    height: 60vh;
    grid-gap: 15px;
    overflow-y: scroll;
    padding: 3rem 3rem 8rem 3rem;

    &::-webkit-scrollbar-track
    {
      background: none;
    }

    &::-webkit-scrollbar
    {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb
    {
      border-radius: 10px;
      background-color: #C4C4C4;
    }
  }
</style>

<style lang="scss">
  @import '../style/colors.scss';
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
