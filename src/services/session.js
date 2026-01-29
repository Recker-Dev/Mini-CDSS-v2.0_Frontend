import { baseUrl } from "../util/defaults";

export const createNewSession = async (
  doc_id,
  pat_name,
  pat_age,
  pat_gender,
  pat_note,
) => {
  if (!doc_id || !pat_name || !pat_age || !pat_gender || !pat_note) return null;

  try {
    const apiUrl = `${baseUrl}/sessions`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doc_id,
        pat_name,
        pat_age: parseInt(pat_age),
        pat_gender,
        pat_note,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      return data;
    } else if (response.status === 400) {
      // User Facing Error
      console.log(data);
      return data;
    } else {
      console.log(data);
      return null;
    }
  } catch (err) {
    console.log("Session fetch failed: ", err);
    return null;
  }
};

export const getSessions = async (doc_id) => {
  if (!doc_id || doc_id.trim() === "") return null;

  try {
    const apiUrl = `${baseUrl}/sessions/doctor/${doc_id}`;

    const response = await fetch(apiUrl);

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      return data;
    } else if (response.status === 400) {
      // User Facing Error
      console.log(data);
      return data;
    } else {
      console.log(data);
      return null;
    }
  } catch (err) {
    console.log("Session fetch failed: ", err);
    return null;
  }
};

export const getSessionDetails = async (ses_id) => {
  if (!ses_id || ses_id.trim() === "") return null;

  try {
    const apiUrl = `${baseUrl}/sessions/${ses_id}`;

    const response = await fetch(apiUrl);

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      return data;
    } else if (response.status === 400) {
      // User Facing Error
      console.log(data);
      return data;
    } else {
      console.log(data);
      return null;
    }
  } catch (err) {
    console.log("Session fetch failed: ", err);
    return null;
  }
};