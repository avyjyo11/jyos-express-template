const router = require("express").Router();
const authenticate = require("./../middlewares/authenticate");
const userRoute = require("./../controllers/user.route");
const authRoute = require("./../controllers/auth.route");

// module.exports = function (abcd) {
router.use("/auth", authRoute);
router.use("/user", authenticate, userRoute);
router.use("/comment", authenticate, userRoute);
router.use("/notification", authenticate, userRoute);
router.use("/user", authenticate, userRoute);
router.use("/user", authenticate, userRoute);

module.exports = router;
// }
