<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import './style/colors.scss';
body{
  background: $background-color;
  font-family: 'Comfortaa', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
