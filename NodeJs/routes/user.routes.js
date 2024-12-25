import { userLogin, userRegistration } from "../controller/user.controller.js";

export function userRoutes(app) {
  app.post("/api/register", userRegistration);
  app.post("/api/login", userLogin);
}
