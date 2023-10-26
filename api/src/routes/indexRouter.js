const Router = require("express");
const excelRouter = require("./excelRouter.js");
const router = Router();

router.use("/nx_data", excelRouter);


module.exports = router;