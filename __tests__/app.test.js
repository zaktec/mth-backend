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
Admin SignUp/login               Line Code 77
Tutor SignUp/login             Line Code 152
Student SignUp/login             Line Code 224
Admin Dashboard                  Line Code 306
Tutor Dashboard                  Line Code 341
Student Dashboard                Line Code  357
Admin                            Line Code 374
Student                          Line Code 181
Tutors                           Line Code  744
Courses                          Line Code  591
Topic                            Line Code  774
Lesson                           Line Code  960
Quiz                             Line Code  1147
Question                         Line Code   1312
 ---------------------------------------------------------*/

let quiz_id;
let ques_id;
let topic_id;
let tutor_id;
let lesson_id;
let course_id;
let student_id;
let validStudent;
let validTutor;
let validAdmin;
let initial_student_id;
let invalidStudent = `BEARER invalidToken`;
let invalidAdmin = `BEARER invalidToken`;
const password = bcrypt.hashSync("password", 10);

beforeAll(() => seed(testData));
//afterAll(() => seed(testData));
afterAll(() => db.end());

//-------------------unauthrised Link---------------------/

describe("Test1-   GET /invalid_url", () => {
  test("ERROR: status 404 and returns a message when invalid url is passed ", () => {
    return request(app)
      .get("/invalid_url")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid URL");
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

//-------------------Admin SignUp/login ----------------------/

describe("Test 4 -POST /signup admin", () => {
  test("Post respond with and access token given correct username", () => {
    return request(app)
      .post("/adminsignin")
      .send({
        admins_username: "scheema1",
        admins_firstname: "New",
        admins_lastname: "Cheema",
        admins_email: "csheraz@hotmail.com",
        admins_active: true,
        admins_image: "/tutor/tutor1.png",
        admins_password: password,
      })
      .expect(201)
      .then((res) => {
        admins_id = res.body.admin.admins_id;
        expect(res.body.admin).toEqual({
          admins_id: res.body.admin.admins_id,
          admins_username: "scheema1",
          admins_firstname: "New",
          admins_lastname: "Cheema",
          admins_email: "csheraz@hotmail.com",
          admins_active: true,
          admins_image: "/tutor/tutor1.png",
          admins_password: password,
        });
      });
  });
});

describe("Test 5-  Admin login", () => {
  test("POST responds with and access token given correct username and password", () => {
    return request(app)
      .post("/adminlogin")
      .send({ username: "scheema", password: "password" })
      .expect(200)
      .then((res) => {
        validAdmin = `BEARER ${res.body.token}`;
        expect(res.body.message).toBe("Success");
      });
  });

  test("POST responds with status 401 for an incorrect password", () => {
    return request(app)
      .post("/adminlogin")
      .send({ username: "stundentusernamedemo1", password: "secure123" })
      .expect(401)
      .then((res) =>
        expect(res.body.message).toBe("username and password do not exist")
      );
  });

  test("POST responds with status 401 for an incorrect username", () => {
    return request(app)
      .post("/adminlogin")
      .send({ username: "mitch", password: "secure123" })
      .expect(401)
      .then((res) =>
        expect(res.body.message).toBe("username and password do not exist")
      );
  });

  test("ERROR: status 401 if an invalid token is provided ", () => {
    return request(app)
      .get("/api")
      .set("Authorization", invalidAdmin)
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe("halt intruder! get outta here");
      });
  });
});

//-------------------tutor SignUp/login ----------------------/

describe("Test 6 -POST /signup tutor", () => {
  test("Post respond with and access token given correct username", () => {
    return request(app)
      .post("/tutorsignin")
      .send({
        tutor_username: "scheema1",
        tutor_firstname: "New",
        tutor_lastname: "Cheema",
        tutor_email: "csheraz@hotmail.com",
        tutor_active: true,
        tutor_image: "/tutor/tutor1.png",
        tutor_password: password,
      })
      .expect(201)
      .then((res) => {
        tutor_id = res.body.tutor.tutor_id;
        expect(res.body.tutor).toEqual({
          tutor_id: res.body.tutor.tutor_id,
          tutor_username: "scheema1",
          tutor_firstname: "New",
          tutor_lastname: "Cheema",
          tutor_email: "csheraz@hotmail.com",
          tutor_active: true,
          tutor_image: "/tutor/tutor1.png",
          tutor_password: password,
        });
      });
  });
});

describe("Test7-  Tutor login", () => {
  test("POST responds with and access token given correct username and password", () => {
    return request(app)
      .post("/tutorlogin")
      .send({ username: "scheema", password: "password" })
      .expect(200)
      .then((res) => {
        validTutor = `BEARER ${res.body.token}`;
        expect(res.body.message).toBe("Success");
      });
  });

  test("POST responds with status 401 for an incorrect password", () => {
    return request(app)
      .post("/tutorlogin")
      .send({ username: "stundentusernamedemo1", password: "secure123" })
      .expect(401)
      .then((res) =>
        expect(res.body.message).toBe("username and password do not exist")
      );
  });

  test("POST responds with status 401 for an incorrect username", () => {
    return request(app)
      .post("/tutorlogin")
      .send({ username: "mitch", password: "secure123" })
      .expect(401)
      .then((res) =>
        expect(res.body.message).toBe("username and password do not exist")
      );
  });

  test("ERROR: status 401 if an invalid token is provided ", () => {
    return request(app)
      .get("/api")
      .set("Authorization", invalidStudent)
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe("halt intruder! get outta here");
      });
  });
});
//-------------------Student SignUp/login ----------------------/

