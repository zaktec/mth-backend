const request = require("supertest");
const app = require("../app");
require("expect-more-jest");
const bcrypt = require("bcrypt");
const seed = require("../database/seeds/seed");
const testData = require("../database/data/test-data");
const db = require("../database/connection.js");
require("expect-more-jest");

/* -------------------------------------------------------- 
Unauthorised Link               Line Code 33
Student SignUp/login             Line Code 66
Setting                          Line Code 148
Student                          Line Code 181
Tutors                           Line Code  397
Courses                          Line Code  591
Topic                            Line Code  774
Lesson                           Line Code  960
Quiz                             Line Code  1147
Question                         Line Code   1312
 ---------------------------------------------------------*/
let topic_id;
let tutor_id;
let course_id;
let student_id;
let ques_id;
let validStudent;
let tutor_username;
let student_username;
let initial_student_id;
let invalidStudent = `BEARER invalidToken`;
const password = bcrypt.hashSync("password", 10);

beforeAll(() => seed(testData));
//afterAll(() => seed(testData));
afterAll(() => db.end());

//-------------------unauthrised Link---------------------/

describe("Test1-   GET /invalid_url", () => {
  test("ERROR: status 404 and returns a message when invalid url is passed ", () => {
    return request(app)
      .get("/invalid_url")
      .expect(500)
      .then((res) => {
        expect(res.body.message).toBe("Internal Server Error");
      });
  });
});

describe("Test2-  GET /api", () => {
  test("status: 200 and json representation of all the available endpoints of the api", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then((res) => {});
  });
});

describe("Test3-  GET /api/homepage", () => {
  test("status: 200 and returns a welcome message", () => {
    return request(app)
      .get("/homepage")
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe("Welcome to the HomePage");
      });
  });
});

//-------------------Student SignUp/login ----------------------/

describe("Test4- POST /signin", () => {
  test("POST responds with and access token given correct username and password", () => {
    return request(app)
      .post("/signin")
      .send({
        student_grade: 100,
        student_targetgrade: 1,
        student_progressbar: 3,
        student_username: "stundentusernamedemo1",
        student_firstname: "New",
        student_lastname: "Student1LN",
        student_email: "csheraz@hotmail.com",
        student_password: password,
        student_active: true,
        student_notes: "Working well",
        student_image: "/student/student1.png",
      })
      .expect(201)
      .then((res) => {
        initial_student_id = res.body.student.student_id;
        expect(res.body.student).toEqual({
          student_id: initial_student_id,
          student_grade: 100,
          student_targetgrade: 1,
          student_progressbar: 3,
          student_username: "stundentusernamedemo1",
          student_firstname: "New",
          student_lastname: "Student1LN",
          student_email: "csheraz@hotmail.com",
          student_password: password,
          student_active: true,
          student_notes: "Working well",
          student_image: "/student/student1.png",
        });
      });
  });
});

describe("Test5-  login", () => {
  test("POST responds with and access token given correct username and password", () => {
    return request(app)
      .post("/login")
      .send({ username: "stundentusernamedemo1", password: "password" })
      .expect(200)
      .then((res) => {
        validStudent = `BEARER ${res.body.token}`;
        console.log(validStudent)
        expect(res.body.message).toBe("Success");
      });
  });
  test("POST responds with status 401 for an incorrect password", () => {
    return request(app)
      .post("/login")
      .send({ username: "stundentusernamedemo1", password: "secure123" })
      .expect(401)
      .then((res) =>
        expect(res.body.message).toBe('username and password do not exist')
      );
  });

  test("POST responds with status 401 for an incorrect username", () => {
    return request(app)
      .post("/login")
      .send({ username: "mitch", password: "secure123" })
      .expect(401)
      .then((res) => expect(res.body.message).toBe('username and password do not exist'));
  });
  test("ERROR: status 401 if an invalid token is provided ", () => {
    return request(app)
      .get("/api")
      .set("Authorization", invalidStudent)
      .expect(500)
      .then((res) => {
        expect(res.body.msg).toBe("Internal Server Error");
      });
  });
});

 //-------------------Setting----------------------------------------/

 describe("Test6-  GET /api/setting", () => {
  test("status: 200 and returns a welcome message for setting page", () => {
    return request(app)
      .get("/api/settings")
      .set("Authorization", validStudent)
      .expect(200)
      .then((res) => {
       // console.log(res)
        expect(res.body.msg).toBe("Welcome to the SettingPage");
      });
  });
  test("status: 200 and returns a welcome message for setting page", () => {
    return request(app)
      .get("/api/settings/resit")
      .set("Authorization", validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe("Welcome to the ResitPage");
      });
  });
  test("status: 401 if an invalid token is privided", () => {
    return request(app)
      .get("/api/settings/resit")
      .set("Authorization", invalidStudent)
      .expect(500)
      .then((res) => {
        expect(res.body.msg).toBe("Internal Server Error");
  });
});
});

//-------------------student--------------------------------------/


