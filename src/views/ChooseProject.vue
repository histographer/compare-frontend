<template>
   <div class="container">
     <h1>Velg prosjekt</h1>
     <div v-if="availableProjects.length > 0">
       <vs-select color="#b395f3" placeholder="Velg prosjekt" v-model="selectedProject">
         <template v-for="(project, index) in availableProjects">
           <vs-option :key="project.id" :label="project.name" :value="index + 1">
             {{ project.name }}
           </vs-option>
         </template>
       </vs-select>
     </div>
     <vs-button class="continue-button" size="xl" color="#b395f3" transparent @click="handleClick">Fortsett <i class="bx bx-chevron-right"/></vs-button>
   </div>
</template>

<script>
import { getData } from '../utils/requests';

export default {
  name: 'ChooseProject',
  data() {
    return {
      selectedProject: '',
      availableProjects: [],
    };
  },
  methods: {
    handleClick() {
      // Set current project in global state
      this.$store.commit('setCurrentProject', this.availableProjects[this.selectedProject - 1]);
      this.$router.push('/session');
    },
    async getAllProjects() {
      this.availableProjects = await getData(`${this.$store.state.baseUrl}/project`);
    },
  },
  created() {
    this.getAllProjects();
  },
};
</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .continue-button {
    margin: auto;
    top: 50px;
  }
</style>
