<template>
  <div>
    <div class="container">
      <h1><i class="bx bx-spreadsheet" style="margin-right:5px;"/>Prosjekter</h1>
      <p>På denne siden kan du enkelt velge hvilke av prosjektene som skal være aktive.</p>
      <div v-if="allProjects.length > 0" class="container__content">
        <template  v-for="(project, index) in allProjects">
          <ListProject
            :class="index < allProjects.length - 1 ? 'border__bottom' : ''"
            :key="index"
            :name="project.name"
            :active="activeProjects[index]"
            :id="project.id"
            :index="index"
            @changeActiveProject="changeActiveProject"
          />
        </template>
      </div>
      <h3 v-else>Ingen tilgjengelige prosjekter</h3>
    </div>
    <AddProject @addedNewProject="updateAllProjects" />
  </div>
</template>

<script>
import ListProject from '../components/Project/ListProject.vue';
import AddProject from '../components/Project/AddProject.vue';
import { getData } from '../utils/requests';

export default {
  name: 'AllProjects',
  components: {
    AddProject,
    ListProject,
  },
  data() {
    return {
      allProjects: [],
      activeProjects: [],
    };
  },
  methods: {
    async changeActiveProject(index) {
      this.activeProjects[index] = !this.activeProjects[index];
      await getData(`${this.$store.state.baseUrl}/project/update?projectId=${this.allProjects[index].id}&active=${this.activeProjects[index]}`);
    },
    updateAllProjects(project) {
      this.allProjects.push(project);
      this.activeProjects.push(false);
    },
  },
  async created() {
    let response = await getData(`${this.$store.state.baseUrl}/project`);
    response = await response.json();
    this.allProjects = response;
    this.activeProjects = this.allProjects.map(project => project.active);
  },
};
</script>

<style lang="scss" scoped>
  .container__content {
    width: 50%;
    margin: 5rem auto;
  }

  .container {
    > button {
      margin: auto;
    }
  }

  .border__bottom {
    border-bottom: 1px solid #d6d6d6;
  }
</style>

<style lang="scss">
  @import '../style/colors.scss';

 .vs-switch {
   box-shadow: 2px 2px 4px #d2cfd9, -2px -2px 4px #ffffff;
 }

</style>
