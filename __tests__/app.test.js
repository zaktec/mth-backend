require('expect-more-jest');
const request = require('supertest');
const server = require('../server/app');
const db = require('../server/v1/configs/database/connection');
const seed = require('../server/v1/configs/database/seeds/seed');
const testData = require('../server/v1/configs/database/data/test-data');

/* -------------------------------------------------------- 
1.   Unauthorized EndPoints        ----45
2.   Admin SignUp/Login            ----70
3.   Tutor SignUp/login            ----135
4.   Student SignUp/Login          ----202
5.   Admin Endpoints               ----287
6.   Student Endpoints             ----459
7.   Tutor Endpoints               ----675
8.   Courses Endpoints             ----849
9.   Topic Endpoints               ----1010
10.  Lesson Endpoints              ----1178
11.  Quizzes  Endpoints            ----1147
12.  Question Endpoints            ----1522
13.  AdminDashBoard Endpoints      ----1778
14.  TutorDashboard Endpoints      ----1825
12.  StudentDashboard Endpoints    ----1522
13.  Logout User                   ----1895
14.  DELETE ACCODINGLY             ----1778
15.  Admin Logout                 ----1825

 ---------------------------------------------------------*/
 
let quiz_id;
let admin_id;
let topic_id;
let tutor_id;
let lesson_id;
let course_id;
let student_id;
let validTutor;
let validAdmin;
let question_id;
let validStudent;
let initial_student_id;
let invalidAdmin = `BEARER invalidToken`;
let invalidStudent = `BEARER invalidToken`;

beforeAll(() => seed(testData));
afterAll((done) => {
  server.close();
  db.end();
  done();
})

//-------------------1-Unauthorized EndPoints

describe('Test1 - GET /api/v1/any-url', () => {
  test('Sucess: status 200 and returns a message when any url is passed with GET method', () => {
    return request(server)
      .get('/api/v1/any-url')
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Welcome To MTH Version 1');
      });
  });
});

describe('Test2 - POST /api/v1/invalid-url', () => {
  test('ERROR: status 404 and returns a message when invalid url is passed ', () => {
    return request(server)
      .post('/api/v1/invalid-url')
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe('Invalid URL');
      });
  });
});

//------------------2-Admin SignUp/Login

describe('Test4 - POST /api/v1/auth/signup-admin', () => {
  test('Post: Admin Registration -respond with access token  when admin details are send', () => {
    return request(server)
      .post('/api/v1/auth/signup-admin')
      .send({
        admin_username: 'scheema1',
        admin_firstname: 'New',
        admin_lastname: 'Cheema',
        admin_email: 'csheraz@hotmail.com',
        admin_active: true,
        admin_image: '/tutor/tutor1.png',
        admin_password: 'Password@123',
      })
      .expect(201)
      .then((res) => {
        admin_id = res.body.admin.admin_id;
        expect(res.body.admin).toEqual({
          admin_id: res.body.admin.admin_id,
          admin_username: 'scheema1',
          admin_firstname: 'New',
          admin_lastname: 'Cheema',
          admin_email: 'csheraz@hotmail.com',
          admin_active: true,
          admin_image: '/tutor/tutor1.png',
          admin_password: res.body.admin.admin_password,
        });
      });
  });
});

describe('Test5 - POST /api/v1/auth/signin-admin', () => {
  test('POST- Admin Login- responds with status 200 and access token when username and password are correct', () => {
    return request(server)
      .post('/api/v1/auth/signin-admin')
      .send({ username: 'scheema1', password: 'Password@123', deviceId: '3f9a1b2c8' })
      .expect(200)
      .then((res) => {
        validAdmin = `BEARER ${res.body.token}`;
        expect(res.body.message).toBe('Success');
        expect(res.body.deviceId).toBe('3f9a1b2c8');
      });
  });

  test('POST - responds with status 401 for an incorrect password', () => {
    return request(server)
      .post('/api/v1/auth/signin-admin')
      .send({ username: 'scheema1', password: 'Password@321', deviceId: '3f9a1b2c8' })
      .expect(401)
      .then((res) =>
        expect(res.body.message).toBe('username and password do not exist')
      );
  });

  test('POST - responds with status 401 for an incorrect username', () => {
    return request(server)
      .post('/api/v1/auth/signin-admin')
      .send({ username: 'invalid-username', password: 'Password@321', deviceId: '3f9a1b2c8' })
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe('username and password do not exist')
      });
  }); 
});

//--------------3-Tutor SignUp/Login

describe('Test6 - POST /api/v1/auth/signup-tutor', () => {
  test('Post-Tutor Register-  respond with and access token when tutor details are send', () => {
    return request(server)
      .post('/api/v1/auth/signup-tutor')
      .send({
        tutor_active: true,
        tutor_firstname: 'New',
        tutor_lastname: 'Cheema',
        tutor_password: 'Password@123',
        tutor_username: 'scheema1',
        tutor_image: '/tutor/tutor1.png',
        tutor_email: 'csheraz@hotmail.com',
      })
      .expect(201)
      .then((res) => {
        tutor_id = res.body.tutor.tutor_id;
        expect(res.body.tutor).toEqual({
          tutor_id: res.body.tutor.tutor_id,
          tutor_username: 'scheema1',
          tutor_firstname: 'New',
          tutor_lastname: 'Cheema',
          tutor_email: 'csheraz@hotmail.com',
          tutor_active: true,
          tutor_image: '/tutor/tutor1.png',
          tutor_password: res.body.tutor.tutor_password,
        });
      });
  });
});

describe('Test7 - POST /api/v1/auth/signin-tutor', () => {
  test('POST- Tutor Login-responds with and access token given correct username and password', () => {
    return request(server)
      .post('/api/v1/auth/signin-tutor')
      .send({ username: 'scheema1', password: 'Password@123', deviceId: '3f9a1b2c8' })
      .expect(200)
      .then((res) => {
        console.log(res.body)
        validTutor = `BEARER ${res.body.token}`;
        expect(res.body.message).toBe('Success');
        expect(res.body.deviceId).toBe('3f9a1b2c8');
      });
  });

  test('POST responds with status 401 for an incorrect password', () => {
    return request(server)
      .post('/api/v1/auth/signin-tutor')
      .send({ username: 'stundentusernamedemo1', password: 'Password@321', deviceId: '3f9a1b2c8' })
      .expect(401)
      .then((res) =>
        expect(res.body.message).toBe('username and password do not exist')
      );
  });

  test('POST responds with status 401 for an incorrect username', () => {
    return request(server)
      .post('/api/v1/auth/signin-tutor')
      .send({ username: 'mitch', password: 'Password@321', deviceId: '3f9a1b2c8' })
      .expect(401)
      .then((res) =>
        expect(res.body.message).toBe('username and password do not exist')
      );
  });
});

//------------4-Student SignUp/Login

describe('Test8 - POST /api/v1/auth/signup-student', () => {
  test('POST- Student Register- responds with and access token when student details are send', () => {
    return request(server)
      .post('/api/v1/auth/signup-student')
      .send({
        student_active: true,
        student_username: 'studentUsernameTest',
        student_firstname: 'StudentFirstNameTest',
        student_lastname: 'StudentLastNameTest',
        student_email: 'csheraz-test@hotmail.com',
        student_password: 'Password@123',
        student_image: '/student/student.png',
        student_grade: 7,
        student_targetgrade: 3,
        student_notes: 'Working well',
        student_progressbar: 5,
        student_message_count: 1,
        student_message_input: null,
        student_message_output: null,
        student_tutor_fk_id: 2,
        student_course_fk_id: 1,
      })
      .expect(201)
      .then((res) => {
        initial_student_id = res.body.student.student_id;
        expect(res.body.student).toEqual({
          student_id: initial_student_id,
          student_active: true,
          student_username: 'studentUsernameTest',
          student_firstname: 'StudentFirstNameTest',
          student_lastname: 'StudentLastNameTest',
          student_email: 'csheraz-test@hotmail.com',
          student_password: res.body.student.student_password,
          student_image: '/student/student.png',
          student_grade: 7,
          student_targetgrade: 3,
          student_notes: 'Working well',
          student_progressbar: 5,
          student_message_count: 1,
          student_message_input: null,
          student_message_output: null,
          student_tutor_fk_id: res.body.student.student_tutor_fk_id,
          student_course_fk_id: res.body.student.student_course_fk_id,
        });
      });
  });
});

