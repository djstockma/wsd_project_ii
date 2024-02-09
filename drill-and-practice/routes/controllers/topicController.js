import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import * as optionService from "../../services/optionService.js";

const showTopics = async({render, user}) => {
    const data = {
        topics: await topicService.getAllTopicsSorted(),
        admin: user.admin,
    };
    render("topics.eta", data);
};

const showTopic = async({request, response, params, render}) => {
    const tId = params.id;
    const topic = await topicService.getTopic(tId); 
    const data = {
        id: tId,
        name: topic.name,
        questions: await questionService.getQuestionsByTopic(tId),
        errors: [],
        text: "",
    };
    render("topic.eta", data); 
};

const addTopic = async({request, response}) => {
    const body = request.body({ type: "form" });
    const requestParams = await body.value;
    const name = requestParams.get("name");
    await topicService.addTopic(1, name);
    response.redirect("/topics");
};

const deleteTopic = async({request, response, params, user}) => {
    const tId = params.id;
    const questions = await questionService.getQuestionsByTopic(tId);
    if(!user.admin) {
        response.redirect("/topics");
    }
    // First we delete answers and answer options
    questions.forEach(async question => {
        await answerService.deleteAnswersByQuestion(question.id);
        await optionService.deleteOptionsByQuestion(question.id);
    });
    //then questions and lastly the topic itself
    await questionService.deleteQuestionsByTopic(tId);
    await topicService.deleteTopic(tId);
    response.redirect("/topics");
};




export{ showTopics, showTopic, addTopic, deleteTopic };