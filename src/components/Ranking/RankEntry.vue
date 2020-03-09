<template>
    <div class="container">
      <span class="name">{{ id }}</span>
      <span class="score">{{ score }}</span>
      <span class="rankings">{{ rankings }}</span>
    </div>
</template>

<script>
export default {
  name: 'RankEntry',
  props: {
    id: Number,
    score: Number,
    rankings: Number,
  },
};
</script>

<style lang="scss" scoped>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-radius: 15px;
    box-shadow:  10px 10px 20px #d2cfd9, -10px -10px 20px #ffffff;
    padding: 20px;
    font-size: 30px;
    margin-bottom: 25px;
    height: 50px;
    align-items: center;

    > .score, .rankings {
      font-size: 35px;
    }

    > .name {
      font-weight: 300;
    }
  }
</style>