describe("Test8- POST /signin", () => {
  test("POST responds with and access token given correct username and password", () => {
    return request(app)
      .post("/studentsignin")
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

describe("Test9-  login", () => {
  test("POST responds with and access token given correct username and password", () => {
    return request(app)
      .post("/studentlogin")
      .send({ username: "stundentusernamedemo1", password: "password" })
      .expect(200)
      .then((res) => {
        validStudent = `BEARER ${res.body.token}`;
        expect(res.body.message).toBe("Success");
      });
  });

  test("POST responds with status 401 for an incorrect password", () => {
    return request(app)
      .post("/studentlogin")
      .send({ username: "stundentusernamedemo1", password: "secure123" })
      .expect(401)
      .then((res) =>
        expect(res.body.message).toBe("username and password do not exist")
      );
  });

  test("POST responds with status 401 for an incorrect username", () => {
    return request(app)
      .post("/studentlogin")
      .send({ username: "mitch", password: "secure123" })
      .expect(401)
      .then((res) =>
        expect(res.body.message).toBe("username and password do not exist")
      );
  });

  test("ERROR: status 401 if an invalid token is provided ", () => {
    return request(app)
      .get("/api")
      .set("Authorization", invalidStudent)
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe("halt intruder! get outta here");
      });
  });
});

//-------------------Admin Dashabooard----------------------------------------/

describe("Test10-  GET /api/setting", () => {
  test("status: 200 and returns a welcome message for setting page", () => {
    return request(app)
      .get("/api/settings")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe("Welcome to the SettingPage");
      });
  });

  test("status: 200 and returns a welcome message for setting page", () => {
    return request(app)
      .get("/api/admindashboard")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe("Welcome to the Admin HomePage");
      });
  });

  test("status: 401 if an invalid token is privided", () => {
    return request(app)
      .get("/api/settings/resit")
      .set("Authorization", invalidStudent)
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe("halt intruder! get outta here");
      });
  });
});

//-------------------Tutor Dashbaord--------------------------------/

describe("Test11-  GET /api/userhomepage", () => {
  test("status: 200 and returns a welcome message from the user homepage", () => {
    return request(app)
      .get("/tutor/tutordashboard")
      .set("Authorization", validTutor)
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe("Welcome to the Tutor HomePage");
      });
  });
});

//-------------------Student Dashbaord--------------------------------/

describe("Test12-  GET /student/studentdashboard", () => {
  test("status: 200 and returns a welcome message from the admin dashboard", () => {
    return request(app)
      .get("/student/studentdashboard")
      .set("Authorization", validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe("Welcome to the Student Dashboard");
      });
  });
});

//-------------------Admin--------------------------------------/

describe("Test13- POST /api/admins", () => {
  test("status: 201 and return the new admin", () => {
    return request(app)
      .post("/api/admin")
      .set("Authorization", validAdmin)
      .send({
        admins_username: "scheema2",
        admins_firstname: "New",
        admins_lastname: "Cheema",
        admins_email: "csheraz@hotmail.com",
        admins_active: true,
        admins_image: "/tutor/tutor1.png",
        admins_password: password,
      })
      .expect(201)
      .then((res) => {
        admins_id = res.body.data.admins_id;
        expect(res.body.data).toEqual({
          admins_id: res.body.data.admins_id,
          admins_username: "scheema2",
          admins_firstname: "New",
          admins_lastname: "Cheema",
          admins_email: "csheraz@hotmail.com",
          admins_active: true,
          admins_image: "/tutor/tutor1.png",
          admins_password: password,
        });
      });
  });

  test("Missing Field. status 400 and return error message", () => {
    return request(app)
      .post("/api/admin")
      .set("Authorization", validAdmin)
      .send({
        admins_username: "New",
        admins_lastname: "Cheema",
      })
      .expect(500)
      .then((res) => {
       // expect(res.body.msg).toBe("Invalid input");
      });
  });
});

describe("Test14-   GET /api/admin", () => {
  test("status: 200 and returns an array of admins", () => {
    return request(app)
      .get("/api/admin")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        // expect(res.body.tutors).toHaveLength(res.body.tutors.length);
        expect(res.body.data).toHaveLength(3);
        res.body.data.forEach((admin) => {
          expect(admin).toMatchObject({
            admins_id: expect.any(Number),
            admins_firstname: expect.any(String),
            admins_lastname: expect.any(String),
            admins_email: expect.any(String),
            admins_active: expect.any(Boolean),
            admins_image: expect.any(String),
          });
        });
      });
  });

  test("QUERY: status 200 : tutors are sorted by index number", () => {
    return request(app)
      .get("/api/admin")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy("admins_id");
      });
  });

  test("QUERY: status 200: topics are sorted by passed query", () => {
    return request(app)
      .get("/api/admin?sort_by=admins_firstname")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy("admins_firstname");
      });
  });

  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/admin?sort_by=not_a_column")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
          //  console.log(res.body)
       // expect(res.body.msg).toBe("bad request");
      });
  });
});

