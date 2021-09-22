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
  const url = `http://localhost:3000/remove?index=${id}&api_key=2426&document=${doc}`;

  if (id === "" || id < 0) {
    alert("invalid id!");
  } else {
    const http = new DeleteHTTP();

    http
      .delete(url)

      .then((data) => alert(data))

      .catch((err) => console.log(err));
  }
}
