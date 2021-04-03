import { Router } from "express";
import { Marks } from "../models";
import { userAuth } from "../middlewares/auth_check";

const router = Router();

/**
 * @description Get a marks to student
 * @api /marks/api/get
 * @access PRIVATE
 * @type GET
 */
router.get("/api/get/:id", userAuth, async (req, res) => {
  try {
    let marks = await Marks.find({ id: req.params.id });
    if (!marks) {
      return res.status(200).json({
        success: false,
        msg: "Marks not found",
      });
    }
    return res.status(200).json({
      success: true,
      marks,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      success: false,
      msg: "An error occured at marksAPI",
    });
  }
});

export default router;
