import { Router } from "express";
import { User } from "../models/User";

const router = Router();

// router.get("/user/:id", async (req,res) => {
//     res.send("")
// })

router.get("/info", async (req, res) => {
  const user = await User.findOne();
  res.status(200).send({
    status:"success",
    user: user
  });
});

export { router as UserRouter };