describe("Test7- POST /api/students", () => {
  test("status: 201 and return the new tutors", () => {
    return request(app)
      .post("/api/students")
      .set('Authorization', validStudent)
      .send({
        student_username: "stundentusername4",
        student_firstname: "New",
        student_lastname: "Student1LN",
        student_email: "csheraz@hotmail.com",
        student_password: password,
        student_active: true,
        student_grade: 1,
        student_targetgrade: 1,
        student_notes: "Working well",
        student_progressbar: 3,
        student_image: "/student/student1.png",
      })
      .expect(201)
      .then((res) => {
        expect(res.body.student).toEqual({
          student_id: 5,
          student_username: "stundentusername4",
          student_firstname: "New",
          student_lastname: "Student1LN",
          student_email: "csheraz@hotmail.com",
          student_password: password,
          student_active: true,
          student_grade: 1,
          student_targetgrade: 1,
          student_notes: "Working well",
          student_progressbar: 3,
          student_image: "/student/student1.png",
        });
      });
  });
  test("Missing Field. status 400 and return error message", () => {
    return request(app)
      .post("/api/students")
      .set('Authorization', validStudent)
      .send({
        student_lastname: "Student1LN",
        student_email: "csheraz@hotmail.com",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
});

describe("Test8-   GET /api/students", () => {
    test("status: 200 and returns an array of tutors", () => {
      return request(app)
        .get("/api/students")
        .set('Authorization', validStudent)
        .expect(200)
        .then((res) => {
          //console.log(res)
          expect(res.body.students).toBeInstanceOf(Array);
          expect(res.body.students).toHaveLength(5);
          res.body.students.forEach((student) => {
            expect(student).toMatchObject({
              student_id: expect.any(Number),
              student_firstname: expect.any(String),
              student_lastname: expect.any(String),
              student_email: expect.any(String),
              student_password: expect.any(String),
              student_active: expect.any(Boolean),
              student_grade: expect.any(Number),
              student_targetgrade: expect.any(Number),
              student_notes: expect.any(String),
              student_progressbar: expect.any(Number),
              student_image: expect.any(String),
            });
          });
        });
    });
    test("QUERY: status 200 : courses are sorted by student_id", () => {
      return request(app)
        .get("/api/students")
        .set('Authorization', validStudent)
        .expect(200)
        .then((res) => {
          //  console.log(res);
          expect(res.body.students).toBeSortedBy("student_id");
        });
    });
    test("QUERY: status 200: topics are sorted by passed query", () => {
      return request(app)
        .get("/api/students?sort_by=student_firstname")
        .set('Authorization', validStudent)
        .expect(200)
        .then((res) => {
          //console.log(topics);
          expect(res.body.students).toBeSortedBy("student_firstname");
        });
    });
    test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
      return request(app)
        .get("/api/students?sort_by=not_a_column")
        .set('Authorization', validStudent)
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("bad request");
        });
    });
  });
  describe("Test9- GET   /api/students/:student_id", () => {
    //describe("GET", () => {
    test("status: 200 and return a student object", () => {
      return request(app)
        .get("/api/students/5")
        .set('Authorization', validStudent)
        .expect(200)
        .then((res) => {
          // console.log(res)
          expect(res.body.student).toEqual({
            student_id: 5,
            student_username: "stundentusername4",
            student_firstname: "New",
            student_lastname: "Student1LN",
            student_email: "csheraz@hotmail.com",
            student_password: password,
            student_active: true,
            student_grade: 1,
            student_targetgrade: 1,
            student_notes: "Working well",
            student_progressbar: 3,
            student_image: "/student/student1.png",
          });
        });
    });
    test("Error: student_id, non existent but valid. status 404 and an error message", () => {
      return request(app)
        .get("/api/students/invalid_id")
        .set('Authorization', validStudent)
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Invalid input");
        });
    });
  });
  test("ERROR  -status: 404 and returns an error message", () => {
    return request(app)
      .get("/api/students/1000")
      .set('Authorization', validStudent)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not found");
      });
  });
  describe("Test10- PATCH /api/students/:student_id", () => {
    test("Status 200: and return a updated student object  ", () => {
      return request(app)
        .patch("/api/students/1")
        .set('Authorization', validStudent)
        .send({
          student_username: "stundentusername1",
          student_firstname: "Patched",
          student_lastname: "Student1LN",
          student_email: "csheraz@hotmail.com",
          student_password: "password",
          student_active: true,
          student_grade: 1,
          student_targetgrade: 1,
          student_notes: "Working well",
          student_progressbar: 3,
          student_image: "/student/student1.png",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.updatedStudent).toEqual({
            student_username: "stundentusername1",
            student_firstname: "Patched",
            student_lastname: "Student1LN",
            student_email: "csheraz@hotmail.com",
            student_password: "password",
            student_active: true,
            student_grade: 1,
            student_targetgrade: 1,
            student_notes: "Working well",
            student_progressbar: 3,
            student_image: "/student/student1.png",
            student_id: 1,
          });
        });
    });
  });
  
  describe("Test11-  DELETE /api/students/:student_id", () => {
    test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
      return request(app)
      .delete("/api/students/1")
      .set('Authorization', validStudent)
      .expect(204);
    });
    test("status 400 and returns an error message if it is a bad request", () => {
      return request(app)
        .delete("/api/students/Invalid_id")
        .set('Authorization', validStudent)
        .expect(400)
        .then((res) => expect(res.body.msg).toBe("Invalid input"));
    });
    test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
      return request(app)
        .delete("/api/students/1000")
        .set('Authorization', validStudent)
        .expect(404)
        .then((res) => expect(res.body.msg).toBe("Not found"));
    });
  });
  //---------------------------------Tutors-------------------------------/


  describe("Test12-   GET /api/tutors", () => {
    test("status: 200 and returns an array of tutors", () => {
      return request(app)
        .get("/api/tutors")
        .set("Authorization", validStudent)
        .expect(200)
        .then((res) => {
          //console.log(res)
          expect(res.body.tutors).toBeInstanceOf(Array);
          expect(res.body.tutors).toHaveLength(1);
          res.body.tutors.forEach((tutor) => {
            expect(tutor).toMatchObject({
              tutor_id: expect.any(Number),
              tutor_firstname: expect.any(String),
              tutor_lastname: expect.any(String),
              tutor_email: expect.any(String),
              tutor_active: expect.any(Boolean),
              tutor_image: expect.any(String),
            });
          });
        });
    });
    test("QUERY: status 200 : tutors are sorted by index number", () => {
      return request(app)
        .get("/api/tutors")
        .set("Authorization", validStudent)
        .expect(200)
        .then((res) => {
          //  console.log(topics);
          expect(res.body.tutors).toBeSortedBy("tutor_id");
        });
    });
    test("QUERY: status 200: topics are sorted by passed query", () => {
      return request(app)
        .get("/api/tutors?sort_by=tutor_firstname")
        .set("Authorization", validStudent)
        .expect(200)
        .then((res) => {
          //console.log(topics);
          expect(res.body.tutors).toBeSortedBy("tutor_firstname");
        });
    });
    test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
      return request(app)
        .get("/api/tutors?sort_by=not_a_column")
        .set("Authorization", validStudent)
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("bad request");
        });
    });
  });

  describe("Test13- GET   /api/tutors/:tutor_id", () => {
    test("status: 200 and return a tutor object", () => {
      return request(app)
        .get("/api/tutors/1")
        .set("Authorization", validStudent)
        .expect(200)
        .then((res) => {
          // console.log(res)
          expect(res.body.tutor).toEqual({
            tutor_id: 1,
            tutor_username: "scheema",
            tutor_firstname: "Sheraz",
            tutor_lastname: "Cheema",
            tutor_email: "csheraz@hotmail.com",
            tutor_active: true,
            tutor_image: "/tutor/tutor1.png",
            tutor_password: "password",
          });
        });
    });
    test("Error: course_id, non existent but valid. status 404 and an error message", () => {
      return request(app)
        .get("/api/tutors/invalid_id")
        .set("Authorization", validStudent)
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Invalid input");
        });
    });
  });
  test("ERROR  -status: 404 and returns an error message", () => {
    return request(app)
      .get("/api/tutors/1000")
      .set("Authorization", validStudent)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not found");
      });
  });

  describe("Test14- POST /api/tutors", () => {
    test("status: 201 and return the new tutors", () => {
      return request(app)
        .post("/api/tutors")
        .set("Authorization", validStudent)
        .send({
          tutor_username: "scheema1",
          tutor_firstname: "New",
          tutor_lastname: "Cheema",
          tutor_email: "csheraz@hotmail.com",
          tutor_active: true,
          tutor_image: "/tutor/tutor1.png",
          tutor_password: "password",
        })
        .expect(201)
        .then((res) => {
          expect(res.body.tutor).toEqual({
            tutor_id: 2,
            tutor_username: "scheema1",
            tutor_firstname: "New",
            tutor_lastname: "Cheema",
            tutor_email: "csheraz@hotmail.com",
            tutor_active: true,
            tutor_image: "/tutor/tutor1.png",
            tutor_password: "password",
          });
        });
    });
    test("Missing Field. status 400 and return error message", () => {
      return request(app)
        .post("/api/tutors")
        .set("Authorization", validStudent)
        .send({
          tutor_firstname: "New",
          tutor_lastname: "Cheema",
          topic_code: "GFA2",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Invalid input");
        });
    });
  });

  describe("Test16- PATCH /api/tutors/:tutor_id", () => {
    test("Status 200: and return a updated tutor object  ", () => {
      return request(app)
        .patch("/api/tutors/1")
        .set('Authorization', validStudent)
        .send({
          tutor_username: "scheema",
          tutor_firstname: "Patched",
          tutor_lastname: "Cheema",
          tutor_email: "csheraz@hotmail.com",
          tutor_active: true,
          tutor_image: "/tutor/tutor1.png",
          tutor_password: "password",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.updatedTutor).toEqual({
            tutor_username: "scheema",
            tutor_firstname: "Patched",
            tutor_lastname: "Cheema",
            tutor_email: "csheraz@hotmail.com",
            tutor_active: true,
            tutor_image: "/tutor/tutor1.png",
            tutor_password: "password",
            tutor_id: 1,
          });
        });
    });
  });

  describe("Test15-  DELETE /api/tutor/:tutor_id", () => {
    test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
      return request(app)
      .delete("/api/tutors/1")
      .set('Authorization', validStudent)
      .expect(204);
    });
    test("status 400 and returns an error message if it is a bad request", () => {
      return request(app)
        .delete("/api/tutors/Invalid_id")
        .set('Authorization', validStudent)
        .expect(400)
        .then((res) => expect(res.body.msg).toBe("Invalid input"));
    });
    test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
      return request(app)
        .delete("/api/tutors/1000")
        .set('Authorization', validStudent)
        .expect(404)
        .then((res) => expect(res.body.msg).toBe("Not found"));
    });
  });

  