describe('Test9 - POST /api/v1/auth/signin-student', () => {
  test('POST- Student Login-  responds with and access token given correct username and password', () => {
    return request(server)
      .post('/api/v1/auth/signin-student')
      .send({ username: 'studentUsernameTest', password: 'Password@123', deviceId: '3f9a1b2c8'})
      .expect(200)
      .then((res) => {
        validStudent = `BEARER ${res.body.token}`;
        expect(res.body.message).toBe('Success');
      });
  });

  test('POST responds with status 401 for an incorrect password', () => {
    return request(server)
      .post('/api/v1/auth/signin-student')
      .send({ username: 'studentUsernameTest', password: 'Password123', deviceId: '3f9a1b2c8' })
      .expect(400)
      .then((res) =>
      expect(res.body.error).toBe(JSON.parse(res.error.text).error)
      );
  });


  test('POST - responds with status 401 for an incorrect username', () => {
    return request(server)
      .post('/api/v1/auth/signin-student')
      .send({ username: 'invalid-username', password: 'password@123', deviceId: '3f9a1b2c8' })
      .expect(400)
      .then((res) => {
        console.log(res.body)
        expect(res.body.error).toBe(JSON.parse(res.error.text).error)
      });
  });
});

//-------------------5-Admin Endpoints


describe('Test14 - POST /api/v1/admins', () => {
  test('status: 201 and return the new admin object', () => {
    return request(server)
      .post('/api/v1/admins/post-admins')
      .set('Authorization', validAdmin)
      .send({
        admin_active: true,
        admin_firstname: 'New',
        admin_lastname: 'Cheema',
        admin_password: 'password',
        admin_username: 'scheema2',
        admin_image: '/tutor/tutor1.png',
        admin_email: 'csheraz@hotmail.com',
      })
      .expect(201)
      .then((res) => {
        admin_id = res.body.data.admin_id;
        expect(res.body.data).toEqual({
          admin_id: res.body.data.admin_id,
          admin_username: 'scheema2',
          admin_firstname: 'New',
          admin_lastname: 'Cheema',
          admin_email: 'csheraz@hotmail.com',
          admin_active: true,
          admin_image: '/tutor/tutor1.png',
          admin_password: res.body.data.admin_password,
        });
      });
  });

  test('Missing Field. status 400 and return error message', () => {
    return request(server)
      .post('/api/v1/admins/post-admins')
      .set('Authorization', validAdmin)
      .send({
        admin_username: 'New',
        admin_lastname: 'Cheema',
      })
      .expect(500)
      .then((res) => {
        // expect(res.body.message).toBe('Invalid input');
      });
  });
});

describe('Test15 - GET /api/v1/admins', () => {
  test('status: 200 and returns an array of admin user', () => {
    return request(server)
      .get('/api/v1/admins/get-admins')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data).toHaveLength(4);
        res.body.data.forEach((admin) => {
          expect(admin).toMatchObject({
            admin_id: expect.any(Number),
            admin_firstname: expect.any(String),
            admin_lastname: expect.any(String),
            admin_email: expect.any(String),
            admin_active: expect.any(Boolean),
            admin_image: expect.any(String),
          });
        });
      });
  });

  test('QUERY: status 200 : tutors are sorted by index number', () => {
    return request(server)
      .get('/api/v1/admins/get-admins')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('admin_id');
      });
  });

  test('QUERY: status 200: topics are sorted by passed query', () => {
    return request(server)
      .get('/api/v1/admins/get-admins?sort_by=admin_firstname')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('admin_firstname');
      });
  });

  test('ERROR HANDLING - status 400: for an invalid sort_by column ', () => {
    return request(server)
      .get('/api/v1/admins/get-admins?sort_by=not_a_column')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        // expect(res.body.message).toBe('bad request');
      });
  });
});

describe('Test16 - GET /api/v1/admins/:admin_id', () => {
  test('status: 200 and serves an admin object with a given id', () => {
    return request(server)
      .get(`/api/v1/admins/get-admins/${admin_id}`)
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          admin_id: admin_id,
          admin_username: 'scheema2',
          admin_firstname: 'New',
          admin_lastname: 'Cheema',
          admin_email: 'csheraz@hotmail.com',
          admin_active: true,
          admin_image: '/tutor/tutor1.png',
          admin_password: res.body.data.admin_password,
        });
      });
  });

  test('Error: course_id, non existent but valid. status 404 and an error message', () => {
    return request(server)
      .get('/api/v1/admins/get-admins/invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        //expect(res.body.message).toBe('Invalid input');
      });
  });

  test('ERROR  -status: 404 and returns an error message', () => {
    return request(server)
      .get('/api/v1/admins/get-admins/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('Invalid Input');
      });
  });
});

describe('Test17 - PATCH /api/v1/admins/:admin_id', () => {
  test('Status 200: and return a updated admin object  ', () => {
    return request(server)
      .patch(`/api/v1/admins/update-admins/${admin_id}`)
      .set('Authorization', validAdmin)
      .send({
        admin_username: 'scheema1000',
        admin_firstname: 'Patched',
        admin_lastname: 'Cheema',
        admin_email: 'csheraz@hotmail.com',
        admin_active: true,
        admin_image: '/tutor/tutor1.png',
        admin_password: 'password',
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          admin_id: admin_id,
          admin_username: 'scheema1000',
          admin_firstname: 'Patched',
          admin_lastname: 'Cheema',
          admin_email: 'csheraz@hotmail.com',
          admin_active: true,
          admin_image: '/tutor/tutor1.png',
          admin_password: res.body.data.admin_password,
        });
      });
  });
});

//-------------------6-Student Endpoints

describe('Test18 - POST /api/v1/students/post-student', () => {
  test('status: 201 and return the new student', () => {
    return request(server)
      .post('/api/v1/students/post-student')
      .set('Authorization', validAdmin)
      .send({
        student_username: 'stundentusername4',
        student_firstname: 'New',
        student_lastname: 'Student1LN',
        student_email: 'csheraz@hotmail.com',
        student_password: 'password',
        student_active: true,
        student_grade: 1,
        student_targetgrade: 1,
        student_notes: 'Working well',
        student_progressbar: 3,
        student_image: '/student/student1.png',
        student_tutor_fk_id: 1,
      })
      .expect(201)
      .then((res) => {
        
        student_id = res.body.data.student_id;
        expect(res.body.data).toEqual({
          student_id: student_id,
          student_username: 'stundentusername4',
          student_firstname: 'New',
          student_lastname: 'Student1LN',
          student_email: 'csheraz@hotmail.com',
          student_password: res.body.data.student_password,
          student_active: true,
          student_grade: 1,
          student_targetgrade: 1,
          student_notes: 'Working well',
          student_progressbar: 3,
          student_image: '/student/student1.png',
          student_tutor_fk_id: 1,
          student_message_count: null,
          student_message_input: null,
          student_message_output: null,
          student_tutor_fk_id: null,
          student_course_fk_id: 1,
        });
      });
  });

  test('Missing Field. status 400 and return error message', () => {
    return request(server)
      .post('/api/v1/students/post-student')
      .set('Authorization', validAdmin)
      .send({
        student_lastname: 'Student1LN',
        student_email: 'csheraz@hotmail.com',
      })
      .expect(500)
      .then((res) => {
        // expect(res.body.message).toBe('Invalid input');
      });
  });
});

