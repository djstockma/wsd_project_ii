import { getNumberOfTopics } from "../../services/topicService.js";
import { getNumberOfQuestions } from "../../services/questionService.js";
import { getAnswerCount } from "../../services/answerService.js";

const showMain = async({ render }) => {

  render("main.eta", {nOfQuestions: await getNumberOfQuestions(),
                      nOfTopics:    await getNumberOfTopics(),
                      nOfAnswers:   await getAnswerCount()
  });
};

export { showMain };
