<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Layout from "./components/Layout.vue"

export default defineComponent({
  name: "App",
  components: { Layout },
})
</script>

<style>
/* Reset & box-sizing */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Theme colors */
:root {
  --white: #ffffff;

  --gray-100: #e1e1e6;
  --gray-300: #a8a8b3;
  --gray-700: #323238;
  --gray-800: #29292e;
  --gray-850: #1f2729;
  --gray-900: #121214;

  --cyan-500: #00c8ff;
  --yellow-500: #eba417;
}

/* Responsive font sizing */
@media (max-width: 1080px) {
  html {
    font-size: 93.75%;
  }
}

@media (max-width: 720px) {
  html {
    font-size: 87.5%;
  }
}

/* Body styling */
body {
  background: #e7e7e7;
  font: 400 1rem "Roboto", sans-serif;
}

/* Inputs, buttons, and links */
input,
textarea,
select,
button {
  font: inherit;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
