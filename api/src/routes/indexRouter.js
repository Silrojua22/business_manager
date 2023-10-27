const Router = require("express");
const excelRouter = require("./excelRouter.js");
const userRouter = require('./userRouter.js');
const router = Router();

router.use("/nx_data", excelRouter);
router.use('/user', userRouter);

module.exports = router;