describe('Test19 - GET /api/v1/students/get-students', () => {
  test('status: 200 and returns an array of student object', () => {
    return request(server)
      .get('/api/v1/students/get-students')
      .set('Authorization', validAdmin)
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

  test('QUERY: status 200 : courses are sorted by student_id', () => {
    return request(server)
      .get('/api/v1/students/get-students')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('student_id');
      });
  });

  test('QUERY: status 200: topics are sorted by passed query', () => {
    return request(server)
      .get('/api/v1/students/get-students?sort_by=student_firstname')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('student_firstname');
      });
  });

  test('ERROR HANDLING - status 400: for an invalid sort_by column ', () => {
    return request(server)
      .get('/api/v1/students/get-students?sort_by=not_a_column')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        //expect(res.body.message).toBe('bad request');
      });
  });
});

describe('Test20 - GET /api/v1/students/get-students/:student_id', () => {
  test('status: 200 and return a student object with a given id', () => {
    return request(server)
      .get(`/api/v1/students/get-students/${student_id}`)
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          student_id: res.body.data.student_id,
          student_username: 'stundentusername4',
          student_firstname: 'New',
          student_lastname: 'Student1LN',
          student_email: 'csheraz@hotmail.com',
          student_password: res.body.data.student_password,
          student_active: true,
          student_grade: 1,
          student_targetgrade: 1,
          student_notes: 'Working well',
          student_progressbar: 3,
          student_image: '/student/student1.png',
          student_tutor_fk_id: 1,
          student_message_count: null,
          student_message_input: null,
          student_message_output: null,
          student_tutor_fk_id:  res.body.data.student_tutor_fk_id,
          student_course_fk_id: res.body.data.student_course_fk_id,
        });
      });
  });

  test('ERROR: student_id, non existent but valid. status 404 and an error message', () => {
    return request(server)
      .get('/api/v1/students/get-students/invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });

  test('ERROR: status: 404 and returns an error message', () => {
    return request(server)
      .get('/api/v1/students/get-students/1000')
      .set('Authorization', validAdmin)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe('Not found');
      });
  });
});

describe('Test20- PATCH /api/v1/students/update-students:student_id', () => {
  test('Status 200: and return a updated student object  ', () => {
    return request(server)
    .patch(`/api/v1/students/update-students/${student_id}`)
    .set('Authorization', validAdmin)
    .send({
      student_username: 'stundentusername1000',
      student_firstname: 'Patched',
      student_lastname: 'Student1LN',
      student_email: 'csheraz@hotmail.com',
      student_password: 'password',
      student_active: true,
      student_grade: 1,
      student_targetgrade: 1,
      student_notes: 'Working well',
      student_progressbar: 3,
      student_image: '/student/student1.png',
      student_tutor_fk_id: 1,
    })
    .expect(200)
    .then((res) => {
      expect(res.body.data).toEqual({
        student_username: 'stundentusername1000',
        student_firstname: 'Patched',
        student_lastname: 'Student1LN',
        student_email: 'csheraz@hotmail.com',
        student_password: res.body.data.student_password,
        student_active: true,
        student_grade: 1,
        student_targetgrade: 1,
        student_notes: 'Working well',
        student_progressbar: 3,
        student_image: '/student/student1.png',
        student_id: res.body.data.student_id,
        student_message_count: null,
        student_message_input: null,
        student_message_output: null,
        student_tutor_fk_id: res.body.data.student_tutor_fk_id,
        student_course_fk_id: 1,
      });
    });
  });
});

//----------------------7-Tutor Endpoints



describe('Test21 - POST /api/v1/tutors/post-tutor', () => {
  test('status: 201 and return the new tutors', () => {
    return request(server)
      .post('/api/v1/tutors/post-tutor')
      .set('Authorization', validAdmin)
      .send({
        tutor_username: 'scheema2',
        tutor_firstname: 'New',
        tutor_lastname: 'Cheema',
        tutor_email: 'csheraz@hotmail.com',
        tutor_active: true,
        tutor_image: '/tutor/tutor1.png',
        tutor_password: 'password',
      })
      .expect(201)
      .then((res) => {
        tutor_id = res.body.data.tutor_id;
        expect(res.body.data).toEqual({
          tutor_id: res.body.data.tutor_id,
          tutor_username: 'scheema2',
          tutor_firstname: 'New',
          tutor_lastname: 'Cheema',
          tutor_email: 'csheraz@hotmail.com',
          tutor_active: true,
          tutor_image: '/tutor/tutor1.png',
          tutor_password: res.body.data.tutor_password,
        });
      });
  });

  test('Missing Field. status 400 and return error message', () => {
    return request(server)
      .post('/api/v1/tutors/post-tutor')
      .set('Authorization', validAdmin)
      .send({
        tutor_firstname: 'New',
        tutor_lastname: 'Cheema',
        topic_code: 'GFA2',
      })
      .expect(500)
      .then((res) => {
        //    expect(res.body.message).toBe('Invalid input');
      });
  });
});

describe('Test22 - GET /api/v1/tutors/get-tutors', () => {
  test('status: 200 and returns an array of tutors', () => {
    return request(server)
      .get('/api/v1/tutors/get-tutors')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data).toHaveLength(4);
        res.body.data.forEach((tutor) => {
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

  test('QUERY: status 200 : tutors are sorted by index number', () => {
    return request(server)
      .get('/api/v1/tutors/get-tutors')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('tutor_id');
      });
  });

  test('QUERY: status 200: topics are sorted by passed query', () => {
    return request(server)
      .get('/api/v1/tutors/get-tutors?sort_by=tutor_firstname')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('tutor_firstname');
      });
  });

  test('ERROR HANDLING - status 400: for an invalid sort_by column ', () => {
    return request(server)
      .get('/api/v1/tutors/get-tutors?sort_by=not_a_column')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        //expect(res.body.message).toBe('bad request');
      });
  });
});

describe('Test23 - GET /api/v1/v1/tutors', () => {
  test('status: 200 and return a tutor object', () => {
    return request(server)
      .get(`/api/v1/tutors/get-tutors/${tutor_id}`)
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          tutor_id: tutor_id,
          tutor_username: 'scheema2',
          tutor_firstname: 'New',
          tutor_lastname: 'Cheema',
          tutor_email: 'csheraz@hotmail.com',
          tutor_active: true,
          tutor_image: '/tutor/tutor1.png',
          tutor_password: res.body.data.tutor_password,
        });
      });
  });

  test('Error: course_id, non existent but valid. status 404 and an error message', () => {
    return request(server)
      .get('/api/v1/tutors/get-tutors/invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        //expect(res.body.message).toBe('Invalid input');
      });
  });

  test('ERROR  -status: 404 and returns an error message', () => {
    return request(server)
      .get('/api/v1/tutors/get-tutors/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('Invalid Input');
      });
  });
});

