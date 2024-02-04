import {sql} from "../database/database.js";

const getQuestionsByTopic = async(tId) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${tId}`;
};

const deleteQuestionsByTopic = async(tId) => {
    return await sql`DELETE FROM questions WHERE topic_id = ${tId}`;
};

const addQuestion = async(uId, tId, text) => {
    await sql`INSERT INTO questions(user_id, topic_id, question_text) VALUES (${uId},${tId},${text})`;
};

const getNumberOfQuestions = async() => {
    const rows = await sql`SELECT * from questions`;
    return rows.length;
};

const deleteQuestion = async(qId) => {
    await sql`DELETE FROM questions WHERE id = ${qId}`;
};

const getQuestion = async(qId) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${qId}`;
    return rows[0];
};

const getAllQuestions = async() => {
    const rows = await sql`SELECT * FROM questions`;
    return rows;
};

export { getQuestionsByTopic, deleteQuestionsByTopic, addQuestion, getNumberOfQuestions, deleteQuestion, getQuestion, getAllQuestions };