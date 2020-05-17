const addProcessed = (text) =>
  fetch('http://localhost:8080/processed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
    }),
  }).then((res) => res.json());

export default addProcessed;
