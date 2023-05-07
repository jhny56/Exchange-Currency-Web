const URL = "http://localhost:3001";

export default async function Post(endpoint, data) {
  let response = await fetch(URL + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
