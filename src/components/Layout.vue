<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Layout",
})
</script>

<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0.9375rem;
  height: 100vh;
}
</style>
