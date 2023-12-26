exports.isSolutionCorrect = (question)  => {
    return (
      question.question_choice_answer === question.question_response1 ||
      question.question_choice_answer === question.question_response2 ||
      question.question_choice_answer === question.question_response3
    );
};