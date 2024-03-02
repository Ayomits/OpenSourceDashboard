<template>
  <div class="logo">
    <span class="short--name">SB</span> <span class="full-name">Board</span>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

* {
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-style: italic;
}

.logo {
  display: flex;
  align-items: center;
  gap: 4px;
}

.short--name {
  font-size: 50px;
  color: #00DC82;
}

.full-name {
  font-size: 36px;
}
</style>