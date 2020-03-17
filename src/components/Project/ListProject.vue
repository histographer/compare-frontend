<template>
  <div class="container">
    <p>{{ name }}</p>
    <vs-switch color="#b395f3" v-model="currentActive">
      <template #off>
        Inaktiv
      </template>
      <template #on>
        Aktiv
      </template>
    </vs-switch>
  </div>
</template>

<script>
export default {
  name: 'ListProject',
  props: {
    active: Boolean,
    name: String,
    index: Number,
  },
  data() {
    return {
      currentActive: this.active,
    };
  },
  watch: {
    currentActive() {
      this.$emit('changeActiveProject', this.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 100px;
  align-items: center;
  height: 80px;
  text-align: left;
  > p {
    padding-left: 2rem;
  }
}
</style>
