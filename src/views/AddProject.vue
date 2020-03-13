<template>
   <div class="container">
     <h1><i class="bx bx-spreadsheet" style="margin-right:5px;"/>Legg til et prosjekt</h1>
     <vs-input
       v-model="addProjectId"
       class="container__input"
       label-placeholder="Prosjekt ID"
       autocomplete="off"
     />
     <transition name="pop">
       <p v-if="sent" :class="messageColor">
         {{ message }}
       </p>
     </transition>
     <vs-button
       circle
       color="#b395f3"
       size="xl"
       class="container__button"
       :loading="loading"
       @click="addProject"
     >
       Legg Til
     </vs-button>
   </div>
</template>

<script>
export default {
  name: 'addProject',
  data() {
    return {
      addProjectId: '',
      loading: false,
      sent: false,
      messageColor: '',
      message: '',
    };
  },
  watch: {
    addProjectId() {
      this.sent = false;
    },
  },
  methods: {
    myFirstPromise() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) reject();
          resolve();
        }, 1000);
      });
    },
    async addProject() {
      this.loading = true;
      try {
        await this.myFirstPromise();
        this.messageColor = 'message-success';
        this.message = 'Prosjektet ble lagt til.';
      } catch (e) {
        this.messageColor = 'message-danger';
        this.message = 'Det oppsto en feil.';
      }
      this.loading = false;
      this.sent = true;
    },
  },
};
</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    > .container__input {
      margin-top: 50px;
    }

    > .container__button {
      box-shadow: 7px 7px 14px #e1dde8, -7px -7px 14px #ffffff;
      margin: 2rem auto;
      font-size: 20px;

      &:hover {
        transform: translate(0, 0);
      }
    }

    > p {
      font-size: 1.2rem;
      margin-bottom: 3rem;
      margin-top: 2rem;

      &.message-success {
        color: rgb(70, 201, 58);
      }
      &.message-danger {
        color: rgb(255, 71, 87);
      }
    }
  }

  .pop-enter-active, .pop-leave-active {
    transition: all .5s ease;
  }
  .pop-enter, .pop-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

</style>

<style lang="scss">
@import "../style/colors.scss";

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

.vs-button__loading {
  box-shadow: inset 7px 7px 14px #987fcf, inset -7px -7px 14px #ceabff;
  background: red;
}
</style>