//---------------------------------Courses--------------------------/

describe("Test17-   GET /api/courses", () => {
  //describe("GET", () => {
  test("status: 200 and returns an array of courses", () => {
    return request(app)
      .get("/api/courses")
      .set("Authorization", validStudent)
      .expect(200)
      .then((res) => {
        //  console.log(res)
        expect(res.body.courses).toBeInstanceOf(Array);
        expect(res.body.courses).toHaveLength(5);
        res.body.courses.forEach((course) => {
          expect(course).toMatchObject({
            course_code: expect.any(String),
            course_desc: expect.any(String),
            course_id: expect.any(Number),
            course_level: expect.any(String),
            course_name: expect.any(String),
          });
        });
      });
  });
  test("QUERY: status 200 : courses are sorted by index number", () => {
    return request(app)
      .get("/api/courses")
      .set("Authorization", validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.courses).toBeSortedBy("course_id");
      });
  });
  test("QUERY: status 200: topics are sorted by passed query", () => {
    return request(app)
      .get("/api/courses?sort_by=course_name")
      .set("Authorization", validStudent)
      .expect(200)
      .then((res) => {
        //console.log(topics);
        expect(res.body.courses).toBeSortedBy("course_name");
      });
  });
  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/courses?sort_by=not_a_column")
      .set("Authorization", validStudent)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("bad request");
      });
  });
});

