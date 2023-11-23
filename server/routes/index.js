const Router = require("express");
const router = new Router();
const userRouter = require("./userRoter");

router.use("/user", userRouter);

module.exports = router;
