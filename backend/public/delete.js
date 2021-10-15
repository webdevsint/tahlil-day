class DeleteHTTP {
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    const resData = "entry deleted!";

    return resData;
  }
}

function clickHandler() {
  const doc = document.querySelector(".document").value;
  const id = document.querySelector(".index").value;
  const key = document.querySelector(".key").value;
  const url = `https://amogus-db.nehanyaser.repl.co/?api_key=${key}&document=${doc}`;

  if (id === "" || id < 0) {
    alert("invalid id!");
  } else {
    const http = new DeleteHTTP();

    http
      .delete(url)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
}
