import {sql} from "../database/database.js";


const getAllTopicsSorted = async() => {
    const rows = await sql`SELECT * FROM topics ORDER BY name`; //where user_id = ?
    return rows;
}; 

const getTopic = async( tId ) => {
    const rows = await sql`SELECT * FROM topics WHERE id = ${tId}`; //where user_id = ?
    return rows[0];
}; 

const addTopic = async(userId, name) => {
    await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
}; 

const deleteTopic = async(tID) => {
    await sql`DELETE FROM topics WHERE id = ${tID}`;
    // 
}; 

const getNumberOfTopics = async() => {
    const rows = await sql`SELECT * from topics`;
    return rows.length;
};

export{ getAllTopicsSorted, getTopic, addTopic, deleteTopic, getNumberOfTopics };