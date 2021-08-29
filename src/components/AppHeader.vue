<template>
  <header>
    <img src="../assets/logo.png" alt="logo" height="50" />
    <p>Vyzývačky 2.2</p>
    <nav>
      <ul>
        <li><router-link to="#">Game setup</router-link></li>
        <li><router-link to="#">Participant Scoreboard</router-link></li>
        <li><router-link to="#">Team Scoreboard</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 1rem;

  p {
    margin-left: 1rem;
  }
}

nav {
  margin-left: auto;

  ul {
    list-style: none;
  }

  ul li {
    display: inline-flex;
    margin-left: 1rem;
  }
}
</style>