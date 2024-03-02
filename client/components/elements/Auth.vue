<template>
  <div>
    <button @click="redirectToLogin" class="auth-btn">
      Sign in
    </button>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { backendUrl, frontendUrl } from '~/env';
import { onMounted } from 'vue';
import {decode} from 'jsonwebtoken'
import type { userType } from './types/types';

const userData = ref()

const token = window.localStorage.getItem(`token`)
if (token) {
  userData.value = decode(token) as userType
}

async function redirectToLogin() {
  const response = await axios.get(backendUrl+ `/auth/discord/loginlink`)
  window.location.href = response.data
}

async function checkToken() {
  const urlSearchParam = new URLSearchParams(window.location.search)
  const token = urlSearchParam.get(`accessToken`)
  console.log(token)
  if (token) {
    localStorage.setItem(`token`, token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    window.location.href = frontendUrl
  }
}
onMounted(async () => {
  await checkToken()
})
</script>

<style scoped>
.auth-btn {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  color: white;
  font-size: 20px;
}

.auth-btn:hover {
  color: #00DC82;
  transition-delay: 0.5ms;
}

@media (max-width: 768px) {
  .auth-btn {
    font-size: 15px;
  }
}
</style>