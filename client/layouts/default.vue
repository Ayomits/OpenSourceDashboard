<template>
  <div>
    <Header />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import Header from '~/components/elements/Header.vue';

</script>

<style>
body {
  background-color: #020420;
  color: white;
}
</style>