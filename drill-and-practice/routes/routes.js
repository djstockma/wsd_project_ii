import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionAPI from "./apis/questionAPI.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/topics", topicController.showTopics);
router.post("/topics", topicController.addTopic);
router.get("/topics/:id", topicController.showTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);
router.post("/topics/:id/questions", questionController.addQuestion);
router.get("/topics/:id/questions/:qId", questionController.showQuestion);
router.post("/topics/:id/questions/:qId/options", questionController.addAnswerOption);
router.post("/topics/:id/questions/:qId/options/:oId/delete", questionController.deleteAnswerOption);
router.post("/topics/:id/questions/:qId/delete", questionController.deleteQuestion);
//  
// 
router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);
// 
router.get("/quiz", quizController.showTopicList);
router.get("/quiz/:tId", quizController.pickRandomQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.showRandomQuestion);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.takeGuess);
router.get("/quiz/:tId/questions/:qId/correct", quizController.correctGuess);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.incorrectGuess);
// 
router.get("/api/questions/random", questionAPI.requestQuestion);
router.post("/api/questions/answer", questionAPI.answerQuestion);





export { router };
