DROP DATABASE IF EXISTS mthdb;
CREATE DATABASE mthdb;

--- this is a comment 
\c mthdb;

  CREATE TABLE course (
            course_id SERIAL PRIMARY KEY,
            course_name VARCHAR(200) NOT NULL,
            course_code VARCHAR(200) NOT NULL,
            course_desc VARCHAR(200) NOT NULL,
            course_level VARCHAR(100) NOT NULL,
            course_image VARCHAR(200) NOT NULL,
            course_date timestamp 
         );

         CREATE TABLE digitutor (
            digitutor_id SERIAL PRIMARY KEY,
            digitutor_quizresult  INT,
            digitutor_usergrade  INT,
            digitutor_targetgrade  INT,
            digitutor_notes VARCHAR(200),
            digitutor_nextstep  VARCHAR(200),
            digitutor_progressbar  INT,
            digitutor_date timestamp
         );

        CREATE TABLE users (
            users_id SERIAL PRIMARY KEY,
            users_role VARCHAR(200) NOT NULL,
            users_firstname VARCHAR(200) NOT NULL,
            users_lastname VARCHAR(200) NOT NULL,
            users_email VARCHAR(200) NOT NULL unique,
            users_password VARCHAR(200),
            users_active boolean,
            users_date timestamp,
            users_course_id INT REFERENCES course(course_id) ON DELETE CASCADE,
            users_digitutor_id INT REFERENCES digitutor(digitutor_id) ON DELETE CASCADE  
        ); 

       
         CREATE TABLE topic (
            topic_id SERIAL PRIMARY KEY,
            topic_name VARCHAR(200) NOT NULL,
            topic_code VARCHAR(200) NOT NULL,
            topic_desc VARCHAR(200) NOT NULL,
            topic_index INT,
            topic_date timestamp,
            topic_course_id INT REFERENCES course(course_id) ON DELETE CASCADE
         );
         
          
         
         CREATE TABLE lesson (
            lesson_id SERIAL PRIMARY KEY,
            lesson_name VARCHAR(200) NOT NULL,
            lesson_code VARCHAR(200) NOT NULL,
            lesson_desc VARCHAR(200),
            lesson_ws VARCHAR(200),
            lesson_body VARCHAR(200),
            lesson_date timestamp,
            lesson_topic_id INT REFERENCES topic(topic_id) ON DELETE CASCADE
         );

          CREATE TABLE quiz (
            quiz_id SERIAL PRIMARY KEY,
            quiz_name VARCHAR(200) NOT NULL,
            quiz_code VARCHAR(200) NOT NULL,
            quiz_desc VARCHAR(200),
            quiz_type VARCHAR(200),
            quiz_subtype VARCHAR(200),
            quiz_calculator boolean,
            quiz_date timestamp,
            quiz_course_id INT REFERENCES course(course_id) ON DELETE CASCADE,
            quiz_topic_id INT REFERENCES topic(topic_id) ON DELETE CASCADE,
            quiz_lesson_id INT REFERENCES lesson(lesson_id) ON DELETE CASCADE
         );

          CREATE TABLE question (
            question_id SERIAL PRIMARY KEY,
            question_name VARCHAR(200) NOT NULL,
            question_body VARCHAR(200) NOT NULL,
            question_type VARCHAR(200),
            question_code VARCHAR(200) NOT NULL,
            question_image VARCHAR(200),
            question_mark INT,
            question_grade VARCHAR(200),
            question_calculator boolean,
            question_date timestamp,
            question_lesson_id INT REFERENCES lesson(lesson_id) ON DELETE CASCADE
         );


         CREATE TABLE answer (
            answer_id SERIAL PRIMARY KEY,
            answer_image  VARCHAR(200),
            answer1_body  VARCHAR(200),
            answer1_b  VARCHAR(200),
            answer1_a VARCHAR(200),
            answer2_body  VARCHAR(200),
            answer2_b  VARCHAR(200),
            answer2_a  VARCHAR(200),
            answer3_body VARCHAR(200),
            answer_questioncode VARCHAR(200),
            answer_explanation  VARCHAR(200),
            answer_correct boolean,
            answer_date  timestamp,
            answer_question_id  INT REFERENCES question(question_id) ON DELETE CASCADE

         );

         CREATE TABLE quizresult (
            quizresult_id SERIAL PRIMARY KEY,
            quizresult_percent  VARCHAR (200),
            quizresult_grade VARCHAR (200),
            quizresult_date  timestamp,
            quizresult_digitutor_id  INT REFERENCES digitutor(digitutor_id) ON DELETE CASCADE
         );


         CREATE TABLE quizfb (
            quizfb_id SERIAL PRIMARY KEY,
            quizfb_answer1  VARCHAR(200),
            quizfb_answer2  VARCHAR(200),
            quizfb_answer3  VARCHAR(200),
            quizfb_status  VARCHAR(200),
            quizfb_date  timestamp,
            quizfb_quizresult_id  INT REFERENCES quizresult(quizresult_id) ON DELETE CASCADE,
            quizfb_question_id  INT REFERENCES question(question_id) ON DELETE CASCADE,
            quizfb_answer_id   INT REFERENCES answer(answer_id) ON DELETE CASCADE,
            quizfb_digitutor_id INT REFERENCES answer(answer_id) ON DELETE CASCADE
         );

         CREATE TABLE questionquiz (
            questionquiz_id SERIAL PRIMARY KEY,
            questionquiz_question_id INT REFERENCES question(question_id) ON DELETE CASCADE,
            questionquiz_quiz_id INT REFERENCES quiz(quiz_id) ON DELETE CASCADE
         );

         CREATE TABLE conversation (
            conversation_id SERIAL PRIMARY KEY,
            conversation_message VARCHAR(200),
            conversation_incoming  VARCHAR(200),
            conversation_date  timestamp,
            conversation_digitutor_id  bigint REFERENCES digitutor(digitutor_id) ON DELETE CASCADE,
            conversation_topic_id  INT REFERENCES topic(topic_id) ON DELETE CASCADE
           
         );

