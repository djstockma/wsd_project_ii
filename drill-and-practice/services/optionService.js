import {sql} from "../database/database.js";

const getOptionsByQuestion = async(qId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${qId}`;
};

const getOptionsByQuestionWithoutCorrrectness = async(qId) => {
    return await sql`SELECT (question_id, option_text) FROM question_answer_options WHERE question_id = ${qId}`;
};

const deleteOptionsByQuestion = async(qId) => {
    await sql`DELETE FROM question_answer_options WHERE question_id = ${qId}`;
};

const addOption = async(qId, text, isTrue) => {
    await sql`INSERT INTO question_answer_options(question_id, option_text, is_correct) VALUES (${qId},${text},${isTrue})`;
};

const getNumberOfOptions = async() => {
    const rows = await sql`SELECT * from question_answer_options`;
    return rows.length;
};

const deleteOption = async(oId) => {
    await sql`DELETE FROM question_answer_options WHERE id = ${oId}`;
};

const getOption = async(oId) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE id = ${oId}`;
    return rows[0];
};

const getCorrectOptions = async(qId) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${qId} AND is_correct = true`;
    return rows;
};

export { getOptionsByQuestion, deleteOptionsByQuestion, addOption, getNumberOfOptions, deleteOption, getOption, getCorrectOptions, getOptionsByQuestionWithoutCorrrectness };