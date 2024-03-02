<template>
  <div class="header">
    <router-link to="/">
      <Logo />
    </router-link>
    <ElementsNavigation class="navigation" />
    <ElementsHelpButtons class="helpbuttons"/>
    <ElementsAuth class="auth" />
  </div>
</template>

<script lang="ts" setup>
import Logo from '../UI/Logo.vue';


</script>

<style>
.header {
  max-width: 60%;
  margin: 0 23%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {
 color: #00DC82; 
}

.navigation {
  margin-top: 1.5%;
  margin-left: 7%;
}

.helpbuttons {
  margin-top: 2.5%;
  margin-left: 3%;
}

.auth {
  margin-top: 1.5%;
  margin-left: 4%;
  font-size: 30px;
}

</style>