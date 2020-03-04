<template>
   <div class="container">
     <h1>Oops! Fant ikke siden.</h1>
     <p>Vi klarte ikke å finne den siden. Det kan være at du bruker en gammel link, eller at siden er blitt flyttet.</p>
     <vs-button class="container__button" flat size="l" color="#A581EF" to="/">Klikk her for å gå tilbake til hjem</vs-button>
   </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .container__button {
    margin: auto;
  }
</style>