describe('Test24 - PATCH /api/v1/tutors/update-tutors/:tutor_id', () => {
  test('Status 200: and return a updated tutor object  ', () => {
    return request(server)
      .patch(`/api/v1/tutors/update-tutors/${tutor_id}`)
      .set('Authorization', validAdmin)
      .send({
        tutor_username: 'scheema1000',
        tutor_firstname: 'Patched',
        tutor_lastname: 'Cheema',
        tutor_email: 'csheraz@hotmail.com',
        tutor_active: true,
        tutor_image: '/tutor/tutor1.png',
        tutor_password: 'password',
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          tutor_id: tutor_id,
          tutor_username: 'scheema1000',
          tutor_firstname: 'Patched',
          tutor_lastname: 'Cheema',
          tutor_email: 'csheraz@hotmail.com',
          tutor_active: true,
          tutor_image: '/tutor/tutor1.png',
          tutor_password: res.body.data.tutor_password,
        });
      });
  });
});

//-------------8-Courses Endpoints

describe('Test25 - POST /api/v1/courses', () => {
  test('status: 201 and return the new course', () => {
    return request(server)
      .post('/api/v1/courses/post-course')
      .set('Authorization', validAdmin)
      .send({
        course_code: 'New- MTH-GF',
        course_desc: 'MTH GCSE Maths Foundation Online Course',
        course_image: '/course/mth_gcse_foundation.png',
        course_level: 'Foundation',
        course_name: 'MTH GCSE Maths Foundation',
      })
      .expect(201)
      .then((res) => {
        course_id = res.body.data.course_id;
        expect(res.body.data).toEqual({
          course_code: 'New- MTH-GF',
          course_desc: 'MTH GCSE Maths Foundation Online Course',
          course_image: '/course/mth_gcse_foundation.png',
          course_level: 'Foundation',
          course_name: 'MTH GCSE Maths Foundation',
          course_id: res.body.data.course_id,
        });
      });
  });

  test('Missing Field. status 400 and return error message', () => {
    return request(server)
      .post('/api/v1/courses/post-course')
      .set('Authorization', validAdmin)
      .send({
        course_code: 'New- MTH-GF',
        course_desc: 'MTH GCSE Maths Foundation Online Course',
        course_image: '/course/mth_gcse_foundation.png',
      })
      .expect(500)
      .then((res) => {
        //expect(res.body.message).toBe('Invalid input');
      });
  });
});

describe('Test26 - GET /api/v1/courses', () => {
  test('status: 200 and returns an array of courses', () => {
    return request(server)
      .get('/api/v1/courses/get-courses')
      .set('Authorization', validAdmin)
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

  test('QUERY: status 200 : courses are sorted by index number', () => {
    return request(server)
      .get('/api/v1/courses/get-courses')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('course_id');
      });
  });

  test('QUERY: status 200: topics are sorted by passed query', () => {
    return request(server)
      .get('/api/v1/courses/get-courses?sort_by=course_name')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('course_name');
      });
  });

  test('ERROR HANDLING - status 400: for an invalid sort_by column ', () => {
    return request(server)
      .get('/api/v1/courses/get-courses?sort_by=not_a_column')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        //expect(res.body.message).toBe('bad request');
      });
  });
});

describe('Test27 - GET /api/v1/courses', () => {
  test('Query: course_id existing, status: 200 and returns a course object', () => {
    return request(server)
      .get(`/api/v1/courses/get-courses/${course_id}`)
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          course_id: res.body.data.course_id,
          course_code: 'New- MTH-GF',
          course_desc: 'MTH GCSE Maths Foundation Online Course',
          course_image: '/course/mth_gcse_foundation.png',
          course_level: 'Foundation',
          course_name: 'MTH GCSE Maths Foundation',
        });
      });
  });

  test('Error: course_id: invalid course_id. status 404 and an error message', () => {
    return request(server)
      .get('/api/v1/courses/get-courses/invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });

  test('Error: course_id, non existent but valid. status 404 and an error message', () => {
    return request(server)
      .get('/api/v1/courses/get-courses/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('Invalid Input');
      });
  });
});

describe('Test28 - PATCH /api/v1/courses', () => {
  test('Status 200: and returns an updated course ', () => {
    return request(server)
      .patch(`/api/v1/courses/update-courses/${course_id}`)
      .set('Authorization', validAdmin)
      .send({
        course_code: 'New Patched- MTH-GF',
        course_desc: 'MTH GCSE Maths Foundation Online Course',
        course_image: '/course/mth_gcse_foundation.png',
        course_level: 'Foundation',
        course_name: 'MTH GCSE Maths Foundation',
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          course_code: 'New Patched- MTH-GF',
          course_desc: 'MTH GCSE Maths Foundation Online Course',
          course_image: '/course/mth_gcse_foundation.png',
          course_level: 'Foundation',
          course_name: 'MTH GCSE Maths Foundation',
          course_id: course_id,
        });
      });
  });
});

//-------------------9-Topic Endpoints

describe('Test29 - POST /api/v1/topics', () => {
  test('status: 201 and return the new topic', () => {
    return request(server)
      .post('/api/v1/topics/post-topic')
      .set('Authorization', validAdmin)
      .send({
        topic_unit: 4,
        topic_name: 'New',
        topic_code: 'GFA2',
        topic_desc: 'MTH GCSE Maths Online Course - Foundation - Algebra 2',
        topic_level: 'foundation',
        topic_course_fk_id: course_id,
      })
      .expect(201)
      .then((res) => {
        topic_id = res.body.data.topic_id;
        expect(res.body.data).toEqual({
          topic_unit: 4,
          topic_name: 'New',
          topic_code: 'GFA2',
          topic_desc: 'MTH GCSE Maths Online Course - Foundation - Algebra 2',
          topic_level: 'foundation',
          topic_course_fk_id: course_id,
          topic_id: topic_id,
        });
      });
  });

  test('Missing Field. status 400 and return error message', () => {
    return request(server)
      .post('/api/v1/topics/post-topic')
      .set('Authorization', validAdmin)
      .send({
        topic_code: 'GFA2',
        topic_desc: 'MTH GCSE Maths Online Course - Foundation - Algebra 2',
      })
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });
});

describe('Test30 - GET /api/v1/topics/get-topics', () => {
  test('status: 200 and returns an array of topics', () => {
    return request(server)
      .get('/api/v1/topics/get-topics')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data).toHaveLength(res.body.data.length);
        res.body.data.forEach((topic) => {
          expect(topic).toMatchObject({
            topic_unit: expect.any(Number),
            topic_name: expect.any(String),
            topic_code: expect.any(String),
            topic_desc: expect.any(String),
            topic_level: expect.any(String),
            topic_course_fk_id: expect.any(Number),
            topic_id: expect.any(Number),
          });
        });
      });
  });

  test('QUERY: status 200 : topics are sorted by index number', () => {
    return request(server)
      .get('/api/v1/topics/get-topics')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('topic_unit');
      });
  });

  test('QUERY: status 200: topics are sorted by passed query', () => {
    return request(server)
      .get('/api/v1/topics/get-topics?sort_by=topic_id')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('topic_id');
      });
  });

  test('ERROR HANDLING - status 400: for an invalid sort_by column ', () => {
    return request(server)
      .get('/api/v1/topics/get-topics?sort_by=not_a_column')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        //      expect(res.body.message).toBe('bad request');
      });
    //});
  });
});

describe('Test31 - GET /api/v1/topics/get-topics/:topic_id', () => {
  test('status: 200 and return a topic object', () => {
    return request(server)
      .get(`/api/v1/topics/get-topics/${topic_id}`)
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          topic_name: 'New',
          topic_code: 'GFA2',
          topic_desc: 'MTH GCSE Maths Online Course - Foundation - Algebra 2',
          topic_unit: 4,
          topic_level: 'foundation',
          topic_course_fk_id: course_id,
          topic_id: topic_id,
        });
      });
  });

  test('Error: course_id, non existent but valid. status 404 and an error message', () => {
    return request(server)
      .get('/api/v1/topics/get-topics/invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });

  test('ERROR  -status: 404 and returns an error message', () => {
    return request(server)
      .get('/api/v1/topics/get-topics/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('Invalid Input');
      });
  });
});