describe("Test18-   GET /api/courses/:course_id", () => {
  test("Query: course_id existing, status: 200 and returns a course object", () => {
    return request(app)
      .get("/api/courses/1")
      .set("Authorization", validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.course).toEqual({
          course_code: "MTH-GF",
          course_desc: "MTH GCSE Maths Foundation Online Course",
          course_id: 1,
          course_image: "/course/mth_gcse_foundation.png",
          course_level: "Foundation",
          course_name: "MTH GCSE Maths Foundation",
        });
      });
  });

  test("Error: course_id, non existent but valid. status 404 and an error message", () => {
    return request(app)
      .get("/api/courses/1000")
      .set("Authorization", validStudent)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not found");
      });
  });
  test("Error: course_id: invalid course_id. status 404 and an error message", () => {
    return request(app)
      .get("/app/courses/a")
      .set("Authorization", validStudent)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid URL");
      });
  });
});

describe("Test19- POST /api/courses", () => {
  test("status: 201 and return the new course", () => {
    return request(app)
      .post("/api/courses")
      .set("Authorization", validStudent)
      .send({
        course_code: "New- MTH-GF",
        course_desc: "MTH GCSE Maths Foundation Online Course",
        course_image: "/course/mth_gcse_foundation.png",
        course_level: "Foundation",
        course_name: "MTH GCSE Maths Foundation",
      })
      .expect(201)
      .then((res) => {
        expect(res.body.course).toEqual({
          course_code: "New- MTH-GF",
          course_desc: "MTH GCSE Maths Foundation Online Course",
          course_image: "/course/mth_gcse_foundation.png",
          course_level: "Foundation",
          course_name: "MTH GCSE Maths Foundation",
          course_id: 6,
        });
      });
  });
  test("Missing Field. status 400 and return error message", () => {
    return request(app)
      .post("/api/courses")
      .set("Authorization", validStudent)
      .send({
        course_code: "New- MTH-GF",
        course_desc: "MTH GCSE Maths Foundation Online Course",
        course_image: "/course/mth_gcse_foundation.png",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
});

describe("Test21-   PATCH /api/courses/:course_id", () => {
  test("Status 200: and returns an updated course ", () => {
    return request(app)
      .patch("/api/courses/1")
      .set("Authorization", validStudent)
      .send({
        course_code: "New Patched- MTH-GF",
        course_desc: "MTH GCSE Maths Foundation Online Course",
        course_image: "/course/mth_gcse_foundation.png",
        course_level: "Foundation",
        course_name: "MTH GCSE Maths Foundation",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.updatedCourse).toEqual({
          course_code: "New Patched- MTH-GF",
          course_desc: "MTH GCSE Maths Foundation Online Course",
          course_image: "/course/mth_gcse_foundation.png",
          course_level: "Foundation",
          course_name: "MTH GCSE Maths Foundation",
          course_id: 1,
        });
      });
  });
});

describe("Test20-   DELETE /api/course/:course_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
    .delete("/api/courses/1")
    .set("Authorization", validStudent)
    .expect(204);
  });
  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/courses/Invalid_id")
      .set("Authorization", validStudent)
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid input"));
  });
  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/courses/1000")
      .set("Authorization", validStudent)
      .expect(404)
      .then((res) => expect(res.body.msg).toBe("Not found"));
  });
});



