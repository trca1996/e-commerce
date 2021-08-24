const express = require('express')

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require('./../controllers/authController')
const { isAuthenticatedUser, authorizeRoles } = require('./../middlewares/auth')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)

router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router
  .route('/admin/users/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router
