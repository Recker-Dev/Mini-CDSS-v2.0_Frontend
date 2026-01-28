import { baseUrl } from "../util/defaults";

export const authUser = async (email, password) => {
  const apiUrl = `${baseUrl}/doctors/login`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  // Success (200)
  if (response.ok) {
    return {
      id: data.id,
      name: data.name,
      authenticated: true,
    };
  }

  // Invalid credentials / bad request/ server error (400+ )
  if (response.status >= 400) {
    const errorMsg =
      typeof data.detail === "string" ? data.detail : "Invalid credentials";

    console.log("Login Error payload: ", data);

    return {
      authenticated: false,
      error: errorMsg,
    };
  }
};
