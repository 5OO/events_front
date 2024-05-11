<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header>
      <RouterLink to="/">
      <img alt="Nullam logo" class="logo" src="@/assets/logo-left.svg"  />
        </RouterLink>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/add-event">Add Event</RouterLink>
      </nav>
      <img alt="Small logo" class="logo" src="@/assets/logo-symbol-right-hd.svg" width="50" height="50" style="padding-top: 10px" />
    </header>

    <RouterView />

    <footer>
      <div class="footer-column">
        <h3>Heading 1</h3>
        <p>Row 1</p>
        <p>Row 2</p>
        <p>Row 3</p>
        <p>Row 4</p>
      </div>
      <div class="footer-column">
        <h3>Heading 2</h3>
        <p>Row 1</p>
        <p>Row 2</p>
        <p>Row 3</p>
        <p>Row 4</p>
      </div>
      <div class="footer-column">
        <h3>Contacts</h3>
        <p class="bold">Contact 1</p>
        <p>Detail 1</p>
        <p>Detail 2</p>
        <p>Detail 3</p>
      </div>
      <div class="footer-column">
        <p></p>
        <p class="bold">Contact 2</p>
        <p>Detail 1</p>
        <p>Detail 2</p>
        <p>Detail 3</p>
      </div>
    </footer>

  </div>
</template>

