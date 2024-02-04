import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";


const requestQuestion = async({response}) => {
    const questions = await questionService.getAllQuestions();
    const length = await questionService.getNumberOfQuestions();
    const random = Math.floor(Math.random() * length);

    const selectedQuestion = questions[random];
    const qId = selectedQuestion.id;

    const answerOptions = await optionService.getOptionsByQuestion(qId);
    var optionList = [];
    answerOptions.forEach((option) => {
        optionList.push({optionId: option.id, optionText: option.option_text})
    });

    const data = {
        questionId: qId,
        questionText: selectedQuestion.question_text,
        answerOptions: optionList,
    };

    response.body = data;
};

const answerQuestion = async({request, response}) => {
    const body = request.body({ type: "json" });
    const document = await body.value;

    if(document.optionId) {
        const option = await optionService.getOption(document.optionId);
        if(option.is_correct) {
            response.body = {correct: true};
        } else {
            response.body = {correct: false};
        }
    }
    response.status = 200;
};


const addTask = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const document = await body.value;
    if (document.task) {
      await sql`INSERT INTO tasks (task) VALUES (${task})`;
    }
    response.status = 200;
  };


export { requestQuestion, answerQuestion };