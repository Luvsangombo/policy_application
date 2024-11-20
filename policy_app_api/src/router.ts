import { Router } from "express";
import { signup, login } from "./controllers/users";
import { get, create, vote } from "./controllers/policies";
import { checkToken } from "./middlewares/auth";


const router = Router({ mergeParams: true });



router.post("/signup", signup);

router.post("/login", login);

router.get("/policies", get);
router.post("/policies", checkToken, create);
router.post("/vote", checkToken, vote);

export default router;