//---------------------------------Topic--------------------------/

describe("Test22-   GET /api/topics", () => {
  //describe("GET", () => {
  test("status: 200 and returns an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .set("Authorization", validStudent)
      .expect(200)
      .then((res) => {
        //  console.log(res)
        expect(res.body.topics).toBeInstanceOf(Array);
        expect(res.body.topics).toHaveLength(9);
        res.body.topics.forEach((topic) => {
          //console.log(topic)
          expect(topic).toMatchObject({
            topic_name: expect.any(String),
            topic_code: expect.any(String),
            topic_desc: expect.any(String),
            topic_index: expect.any(Number),
            topic_course_id: expect.any(Number),
            topic_id: expect.any(Number),
          });
        });
      });
  });
  test("QUERY: status 200 : topics are sorted by index number", () => {
    return request(app)
      .get("/api/topics")
      .set("Authorization", validStudent)
      .expect(200)
      .then((res) => {
        //  console.log(topics);
        expect(res.body.topics).toBeSortedBy("topic_index");
      });
  });
  test("QUERY: status 200: topics are sorted by passed query", () => {
    return request(app)
      .get("/api/topics?sort_by=topic_id")
      .set("Authorization", validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toBeSortedBy("topic_id");
      });
  });
  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/topics?sort_by=not_a_column")
      .set("Authorization", validStudent)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("bad request");
      });
    //});
  });
});

describe("Test23- GET   /api/topics/:topic_id", () => {
  test("status: 200 and return a topic object", () => {
    return request(app)
      .get("/api/topics/18")
      .set("Authorization", validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.topic).toEqual({
          topic_name: "Statistics",
          topic_code: "GHS1",
          topic_desc: "MTH GCSE Maths Online Course - Higher - Statistics",
          topic_index: 9,
          topic_course_id: 2,
          topic_id: 18,
        });
      });
  });
  test("Error: course_id, non existent but valid. status 404 and an error message", () => {
    return request(app)
      .get("/api/topics/invalid_id")
      .set("Authorization", validStudent)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
});
test("ERROR  -status: 404 and returns an error message", () => {
  return request(app)
    .get("/api/topics/1000")
    .set("Authorization", validStudent)
    .expect(404)
    .then((res) => {
      expect(res.body.msg).toBe("Not found");
    });
});

describe("Test24- POST /api/topics", () => {
  test("status: 201 and return the new topic", () => {
    return request(app)
      .post("/api/topics")
      .set("Authorization", validStudent)
      .send({
        topic_name: "New",
        topic_code: "GFA2",
        topic_desc: "MTH GCSE Maths Online Course - Foundation - Algebra 2",
        topic_index: 4,
        topic_course_id:3,
      })
      .expect(201)
      .then((res) => {
        topic_id = res.body.topic.topic_id;
        expect(res.body.topic).toEqual({
          topic_name: "New",
          topic_code: "GFA2",
          topic_desc: "MTH GCSE Maths Online Course - Foundation - Algebra 2",
          topic_index: 4,
          topic_course_id: 3,
          topic_id: topic_id,
        });
      });
  });
  test("Missing Field. status 400 and return error message", () => {
    return request(app)
      .post("/api/topics")
      .set("Authorization", validStudent)
      .send({
        topic_code: "GFA2",
        topic_desc: "MTH GCSE Maths Online Course - Foundation - Algebra 2",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
});
describe("Test26- PATCH /api/topic/:topic_id", () => {
  test("Status 200: and return a updated topic object  ", () => {
    return request(app)
      .patch(`/api/topics/${topic_id}`)
      .set("Authorization", validStudent)
      .send({
        topic_name: "Patched Statistics",
        topic_code: "GHS1",
        topic_desc: "MTH GCSE Maths Online Course - Higher - Statistics",
        topic_index: 9,
        topic_course_id: 2,
      })
      .expect(200)
      .then((res) => {
        console.log(res.body.updatedTopic)
        expect(res.body.updatedTopic).toEqual({
          topic_name: "Patched Statistics",
          topic_code: "GHS1",
          topic_desc: "MTH GCSE Maths Online Course - Higher - Statistics",
          topic_index: 9,
          topic_course_id: 2,
          topic_id: topic_id,
        });
      });
  });
});


describe("Test25-  DELETE /api/topic/:topic_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
      .delete(`/api/topics/${topic_id}`)
      .set("Authorization", validStudent)
      .expect(204);
  });
  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/topics/Invalid_id")
      .set("Authorization", validStudent)
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid input"));
  });
  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/topics/1000")
      .set("Authorization", validStudent)
      .expect(404)
      .then((res) => expect(res.body.msg).toBe("Not found"));
  });
});


//------------------------Lesson--------------/