INSERT INTO course 
(course_name, course_code, course_desc, course_level,course_image, course_date )
            VALUES
('MTH GCSE Maths Foundation','MTH-GF', 'MTH GCSE Maths Foundation Online Course','Foundation', '/course/gcse_foundation.png', NULL),
( 'MTH GCSE Maths Higher','MTH-HF', 'MTH GCSE Maths Higher Online Course','Higher', '/course/gcse_higher.png', NULL);

         SELECT * FROM course;

INSERT INTO digitutor 
(digitutor_quizresult, digitutor_usergrade, digitutor_targetgrade, digitutor_notes, digitutor_nextstep, digitutor_progressbar, digitutor_date)
            VALUES
( NULL,NULL, NULL,NULL, NULL, NULL,NULL);
           
         SELECT * FROM digitutor;
         
INSERT INTO users 
(users_role, users_firstname, users_lastname, users_email, users_password,users_active, users_course_id, users_digitutor_id )
            VALUES
(  'admin','Admin', 'user','admin@admin.com', 'password', TRUE, 1, 1),
(  'student','Student', 'user','student@student.com', 'password', TRUE, 1, 1),
(  'tutor','Tutor', 'user','tutor@tutor.com', 'password', TRUE, 1, 1);
            
            SELECT * FROM users;


         INSERT INTO topic 
(topic_name, topic_code, topic_desc,topic_index, topic_date,topic_course_id)
            VALUES
('Number 1', 'GFN1', 'MTH GCSE Maths Online Course - Foundation - Number 1', 1, NULL, 1),
( 'Number 2', 'GFN2', 'MTH GCSE Maths Online Course - Foundation - Number 2', 2, NULL, 1),
(  'Algebra 1', 'GFA1', 'MTH GCSE Maths Online Course - Foundation - Algebra 1', 3, NULL, 1),
(  'Algebra 2', 'GFA2', 'MTH GCSE Maths Online Course - Foundation - Algebra 2', 4, NULL, 1),
(  'Ratio and Measurement', 'GFRM', 'MTH GCSE Maths Online Course - Foundation - Ratio and Measurement', 5, NULL, 1),
(  'Geometry 1', 'GFG1', 'MTH GCSE Maths Online Course - Foundation - Geometry 1', 6, NULL, 1),
(  'Geometry 2', 'GFG2', 'MTH GCSE Maths Online Course - Foundation - Geometry 2', 7, NULL, 1),
(  'Probability', 'GFP1', 'MTH GCSE Maths Online Course - Foundation - Probability', 8, NULL, 1),
(  'Statistics', 'GFS1', 'MTH GCSE Maths Online Course - Foundation - Statistics', 9, NULL, 1),
(  'Number 1', 'GHN1', 'MTH GCSE Maths Online Course - Higher - Number 1', 1, NULL, 2),
(  'Number 2', 'GHN2', 'MTH GCSE Maths Online Course - Higher  - Number 2', 2, NULL, 2),
(  'Algebra 1', 'GHA1', 'MTH GCSE Maths Online Course - Higher  - Algebra 1', 3, NULL, 2),
(  'Algebra 2', 'GHA2', 'MTH GCSE Maths Online Course - Higher - Algebra 2', 4, NULL, 2),
(  'Ratio and Measurement', 'GHRM', 'MTH GCSE Maths Online Course - Higher  - Ratio and Measurement', 5, NULL, 2),
(  'Geometry 1', 'GHG1', 'MTH GCSE Maths Online Course - Higher  - Geometry 1', 6, NULL, 2),
(  'Geometry 2', 'GHG2', 'MTH GCSE Maths Online Course - Higher  - Geometry 2', 7, NULL, 2),
(  'Probability', 'GHP1', 'MTH GCSE Maths Online Course - Higher - Probability', 8, NULL, 2),
(  'Statistics', 'GHS1', 'MTH GCSE Maths Online Course - Higher  - Statistics', 9, NULL, 2);
         
         SELECT * FROM topic;

         INSERT INTO lesson 