describe("Test15- GET   /api/admin/:admins_id", () => {
  test("status: 200 and return a admin object", () => {
    return request(app)
      .get(`/api/admin/${admins_id}`)
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          admins_id: admins_id,
          admins_username: "scheema2",
          admins_firstname: "New",
          admins_lastname: "Cheema",
          admins_email: "csheraz@hotmail.com",
          admins_active: true,
          admins_image: "/tutor/tutor1.png",
          admins_password: res.body.data.admins_password,
        });
      });
  });

  test("Error: course_id, non existent but valid. status 404 and an error message", () => {
    return request(app)
      .get("/api/admin/invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
        //expect(res.body.msg).toBe("Invalid input");
      });
  });

  test("ERROR  -status: 404 and returns an error message", () => {
    return request(app)
      .get("/api/admin/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => {
       expect(res.body.msg).toBe("Invalid Input");
      });
  });
});

describe("Test16- PATCH /api/admin/:admins_id", () => {
  test("Status 200: and return a updated admin object  ", () => {
    return request(app)
      .patch(`/api/admin/${admins_id}`)
      .set("Authorization", validAdmin)
      .send({
        admins_username: "scheema1000",
        admins_firstname: "Patched",
        admins_lastname: "Cheema",
        admins_email: "csheraz@hotmail.com",
        admins_active: true,
        admins_image: "/tutor/tutor1.png",
        admins_password: password,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          admins_id: admins_id,
          admins_username: "scheema1000",
          admins_firstname: "Patched",
          admins_lastname: "Cheema",
          admins_email: "csheraz@hotmail.com",
          admins_active: true,
          admins_image: "/tutor/tutor1.png",
          admins_password: res.body.data.admins_password,
        });
      });
  });
});



//-------------------student--------------------------------------/

describe("Test17- POST /api/students", () => {
  test("status: 201 and return the new tutors", () => {
    return request(app)
      .post("/api/students")
      .set("Authorization", validAdmin)
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
        student_id = res.body.data.student_id;
        expect(res.body.data).toEqual({
          student_id: student_id,
          student_username: "stundentusername4",
          student_firstname: "New",
          student_lastname: "Student1LN",
          student_email: "csheraz@hotmail.com",
          student_password: res.body.data.student_password,
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
      .set("Authorization", validAdmin)
      .send({
        student_lastname: "Student1LN",
        student_email: "csheraz@hotmail.com",
      })
      .expect(500)
      .then((res) => {
       // expect(res.body.msg).toBe("Invalid input");
      });
  });
});

describe("Test18-   GET /api/students", () => {
  test("status: 200 and returns an array of tutors", () => {
    return request(app)
      .get("/api/students")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data).toHaveLength(5);
        res.body.data.forEach((student) => {
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
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy("student_id");
      });
  });

  test("QUERY: status 200: topics are sorted by passed query", () => {
    return request(app)
      .get("/api/students?sort_by=student_firstname")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy("student_firstname");
      });
  });

  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/students?sort_by=not_a_column")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
        //expect(res.body.msg).toBe("bad request");
      });
  });
});

describe("Test19- GET   /api/students/:student_id", () => {
  test("status: 200 and return a student object", () => {
    return request(app)
      .get(`/api/students/${student_id}`)
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          student_id: res.body.data.student_id,
          student_username: "stundentusername4",
          student_firstname: "New",
          student_lastname: "Student1LN",
          student_email: "csheraz@hotmail.com",
          student_password: res.body.data.student_password,
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
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
      //  expect(res.body.msg).toBe("Invalid input");
      });
  });

  test("ERROR  -status: 404 and returns an error message", () => {
    return request(app)
      .get("/api/students/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });
});

describe("Test20- PATCH /api/students/:student_id", () => {
  test("Status 200: and return a updated student object  ", () => {
    return request(app)
      .patch(`/api/students/${student_id}`)
      .set("Authorization", validAdmin)
      .send({
        student_username: "stundentusername1000",
        student_firstname: "Patched",
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
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          student_username: "stundentusername1000",
          student_firstname: "Patched",
          student_lastname: "Student1LN",
          student_email: "csheraz@hotmail.com",
          student_password: res.body.data.student_password,
          student_active: true,
          student_grade: 1,
          student_targetgrade: 1,
          student_notes: "Working well",
          student_progressbar: 3,
          student_image: "/student/student1.png",
          student_id: res.body.data.student_id,
        });
      });
  });
});

//---------------------------------Tutors-------------------------------/

