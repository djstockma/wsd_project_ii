import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import * as answerService from "../../services/answerService.js";

const showTopicList = async({render}) => {
    const topics = await topicService.getAllTopicsSorted();
    const data = {
        topics: topics,
    };
    render("quizTopics.eta", data);
};

const pickRandomQuestion = async({params, response}) => {
    const tId = params.tId;
    const questions = await questionService.getQuestionsByTopic(tId);
    const length = questions.length;
    
    const random = Math.floor(Math.random() * length);
    const qId = questions[random].id;
    response.redirect(`/quiz/${tId}/questions/${qId}`);
};

const showRandomQuestion = async({params, render}) => {
    const qId = params.qId;
    const tId = params.tId;
    
    const selectedQuestion = await questionService.getQuestion(qId);
    const data = {
        options: await optionService.getOptionsByQuestion(qId),
        question: selectedQuestion.question_text,
        qId: qId,
        tId: tId,
    };
    render("quizQuestion.eta", data);
};

const takeGuess = async({params, response, user}) => {
    const tId = params.tId;
    const qId = params.qId;
    const oId = params.oId;
    const uId = user.id;
    console.log(uId); // remove
    const option = await optionService.getOption(oId);
    const isCorrect = option.is_correct;

    await answerService.addAnswer(uId, qId, oId);

    if(isCorrect) {
        response.redirect(`/quiz/${tId}/questions/${qId}/correct`);
    } else {
        response.redirect(`/quiz/${tId}/questions/${qId}/incorrect`);
    }
};

const correctGuess = async({params, render}) => {
    const tId = params.tId;
    const qId = params.qId;
    const oId = params.oId;
    const data = {
        tId: tId,
        correctAnswer: "",
    };
    render("correctAnswer.eta", data);
};

const incorrectGuess = async({params, render}) => {
    const tId = params.tId;
    const qId = params.qId;

    const data = {
        tId: tId,
        correctAnswer: "",
    };

    const correctAnswers = await optionService.getCorrectOptions(qId);
    const correct = correctAnswers[0];
    data.correctAnswer = correct.option_text;
    render("incorrectAnswer.eta", data);
};

export { showTopicList, pickRandomQuestion, showRandomQuestion, takeGuess, correctGuess, incorrectGuess };