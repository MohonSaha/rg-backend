import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route.js";
import { PassengerRoutes } from "../modules/passenger/passenger.route.js";
import { DriverRoutes } from "../modules/driver/driver.route.js";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/passengers",
    route: PassengerRoutes,
  },
  {
    path: "/drivers",
    route: DriverRoutes,
  },
];

router.get("/health-check", (req, res) => {
  res.json({
    success: true,
    message: "rg-backend router is working!",
    data: null,
  });
});

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
