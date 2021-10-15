<script>
  export let wishes = [];

  console.log(wishes);
</script>

{#each wishes as wish (wish.id)}
  <div class="card">
    <div class="from"><h3>{wish.wisher}</h3></div>
    <hr />
    <div class="wish">{wish.wish}</div>
  </div>
{/each}

<style>
  .card {
    background: #fff;
    border-radius: 2px;
    display: inline-block;
    margin: 1rem auto;
    position: relative;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    padding: 30px;
    width: 100%;
  }
  .from h3 {
    color: rgb(61, 178, 255);
  }
  hr {
    margin: 10px 0 20px 0;
    opacity: 0.7;
  }
</style>
