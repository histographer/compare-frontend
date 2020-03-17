<template>
   <div class="container">
     <h2>Legg til et prosjekt</h2>
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
import { postData, getData } from '../../utils/requests';

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
    async addProject() {
      this.loading = true;
      const POST = {
        projectId: Number(this.addProjectId),
      };
      const response = await postData(`${this.$store.state.baseUrl}/project`, POST);
      if (response.status === 200) {
        this.messageColor = 'message-success';
        this.message = 'Prosjektet ble lagt til.';
        // Send new project back
        let newProject = await getData(`${this.$store.state.baseUrl}/project?projectId=${this.addProjectId}`);
        newProject = await newProject.json();
        this.$emit('addedNewProject', newProject);
      } else {
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
    margin-top: 50px;

    > .container__input {
      margin: 50px auto;
      width: fit-content;
    }

    > .container__button {
      box-shadow: 7px 7px 14px #e1dde8, -7px -7px 14px #ffffff;
      margin: 2rem auto;
      font-size: 20px;

      &:hover {
        transform: translate(0, 0);
      }
    }

    > h2 {
      font-weight: 200;
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
@import "../../style/colors.scss";

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
