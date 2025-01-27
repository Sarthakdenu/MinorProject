const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const { register, login, getUser , updateUser,findUserByEmail,getReportsByUserEmail} = require("../controller/userController");
const {createReport,getCommentsByReportId,updateReport}=require('../controller/reportcontroller')
const {createComment}=require('../controller/commentcontroller')
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(authenticateToken, login);
router.route("/get-user").post( getUser);
router.route("/updateuser").put(updateUser)
router.route('/createReport').post(createReport)
router.route('/findUserByEmail').get(findUserByEmail)
router.route('/createComment').post(createComment)
router.route('/getReportsByUserEmail').get(getReportsByUserEmail)
router.route('/getCommentsByReportId').get(getCommentsByReportId)
router.route('/updateReport').put(updateReport)
module.exports = router;
