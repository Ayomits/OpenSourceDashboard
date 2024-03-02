<template>
  <div>
    <nav class="header-nav">
      <ul>
        <router-link to="/commands">
          <li>commands</li>
        </router-link>

        <router-link to="/API">
          <li>API</li>
        </router-link>

        <router-link to="/stats">
          <li>stats</li>
        </router-link>

        <router-link to="/subscribe">
          <li>subscribe</li>
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
* {
  font-size: 15px;
  font-family: "DM Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: bold;
  font-style: italic;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {
  color: #00DC82;
  transition-delay: 0.5ms;
}

.header-nav ul {
  list-style: none;
  display: flex;
  align-items: center;
}

.header-nav li {
  margin-right: 21px;
}

@media (max-width: 768px) {
  .header-nav {
    display: flex;
    justify-content: center;
    margin-top: 1.5%;
  }

  .header-nav ul {
    flex-wrap: wrap;
    justify-content: center;
  }

  .header-nav li {
    margin: 5px;
    font-size: 14px;
  }
}
</style>