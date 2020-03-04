<template>
  <div>
    <h1>Fortell oss litt om deg selv!</h1>
    <h3>Skjerm</h3>
    <p>
      Vi ønsker å vite hvilken skjerm du bruker for å bedre kunne forstå hvordan det påvirker
      valgene du gjør.
    </p>
    <div class="screen-selection">
      <vs-radio color="#A581EF" v-model="screen" val="medical_grade">
        Medisinsk
      </vs-radio>
      <vs-radio color="#A581EF" v-model="screen" val="professional_grade">
        Profesjonell
      </vs-radio>
      <vs-radio color="#A581EF" v-model="screen" val="normal_grade">
        Vanlig
      </vs-radio>
      <vs-radio color="#A581EF" v-model="screen" val="mobile_grade">
        Mobil
      </vs-radio>
    </div>
    <h3>Intitusjon</h3>
    <p>
      Vi ønsker å vite hvilken intitusjon du tilhører for å forstå hvordan dette påvirker valgene
      dine. Merk: Du vil ikke bli satt opp som representant for intitusjonen din.
    </p>
    <div class="location-selection">
      <vs-input v-model="location" state="#f7f3ff" label-placeholder="Eks. St. Olavs Hospital" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Session',
  data() {
    return {
      screen: null,
      location: '',
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../style/colors.scss";
p {
  width: 500px;
  margin: auto;
  line-height: 1.5;
}

.screen-selection {
  display: inline-blocK;

  > .vs-radio-content {
    justify-content: flex-start;
    margin: 15px 0;
  }
}
.location-selection {
  width: fit-content;
  margin: 20px auto;
  border-radius: 43px;
}
</style>

<style lang="scss">
@import "../style/colors.scss";
.vs-input {
  background: $background-color !important;
  box-shadow: 5px 5px 10px #d2cfd9, -5px -5px 10px #ffffff;

  &:focus {
    box-shadow: inset 2px 2px 4px #d2cfd9, inset -2px -2px 4px #ffffff;
    margin-top: 3px;
  }
}

.vs-radio {
  background: $background-color !important;
  box-shadow: 2px 2px 8px #d2cfd9, -2px -2px 8px #ffffff;
}

.vs-radio-content .active {
  --vs-color: red !important;
}
</style>
