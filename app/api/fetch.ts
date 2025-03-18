export default async function fetchAPI(
  fetchMethod: string,
  fetchRoute: string,
  fetchBody?: string
) {
  try {
    if (fetchMethod == "GET") {
      const response = await fetch(process.env.AUTH_URL + "api" + fetchRoute, {
        cache: "no-store",
      });
      const data = await response.json();
      return data;
    } else {
      const response = await fetch(process.env.AUTH_URL + "api" + fetchRoute, {
        method: fetchMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: fetchBody,
        cache: "no-store",
      });
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return error;
  }
}
