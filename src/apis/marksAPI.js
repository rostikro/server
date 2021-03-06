import { Router } from "express";
import { Marks, Subjects } from "../models";
import { userAuth } from "../middlewares/auth_check";

const router = Router();

/**
 * @description Get a marks to student
 * @api /marks/api/get
 * @access PRIVATE
 * @type GET
 */
router.get("/api/get/:id/:class", userAuth, async (req, res) => {
  try {
    let marks = await Marks.find({ id: req.params.id });
    if (!marks) {
      return res.status(404).json({
        success: false,
        msg: "Marks not found",
      });
    }
    let subjects = await Subjects.findOne({ id: req.params.class });
    if (!subjects) {
      return res.status(404).json({
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      count: subjects.count,
      subjects: subjects.subjects,
      marks,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      msg: "An error occured at marksAPI",
    });
  }
});

export default router;
