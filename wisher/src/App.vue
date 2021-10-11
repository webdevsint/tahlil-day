<template>
  <div id="container">
    <div class="loader">
      <loader
        object="#2080ff"
        color1="#ffffff"
        color2="#2080ff"
        size="5"
        speed="2"
        bg="#343a40"
        objectbg="#999793"
        opacity="0"
        name="circular"
      ></loader>
      <p class="copy">&copy; Amogus Incorporated</p>
    </div>
    <div class="wrapper">
      <Card />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "./components/Card.vue";

export default {
  name: "App",
  components: {
    Card,
  },
  created: () => {
    axios
      .get(
        "https://amogus-db.nehanyaser.repl.co/api?api_key=2426&document=Wishes"
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("ok", response.status);
          document.querySelector(".loader").style.display = "none";
          document.querySelector(".wrapper").style.display = "block";
        }
      })
      .catch(function(error) {
        const status = error.response.status;
        if (status === 400 || status === 404) {
          const comment = 'Access not authorized!'
          document.querySelector('.loader').innerHTML = `<p style="color: white">${error}<br>${comment}</p>`
        } else {
          const comment = 'Cannot reach server!'
          document.querySelector('.loader').innerHTML = `<p style="color: white">${error}<br>${comment}</p>`
        }
      });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Lato", sans-serif;
}
.loader {
  background-image: url("./assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
}
.wrapper {
  display: none;
}
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("./assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  max-zoom: 1;
}
.copy {
  color: white;
  position: fixed;
  left: 6px;
  bottom: 6px;
}
</style>
