<template>
  <div id="app">
      <router-view />
  </div>
</template>

<style lang="scss">
@import "./style/colors.scss";
html, body {
  margin: 0;
  height: 100%;
}

body {
  background: $background-color;
  font-family: "Comfortaa", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button,
input,
select,
optgroup,
textarea {
  font-family: "Comfortaa", Helvetica, Arial, sans-serif;
}

#app {
  display: flex;
  height: 100%;
  flex-flow: column;
  text-align: center;
  color: #2c3e50;
}
</style>
