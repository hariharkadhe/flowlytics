import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as any;
}
export function getTokenFromHeader(req: Request) {
  const auth = req.headers.get("authorization") || "";
  if (!auth.startsWith("Bearer ")) return null;
  return auth.split(" ")[1];
}