describe('Test32 - PATCH /api/v1/topics/update-topics/:topic_id', () => {
  test('Status 200: and return a updated topic object  ', () => {
    return request(server)
      .patch(`/api/v1/topics/update-topics/${topic_id}`)
      .set('Authorization', validAdmin)
      .send({
        topic_name: 'Patched Statistics',
        topic_code: 'GHS1',
        topic_desc: 'MTH GCSE Maths Online Course - Higher - Statistics',
        topic_unit: 4,
        topic_level: 'foundation',
        topic_course_fk_id: course_id,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          topic_name: 'Patched Statistics',
          topic_code: 'GHS1',
          topic_desc: 'MTH GCSE Maths Online Course - Higher - Statistics',
          topic_unit: 4,
          topic_level: 'foundation',
          topic_course_fk_id: course_id,
          topic_id: topic_id,
        });
      });
  });
});

//-----------------------10-Lessons Endpoints

describe('Test33 - POST /api/v1/lessons/post-lesson', () => {
  test('status: 201 and return the new lessons', () => {
    return request(server)
      .post('/api/v1/lessons/post-lesson')
      .set('Authorization', validAdmin)
      .send({
        lesson_topic: 'New- Addition, Subtraction and Money Problems',
        lesson_name: 'New- Addition, Subtraction and Money Problems',
        lesson_code: 'GFN1LC1',
        lesson_desc: 'To be able to add, subtract, and solve money problems.',
        lesson_grade: 6,
        lesson_body: 'PowerPoint',
        lesson_topic_fk_id: topic_id,
      })
      .expect(201)
      .then((res) => {
        lesson_id = res.body.data.lesson_id;
        expect(res.body.data).toEqual({
          lesson_topic: 'New- Addition, Subtraction and Money Problems',
          lesson_name: 'New- Addition, Subtraction and Money Problems',
          lesson_code: 'GFN1LC1',
          lesson_desc: 'To be able to add, subtract, and solve money problems.',
          lesson_grade: 6,
          lesson_body: 'PowerPoint',
          lesson_topic_fk_id: topic_id,
          lesson_id: lesson_id,
        });
      });
  });

  test('Missing Field. status 400 and return error message', () => {
    return request(server)
      .post('/api/v1/lessons/post-lesson')
      .set('Authorization', validAdmin)
      .send({
        student_lastname: 'Student1LN',
        student_email: 'csheraz@hotmail.com',
      })
      .expect(500)
      .then((res) => {
        //expect(res.body.message).toBe('Invalid input');
      });
  });
});

describe('Test34 - GET /api/v1/lessons/get-lessons', () => {
  test('status: 200 and returns an array of lessons', () => {
    return request(server)
      .get('/api/v1/lessons/get-lessons')
      .set('Authorization', validAdmin)
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
            lesson_grade: expect.any(Number),
            lesson_body: expect.any(String),
            lesson_topic_fk_id: expect.toBeOneOf([expect.any(Number), null]),
          });
        });
      });
  });

  test('QUERY: status 200 : lessons are sorted by lesson id', () => {
    return request(server)
      .get('/api/v1/lessons/get-lessons')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('lesson_id');
      });
  });

  test('QUERY: status 200: lessons are sorted by passed query', () => {
    return request(server)
      .get('/api/v1/lessons/get-lessons?sort_by=lesson_name')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('lesson_name');
      });
  });

  test('ERROR HANDLING - status 400: for an invalid sort_by column ', () => {
    return request(server)
      .get('/api/v1/lessons/get-lessons?sort_by=not_a_column')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });
});

describe('Test35 - GET /api/v1/lessons', () => {
  test('status: 200 and return a lesson object with a given id', () => {
    return request(server)
      .get(`/api/v1/lessons/get-lessons/${lesson_id}`)
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          lesson_id: lesson_id,
          lesson_topic_fk_id: res.body.data.lesson_topic_fk_id,
          lesson_topic: 'New- Addition, Subtraction and Money Problems',
          lesson_name: 'New- Addition, Subtraction and Money Problems',
          lesson_code: 'GFN1LC1',
          lesson_desc: 'To be able to add, subtract, and solve money problems.',
          lesson_grade: 6,
          lesson_body: 'PowerPoint',
        });
      });
  });

  test('Error: student_id, non existent but valid. status 404 and an error message', () => {
    return request(server)
      .get('/api/v1/lessons/get-lessons/invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        // expect(res.body.message).toBe('Invalid input');
      });
  });

  test('ERROR  -status: 404 and returns an error message', () => {
    return request(server)
      .get('/api/v1/lessons/get-lessons/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('Invalid Input');
      });
  });
});

describe('Test36 - PATCH /api/v1/lessons/update-lessons/:lesson_id"', () => {
  test('Status 200: and return a updated student object  ', () => {
    return request(server)
      .patch(`/api/v1/lessons/update-lessons/${lesson_id}`)
      .set('Authorization', validAdmin)
      .send({
        lesson_topic: 'patched- Addition, Subtraction and Money Problems',
        lesson_name: 'patched- Addition, Subtraction and Money Problems',
        lesson_code: 'GFN1LC1',
        lesson_desc: 'To be able to add, subtract, and solve money problems.',
        lesson_grade: 4,
        lesson_body: 'PowerPoint',
        lesson_topic_fk_id: topic_id,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          lesson_id: lesson_id,
          lesson_topic_fk_id: res.body.data.lesson_topic_fk_id,
          lesson_topic: 'patched- Addition, Subtraction and Money Problems',
          lesson_name: 'patched- Addition, Subtraction and Money Problems',
          lesson_code: 'GFN1LC1',
          lesson_desc: 'To be able to add, subtract, and solve money problems.',
          lesson_grade: 4,
          lesson_body: 'PowerPoint',
        });
      });
  });
});

//-------------------11-Quizzes Endpoints

describe("Test37 - POST /api/v1/quizzes/post-quiz", () => {
  test('status: 201 and return the new tutor object', () => {
    return request(server)
      .post('/api/v1/quizzes/post-quiz')
      .set('Authorization', validAdmin)
      .send({
        quiz_name: 'NewPost Number 2- Topic Diagnostic Quiz',
        quiz_code: 'GFN2TDQ',
        quiz_desc: 'TopicDiagnostic',
        quiz_type: 'NewPost Number 2- Topic Diagnostic Quiz',
        quiz_calc: true,
        quiz_course_fk_id: 2,
      })
      .expect(201)
      .then((res) => {
        quiz_id = res.body.data.quiz_id;
        expect(res.body.data).toEqual({
          quiz_name: 'NewPost Number 2- Topic Diagnostic Quiz',
          quiz_code: 'GFN2TDQ',
          quiz_desc: 'TopicDiagnostic',
          quiz_type: 'NewPost Number 2- Topic Diagnostic Quiz',
          quiz_calc: true,
          quiz_course_fk_id: 2,
          quiz_lesson_fk_id: null,
          quiz_topic_fk_id: null,
          quiz_id: quiz_id,
        });
      });
  });

  test('Missing Field. status 400 and return error message', () => {
    return request(server)
      .post('/api/v1/quizzes/post-quiz')
      .set('Authorization', validAdmin)
      .send({
        quiz_code: 'GFN2TDQ',
        quiz_type: 'TopicDiagnostic',
      })
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });
});

