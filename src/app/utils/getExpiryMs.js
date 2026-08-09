// Helper to compute a millisecond timestamp for when the token expires,
// so the frontend can schedule an exact auto-logout without re-decoding.

import jwt from "jsonwebtoken";

export const getExpiryMs = (token) => {
  const decoded = jwt.decode(token);
  return decoded?.exp ? decoded.exp * 1000 : null;
};
