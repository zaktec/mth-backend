const request  = require("supertest");
const app =require("../app")
const db = require("../database/connection.js")
const seed =require('../database/seeds/seed');
const testData = require('../database/data/test-data')

beforeEach(() => seed(testData));
afterAll(()=> db.end());


describe('/api', () => {
    describe('GET', () => {
        test('status: 200 and returns a welcome message', () => {
            return request(app).get('/api/homepage').expect(200)
            .then((res) => {
               // console.log(res)
                expect(res.body.msg).toBe("Welcome to the API")
            });
        });        
    });
});
describe('/api/courses', () => {
    describe('GET', () => {
        test('status: 200 and returns an array of courses', () => {
            return request(app).get('/api/courses').expect(200)
            .then((res) => {
              
          //  console.log(res)
            expect(res.body.courses).toHaveLength(5);
            res.body.courses.forEach((course)=> {
               console.log(course)
                expect(course).toEqual(
                   expect.objectContaining({
                    course_id: expect.any(Number),
                    course_name: expect.any(String),
                    course_code: expect.any(String),
                    course_desc: expect.any(String),
                    course_level: expect.any(String),
                    course_image: expect.any(String),
                    course_date: expect.any(null),
                })
           );
       }); 
             });
        });        
    });
});