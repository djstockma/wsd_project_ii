import * as questionService from "../../services/questionService.js"
import * as optionService from "../../services/optionService.js"
import * as topicService from "../../services/topicService.js"
import * as answerService from "../../services/answerService.js"

const addQuestion = async({request, response, params, render}) => {
    const tId = params.id;
    const body = request.body({ type: "form" });
    const requestParams = await body.value;
    const text = requestParams.get("question_text");
    const topic = await topicService.getTopic(tId);
    
    const data = {
        id: tId,
        name: topic.name,
        questions: await questionService.getQuestionsByTopic(tId),
        errors: [],
        text: "",
    };

    if(text.length > 0) {
        // Issa OK
        await questionService.addQuestion(1, tId, text);
        response.redirect(`/topics/${tId}`);
    } else {
        data.errors.push("Fill in the question text!");
        data.text = text;
        render("topic.eta", data);
    }
};

const deleteQuestion = async({response, params}) => {
    const tId = params.id;
    const qId = params.qId;
    await questionService.deleteQuestion(qId);
    response.redirect(`/topics/${tId}`);
};

const showQuestion = async({params, render}) => { 
    const tId = params.id;
    const qId = params.qId;
    const question = await questionService.getQuestion(qId);
    const data = {
        tId: tId,
        qId: qId,
        text: await question.question_text,
        options: await optionService.getOptionsByQuestion(qId),
        errors: [],
        text: "",
    };
    render("question.eta", data);
}; 

const addAnswerOption = async({params, response, request, render}) => {
    const tId = params.id;
    const qId = params.qId;
    const body = request.body({ type: "form" });
    const requestParams = await body.value;
    var istrue = false;
    if(requestParams.get("is_correct")) {
        istrue = true;
    }
    const text = requestParams.get("option_text"); 
    const question = await questionService.getQuestion(qId);


    if(text.length > 0) {
        await optionService.addOption(qId, text, istrue);
        response.redirect(`/topics/${tId}/questions/${qId}`); 
    } else {

        const data = {
            tId: tId,
            qId: qId,
            text: await question.question_text,
            options: await optionService.getOptionsByQuestion(qId),
            errors: ["Answer option cannot be empty!"],
            text: text,
        };
        render("question.eta", data);
    }
};

const deleteAnswerOption = async({request, response, params}) => { 
    const tId = params.id;
    const qId = params.qId;
    const oId = params.oId;
    await optionService.deleteOption(oId);
    response.redirect(`/topics/${tId}/questions/${qId}`);
};

export {  addQuestion, showQuestion, addAnswerOption, deleteAnswerOption, deleteQuestion };