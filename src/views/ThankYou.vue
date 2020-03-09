<template>
   <div class="container">
     <h1>Takk for at du deltok.</h1>
     <p>Vi setter stor pris tilbakemeldingen din.</p>
     <h3>Du kan enkelt fortsette der du slapp ved å besøke oss senere.</h3>
   </div>
</template>

<script>
export default {
  name: 'ThankYou',
};
</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    > h1 {
      font-size: 3rem;
    }
    > p {
      font-size: 1.5rem;
    }
    > h3 {
      margin-top: 5rem;
      font-size: 1rem;
      font-weight: 300;
    }
  }
</style>
