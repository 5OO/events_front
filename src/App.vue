<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header>
      <img alt="Nullam logo" class="logo" src="@/assets/logo-left.svg"  />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <img alt="Small logo" class="logo" src="@/assets/logo-symbol-right-hd.svg" width="50" height="50" style="padding-top: 10px" />
    </header>

    <RouterView />

    <footer>
      <!-- Add your footer content here -->
      © 2024 Nullam Events. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

nav {
  display: flex;
  gap: 16px; /* Adjust the gap between links as necessary */
}

nav a {
  text-decoration: none;
  color: #333; /* Adjust color as needed */
  padding: 10px;
  border-radius: 5px;
}

nav a:hover {
  background-color: #f0f0f0; /* Adjust hover background color as needed */
}

footer {
  margin-top: auto;
  padding: 20px;
  text-align: center;
}
</style>
