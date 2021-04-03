import { Router } from "express";
import { LoginValidation } from "../validators/index";
import Validator from "../middlewares/validator";
import { User } from "../models";
import { userAuth } from "../middlewares/auth_check";

const router = Router();

/**
 * @description Login a user
 * @api /users/api/login
 * @access PUBLIC
 * @type POST
 */
router.post("/api/login", LoginValidation, Validator, async (req, res) => {
  try {
    let { username, password } = req.body;
    // Check if user exist in DB
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }
    // Check if password is correct
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        msg: "Password is incorrect",
      });
    }
    // If all OK, generate a token
    let token = await user.generateJWT();

    return res.status(200).json({
      success: true,
      user: user.getUserInfo(),
      token: `Bearer ${token}`,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      msg: "An error occured",
    });
  }
});

/**
 * @description Login a user with token
 * @api /users/api/login-token
 * @access PRIVATE
 * @type POST
 */

router.post("/api/login-token", userAuth, async (req, res) => {
  try {
    let { id, role } = req.body;
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(401).json({
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user: user.getUserInfo(),
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
    });
  }
});

export default router;
