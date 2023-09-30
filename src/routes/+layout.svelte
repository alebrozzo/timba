<nav />
<aside>
  <div class="nav">
    <h2><a href="/">Home</a></h2>
    <h2><a href="/dice">Dice</a></h2>
    <h2><a href="/cards">Cards</a></h2>
    <h2><a href="/numbers">Numbers</a></h2>
  </div>
</aside>
<main>
  <slot />
</main>

<style>
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: gray;
  }

  h2 {
    width: 50%;
    background-color: black;
    text-align: center;
  }

  a {
    color: yellow;
    text-decoration: none;
  }
</style>
