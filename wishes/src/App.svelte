<script>
  import Card from "./components/Card.svelte";

  let wishes = [];

  fetch("https://proxy.nehanyaser.repl.co/wisher?document=Tahlil")
    .then((res) => res.json())
    .then((data) => {
      wishes = data;
      document.querySelector(".loader").style.display = "none";
    });
</script>

<main>
  <header>
    <h1>Happy Birthday, <span style="color: #3db2ff;">You!</span></h1>

    <p>Here is a compilation of birthday wishes from everyone we could find.</p>
  </header>

  <div class="loader">
    <div uk-spinner="ratio: 2" />
  </div>

  <main class="container">
    <Card {wishes} />
  </main>

  <footer>
    <center>
      <h3 style="margin-bottom: 10px;">Made with Svelte, Vue and MangoDB</h3>
      <a href="https://wish-tahlil.vercel.app/" target="blank"
        >https://wish-tahlil.vercel.app/</a
      >
    </center>
  </footer>
</main>

<style>
  header {
    padding: 30px;
    padding-bottom: 0;
  }
  p {
    margin: 20px 0;
    margin-bottom: 0;
  }
  .loader {
    min-height: calc(100vh - 365px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  footer {
    background: #3db2ff;
    color: white;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 10px;
  }
  h3,
  a {
    color: white;
  }
  a:hover {
    color: white;
  }
</style>