(lesson_name, lesson_code,lesson_desc,lesson_ws,lesson_body,lesson_date, lesson_topic_id)
            VALUES
('Addition, Subtraction and Money Problems', 'GFN1LC1', 'To be able to add, subtract, and solve money problems.', 'GFN1WS1','Examples' , NULL, 1),
('Place Value and Decimals', 'GFN1LC2', 'To be able to use place value to read and write numbers including decimals.', 'GFN1WS2','Examples' , NULL, 1),
('Negative Numbers', 'GFN1LC3', 'To be able to add, subtract, divide and multiply integer numbers', 'GFN1WS3','Examples' , NULL, 1),
('Multiplication and Division', 'GFN1LC4', 'To be able to multiply and divde', 'GFN1WS4','Examples' , NULL, 1),
('Squares, Cubes and Roots', 'GFN1LC5', 'To be able to recognize square and cube numbers.', 'GFN1WS5','Examples' , NULL, 1),
( 'Index Notation', 'GFN1LC6', 'Introduction to Index Notation and Index laws.', 'GFN1WS6','Examples' , NULL, 1),
( 'Order of Operation', 'GFN1LC7', 'To be able to use BIDMAS to work out calculations ', 'GFN1WS7','Examples' , NULL, 1),
( 'Rounding Numbers and Estimation', 'GFN1LC8', 'To be able to round numbers and estimate calculation', 'GFN1WS8','Examples' , NULL, 1),
( 'Factors,Multiples and Prime Numbers', 'GFN1LC9', 'To be able to recognize factors, multiple and prime numbers', 'GFN1WS9','Examples' , NULL, 1),
( 'Primefactors HCF AND LCM', 'GFN1LC10', 'To be able to calculate primefactors, HCF and LCM.', 'GFN1WS10','Examples' , NULL, 1);
         


     INSERT INTO quiz 
(quiz_name, quiz_code, quiz_desc, quiz_type, quiz_subtype, quiz_calculator, quiz_date, quiz_course_id, quiz_topic_id,  quiz_lesson_id  )
            VALUES
('Number 1', 'GFN1TDQ', 'Number 1- Topic Diagnostic Quiz', 'Topic','diagnostic', TRUE, NULL, 1, 1, 2);


         SELECT * FROM quiz;

   INSERT INTO question 
( question_name, question_body, question_type, question_code, question_image, question_mark, question_grade, question_calculator, question_date,  question_lesson_id )
            VALUES
('Addition, Subtraction and Money problems', '3.26 + 14.9',NULL,  'GFN1LC1TDQ1', NULL, 1, 3, FALSE, NULL, 1);

         SELECT * FROM question;

         
   INSERT INTO answer 
(answer_image, answer1_body, answer1_b, answer1_a, answer2_body, answer2_b, answer2_a, answer3_body, answer_questioncode,  answer_explanation, answer_correct, answer_date, answer_question_id)
   VALUES
( NULL, '18.16',  NULL, NULL, NULL, NULL, NULL,  NULL, NULL, NULL, NULL, NULL,  1);

         SELECT * FROM answer;

   INSERT INTO quizfb 
(quizfb_answer1, quizfb_answer2, quizfb_answer3, quizfb_status,  quizfb_date, quizfb_quizresult_id, quizfb_question_id, quizfb_answer_id, quizfb_digitutor_id  )
            VALUES
(NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1);

         
         SELECT * FROM quizfb;


   INSERT INTO quizresult
 (quizresult_percent, quizresult_grade, quizresult_date,  quizresult_digitutor_id )
            VALUES
(NULL, NULL, NULL,  1);

         SELECT * FROM quizresult;


INSERT INTO questionquiz 
( questionquiz_question_id, questionquiz_quiz_id  )
            VALUES
(1, 1);

         SELECT * FROM questionquiz;

INSERT INTO conversation 
(conversation_message, conversation_incoming, conversation_date, conversation_digitutor_id, conversation_topic_id  )
            VALUES
(NULL, NULL, NULL,  1, 1);

         SELECT * FROM conversation;

