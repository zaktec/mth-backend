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
            course_image VARCHAR(200),
            course_createdate timestamp,
            course_lastupdate timestamp 
         );

         CREATE TABLE digitutor (
            digitutor_id SERIAL PRIMARY KEY,
            digitutor_quizresult  INT,
            digitutor_usergrade  INT,
            digitutor_targetgrade  INT,
            digitutor_tutorinput  VARCHAR(200),
            digitutor_notes VARCHAR(200),
            digitutor_nextstep  VARCHAR(200),
            digitutor_progressbar  INT,
            digitutor_createdate timestamp,
            digitutor_lastupdate  timestamp
         );

        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            user_role VARCHAR(200) NOT NULL,
            user_firstname VARCHAR(200) NOT NULL,
            user_lastname VARCHAR(200) NOT NULL,
            user_email VARCHAR(200) NOT NULL unique,
            user_password VARCHAR(200),
            user_active boolean,
            user_createdate timestamp,
            user_lastupdate timestamp,
            user_course_id INT REFERENCES course(course_id) ON DELETE CASCADE,
            user_digitutor_id INT REFERENCES digitutor(digitutor_id) ON DELETE CASCADE  
        ); 

       
         CREATE TABLE topic (
            topic_id SERIAL PRIMARY KEY,
            topic_name VARCHAR(200) NOT NULL,
            topic_code VARCHAR(200) NOT NULL,
            topic_desc VARCHAR(200) NOT NULL,
            topic_index INT,
            topic_createdate timestamp,
            topic_lastupdate timestamp,
            topic_course_id INT REFERENCES course(course_id) ON DELETE CASCADE
         );
         
          
         
         CREATE TABLE lesson (
            lesson_id SERIAL PRIMARY KEY,
            lesson_name VARCHAR(200) NOT NULL,
            lesson_code VARCHAR(200) NOT NULL,
            lesson_desc VARCHAR(200),
            lesson_ws VARCHAR(200),
            lesson_body VARCHAR(200),
            lesson_createdate timestamp,
            lesson_lastupdate timestamp,
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
            quiz_createdate timestamp,
            quiz_lastupdate timestamp,
            quiz_course_id INT REFERENCES course(course_id) ON DELETE CASCADE,
            quiz_topic_id INT REFERENCES topic(topic_id) ON DELETE CASCADE,
            quiz_lesson_id INT REFERENCES lesson(lesson_id) ON DELETE CASCADE
         );

          CREATE TABLE question (
            question_id SERIAL PRIMARY KEY,
            question_body VARCHAR(200) NOT NULL,
            question_type VARCHAR(200) NOT NULL,
            question_code VARCHAR(200) NOT NULL,
            question_image VARCHAR(200),
            question_mark INT,
            question_grade VARCHAR(200),
            question_calculator boolean,
            question_createdate timestamp,
            question_lastupdate timestamp,
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
            answer_createdate  timestamp,
            answer_lastupdate  timestamp,
            answer_question_id  INT REFERENCES question(question_id) ON DELETE CASCADE

         );

         CREATE TABLE quizresult (
            quizresult_id SERIAL PRIMARY KEY,
            quizresult_percent  VARCHAR (200),
            quizresult_grade VARCHAR (200),
            quizresult_createdate  timestamp,
            quizresult_lastupdate  timestamp,
            quizresult_digitutor_id  INT REFERENCES digitutor(digitutor_id) ON DELETE CASCADE
         );


         CREATE TABLE quizfb (
            quizfb_id SERIAL PRIMARY KEY,
            quizfb_answer1  VARCHAR(200),
            quizfb_answer2  VARCHAR(200),
            quizfb_answer3  VARCHAR(200),
            quizfb_status  VARCHAR(200),
            quizfb_createdate  timestamp,
            quizfb_lastupdate  timestamp,
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
            conversation_createdate  timestamp,
            conversation_lastupdate  timestamp,
            conversation_digitutor_id  bigint REFERENCES digitutor(digitutor_id) ON DELETE CASCADE,
            conversation_topic_id  INT REFERENCES topic(topic_id) ON DELETE CASCADE
           
         );


         SELECT * FROM users;
         SELECT * FROM course;
         SELECT * FROM topic;
         SELECT * FROM lesson;
         SELECT * FROM quiz;
         SELECT * FROM question;
         SELECT * FROM digitutor;
         SELECT * FROM answer;
         SELECT * FROM quizfb;
         SELECT * FROM quizresult;
         SELECT * FROM questionquiz;
         SELECT * FROM conversation;
 