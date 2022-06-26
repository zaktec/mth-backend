const request = require("supertest");
const app = require("../app");
const db = require("../database/connection.js");
const seed = require("../database/seeds/seed");
const testData = require("../database/data/test-data");
const topics = require("../database/data/test-data/topics");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api", () => {
  describe("GET", () => {
    test("status: 200 and returns a welcome message", () => {
      return request(app)
        .get("/api/homepage")
        .expect(200)
        .then((res) => {
          // console.log(res)
          expect(res.body.msg).toBe("Welcome to the HomePage");
        });
    });
  });
});
describe("/api/courses", () => {
  describe("GET", () => {
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
              course_date: expect.any(String),
              course_desc: expect.any(String),
              course_id: expect.any(Number),
              course_level: expect.any(String),
              course_name: expect.any(String),
            });
          });
        });
    });
  });
});
describe("/api/topics", () => {
  describe("GET", () => {
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
              topic_date: expect.any(String),
              topic_course_id: expect.any(Number),
            });
          });
        });
    });
    test("200: topics are sorted by index number", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          console.log(topics);
          expect(res.body.topics).toBeSortedBy("topic_index");
        });
    });

    test("200: topics are sorted by passed query", () => {
      return request(app)
        .get("/api/topics?sort_by=topic_date")
        .expect(200)
        .then((res) => {
          console.log(topics);
          expect(res.body.topics).toBeSortedBy("topic_date");
        });
    });

    test(" ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
      return request(app)
        .get("/api/topics?sort_by=not_a_column")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("bad request");
        });
    });
  });
});