describe('Test38 - GET /api/v1/quizzes/get-quizzes', () => {
  test('status: 200 and returns an array of tutors', () => {
    return request(server)
      .get('/api/v1/quizzes/get-quizzes')
      .set('Authorization', validAdmin)
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

  test('QUERY: status 200 : quizzes are sorted by quiz id', () => {
    return request(server)
      .get('/api/v1/quizzes/get-quizzes')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('quiz_id');
      });
  });

  test('QUERY: status 200: quizes are sorted by passed query', () => {
    return request(server)
      .get('/api/v1/quizzes/get-quizzes?sort_by=quiz_name')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('quiz_name');
      });
  });

  test('ERROR HANDLING - status 400: for an invalid sort_by column ', () => {
    return request(server)
      .get('/api/v1/topics/get-topics?sort_by=not_a_column')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        // expect(res.body.message).toBe('bad request');
      });
  });
});

describe('Test39 - GET /api/v1/quizzes/get-quizzes/:quiz_id', () => {
  test('status: 200 and return a quiz object with a given id', () => {
    return request(server)
      .get(`/api/v1/quizzes/get-quizzes/${quiz_id}`)
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          quiz_id: res.body.data.quiz_id,
          quiz_name: expect.any(String),
          quiz_code: expect.any(String),
          quiz_type: expect.any(String),
          quiz_calc: expect.any(Boolean),
          quiz_desc: expect.any(String),
          quiz_course_fk_id: expect.any(Number),
          quiz_topic_fk_id: expect.toBeOneOf([expect.any(Number), null]),
          quiz_lesson_fk_id: expect.toBeOneOf([expect.any(Number), null]),
        });
      });
  });

  test('Error: quiz_id, non existent but valid. status 404 and an error message', () => {
    return request(server)
      .get('/api/v1/quizzes/get-quizzes/invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });

  test('ERROR  -status: 404 and returns an error message', () => {
    return request(server)
      .get('/api/v1/quizzes/get-quizzes/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('Invalid Input');
      });
  });
});

describe('Test40 - PATCH /api/v1/quizzes', () => {
  test('Status 200: and return a updated quiz object  ', () => {
    return request(server)
      .patch(`/api/v1/quizzes/update-quizzes/${quiz_id}`)
      .set('Authorization', validAdmin)
      .send({
        quiz_name: 'NewPatch Number 2- Topic Diagnostic Quiz',
        quiz_code: 'GFN2TDQ',
        quiz_desc: 'TopicDiagnostic',
        quiz_type: 'NewPatch Number 2- Topic Diagnostic Quiz',
        quiz_calc: true,
        quiz_course_fk_id: 1,
        quiz_topic_fk_id: null,
        quiz_lesson_fk_id: null,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          quiz_name: 'NewPatch Number 2- Topic Diagnostic Quiz',
          quiz_code: 'GFN2TDQ',
          quiz_desc: 'TopicDiagnostic',
          quiz_type: 'NewPatch Number 2- Topic Diagnostic Quiz',
          quiz_calc: true,
          quiz_course_fk_id: 1,
          quiz_topic_fk_id: null,
          quiz_lesson_fk_id: null,
          quiz_id: res.body.data.quiz_id,
        });
      });
  });
});

//---------------------12-Questions Endpoints

describe('Test41 - POST /api/v1/questions/post-question', () => {
  test('status: 201 and return the new questions', () => {
    return request(server)
      .post('/api/v1/questions/post-question')
      .set('Authorization', validAdmin)
      .send({
        question_quiz_fk_id: quiz_id,
        question_body: '4.79 - 1.2',
        question_answer1: '3.52',
        question_answer2: '3.54',
        question_answer3: '3.56',
        question_answer4: '3.59',
        question_mark: 1,
        question_grade: 2,
        question_calc: false,
        question_explaination: 'explanation',
      })
      .expect(201)
      .then((res) => {
        question_id = res.body.data.question_id;
        expect(res.body.data).toEqual({
          question_id: res.body.data.question_id,
          question_quiz_fk_id: quiz_id,
          question_body: '4.79 - 1.2',
          question_answer1: '3.52',
          question_answer2: '3.54',
          question_answer3: '3.56',
          question_answer4: '3.59',
          question_mark: 1,
          question_grade: 2,
          question_calc: false,
          question_explaination: 'explanation',
          question_correct: null,
          question_type: null,
          question_ans_image: null,
          question_ans_mark: null,
          question_ans_sym_a: null,
          question_ans_sym_b: null,
          question_image: null,
          question_quiz_fk_id: 4,
          question_response1: null,
          question_response2: null,
          question_response3: null,
          question_workingout: null,
          question_feedback: null,
        });
      });
  });

  
  test('Missing Field. status 400 and return error message', () => {
    return request(server)
      .post('/api/v1/questions/post-question')
      .set('Authorization', validAdmin)
      .send({
        ques1_ans: '3.59',
      })
      .expect(500)
      .then((res) => {
        //expect(res.body.message).toBe('Invalid input');
      });
  });
});

describe('Test42 - GET /api/v1/questions/get-questions', () => {
  test('status: 200 and returns an array of questions', () => {
    return request(server)
      .get('/api/v1/questions/get-questions')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data).toHaveLength(res.body.data.length);
        res.body.data.forEach((question) => {
          expect(question).toMatchObject({
            question_id: expect.any(Number),
            question_body: expect.any(String),
            question_grade: expect.any(Number),
            question_calc: expect.any(Boolean),
            question_type: expect.toBeOneOf([expect.any(String), null]),
            question_answer1: expect.toBeOneOf([expect.any(String), null]),
            question_answer2: expect.toBeOneOf([expect.any(String), null]),
            question_answer3: expect.toBeOneOf([expect.any(String), null]),
            question_answer4: expect.toBeOneOf([expect.any(String), null]),
            question_quiz_fk_id: expect.toBeOneOf([expect.any(Number), null]),
            question_mark: expect.toBeOneOf([expect.any(Number), null]),
            question_image: expect.toBeOneOf([expect.any(String), null]),
            question_explaination: expect.toBeOneOf([expect.any(String), null]),
            question_ans_mark: expect.toBeOneOf([expect.any(Number), null]),
            question_ans_image: expect.toBeOneOf([expect.any(String), null]),
            question_correct: expect.toBeOneOf([expect.any(Boolean), null]),
            question_ans_sym_b: expect.toBeOneOf([expect.any(String), null]),
            question_ans_sym_a: expect.toBeOneOf([expect.any(String), null]),
            question_response1: expect.toBeOneOf([expect.any(String), null]),
            question_response2: expect.toBeOneOf([expect.any(String), null]),
            question_response3: expect.toBeOneOf([expect.any(String), null]),
            question_workingout: expect.toBeOneOf([expect.any(String), null]),
            question_feedback: expect.toBeOneOf([expect.any(String), null]),
          });
        });
      });
  });

  test('QUERY: status 200 : quizzes are sorted by question id', () => {
    return request(server)
      .get('/api/v1/questions/get-questions')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('question_id');
      });
  });

  test('QUERY: status 200: question are sorted by passed query', () => {
    return request(server)
      .get('/api/v1/questions/get-questions?sort_by=question_id')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeSortedBy('question_id');
      });
  });

  test('ERROR HANDLING - status 400: for an invalid sort_by column ', () => {
    return request(server)
      .get('/api/v1/questions/get-questions?sort_by=not_a_column')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        //  expect(res.body.message).toBe('bad request');
      });
  });
});

