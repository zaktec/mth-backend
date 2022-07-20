const request = require("supertest");
const app = require("../app");
const db = require("../database/connection.js");
const seed = require("../database/seeds/seed");
const testData = require("../database/data/test-data");
const topics = require("../database/data/test-data/topics");

beforeEach(() => seed(testData));
afterAll(() => db.end());

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
  test("status: 200 and returns a JSON", () => {
    return request(app)
      .get("/api/")
      .expect(200)
      .then((res) => {
      });
  });
});

describe("Test3-  GET /api/homepage", () => {
  test("status: 200 and returns a welcome message", () => {
    return request(app)
      .get("/api/homepage")
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe("Welcome to the HomePage");
      });
  });
});

//---------------------------------Courses--------------------------/

describe("Test4-   GET /api/courses", () => {
  //describe("GET", () => {
  test("status: 200 and returns an array of courses", () => {
    return request(app)
      .get("/api/courses")
      .expect(200)
      .then((res) => {
        //  console.log(res)
        expect(res.body.courses).toBeInstanceOf(Array);
        expect(res.body.courses).toHaveLength(5);
        res.body.courses.forEach((course) => {
          expect(course).toMatchObject({
            course_code: expect.any(String),
            course_created_at: expect.any(String),
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
      .expect(200)
      .then((res) => {
        //  console.log(topics);
        expect(res.body.courses).toBeSortedBy("course_id");
      });
  });
  test("QUERY: status 200: topics are sorted by passed query", () => {
    return request(app)
      .get("/api/courses?sort_by=course_created_at")
      .expect(200)
      .then((res) => {
        //console.log(topics);
        expect(res.body.courses).toBeSortedBy("course_created_at");
      });
  });
  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/courses?sort_by=not_a_column")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("bad request");
      });
  });
});

describe("Test5-   GET /api/courses/:course_id", () => {
  test("Query: course_id existing, status: 200 and returns a course object", () => {
    return request(app)
      .get("/api/courses/1")
      .expect(200)
      .then((res) => {
        expect(res.body.course).toEqual({
          course_code: "MTH-GF",
          course_created_at: expect.any(String),
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
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not found");
      });
  });
  test("Error: course_id: invalid course_id. status 404 and an error message", () => {
    return request(app)
      .get("/app/courses/a")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid URL");
      });
  });
});

describe("Test6- POST /api/courses", () => {
  test("status: 201 and return the new course", () => {
    return request(app)
      .post("/api/courses")
      .send({
        course_code: "New- MTH-GF",
        course_created_at: new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
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
          course_created_at: expect.any(String),
          course_id: 6,
        });
      });
  });
  test("Missing Field. status 400 and return error message", () => {
    return request(app)
      .post("/api/courses")
      .send({
        course_code: "New- MTH-GF",
        course_created_at: new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        course_desc: "MTH GCSE Maths Foundation Online Course",
        course_image: "/course/mth_gcse_foundation.png",
        course_level: "Foundation",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
});

describe("Test7-   DELETE /api/course/:course_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app).delete("/api/courses/1").expect(204);
  });
  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/courses/Invalid_id")
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid input"));
  });
  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/courses/1000")
      .expect(404)
      .then((res) => expect(res.body.msg).toBe("Not found"));
  });
});

describe("Test8-   PATCH /api/courses/:course_id", () => {
  test("Status 200: and returns an updated course ", () => {
    return request(app)
      .patch("/api/courses/1")
      .send({
        course_code: "New- MTH-GF",
        course_created_at: new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        course_desc: "MTH GCSE Maths Foundation Online Course",
        course_image: "/course/mth_gcse_foundation.png",
        course_level: "Foundation",
        course_name: "MTH GCSE Maths Foundation",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.updatedCourse).toEqual({
          course_code: "New- MTH-GF",
          course_created_at: expect.any(String),
          course_desc: "MTH GCSE Maths Foundation Online Course",
          course_image: "/course/mth_gcse_foundation.png",
          course_level: "Foundation",
          course_name: "MTH GCSE Maths Foundation",
          course_id: 1,
        });
      });
  });
});

//---------------------------------Topic--------------------------/

