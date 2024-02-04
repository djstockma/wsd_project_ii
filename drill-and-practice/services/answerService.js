import {sql} from "../database/database.js";

const deleteAnswersByQuestion = async(qId) => {
    await sql`DELETE FROM question_answers WHERE question_id = ${qId}`;
};

const addAnswer = async(uId, qId, oId) => {
    await sql`INSERT INTO question_answers(user_id, question_id, question_answer_option_id) VALUES(${uId}, ${qId}, ${oId})`;
};

const getAnswerCount = async() => {
    const rows = await sql`SELECT * FROM question_answers`;
    return rows.length;
};

export { deleteAnswersByQuestion, addAnswer, getAnswerCount };