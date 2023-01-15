const request = require("supertest");
const app = require("../app");
require("expect-more-jest");
const bcrypt = require("bcryptjs");
const seed = require("../database/seeds/seed");
const testData = require("../database/data/test-data");
const db = require("../database/connection.js");

let topic_id;
let tutor_id;
let course_id;
let student_id;
let validStudent;
let tutor_username;
let student_username;
let initial_student_id;
let invalidStudent = `BEARER invalidToken`;
const password = bcrypt.hashSync("password", 10);

afterAll(() => seed(testData));
afterAll(() => db.end());

//-------------------unauthrosided----------------------/

describe("Test1-   GET /invalid_url", () => {
  test("ERROR: status 404 and returns a message when invalid url is passed ", () => {
    return request(app)
      .get("/invalid_url")
      .expect(401)
      .then((res) => {
        expect(res.body.msg).toBe("halt intruder! get outta here");
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

//-------------------unauthrosided----------------------/

describe.only("Test4- POST /signin", () => {
  test("POST responds with and access token given correct username and password", () => {
    return request(app)
      .post("/signin")
      .send({
        student_grade: 1000000,
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
          student_grade: 1000000,
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

describe("login", () => {
  test("POST responds with and access token given correct username and password", () => {
    return request(app)
      .post("/login")
      .send({ username: "stundentusernamedemo1", password: "password" })
      .expect(200)
      .then((res) => {
        validStudent = `BEARER ${res.body.token}`;
        expect(res.body.msg).toBe("Logged in");
      });
  });
  test.only("POST responds with status 401 for an incorrect password", () => {
    return request(app)
      .post("/login")
      .send({ username: "stundentusernamedemo1", password: "secure123" })
      .expect(401)
      .then((res) =>
        // consolelog("ping >>>>." ,  res)
        expect(res.body.msg).toBe("invalid username or password")
      );
  });

  test.skip("POST responds with status 401 for an incorrect username", () => {
    return request(app)
      .post("/login")
      .send({ username: "mitch", password: "secure123" })
      .expect(401)
      .then((res) => expect(res.body.msg).toBe("invalid username or password"));
  });
  test("ERROR: status 401 if an invalid token is provided ", () => {
    return request(app)
      .get("/api")
      .set("Authorization", invalidStudent)
      .expect(401)
      .then((res) => {
        expect(res.body.msg).toBe("halt intruder! get outta here");
      });
  });
});


//-------------------student----------------------/

describe("Test20-   GET /api/students", () => {
    test("status: 200 and returns an array of tutors", () => {
      return request(app)
        .get("/api/students")
        .set('Authorization', validStudent)
        .expect(200)
        .then((res) => {
          //console.log(res)
          expect(res.body.students).toBeInstanceOf(Array);
          expect(res.body.students).toHaveLength(4);
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
    test("QUERY: status 200 : courses are sorted by index number", () => {
      return request(app)
        .get("/api/students")
        .set('Authorization', validStudent)
        .expect(200)
        .then((res) => {
          //  console.log(res);
          expect(res.body.students).toBeSortedBy("student_grade");
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
  describe("Test21- GET   /api/students/:student_id", () => {
    //describe("GET", () => {
    test("status: 200 and return a student object", () => {
      return request(app)
        .get("/api/students/1")
        .set('Authorization', validStudent)
        .expect(200)
        .then((res) => {
          // console.log(res)
          expect(res.body.student).toEqual({
            student_id: 1,
            student_username: "stundentusername1",
            student_firstname: "Student1FN",
            student_lastname: "Student1LN",
            student_email: "csheraz@hotmail.com",
            student_password: "password",
            student_active: true,
            student_grade: 1,
            student_targetgrade: 5,
            student_notes: "Working well",
            student_progressbar: 1,
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
  describe("Test22- POST /api/students", () => {
    test("status: 201 and return the new tutors", () => {
      return request(app)
        .post("/api/students")
        .set('Authorization', validStudent)
        .send({
          student_username: "stundentusername4",
          student_firstname: "New",
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
        .expect(201)
        .then((res) => {
          expect(res.body.student).toEqual({
            student_id: 5,
            student_username: "stundentusername4",
            student_firstname: "New",
            student_lastname: "Student1LN",
            student_email: "csheraz@hotmail.com",
            student_password: "password",
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
  describe("Test23-  DELETE /api/students/:student_id", () => {
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
  describe("Test24- PATCH /api/students/:student_id", () => {
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