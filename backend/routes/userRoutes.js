const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const { register, login, getUser , updateUser,findUserByEmail,getReportsByUserEmail} = require("../controller/userController");
const {createReport,getCommentsByReportId,updateReport,getAllReports}=require('../controller/reportcontroller')
const {createComment}=require('../controller/commentcontroller')
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(authenticateToken, login);
router.route("/get-user").post( getUser);
router.route("/updateuser").put(updateUser)
router.route('/createReport').post(createReport)
router.route('/findUserByEmail').post(findUserByEmail)
router.route('/createComment').post(createComment)
router.route('/getReportsByUserEmail').post(getReportsByUserEmail)
router.route('/getCommentsByReportId').post(getCommentsByReportId)
router.route('/updateReport').put(updateReport)
router.route('/getAllReports').get(getAllReports);
module.exports = router;
