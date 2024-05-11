<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container container">
    <header class="d-flex header justify-content-between align-items-center mb-3">
      <RouterLink to="/" class="navbar-brand">
        <img alt="Nullam logo" class="logo" src="@/assets/logo-left.svg" />
      </RouterLink>
      <nav class="navbar">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/add-event" class="nav-link">Add Event</RouterLink>
      </nav>
      <img alt="Small logo" class="logo" src="@/assets/logo-symbol-right-hd.svg" />
    </header>

    <RouterView />

    <footer class="footer mt-4 pt-4 border-top footer-background">
      <div class="row">
        <div class="col footer-column">
          <h3>Randomize</h3>
          <p>Row 1</p>
          <p>Row 2</p>
          <p>Row 3</p>
          <p>Row 4</p>
        </div>
        <div class="col footer-column">
          <h3>Anotherone</h3>
          <p>Row 1</p>
          <p>Row 2</p>
          <p>Row 3</p>
          <p>Row 4</p>
        </div>
        <div class="col footer-column">
          <h3>Contacts</h3>
          <p class="fw-bold">Head quarter</p>
          <p>Stree no 1, City</p>
          <p>Phone: +1 324 242 2332</p>
          <p>email: nomail@send-to.me</p>
        </div>
        <div class="col footer-column">
          <p style="color: transparent;">&nbsp;</p>
          <p class="fw-bold">back office</p>
          <p>No street no 777, Inter City</p>
          <p>Phone: +1 423 323 1322</p>
          <p>email: please@send-to.me</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.logo {
  height: 50px;
  width: auto;
  background-color: transparent;
}
.header {
  width: 100%; /* full width */
  max-width: 1200px; /* max width to maintain layout consistency */
  margin: 0 auto; /* centers the header */
  display: flex;
  justify-content: space-between; /* spaces out logo, nav, and small logo */
  align-items: center; /* vertically centers the content */
}

.navbar {
  display: flex;
  align-items: center;
}

.nav-link:active, .nav-link:hover {
  background-color: #005aa1;
  color: white;
  opacity: 0.8;
}
.nav-link {
  text-transform: uppercase;
  padding: 10px;
  margin-left: 10px;
}

.footer {
  width: 100%; /* full width */
  max-width: 1200px; /* max width to maintain layout consistency */
  margin: 0 auto; /* centers the header */
}

.footer-background {
  background-color: #373737;
}

.footer-column h3, .footer-column p {
  color: #fff;
}

.footer-column {
  text-align: left;
}


.footer-column {
  margin-left: 30px;
  margin-bottom: 15px;
  padding: 10px; /* Adds padding within each column for spacing */
}

</style>