describe("Test21- POST /api/tutors", () => {
  test("status: 201 and return the new tutors", () => {
    return request(app)
      .post("/api/tutors")
      .set("Authorization", validAdmin)
      .send({
        tutor_username: "scheema2",
        tutor_firstname: "New",
        tutor_lastname: "Cheema",
        tutor_email: "csheraz@hotmail.com",
        tutor_active: true,
        tutor_image: "/tutor/tutor1.png",
        tutor_password: password,
      })
      .expect(201)
      .then((res) => {
        tutor_id = res.body.data.tutor_id;
        expect(res.body.data).toEqual({
          tutor_id: res.body.data.tutor_id,
          tutor_username: "scheema2",
          tutor_firstname: "New",
          tutor_lastname: "Cheema",
          tutor_email: "csheraz@hotmail.com",
          tutor_active: true,
          tutor_image: "/tutor/tutor1.png",
          tutor_password: password,
        });
      });
  });

  test("Missing Field. status 400 and return error message", () => {
    return request(app)
      .post("/api/tutors")
      .set("Authorization", validAdmin)
      .send({
        tutor_firstname: "New",
        tutor_lastname: "Cheema",
        topic_code: "GFA2",
      })
      .expect(500)
      .then((res) => {
    //    expect(res.body.msg).toBe("Invalid input");
      });
  });
});

describe("Test22-   GET /api/tutors", () => {
  test("status: 200 and returns an array of tutors", () => {
    return request(app)
      .get("/api/tutors")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.tutors).toBeInstanceOf(Array);
        // expect(res.body.tutors).toHaveLength(res.body.tutors.length);
        expect(res.body.tutors).toHaveLength(3);
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
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.tutors).toBeSortedBy("tutor_id");
      });
  });

  test("QUERY: status 200: topics are sorted by passed query", () => {
    return request(app)
      .get("/api/tutors?sort_by=tutor_firstname")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.tutors).toBeSortedBy("tutor_firstname");
      });
  });

  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/tutors?sort_by=not_a_column")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
        //expect(res.body.msg).toBe("bad request");
      });
  });
});

describe("Test23- GET   /api/tutors/:tutor_id", () => {
  test("status: 200 and return a tutor object", () => {
    return request(app)
      .get(`/api/tutors/${tutor_id}`)
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          tutor_id: tutor_id,
          tutor_username: "scheema2",
          tutor_firstname: "New",
          tutor_lastname: "Cheema",
          tutor_email: "csheraz@hotmail.com",
          tutor_active: true,
          tutor_image: "/tutor/tutor1.png",
          tutor_password: res.body.data.tutor_password,
        });
      });
  });

  test("Error: course_id, non existent but valid. status 404 and an error message", () => {
    return request(app)
      .get("/api/tutors/invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
        //expect(res.body.msg).toBe("Invalid input");
      });
  });

  test("ERROR  -status: 404 and returns an error message", () => {
    return request(app)
      .get("/api/tutors/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });
});

describe("Test24- PATCH /api/tutors/:tutor_id", () => {
  test("Status 200: and return a updated tutor object  ", () => {
    return request(app)
      .patch(`/api/tutors/${tutor_id}`)
      .set("Authorization", validAdmin)
      .send({
        tutor_username: "scheema1000",
        tutor_firstname: "Patched",
        tutor_lastname: "Cheema",
        tutor_email: "csheraz@hotmail.com",
        tutor_active: true,
        tutor_image: "/tutor/tutor1.png",
        tutor_password: password,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          tutor_id: tutor_id,
          tutor_username: "scheema1000",
          tutor_firstname: "Patched",
          tutor_lastname: "Cheema",
          tutor_email: "csheraz@hotmail.com",
          tutor_active: true,
          tutor_image: "/tutor/tutor1.png",
          tutor_password: res.body.data.tutor_password,
        });
      });
  });
});

//---------------------------------Courses--------------------------/

describe("Test25- POST /api/courses", () => {
  test("status: 201 and return the new course", () => {
    return request(app)
      .post("/api/courses")
      .set("Authorization", validAdmin)
      .send({
        course_code: "New- MTH-GF",
        course_desc: "MTH GCSE Maths Foundation Online Course",
        course_image: "/course/mth_gcse_foundation.png",
        course_level: "Foundation",
        course_name: "MTH GCSE Maths Foundation",
      })
      .expect(201)
      .then((res) => {
        course_id = res.body.data.course_id;
        expect(res.body.data).toEqual({
          course_code: "New- MTH-GF",
          course_desc: "MTH GCSE Maths Foundation Online Course",
          course_image: "/course/mth_gcse_foundation.png",
          course_level: "Foundation",
          course_name: "MTH GCSE Maths Foundation",
          course_id: res.body.data.course_id,
        });
      });
  });

  test("Missing Field. status 400 and return error message", () => {
    return request(app)
      .post("/api/courses")
      .set("Authorization", validAdmin)
      .send({
        course_code: "New- MTH-GF",
        course_desc: "MTH GCSE Maths Foundation Online Course",
        course_image: "/course/mth_gcse_foundation.png",
      })
      .expect(500)
      .then((res) => {
        //expect(res.body.msg).toBe("Invalid input");
      });
  });
});

describe("Test26-   GET /api/courses", () => {
  test("status: 200 and returns an array of courses", () => {
    return request(app)
      .get("/api/courses")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data).toHaveLength(res.body.data.length);
        res.body.data.forEach((course) => {
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
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy("course_id");
      });
  });

  test("QUERY: status 200: topics are sorted by passed query", () => {
    return request(app)
      .get("/api/courses?sort_by=course_name")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy("course_name");
      });
  });

  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/courses?sort_by=not_a_column")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
        //expect(res.body.msg).toBe("bad request");
      });
  });
});

