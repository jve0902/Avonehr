export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && patient.accessToken) {
    // for Node.js Express back-end
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
