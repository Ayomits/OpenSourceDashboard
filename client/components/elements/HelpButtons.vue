<template>
  <div>
    <nav class="helpbuttons">
      <ul class="helbuttons-list">
        <li>
          <button class="image-button">
            <a target="_blank" href="https://github.com/Dovolentoboy/OpenSourceDashboard">
              <img src="../../assets/github.png" alt="">
            </a>
          </button>
        </li>
        <li>
          <button class="image-button"><img src="../../assets/glass.png" alt=""></button>
        </li>
        <li>
          <button class="image-button"><img src="../../assets/moon.png" alt=""></button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.helpbuttons ul {
  list-style: none;
  display: flex;
  align-items: center;
}

.helpbuttons li {
  margin-left: 10px;
}

.image-button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}

@media (max-width: 768px) {
  .helpbuttons {
    margin-top: 1.5%;
    margin-left: 3%;
    display: flex;
    justify-content: center;
  }
}
</style>