describe("Test27-   GET /api/lessons", () => {
  test("status: 200 and returns an array of lessons", () => {
    return request(app)
      .get("/api/lessons")
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.lessons).toBeInstanceOf(Array);
        expect(res.body.lessons).toHaveLength(77);
        res.body.lessons.forEach((lesson) => {
          expect(lesson).toMatchObject({
            lesson_id: expect.any(Number),
            lesson_name: expect.any(String),
            lesson_code: expect.any(String),
            lesson_desc: expect.any(String),
            lesson_ws: expect.any(String),
            lesson_body: expect.any(String),
            lesson_topic_id: expect.any(Number),
          });
        });
      });
  });
  test("QUERY: status 200 : lessons are sorted by lesson id", () => {
    return request(app)
      .get("/api/lessons")
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        //  console.log(res);
        expect(res.body.lessons).toBeSortedBy("lesson_id");
      });
  });
  test("QUERY: status 200: lessons are sorted by passed query", () => {
    return request(app)
      .get("/api/lessons?sort_by=lesson_name")
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        //console.log(topics);
        expect(res.body.lessons).toBeSortedBy("lesson_name");
      });
  });
  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/lessons?sort_by=not_a_column")
      .set('Authorization', validStudent)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("bad request");
      });
  });
});
describe("Test28- GET   /api/lessons/:lesson_id", () => {
  //describe("GET", () => {
  test("status: 200 and return a lesson object", () => {
    return request(app)
      .get("/api/lessons/1")
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        // console.log(res)
        expect(res.body.lesson).toEqual({
          lesson_id: 1,
          lesson_name: "Addition, Subtraction and Money Problems",
          lesson_code: "GFN1LC1",
          lesson_desc:
            "To be able to add, subtract, and solve money problems.",
          lesson_ws: "GFN1WS1",
          lesson_body: "PowerPoint",
          lesson_topic_id: 1,
        });
      });
  });
  test("Error: student_id, non existent but valid. status 404 and an error message", () => {
    return request(app)
      .get("/api/lessons/invalid_id")
      .set('Authorization', validStudent)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
  test("ERROR  -status: 404 and returns an error message", () => {
    return request(app)
      .get("/api/lessons/1000")
      .set('Authorization', validStudent)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not found");
      });
  });
});
describe("Test29- POST /api/lessons", () => {
  test("status: 201 and return the new lessons", () => {
    return request(app)
      .post("/api/lessons")
      .set('Authorization', validStudent)
      .send({
        lesson_name: "New- Addition, Subtraction and Money Problems",
        lesson_code: "GFN1LC1",
        lesson_desc: "To be able to add, subtract, and solve money problems.",
        lesson_ws: "GFN1WS1",
        lesson_body: "PowerPoint",
        lesson_topic_id: 1,
      })
      .expect(201)
      .then((res) => {
        expect(res.body.lesson).toEqual({
          lesson_name: "New- Addition, Subtraction and Money Problems",
          lesson_code: "GFN1LC1",
          lesson_desc:
            "To be able to add, subtract, and solve money problems.",
          lesson_ws: "GFN1WS1",
          lesson_body: "PowerPoint",
          lesson_topic_id: 1,
          lesson_id: 78,
        });
      });
  });

  test("Missing Field. status 400 and return error message", () => {
    return request(app)
      .post("/api/lessons")
      .set('Authorization', validStudent)
      .send({
        student_lastname: "Student1LN",
        student_email: "csheraz@hotmail.com",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
});

describe("Test30-  DELETE /api/lessons/:lesson_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
    .delete("/api/lessons/1")
    .set('Authorization', validStudent)
    .expect(204);
  });
  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/lessons/Invalid_id")
      .set('Authorization', validStudent)
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid input"));
  });
  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/lessons/1000")
      .set('Authorization', validStudent)
      .expect(404)
      .then((res) => expect(res.body.msg).toBe("Not found"));
  });
});
describe("Test31- PATCH /api/lessons/:lesson_id", () => {
  test("Status 200: and return a updated student object  ", () => {
    return request(app)
      .patch("/api/lessons/1")
      .set('Authorization', validStudent)
      .send({
        lesson_name: "patched- Addition, Subtraction and Money Problems",
        lesson_code: "GFN1LC1",
        lesson_desc: "To be able to add, subtract, and solve money problems.",
        lesson_ws: "GFN1WS1",
        lesson_body: "PowerPoint",
        lesson_topic_id: 1,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.updatedLesson).toEqual({
          lesson_name: "patched- Addition, Subtraction and Money Problems",
          lesson_code: "GFN1LC1",
          lesson_desc:
            "To be able to add, subtract, and solve money problems.",
          lesson_ws: "GFN1WS1",
          lesson_body: "PowerPoint",
          lesson_topic_id: 1,
          lesson_id: 1,
        });
      });
  });
});
//--------------------Quiz--------------------------/