describe("Test27-   GET /api/courses/:course_id", () => {
  test("Query: course_id existing, status: 200 and returns a course object", () => {
    return request(app)
      .get(`/api/courses/${course_id}`)
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          course_id: res.body.data.course_id,
          course_code: "New- MTH-GF",
          course_desc: "MTH GCSE Maths Foundation Online Course",
          course_image: "/course/mth_gcse_foundation.png",
          course_level: "Foundation",
          course_name: "MTH GCSE Maths Foundation",
        });
      });
  });

  test("Error: course_id: invalid course_id. status 404 and an error message", () => {
    return request(app)
      .get("/app/courses/invalid_id")
      .set("Authorization", validAdmin)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid URL");
      });
  });

  test("Error: course_id, non existent but valid. status 404 and an error message", () => {
    return request(app)
      .get("/api/courses/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });
});

describe("Test28-   PATCH /api/courses/:course_id", () => {
  test("Status 200: and returns an updated course ", () => {
    return request(app)
      .patch(`/api/courses/${course_id}`)
      .set("Authorization", validAdmin)
      .send({
        course_code: "New Patched- MTH-GF",
        course_desc: "MTH GCSE Maths Foundation Online Course",
        course_image: "/course/mth_gcse_foundation.png",
        course_level: "Foundation",
        course_name: "MTH GCSE Maths Foundation",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          course_code: "New Patched- MTH-GF",
          course_desc: "MTH GCSE Maths Foundation Online Course",
          course_image: "/course/mth_gcse_foundation.png",
          course_level: "Foundation",
          course_name: "MTH GCSE Maths Foundation",
          course_id: course_id,
        });
      });
  });
});

// //---------------------------------Topic--------------------------/

describe("Test29- POST /api/topics", () => {
  test("status: 201 and return the new topic", () => {
    return request(app)
      .post("/api/topics")
      .set("Authorization", validAdmin)
      .send({
        topic_name: "New",
        topic_code: "GFA2",
        topic_desc: "MTH GCSE Maths Online Course - Foundation - Algebra 2",
        topic_index: 4,
        topic_course_id: course_id,
      })
      .expect(201)
      .then((res) => {
        topic_id = res.body.data.topic_id;
        expect(res.body.data).toEqual({
          topic_name: "New",
          topic_code: "GFA2",
          topic_desc: "MTH GCSE Maths Online Course - Foundation - Algebra 2",
          topic_index: 4,
          topic_course_id: course_id,
          topic_id: topic_id,
        });
      });
  });

  test("Missing Field. status 400 and return error message", () => {
    return request(app)
      .post("/api/topics")
      .set("Authorization", validAdmin)
      .send({
        topic_code: "GFA2",
        topic_desc: "MTH GCSE Maths Online Course - Foundation - Algebra 2",
      })
      .expect(500)
      .then((res) => {
     //  expect(res.body.msg).toBe("Invalid input");
      });
  });
});

describe("Test30-   GET /api/topics", () => {
  test("status: 200 and returns an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toBeInstanceOf(Array);
        expect(res.body.topics).toHaveLength(res.body.topics.length);
        res.body.topics.forEach((topic) => {
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
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toBeSortedBy("topic_index");
      });
  });

  test("QUERY: status 200: topics are sorted by passed query", () => {
    return request(app)
      .get("/api/topics?sort_by=topic_id")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toBeSortedBy("topic_id");
      });
  });

  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/topics?sort_by=not_a_column")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
  //      expect(res.body.msg).toBe("bad request");
      });
    //});
  });
});

describe("Test31- GET   /api/topics/:topic_id", () => {
  test("status: 200 and return a topic object", () => {
    return request(app)
      .get(`/api/topics/${topic_id}`)
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          topic_name: "New",
          topic_code: "GFA2",
          topic_desc: "MTH GCSE Maths Online Course - Foundation - Algebra 2",
          topic_index: 4,
          topic_course_id: course_id,
          topic_id: topic_id,
        });
      });
  });

  test("Error: course_id, non existent but valid. status 404 and an error message", () => {
    return request(app)
      .get("/api/topics/invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
        //expect(res.body.msg).toBe("Invalid input");
      });
  });

  test("ERROR  -status: 404 and returns an error message", () => {
    return request(app)
      .get("/api/topics/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });
});

describe("Test32- PATCH /api/topic/:topic_id", () => {
  test("Status 200: and return a updated topic object  ", () => {
    return request(app)
      .patch(`/api/topics/${topic_id}`)
      .set("Authorization", validAdmin)
      .send({
        topic_name: "Patched Statistics",
        topic_code: "GHS1",
        topic_desc: "MTH GCSE Maths Online Course - Higher - Statistics",
        topic_index: 9,
        topic_course_id: course_id,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          topic_name: "Patched Statistics",
          topic_code: "GHS1",
          topic_desc: "MTH GCSE Maths Online Course - Higher - Statistics",
          topic_index: 9,
          topic_course_id: course_id,
          topic_id: topic_id,
        });
      });
  });
});

// //------------------------Lesson--------------/

