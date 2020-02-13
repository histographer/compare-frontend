<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <CytomineImage />
    <CytomineImage />
  </div>
</template>

<script>
import CytomineImage from '../components/CytomineImage/CytomineImage.vue';

export default {
  name: 'home',
  components: {
    CytomineImage,
  },
};
</script>
