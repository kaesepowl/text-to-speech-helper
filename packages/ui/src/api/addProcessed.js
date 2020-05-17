const addProcessed = (text) =>
  fetch("http://localhost:8080/processed", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      accessKeyId: localStorage.getItem("access-key-id"),
      secretAccessKey: localStorage.getItem("secret-access-key"),
    }),
  }).then((res) => res.json());

export default addProcessed;