describe("Test9-   GET /api/topics", () => {
  //describe("GET", () => {
  test("status: 200 and returns an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        //  console.log(res)
        expect(res.body.topics).toBeInstanceOf(Array);
        expect(res.body.topics).toHaveLength(18);
        res.body.topics.forEach((topic) => {
          //console.log(topic)
          expect(topic).toMatchObject({
            topic_name: expect.any(String),
            topic_code: expect.any(String),
            topic_desc: expect.any(String),
            topic_index: expect.any(Number),
            topic_created_at: expect.any(String),
            topic_course_id: expect.any(Number),
          });
        });
      });
  });
  test("QUERY: status 200 : topics are sorted by index number", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        //  console.log(topics);
        expect(res.body.topics).toBeSortedBy("topic_index");
      });
  });
  test("QUERY: status 200: topics are sorted by passed query", () => {
    return request(app)
      .get("/api/topics?sort_by=topic_created_at")
      .expect(200)
      .then((res) => {
        //console.log(topics);
        expect(res.body.topics).toBeSortedBy("topic_created_at");
      });
  });
  test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
    return request(app)
      .get("/api/topics?sort_by=not_a_column")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("bad request");
      });
    //});
  });
});

describe("Test10- POST /api/topics", () => {
  test("status: 201 and return the new topic", () => {
    return request(app)
      .post("/api/topics")
      .send({
        topic_name: "New",
        topic_code: "GFA2",
        topic_desc: "MTH GCSE Maths Online Course - Foundation - Algebra 2",
        topic_index: 4,
        topic_created_at: new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        topic_course_id: 1,
      })
      .expect(201)
      .then((res) => {
        expect(res.body.topic).toEqual({
          topic_name: "New",
          topic_code: "GFA2",
          topic_desc: "MTH GCSE Maths Online Course - Foundation - Algebra 2",
          topic_index: 4,
          topic_created_at: expect.any(String),
          topic_course_id: 1,
          topic_id: 19,
        });
      });
  });
});

describe("Test11- GET   /api/topics/:topic_id", () => {
  //describe("GET", () => {
  test("status: 200 and return a topic object", () => {
    return request(app)
      .get("/api/topics/18")
      .expect(200)
      .then((res) => {
        expect(res.body.topic).toEqual({
          topic_name: "Statistics",
          topic_code: "GHS1",
          topic_desc: "MTH GCSE Maths Online Course - Higher - Statistics",
          topic_index: 9,
          topic_created_at: expect.any(String),
          topic_course_id: 2,
          topic_id: 18,
        });
      });
  });
  test("ERROR  -status: 400 and returns an error message", () => {
    return request(app)
      .get("/api/topics/invalid_id")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
});
test("ERROR  -status: 404 and returns an error message", () => {
  return request(app)
    .get("/api/topics/1000")
    .expect(404)
    .then((res) => {
      expect(res.body.msg).toBe("Not found");
    });
});

describe("Test12-  DELETE /api/topic/:topic_id", () => {
  test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
    return request(app).delete("/api/topics/1").expect(204);
  });
  test("status 400 and returns an error message if it is a bad request", () => {
    return request(app)
      .delete("/api/topics/Invalid_id")
      .expect(400)
      .then((res) => expect(res.body.msg).toBe("Invalid input"));
  });
  test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
    return request(app)
      .delete("/api/topics/1000")
      .expect(404)
      .then((res) => expect(res.body.msg).toBe("Not found"));
  });
});
describe("Test13- PATCH /api/topic/:topic_id", () => {
  test("Status 200: and return a updated topic object  ", () => {
    return request(app)
      .patch("/api/topics/1")
      .send({
        topic_name: "Statistics",
        topic_code: "GHS1",
        topic_desc: "MTH GCSE Maths Online Course - Higher - Statistics",
        topic_index: 9,
        topic_created_at: new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        topic_course_id: 2,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.updatedTopic).toEqual({
          topic_name: "Statistics",
          topic_code: "GHS1",
          topic_desc: "MTH GCSE Maths Online Course - Higher - Statistics",
          topic_index: 9,
          topic_created_at: expect.any(String),
          topic_course_id: 2,
          topic_id: 1,
        });
      });
  });
});
