const {
  selectCourses,
  selectCourseById,
  insertCourse,
  deleteCourseById,
  updateCourseById,
} = require("./course.models.js");
const { checkCourseExists } = require("../../utils/utils.js");


/**
 * app.get("/api/courses", getCourses);
 */

exports.getCourses =  async (req, res, next) => {
 try{
  const { sort_by } = req.query;
  const data = await selectCourses(sort_by)
      res.status(200).send({ data });
} catch(error) {
  return res.status(500).json({
    status: 500,
    error: error.toString(),
  });
};
}
/**
 * app.get("/api/courses/:course_id", getCourseById);
 */

exports.getCourseById = async (req, res, next) => {
  try{
  const { course_id } = req.params;
  const courseExist = await checkCourseExists(course_id)
      if (courseExist) {
        const data = await selectCourseById(course_id);
          res.status(200).send({ data });
      } else {
        res.status(400).send({ msg: "Invalid Input" });
        //return Promise.reject({ status: 404, msg: "Not found" });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.toString(),
      });
};
}

/**
 * PATCH /api/articles/:article_id
 */

exports.postCourse = async (req, res, next) => {
  try{
  const course = req.body;
  const data = await insertCourse(course)
      res.status(201).send({ data });
  }catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.toString(),
      });
    }
  };
/**
 * PATCH /api/articles/:article_id
 */

exports.removeCourseById = async (req, res, next) => {
  try{
  const { course_id } = req.params;
  const data = await deleteCourseById(course_id)
      if (data) {
        res.sendStatus(204);
      } else {
        res.status(400).send({ msg: "Invalid Input" });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.toString(),
      });
    }
  };
  

/**
 * PATCH /api/articles/:article_id
 */

exports.patchCourseById = async (req, res, next) => {
  try {
  const course = req.body;
  const { course_id } = req.params;
  const data = await updateCourseById(course, course_id)
      if (data) {
        res.status(200).send({ data });
      } else {
        res.status(400).send({ msg: "Invalid Input" });
        //return Promise.reject({ status: 404, msg: "Not found" });
      }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};