describe("Test33- POST /api/lessons", () => {
  test("status: 201 and return the new lessons", () => {
    return request(app)
      .post("/api/lessons")
      .set("Authorization", validAdmin)
      .send({
        lesson_name: "New- Addition, Subtraction and Money Problems",
        lesson_code: "GFN1LC1",
        lesson_desc: "To be able to add, subtract, and solve money problems.",
        lesson_ws: "GFN1WS1",
        lesson_body: "PowerPoint",
        lesson_topic_id: topic_id,
      })
      .expect(201)
      .then((res) => {
        lesson_id = res.body.data.lesson_id;
        expect(res.body.data).toEqual({
          lesson_name: "New- Addition, Subtraction and Money Problems",
          lesson_code: "GFN1LC1",
          lesson_desc: "To be able to add, subtract, and solve money problems.",
          lesson_ws: "GFN1WS1",
          lesson_body: "PowerPoint",
          lesson_topic_id: topic_id,
          lesson_id: lesson_id,
        });
      });
  });

  test("Missing Field. status 400 and return error message", () => {
    return request(app)
      .post("/api/lessons")
      .set("Authorization", validAdmin)
      .send({
        student_lastname: "Student1LN",
        student_email: "csheraz@hotmail.com",
      })
      .expect(500)
      .then((res) => {
        //expect(res.body.msg).toBe("Invalid input");
      });
  });
});

describe("Test34-   GET /api/lessons", () => {
  test("status: 200 and returns an array of lessons", () => {
    return request(app)
      .get("/api/lessons")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data).toHaveLength(res.body.data.length);
        res.body.data.forEach((lesson) => {
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
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy("lesson_id");
      });
  });

  test("QUERY: status 200: lessons are sorted by passed query", () => {
    return request(app)
      .get("/api/lessons?sort_by=lesson_name")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy("lesson_name");
      });
  });

  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/lessons?sort_by=not_a_column")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
        //expect(res.body.msg).toBe("bad request");
      });
  });
});

describe("Test35- GET   /api/lessons/:lesson_id", () => {
  test("status: 200 and return a lesson object", () => {
    return request(app)
      .get(`/api/lessons/${lesson_id}`)
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          lesson_id: lesson_id,
          lesson_topic_id: res.body.data.lesson_topic_id,
          lesson_name: "New- Addition, Subtraction and Money Problems",
          lesson_code: "GFN1LC1",
          lesson_desc: "To be able to add, subtract, and solve money problems.",
          lesson_ws: "GFN1WS1",
          lesson_body: "PowerPoint",
        });
      });
  });

  test("Error: student_id, non existent but valid. status 404 and an error message", () => {
    return request(app)
      .get("/api/lessons/invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
        console.log(res.body)
       // expect(res.body.msg).toBe("Invalid input");
      });
  });

  test("ERROR  -status: 404 and returns an error message", () => {
    return request(app)
      .get("/api/lessons/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });
});

describe("Test36- PATCH /api/lessons/:lesson_id", () => {
  test("Status 200: and return a updated student object  ", () => {
    return request(app)
      .patch(`/api/lessons/${lesson_id}`)
      .set("Authorization", validAdmin)
      .send({
        lesson_name: "patched- Addition, Subtraction and Money Problems",
        lesson_code: "GFN1LC1",
        lesson_desc: "To be able to add, subtract, and solve money problems.",
        lesson_ws: "GFN1WS1",
        lesson_body: "PowerPoint",
        lesson_topic_id: topic_id,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          lesson_id: lesson_id,
          lesson_topic_id: res.body.data.lesson_topic_id,
          lesson_name: "patched- Addition, Subtraction and Money Problems",
          lesson_code: "GFN1LC1",
          lesson_desc: "To be able to add, subtract, and solve money problems.",
          lesson_ws: "GFN1WS1",
          lesson_body: "PowerPoint",
        });
      });
  });
});

// //--------------------Quiz--------------------------/

describe("Test37- POST /api/quizzes", () => {
  test("status: 201 and return the new tutors", () => {
    return request(app)
      .post("/api/quizzes")
      .set("Authorization", validAdmin)
      .send({
        quiz_name: "NewPost Number 2- Topic Diagnostic Quiz",
        quiz_code: "GFN2TDQ",
        quiz_type: "TopicDiagnostic",
      })
      .expect(201)
      .then((res) => {
        quiz_id = res.body.data.quiz_id;
        expect(res.body.data).toEqual({
          quiz_name: "NewPost Number 2- Topic Diagnostic Quiz",
          quiz_code: "GFN2TDQ",
          quiz_type: "TopicDiagnostic",
          quiz_id: quiz_id,
        });
      });
  });

  test("Missing Field. status 400 and return error message", () => {
    return request(app)
      .post("/api/quizzes")
      .set("Authorization", validAdmin)
      .send({
        quiz_code: "GFN2TDQ",
        quiz_type: "TopicDiagnostic",
      })
      .expect(500)
      .then((res) => {
      //  expect(res.body.msg).toBe("Invalid input");
      });
  });
});

