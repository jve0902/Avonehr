export default function authHeader() {
  const patient = JSON.parse(localStorage.getItem("patient"));

  if (patient && patient.accessToken) {
    // for Node.js Express back-end
    return { "x-access-token": patient.accessToken };
  } else {
    return {};
  }
}
