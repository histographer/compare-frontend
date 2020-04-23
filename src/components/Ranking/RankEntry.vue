<template>
    <div class="container">
      <span class="name">{{ name }}</span>
      <span class="id">{{ id }}</span>
      <span class="score">{{ score.toFixed(2) }}</span>
      <span class="rankings">{{ rankings }}</span>
    </div>
</template>

<script>
export default {
  name: 'RankEntry',
  props: {
    id: Number,
    fileName: String,
    score: Number,
    rankings: Number,
  },
  computed: {
    name() {
      const regex = new RegExp('/(.+)/(.+)');
      return this.fileName.match(regex)[2];
    },
  },
};
</script>

<style lang="scss" scoped>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-radius: 15px;
    box-shadow:  10px 10px 20px #d2cfd9, -10px -10px 20px #ffffff;
    padding: 20px;
    font-size: 30px;
    margin-bottom: 25px;
    min-height: 50px;
    align-items: center;

    > .score, .rankings {
      font-size: 35px;
    }

    > .name {
      font-weight: 300;
      font-size: 1em;
    }
  }
</style>