describe("Test38-   GET /api/quizzes", () => {
  test("status: 200 and returns an array of tutors", () => {
    return request(app)
      .get("/api/quizzes")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data).toHaveLength(res.body.data.length);
        res.body.data.forEach((quiz) => {
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
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy("quiz_id");
      });
  });

  test("QUERY: status 200: quizes are sorted by passed query", () => {
    return request(app)
      .get("/api/quizzes?sort_by=quiz_name")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy("quiz_name");
      });
  });

  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/quizzes?sort_by=not_a_column")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
       // expect(res.body.msg).toBe("bad request");
      });
  });
});

describe("Test39- GET   /api/quizzes/:quiz_id", () => {
  test("status: 200 and return a quiz object", () => {
    return request(app)
      .get(`/api/quizzes/${quiz_id}`)
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          quiz_id: res.body.data.quiz_id,
          quiz_name: expect.any(String),
          quiz_code: expect.any(String),
          quiz_type: expect.any(String),
        });
      });
  });

  test("Error: quiz_id, non existent but valid. status 404 and an error message", () => {
    return request(app)
      .get("/api/quizzes/invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
      //  expect(res.body.msg).toBe("Invalid input");
      });
  });

  test("ERROR  -status: 404 and returns an error message", () => {
    return request(app)
      .get("/api/quizzes/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });
});

describe("Test40- PATCH /api/quizzes/:quiz_id", () => {
  test("Status 200: and return a updated quiz object  ", () => {
    return request(app)
      .patch(`/api/quizzes/${quiz_id}`)
      .set("Authorization", validAdmin)
      .send({
        quiz_name: "NewPatch Number 2- Topic Diagnostic Quiz",
        quiz_code: "GFN2TDQ",
        quiz_type: "TopicDiagnostic",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          quiz_name: "NewPatch Number 2- Topic Diagnostic Quiz",
          quiz_code: "GFN2TDQ",
          quiz_type: "TopicDiagnostic",
          quiz_id: res.body.data.quiz_id,
        });
      });
  });
});

// //----------------------Question--------------------------/

describe("Test41- POST /api/questions", () => {
  test("status: 201 and return the new questions", () => {
    return request(app)
      .post("/api/questions")
      .set("Authorization", validAdmin)
      .send({
        ques_quiz_id: quiz_id,
        ques_lesson_id: lesson_id,
        ques_body: "4.79 - 1.2",
        ques1_ans: "3.59",
        ques_mark: 1,
        ques_grade: 2,
        ques_calc: false,
        ques_ans_explain: "explanation",
      })
      .expect(201)
      .then((res) => {
        ques_id = res.body.data.ques_id;
        expect(res.body.data).toEqual({
          ques_id: res.body.data.ques_id,
          ques_quiz_id: quiz_id,
          ques_lesson_id: lesson_id,
          ques_body: "4.79 - 1.2",
          ques1_ans: "3.59",
          ques_mark: 1,
          ques_grade: 2,
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
      .set("Authorization", validAdmin)
      .send({
        ques1_ans: "3.59",
      })
      .expect(500)
      .then((res) => {
        //expect(res.body.msg).toBe("Invalid input");
      });
  });
});

describe("Test42-   GET /api/questions", () => {
  test("status: 200 and returns an array of questions", () => {
    return request(app)
      .get("/api/questions")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data).toHaveLength(res.body.data.length);
        res.body.data.forEach((question) => {
          expect(question).toMatchObject({
            ques_id: expect.any(Number),
            ques_lesson_id: expect.any(Number),
            ques_body: expect.any(String),
            ques_grade: expect.any(Number),
            ques_calc: expect.any(Boolean),
            ques1_ans: expect.any(String),
            ques2_ans: expect.toBeOneOf([expect.any(String), null]),
            ques_quiz_id: expect.toBeOneOf([expect.any(Number), null]),
            ques_mark: expect.toBeOneOf([expect.any(Number), null]),
            ques_image: expect.toBeOneOf([expect.any(String), null]),
            ques3_ans: expect.toBeOneOf([expect.any(String), null]),
            ques_ans_explain: expect.toBeOneOf([expect.any(String), null]),
            ques_ans_mark: expect.toBeOneOf([expect.any(Number), null]),
            ques_ans_image: expect.toBeOneOf([expect.any(String), null]),
            ques_ans_correct: expect.toBeOneOf([expect.any(Boolean), null]),
            ques_ans_sym_b: expect.toBeOneOf([expect.any(String), null]),
            ques_ans_sym_a: expect.toBeOneOf([expect.any(String), null]),
          });
        });
      });
  });

  test("QUERY: status 200 : quizzes are sorted by question id", () => {
    return request(app)
      .get("/api/questions")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy("ques_id");
      });
  });

  test("QUERY: status 200: question are sorted by passed query", () => {
    return request(app)
      .get("/api/questions?sort_by=ques_id")
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy("ques_id");
      });
  });

  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/questions?sort_by=not_a_column")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
      //  expect(res.body.msg).toBe("bad request");
      });
  });
});