describe('Test43 - GET /api/v1/questions/get-questions/:question_id', () => {
  test('status: 200 and return a question object with a given id', () => {
    return request(server)
      .get(`/api/v1/questions/get-questions/${question_id}`)
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          question_id: expect.any(Number),
          question_body: expect.any(String),
          question_grade: expect.any(Number),
          question_calc: expect.any(Boolean),
          question_type: expect.toBeOneOf([expect.any(String), null]),
          question_answer1: expect.toBeOneOf([expect.any(String), null]),
          question_answer2: expect.toBeOneOf([expect.any(String), null]),
          question_answer3: expect.toBeOneOf([expect.any(String), null]),
          question_answer4: expect.toBeOneOf([expect.any(String), null]),
          question_quiz_fk_id: expect.toBeOneOf([expect.any(Number), null]),
          question_mark: expect.toBeOneOf([expect.any(Number), null]),
          question_image: expect.toBeOneOf([expect.any(String), null]),
          question_explaination: expect.toBeOneOf([expect.any(String), null]),
          question_ans_mark: expect.toBeOneOf([expect.any(Number), null]),
          question_ans_image: expect.toBeOneOf([expect.any(String), null]),
          question_correct: expect.toBeOneOf([expect.any(Boolean), null]),
          question_ans_sym_b: expect.toBeOneOf([expect.any(String), null]),
          question_ans_sym_a: expect.toBeOneOf([expect.any(String), null]),
          question_response1: expect.toBeOneOf([expect.any(String), null]),
          question_response2: expect.toBeOneOf([expect.any(String), null]),
          question_response3: expect.toBeOneOf([expect.any(String), null]),
          question_workingout: expect.toBeOneOf([expect.any(String), null]),
          question_feedback: expect.toBeOneOf([expect.any(String), null]),      question_quiz_fk_id: expect.toBeOneOf([expect.any(Number), null]),
          question_mark: expect.toBeOneOf([expect.any(Number), null]),
          question_image: expect.toBeOneOf([expect.any(String), null]),
          question_explaination: expect.toBeOneOf([expect.any(String), null]),
          question_ans_mark: expect.toBeOneOf([expect.any(Number), null]),
          question_ans_image: expect.toBeOneOf([expect.any(String), null]),
          question_correct: expect.toBeOneOf([expect.any(Boolean), null]),
          question_ans_sym_b: expect.toBeOneOf([expect.any(String), null]),
          question_ans_sym_a: expect.toBeOneOf([expect.any(String), null]),
          question_response1: expect.toBeOneOf([expect.any(String), null]),
          question_response2: expect.toBeOneOf([expect.any(String), null]),
          question_response3: expect.toBeOneOf([expect.any(String), null]),
          question_workingout: expect.toBeOneOf([expect.any(String), null]),
          question_feedback: expect.toBeOneOf([expect.any(String), null]),
        });
      });
  });

  test('Error: question_id, non existent but valid. status 404 and an error message', () => {
    return request(server)
      .get('/api/v1/questions/get-questions/invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        // expect(res.body.message).toBe('Invalid input');
      });
  });

  test('ERROR  -status: 404 and returns an error message', () => {
    return request(server)
      .get('/api/v1/questions/get-questions/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('Invalid Input');
      });
  });
});

describe('Test44 - PATCH /api/v1/questions/update-questions/:question_id', () => {
  test('Status 200: and return a updated ques object  ', () => {
    return request(server)
      .patch(`/api/v1/questions/update-questions/${question_id}`)
      .set('Authorization', validAdmin)
      .send({
        question_body: 'new 4.79 - 1.2',
        question_mark: 1,
        question_grade: 2,
        question_calc: false,
        question_quiz_fk_id: quiz_id,
        question_explaination: 'explanation',
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual({
          question_id: question_id,
          question_quiz_fk_id: quiz_id,
          question_body: 'new 4.79 - 1.2',
          question_answer1: '3.52',
          question_answer2: '3.54',
          question_answer3: '3.56',
          question_answer4: '3.59',
          question_mark: 1,
          question_grade: 2,
          question_calc: false,
          question_explaination: 'explanation',
          question_correct: null,
          question_ans_image: null,
          question_ans_mark: null,
          question_ans_sym_a: null,
          question_ans_sym_b: null,
          question_image: null,
          question_feedback: null,
          question_response1: null,
          question_response2: null,
          question_response3: null,
          question_type: null,
          question_workingout: null,
        });
      });
  });
});


//-----------------13-AdminDashBoard Endpoints 


describe('Test10 - GET /api/v1/admins', () => {
  test('status: 200 and returns a welcome message for Admin Dashboard page', () => {
    return request(server)
      .get('/api/v1/admins/settings')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Welcome To The Setting Page');
      });
  });

  test('status: 200 and returns a welcome message for the Admin Dashboard', () => {
    return request(server)
      .get('/api/v1/admins/admin-dashboard')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Welcome To The Admin Dashboards');
      });
  });

  test('status: 401 if an invalid token is privided', () => {
    return request(server)
      .get('/api/v1/admins/reset')
      .set('Authorization', invalidStudent)
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe('halt intruder! get outta here');
      });
  });
});

describe('Test11-  GET /', () => {
  test('status: 200 and serves up a json representation of all the available endpoints of the api', () => {
    return request(server)
      .get('/api/v1/admins/endpoints')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe(undefined);
      });
  });
});

//-----------------14-TutorDashboard Endpoints

describe('Test12 - GET /api/v1/tutors', () => {
  test('status: 200 and returns a welcome message from the user homepage', () => {
    return request(server)
      .get('/api/v1/tutors/get-tutor-dashboard')
      .set('Authorization', validTutor)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe(`Welcome to the Tutor Dashboard, ${res.req.tutor_id}`);
      });
  });
});

describe('Test 45- Tutor Dahsboard ', () =>{
  test('GET - responds with status 200 and returns with tutor students ', ()=>{
    return request(server)
    .get('/api/v1/tutors/get-tutor-students')
    .set('Authorization', validTutor)
    .expect(404)
    .then((res)=>{
      expect(res.body.message).toBe('Not found')
    })
  })

})

describe('Test 45- Check  for student have quiz ', () =>{
  test('GET - responds with status 200 and returns with tutor students ', ()=>{
    return request(server)
    .get('/api/v1/quizzes//get-student-quizzes/1')
    .set('Authorization', validTutor)
    .expect(200)
    .then((res)=>{
      console.log(res.data)
      expect(res.body.message).toBe('Success')
    })
  })
  test('GET - responds with status 200 and returns with tutor students ', ()=>{
    return request(server)
    .get('/api/v1/quizzes//get-student-quizzes/4')
    .set('Authorization', validTutor)
    .expect(404)
    .then((res)=>{
      expect(res.body.message).toBe('Not found')
    })
  })

})


//-----------------15-StudentDashboard Endpoints

describe('Test13 - GET /api/v1/students', () => {
  test('status: 200 and returns a welcome message from the admin dashboard', () => {
    return request(server)
      .get('/api/v1/students/get-student-dashboard')
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe(`Welcome to the Student Dashboard, ${res.req.student_id}`);
      });
  });
});


//-----------------13- Logout User  

describe('Test45 - Student  logout', () => {
  test('DELETE - Tutor Logout responds with status 200 and message when user logged-in and token is correct', () => {
    return request(server)
      .delete('/api/v1/auth/signout-student')
      .set('Authorization', validStudent)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Success');
      });
  });
  
  test('DELETE - responds with status 401 and message when given token is incorrect', () => {
    return request(server)
      .delete('/api/v1/auth/signout-student')
      .set('Authorization', invalidStudent)
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe('halt intruder! get outta here');
      });
  });

  test('DELETE - responds with status 401 and message when token is not given', () => {
    return request(server)
      .delete('/api/v1/auth/signout-student')
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe('Unauthorized. Token no found');
      });
  });
});

