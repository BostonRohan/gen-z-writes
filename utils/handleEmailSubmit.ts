export default async function handleSubmit(url: string, email: string) {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
