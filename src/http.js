export async function fetchData(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("failed to load data!");
  }

  return await res.json();
}

export async function saveData(
  url,
  method,
  body,
  headers = { "Content-Type": "application-json" }
) {
  const res = await fetch(url, {
    method,
    body,
    headers,
  });

  console.log(res);

  if (!res.ok) {
    throw new Error("failed to save data!");
  }

  return await res.json();
}