describe("Test32-   GET /api/quizzes", () => {
  test("status: 200 and returns an array of tutors", () => {
    return request(app)
      .get("/api/quizzes")
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        //console.log(res)
        expect(res.body.quizzes).toBeInstanceOf(Array);
        expect(res.body.quizzes).toHaveLength(97);
        res.body.quizzes.forEach((quiz) => {
          expect(quiz).toMatchObject({
            quiz_id: expect.any(Number),
            quiz_name: expect.any(String),
            quiz_code: expect.any(String),
            quiz_type: expect.any(String),
          });
        });
      });
  });
  test("QUERY: status 200 : quizzes are sorted by quiz id", () => {
    return request(app)
      .get("/api/quizzes")
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        //  console.log(res);
        expect(res.body.quizzes).toBeSortedBy("quiz_id");
      });
  });
  test("QUERY: status 200: quizes are sorted by passed query", () => {
    return request(app)
      .get("/api/quizzes?sort_by=quiz_name")
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.quizzes).toBeSortedBy("quiz_name");
      });
  });
  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/quizzes?sort_by=not_a_column")
      .set('Authorization', validStudent)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("bad request");
      });
  });
});
describe("Test33- GET   /api/quizzes/:quiz_id", () => {
  test("status: 200 and return a quiz object", () => {
    return request(app)
      .get("/api/quizzes/1")
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.quiz).toEqual({
          quiz_id: 1,
          quiz_name: expect.any(String),
          quiz_code: expect.any(String),
          quiz_type: expect.any(String),
        });
      });
  });
  test("Error: quiz_id, non existent but valid. status 404 and an error message", () => {
    return request(app)
      .get("/api/quizzes/invalid_id")
      .set('Authorization', validStudent)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
  test("ERROR  -status: 404 and returns an error message", () => {
    return request(app)
      .get("/api/quizzes/1000")
      .set('Authorization', validStudent)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not found");
      });
  });
});
describe("Test34- POST /api/quizzes", () => {
  test("status: 201 and return the new tutors", () => {
    return request(app)
      .post("/api/quizzes")
      .set('Authorization', validStudent)
      .send({
        quiz_name: "NewPost Number 2- Topic Diagnostic Quiz",
        quiz_code: "GFN2TDQ",
        quiz_type: "TopicDiagnostic",
      })
      .expect(201)
      .then((res) => {
        expect(res.body.quiz).toEqual({
          quiz_name: "NewPost Number 2- Topic Diagnostic Quiz",
          quiz_code: "GFN2TDQ",
          quiz_type: "TopicDiagnostic",
          quiz_id: 98,
        });
      });
  });
  test("Missing Field. status 400 and return error message", () => {
    return request(app)
      .post("/api/quizzes")
      .set('Authorization', validStudent)
      .send({
        quiz_code: "GFN2TDQ",
        quiz_type: "TopicDiagnostic",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
});

describe("Test36- PATCH /api/quizzes/:quiz_id", () => {
  test("Status 200: and return a updated quiz object  ", () => {
    return request(app)
      .patch("/api/quizzes/1")
      .set('Authorization', validStudent)
      .send({
        quiz_name: "NewPatch Number 2- Topic Diagnostic Quiz",
        quiz_code: "GFN2TDQ",
        quiz_type: "TopicDiagnostic",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.updatedQuiz).toEqual({
          quiz_name: "NewPatch Number 2- Topic Diagnostic Quiz",
          quiz_code: "GFN2TDQ",
          quiz_type: "TopicDiagnostic",
          quiz_id: 1,
        });
      });
  });
});

describe("Test35-  DELETE /api/quizzes/:quiz_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
    .delete("/api/quizzes/1")
    .set('Authorization', validStudent)
    .expect(204);
  });
  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/quizzes/Invalid_id")
      .set('Authorization', validStudent)
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid input"));
  });
  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/quizzes/1000")
      .set('Authorization', validStudent)
      .expect(404)
      .then((res) => expect(res.body.msg).toBe("Not found"));
  });
});

//----------------------Question--------------------------/