describe('Test46 - Tutor logout', () => {
  test('DELETE - Tutor Logout- responds with status 200 and message when user logged-in and token is correct', () => {
    return request(server)
      .delete('/api/v1/auth/signout-tutor')
      .set('Authorization', validTutor)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Success');
      });
  });
  
  test('DELETE - responds with status 401 and message when given token is incorrect', () => {
    return request(server)
      .delete('/api/v1/auth/signout-tutor')
      .set('Authorization', invalidAdmin)
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe('halt intruder! get outta here');
      });
  });

  test('DELETE - responds with status 401 and message when token is not given', () => {
    return request(server)
      .delete('/api/v1/auth/signout-tutor')
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe('Unauthorized. Token no found');
      });
  });
});


//----------------------- 14-DELETE ACCODINGLY

describe('Test47 -  DELETE /api/v1/students/delete-students/:student_id', () => {
  test(' ERROR HANDLING - status 204 and return with empty reponse body', () => {
    return request(server)
      .delete(`/api/v1/students/delete-students/${initial_student_id}`)
      .set('Authorization', validAdmin)
      .expect(204);
  });

  test(' ERROR HANDLING - status 204 and return with empty reponse body', () => {
    return request(server)
      .delete(`/api/v1/students/delete-students/${student_id}`)
      .set('Authorization', validAdmin)
      .expect(204);
  });

  test('status 400 and returns an error message if it is a bad request', () => {
    return request(server)
      .delete('/api/v1/students/delete-students/Invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });

  test('ERROR HANDLING - status 404 and returns an error message if the ID does not exist', () => {
    return request(server)
      .delete('/api/v1/students/delete-students/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => expect(res.body.message).toBe('Invalid Input'));
  });
});

describe('Test48 -  DELETE /api/v1/tutors/delete-tutors/:tutor_id', () => {
  test(' ERROR HANDLING - status 204 and return with empty reponse body', () => {
    return request(server)
      .delete(`/api/v1/tutors/delete-tutors/${tutor_id}`)
      .set('Authorization', validAdmin)
      .expect(204);
  });

  test('status 400 and returns an error message if it is a bad request', () => {
    return request(server)
      .delete('/api/v1/tutors/delete-tutors/Invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });

  test('ERROR HANDLING - status 404 and returns an error message if the ID does not exist', () => {
    return request(server)
      .delete('/api/v1/tutors/delete-tutors/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => expect(res.body.message).toBe('Invalid Input'));
  });
});

describe('Test49 -  DELETE /api/v1/questions/delete-questions/:question_id', () => {
  test(' ERROR HANDLING - status 204 and return with empty reponse body', () => {
    return request(server)
      .delete(`/api/v1/questions/delete-questions/${question_id}`)
      .set('Authorization', validAdmin)
      .expect(204);
  });

  test('status 400 and returns an error message if it is a bad request', () => {
    return request(server)
      .delete('/api/v1/questions/delete-questions/Invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });

  test('ERROR HANDLING - status 404 and returns an error message if the ID does not exist', () => {
    return request(server)
      .delete('/api/v1/questions/delete-questions/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => expect(res.body.message).toBe('Invalid Input'));
  });
});

describe('Test50 -  DELETE /api/lessons', () => {
  test(' ERROR HANDLING - status 204 and return with empty reponse body', () => {
    return request(server)
      .delete(`/api/v1/lessons/delete-lessons/${lesson_id}`)
      .set('Authorization', validAdmin)
      .expect(204);
  });

  test('status 400 and returns an error message if it is a bad request', () => {
    return request(server)
      .delete('/api/v1/lessons/delete-lessons/Invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });

  test('ERROR HANDLING - status 404 and returns an error message if the ID does not exist', () => {
    return request(server)
      .delete('/api/v1/lessons/delete-lessons/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => expect(res.body.message).toBe('Invalid Input'));
  });
});

describe('Test51 -  DELETE /api/v1/quizzes/delete-quizzes/:quiz_id', () => {
  test(' ERROR HANDLING - status 204 and return with empty reponse body', () => {
    return request(server)
      .delete(`/api/v1/quizzes/delete-quizzes/${quiz_id}`)
      .set('Authorization', validAdmin)
      .expect(204);
  });

  test('status 400 and returns an error message if it is a bad request', () => {
    return request(server)
      .delete('/api/v1/quizzes/delete-quizzes/Invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });

  test('ERROR HANDLING - status 404 and returns an error message if the ID does not exist', () => {
    return request(server)
      .delete('/api/v1/quizzes/delete-quizzes/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => expect(res.body.message).toBe('Invalid Input'));
  });
});

describe('Test52 -  DELETE /api/v1/topics', () => {
  test(' ERROR HANDLING - status 204 and return with empty reponse body', () => {
    return request(server)
      .delete(`/api/v1/topics/delete-topics/${topic_id}`)
      .set('Authorization', validAdmin)
      .expect(204);
  });

  test('status 400 and returns an error message if it is a bad request', () => {
    return request(server)
      .delete('/api/v1/topics/delete-topics/Invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });

  test('ERROR HANDLING - status 404 and returns an error message if the ID does not exist', () => {
    return request(server)
      .delete('/api/v1/topics/delete-topics/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => expect(res.body.message).toBe('Invalid Input'));
  });
});

describe('Test53 -   DELETE /api/v1/courses', () => {
  test(' ERROR HANDLING - status 204 and return with empty reponse body', () => {
    return request(server)
      .delete(`/api/v1/courses/delete-courses/${course_id}`)
      .set('Authorization', validAdmin)
      .expect(204);
  });

  test('status 400 and returns an error message if it is a bad request', () => {
    return request(server)
      .delete('/api/v1/courses/delete-courses/Invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });

  test('ERROR HANDLING - status 404 and returns an error message if the ID does not exist', () => {
    return request(server)
      .delete('/api/v1/courses/delete-courses/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => expect(res.body.message).toBe('Invalid Input'));
  });
});

describe('Test54 -  DELETE /api/v1/admins', () => {
  test(' ERROR HANDLING - status 204 and return with empty reponse body', () => {
    return request(server)
      .delete(`/api/v1/admins/delete-admins/${admin_id}`)
      .set('Authorization', validAdmin)
      .expect(204);
  });

  test('status 400 and returns an error message if it is a bad request', () => {
    return request(server)
      .delete('/api/v1/admins/delete-admins/Invalid_id')
      .set('Authorization', validAdmin)
      .expect(500)
      .then((res) => {
        expect(res.body.error).toBe(JSON.parse(res.error.text).error);
      });
  });

  test('ERROR HANDLING - status 404 and returns an error message if the ID does not exist', () => {
    return request(server)
      .delete('/api/v1/admins/delete-admins/1000')
      .set('Authorization', validAdmin)
      .expect(400)
      .then((res) => expect(res.body.message).toBe('Invalid Input'));
  });
});




//-------------15-Admin Logout 

describe('Test55 - Admin logout', () => {
  test('DELETE - responds with status 200 and message when user logged-out and token is correct', () => {
    return request(server)
      .delete('/api/v1/auth/signout-admin')
      .set('Authorization', validAdmin)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Success');
      });
  });
  
  test('DELETE - responds with status 401 and message when given token is incorrect', () => {
    return request(server)
      .delete('/api/v1/auth/signout-admin')
      .set('Authorization', invalidAdmin)
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe('halt intruder! get outta here');
      });
  });
});

describe('Test56 - Token Not Provided', () => {
  test('DELETE56 - responds with status 401 and message when token is not given', () => {
    return request(server)
      .delete('/api/v1/auth/signout-admin')
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe('Unauthorized. Token no found');
      });
  });
});
