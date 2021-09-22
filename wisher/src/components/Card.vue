<template>
  <div style="display: flex; flex-direction: column;">
    <div class="card error">
      <div class="bar"></div>
      <p class="errormsg">ok man</p>
    </div>
    <div class="card form">
      <h1 class="card-title">Tahlil Wisher</h1>
      <div id="wrapper">
        <p><b>Wish Tahlil on his special day!</b></p>
        <center>
          <section>
            <input
              class="wisher"
              type="text"
              placeholder="Your Name:"
              required
            />
            <textarea class="wish" placeholder="Your Wish:" required></textarea>
          </section>
          <button type="submit" @click="submit()"><b>SUBMIT</b></button>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sound from "../assets/amogus.mp3";

export default {
  name: "Card",
  methods: {
    submit: () => {
      const wished = localStorage.getItem("wished");
      if (wished === "true") {
        document.querySelector(".errormsg").innerHTML =
          "You have already wished once!";
        document.querySelector(".error").style.display = "flex";

        const wisher = document.querySelector(".wisher");
        const wish = document.querySelector(".wish");

        wisher.disabled = true;
        wish.disabled = true;

        wish.value = "";
        wisher.value = "";

        wisher.classList.add("disabled");
        wish.classList.add("disabled");
      } else {
        const wisher = document.querySelector(".wisher").value;
        const wish = document.querySelector(".wish").value;

        if (wisher === "" || wish === "") {
          document.querySelector(".errormsg").innerHTML =
            "All Fields are Required!";
          document.querySelector(".error").style.display = "flex";

          const wisher = document.querySelector(".wisher");
          const wish = document.querySelector(".wish");

          wisher.classList.add("required");
          wish.classList.add("required");
        } else {
          axios
            .post(
              "https://amogus-db.nehanyaser.repl.co/add?api_key=2426&document=Wishes",
              {
                wisher: wisher,
                wish: wish,
              }
            )
            .then((response) => console.log(response.data));
          localStorage.setItem("wished", true);
          document.querySelector(".error").style.display = "none";

          const form = document.querySelector(".form");
          form.style.height = "auto";

          const wrapper = document.querySelector("#wrapper");
          wrapper.innerHTML = "<p>Your wish has been submitted! </p>";

          const audio = new Audio(sound);
          audio.play();
        }
        navigator.vibrate(100);
      }
    },
  },
};
</script>

<style>
.card {
  background: #fff;
  border-radius: 8px;
  display: inline-block;
  /* padding: 15px; */
  margin: 1rem;
  position: relative;
  width: 300px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.card-title {
  font-weight: 800;
  color: white;
  background: #2080ff;
  border-radius: 6px 6px 0px 0px;
  padding: 15px;
}
.form {
  height: 402px;
}
.error {
  height: auto;
  display: flex;
  flex-direction: row;
  display: none;
}
.bar {
  min-height: 100%;
  width: 18px;
  background: #2080ff;
  border-radius: 6px 0 0 6px;
}
p {
  margin: 25px 0px 25px 25px;
  font-weight: bold;
  color: rgb(24, 24, 24);
}
section {
  margin: 20px 0;
}
input,
textarea {
  width: 250px;
  margin: 10px 0;
}
input:focus,
textarea:focus,
input:active,
textarea:active {
  background: none;
}
input {
  background: none;
  margin-top: 0;
  height: 40px;
  border: none;
  outline: none;
  border-bottom: 2px solid rgb(32, 128, 255);
  transition: 0.2s ease-in-out;
  color: black;
  font-weight: 800;
}
textarea {
  height: 100px;
  padding: 10px;
  resize: none;
  outline: none;
  border: 2px solid rgb(32, 128, 255);
  color: black;
  font-weight: 800;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}
button {
  width: 252px;
  height: 50px;
  color: rgb(25, 105, 211);
  border: none;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #d8d8d8;
}
::placeholder {
  color: black;
  font-weight: 800;
}
.disabled::placeholder {
  color: rgb(88, 88, 88);
}
.required::placeholder {
  color: red;
}
</style>