describe("Test37- POST /api/questions", () => {
  test("status: 201 and return the new questions", () => {
    return request(app)
      .post("/api/questions")
      .set('Authorization', validStudent)
      .send({
        ques_body: "4.79 - 1.2",
        ques1_ans: 3.59,
        ques_mark: 1,
        ques_grade: 2,
        ques_lesson_id: 1,
        ques_quiz_id: 2,
        ques_calc: false,
        ques_ans_explain: "explanation",
      })
      .expect(201)
      .then((res) => {
        ques_id = response.body.question.ques_id;
        expect(res.body.question).toEqual({
          ques_id: ques_id,
          ques_body: "4.79 - 1.2",
          ques1_ans: "3.59",
          ques_mark: 1,
          ques_grade: 2,
          ques_lesson_id: 1,
          ques_quiz_id: 2,
          ques_calc: false,
          ques_ans_explain: "explanation",
          ques2_ans: null,
          ques3_ans: null,
          ques_ans_correct: null,
          ques_ans_image: null,
          ques_ans_mark: null,
          ques_ans_sym_a: null,
          ques_ans_sym_b: null,
          ques_image: null,
        });
      });
  });
  test("Missing Field. status 400 and return error message", () => {
    return request(app)
      .post("/api/questions")
      .set('Authorization', validStudent)
      .send({
        ques1_ans: "3.59",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
});


describe("Test38-   GET /api/questions", () => {
  test("status: 200 and returns an array of questions", () => {
    return request(app)
      .get("/api/questions")
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        //console.log(res)
        expect(res.body.questions).toBeInstanceOf(Array);
        expect(res.body.questions).toHaveLength(369);
        res.body.questions.forEach((question) => {
          expect(question).toMatchObject({
            ques_id: expect.any(Number),
            ques_body: expect.any(String),
            ques_image: expect.toBeOneOf([expect.any(String), null]),
            ques_grade: expect.any(Number),
            ques_calc: expect.any(Boolean),
            ques_mark: expect.toBeOneOf([expect.any(Number), null]),
            ques1_ans: expect.any(String),
            ques2_ans: expect.toBeOneOf([expect.any(String), null]),
            ques3_ans: expect.toBeOneOf([expect.any(String), null]),
            ques_ans_explain: expect.toBeOneOf([expect.any(String), null]),
            ques_ans_mark: expect.toBeOneOf([expect.any(Number), null]),
            ques_ans_image: expect.toBeOneOf([expect.any(String), null]),
            ques_ans_correct: expect.toBeOneOf([expect.any(Boolean), null]),
            ques_ans_sym_b: expect.toBeOneOf([expect.any(String), null]),
            ques_ans_sym_a: expect.toBeOneOf([expect.any(String), null]),
            ques_quiz_id: expect.toBeOneOf([expect.any(Number), null]),
            ques_lesson_id: expect.any(Number),
          });
        });
      });
  });
  test("QUERY: status 200 : quizzes are sorted by question id", () => {
    return request(app)
      .get("/api/questions")
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        //  console.log(res);
        expect(res.body.questions).toBeSortedBy("ques_id");
      });
  });
  test("QUERY: status 200: question are sorted by passed query", () => {
    return request(app)
      .get("/api/questions?sort_by=ques_id")
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.questions).toBeSortedBy("ques_id");
      });
  });
  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/questions?sort_by=not_a_column")
      .set('Authorization', validStudent)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("bad request");
      });
  });
});
describe("Test39- GET   /api/questions/:question_id", () => {
  test("status: 200 and return a question object", () => {
    return request(app)
      .get(`/api/questions/${ques_id}`)
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.question).toEqual({
          ques_id: expect.any(Number),
          ques_body: expect.any(String),
          ques_image: expect.toBeOneOf([expect.any(String), null]),
          ques_grade: expect.any(Number),
          ques_calc: expect.any(Boolean),
          ques_mark: expect.toBeOneOf([expect.any(Number), null]),
          ques1_ans: expect.any(String),
          ques2_ans: expect.toBeOneOf([expect.any(String), null]),
          ques3_ans: expect.toBeOneOf([expect.any(String), null]),
          ques_ans_explain: expect.toBeOneOf([expect.any(String), null]),
          ques_ans_mark: expect.toBeOneOf([expect.any(Number), null]),
          ques_ans_image: expect.toBeOneOf([expect.any(String), null]),
          ques_ans_correct: expect.toBeOneOf([expect.any(Boolean), null]),
          ques_ans_sym_b: expect.toBeOneOf([expect.any(String), null]),
          ques_ans_sym_a: expect.toBeOneOf([expect.any(String), null]),
          ques_quiz_id: expect.toBeOneOf([expect.any(Number), null]),
          ques_lesson_id: expect.any(Number),
        });
      });
  });
  test("Error: question_id, non existent but valid. status 404 and an error message", () => {
    return request(app)
      .get("/api/questions/invalid_id")
      .set('Authorization', validStudent)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
  test("ERROR  -status: 404 and returns an error message", () => {
    return request(app)
      .get("/api/questions/1000")
      .set('Authorization', validStudent)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not found");
      });
  });
});

describe("Test40- PATCH /api/questions/:ques_id", () => {
  test("Status 200: and return a updated ques object  ", () => {
    return request(app)
      .patch(`/api/questions/${ques_id}`)
      .set('Authorization', validStudent)
      .send({
        ques_body: "new 4.79 - 1.2",
        ques1_ans: 3.59,
        ques_mark: 1,
        ques_grade: 2,
        ques_lesson_id: 1,
        ques_quiz_id: 2,
        ques_calc: false,
        ques_ans_explain: "explanation",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.updatedQuestion).toEqual({
          ques_body: "new 4.79 - 1.2",
          ques1_ans: "3.59",
          ques_mark: 1,
          ques_grade: 2,
          ques_lesson_id: 1,
          ques_quiz_id: 2,
          ques_calc: false,
          ques_ans_explain: "explanation",
          ques2_ans: null,
          ques3_ans: null,
          ques_ans_correct: null,
          ques_ans_image: null,
          ques_ans_mark: null,
          ques_ans_sym_a: null,
          ques_ans_sym_b: null,
          ques_image: null,
          ques_id: 1,
        });
      });
  });
});
describe("Test41-  DELETE /api/questions/:quiz_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
    .delete("/api/questions/5")
    .set('Authorization', validStudent)
    .expect(204);
  });
  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/questions/Invalid_id")
      .set('Authorization', validStudent)
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid input"));
  });
  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/questions/1000")
      .set('Authorization', validStudent)
      .expect(404)
      .then((res) => expect(res.body.msg).toBe("Not found"));
  });
});

describe("Test42-  GET /api/userhomepage", () => {
  test("status: 200 and returns a welcome message from the user homepage", () => {
    return request(app)
      .get("/api/userhomepage")
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe("Welcome to the User HomePage");
      });
  });
});