describe("Test43- GET   /api/questions/:question_id", () => {
  test("status: 200 and return a question object", () => {
    return request(app)
      .get(`/api/questions/${ques_id}`)
      .set("Authorization", validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          ques_id: expect.any(Number),
          ques1_ans: expect.any(String),
          ques_body: expect.any(String),
          ques_calc: expect.any(Boolean),
          ques_grade: expect.any(Number),
          ques_lesson_id: expect.any(Number),
          ques_mark: expect.toBeOneOf([expect.any(Number), null]),
          ques_image: expect.toBeOneOf([expect.any(String), null]),
          ques2_ans: expect.toBeOneOf([expect.any(String), null]),
          ques3_ans: expect.toBeOneOf([expect.any(String), null]),
          ques_ans_explain: expect.toBeOneOf([expect.any(String), null]),
          ques_ans_mark: expect.toBeOneOf([expect.any(Number), null]),
          ques_ans_image: expect.toBeOneOf([expect.any(String), null]),
          ques_ans_correct: expect.toBeOneOf([expect.any(Boolean), null]),
          ques_ans_sym_b: expect.toBeOneOf([expect.any(String), null]),
          ques_ans_sym_a: expect.toBeOneOf([expect.any(String), null]),
          ques_quiz_id: expect.toBeOneOf([expect.any(Number), null]),
        });
      });
  });

  test("Error: question_id, non existent but valid. status 404 and an error message", () => {
    return request(app)
      .get("/api/questions/invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
      .then((res) => {
       // expect(res.body.msg).toBe("Invalid input");
      });
  });

  test("ERROR  -status: 404 and returns an error message", () => {
    return request(app)
      .get("/api/questions/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });
});

describe("Test44- PATCH /api/questions/:ques_id", () => {
  test("Status 200: and return a updated ques object  ", () => {
    return request(app)
      .patch(`/api/questions/${ques_id}`)
      .set("Authorization", validAdmin)
      .send({
        ques_body: "new 4.79 - 1.2",
        ques1_ans: "3.59",
        ques_mark: 1,
        ques_grade: 2,
        ques_quiz_id: quiz_id,
        ques_lesson_id: lesson_id,
        ques_calc: false,
        ques_ans_explain: "explanation",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          ques_id: ques_id,
          ques_quiz_id: quiz_id,
          ques_lesson_id: lesson_id,
          ques_body: "new 4.79 - 1.2",
          ques1_ans: "3.59",
          ques_mark: 1,
          ques_grade: 2,
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
});



//--------------------------------- DELETE ACCODINGLY--------------------------/

describe("Test45-  DELETE /api/students/:student_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
      .delete(`/api/students/${initial_student_id}`)
      .set("Authorization", validAdmin)
      .expect(204);
  });

  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
      .delete(`/api/students/${student_id}`)
      .set("Authorization", validAdmin)
      .expect(204);
  });

  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/students/Invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
      //.then((res) => expect(res.body.msg).toBe("Invalid input"));
  });

  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/students/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid Input"));
  });
});

describe("Test46-  DELETE /api/tutor/:tutor_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
      .delete(`/api/tutors/${tutor_id}`)
      .set("Authorization", validAdmin)
      .expect(204);
  });

  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/tutors/Invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
     // .then((res) => expect(res.body.msg).toBe("Invalid input"));
  });

  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/tutors/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid Input"));
  });
});

describe("Test47-  DELETE /api/questions/:ques_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
      .delete(`/api/questions/${ques_id}`)
      .set("Authorization", validAdmin)
      .expect(204);
  });

  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/questions/Invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
     // .then((res) => expect(res.body.msg).toBe("Invalid input"));
  });

  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/questions/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid Input"));
  });
});

describe("Test48-  DELETE /api/lessons/:lesson_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
      .delete(`/api/lessons/${lesson_id}`)
      .set("Authorization", validAdmin)
      .expect(204);
  });

  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/lessons/Invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
     // .then((res) => expect(res.body.msg).toBe("Invalid input"));
  });

  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/lessons/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid Input"));
  });
});

describe("Test49-  DELETE /api/quizzes/:quiz_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
      .delete(`/api/quizzes/${quiz_id}`)
      .set("Authorization", validAdmin)
      .expect(204);
  });

  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/quizzes/Invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
     // .then((res) => expect(res.body.msg).toBe("Invalid input"));
  });

  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/quizzes/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid Input"));
  });
});

describe("Test50-  DELETE /api/topic/:topic_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
      .delete(`/api/topics/${topic_id}`)
      .set("Authorization", validAdmin)
      .expect(204);
  });

  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/topics/Invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
      //.then((res) => expect(res.body.msg).toBe("Invalid input"));
  });

  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/topics/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid Input"));
  });
});

describe("Test51-   DELETE /api/course/:course_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
      .delete(`/api/courses/${course_id}`)
      .set("Authorization", validAdmin)
      .expect(204);
  });

  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/courses/Invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
      //.then((res) => expect(res.body.msg).toBe("Invalid input"));
  });

  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/courses/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid Input"));
  });
});
describe("Test45-  DELETE /api/admin/:admins_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app)
      .delete(`/api/admin/${admins_id}`)
      .set("Authorization", validAdmin)
      .expect(204);
  });


  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/admin/Invalid_id")
      .set("Authorization", validAdmin)
      .expect(500)
      //.then((res) => expect(res.body.msg).toBe("Invalid input"));
  });

  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/admin/1000")
      .set("Authorization", validAdmin)
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid Input"));
  });
});