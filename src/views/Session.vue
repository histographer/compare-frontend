<template>
  <div>
    <h1>Fortell oss litt om deg selv!</h1>
    <div class="container">
      <h3><i class="bx bx-desktop" />Skjerm</h3>
      <p>
        Vi ønsker å vite hvilken type skjerm du bruker for å bedre kunne forstå hvordan det påvirker
        valgene du gjør.
      </p>
      <div class="screen">
        <vs-select placeholder="Velg skjerm-type" color="#A581EF" v-model="screen">
          <vs-option label="Medisinsk" value="medical_grade">
            Medisinsk
          </vs-option>
          <vs-option label="Profesjonell" value="professional_grade">
            Profesjonell
          </vs-option>
          <vs-option label="Vanlig" value="normal_grade">
            Vanlig
          </vs-option>
          <vs-option label="Mobil" value="mobile_grade">
            Mobil
          </vs-option>
        </vs-select>
      </div>
    </div>
    <div class="container">
      <h3><i class="bx bx-home-alt" />Institusjon</h3>
      <p>
        Vi ønsker å vite hvilken institusjon du tilhører for å forstå hvordan de forskjellige institusjonene velger. Merk at du ikke vil bli satt opp som representant for institusjonen din.
      </p>
      <div class="location">
        <vs-input class="location__input" v-model="location" state="#f7f3ff" label-placeholder="Eks. St. Olavs Hospital" style="font-size: 24px" />
      </div>
    </div>
    <vs-button class="continue-button" size="xl" color="#A581EF" transparent @click="handleClick">Fortsett <i class="bx bx-caret-right"/></vs-button>
  </div>
</template>

<script>
import { postData } from '../utils/requests';

export default {
  name: 'Session',
  data() {
    return {
      screen: '',
      location: '',
    };
  },
  methods: {
    async handleClick() {
      if (this.screen === '' || this.location === '') {
        this.handleError();
        return;
      }
      const data = {
        monitorType: this.screen,
        hospital: this.location,
      };
      await postData(`${this.$store.state.baseUrl}/session`, data);
      await window.localStorage.setItem('isLoggedIn', 'Yes');
      await this.$router.push('/');
    },
    handleError() {
      this.$vs.notification({
        color: 'danger',
        position: 'bottom-right',
        title: 'Oops! Du glemte å fylle ut alt!',
        text: 'For å gå videre må du fylle ut både feltet for skjerm-type og institusjon.',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  width: 500px;
  margin: auto;
  line-height: 1.5;
  font-size: 14px;
}

h3 {
  font-size: 22px;
  font-weight: 300;

  > i {
    margin-right: 4px;
  }
}

.container {
  margin: 55px 0;

  ~ .container {
    margin-top: 100px;
  }
}

.screen {
  display: inline-blocK;
  font-size: 24px;
  margin-top: 10px;

  > .vs-radio-content {
    justify-content: flex-start;
    margin: 15px 0;
  }
}

.location {
  width: fit-content;
  margin: 50px auto;
  border-radius: 43px;
}

.continue-button {
  margin: auto;
  top: 50px;
}
</style>

<style lang="scss">
@import "../style/colors.scss";

.vs-notification-parent {
  font-family: 'Comfortaa', Helvetica, Arial, sans-serif;
}

.vs-input {
  background: $background-color !important;
  box-shadow: 5px 5px 10px #d2cfd9, -5px -5px 10px #ffffff;
  padding: 17px 13px 17px 10px !important;
  width: 400px !important;
  font-size: 1.4rem;

  &:focus {
    box-shadow: inset 2px 2px 4px #d2cfd9, inset -2px -2px 4px #ffffff;
    margin-top: 3px;
  }
}

.vs-input__label {
  font-size: 1.2rem !important;
}

.vs-select {
  margin-top: 15px;
}

.vs-select-content {
  width: 400px !important;
  max-width: 400px !important;
}

.vs-select__input {
  background: $background-color !important;
  box-shadow: 5px 5px 10px #d2cfd9, -5px -5px 10px #ffffff;
  height: 60px;
  font-size: 1.2rem;

  &:hover {
    box-shadow: 5px 5px 10px #d2cfd9, -5px -5px 10px #ffffff !important;
  }

  &:focus {
    box-shadow: inset 2px 2px 4px #d2cfd9, inset -2px -2px 4px #ffffff !important;
  }
}

.vs-select__label {
  font-size: 1.2rem !important;
  height: 40px;
}

.vs-select__option {
  font-size: 1.2rem;
  padding: 10px !important;
}

.vs-select__options {
  background: $background-color !important;
}
</style>
