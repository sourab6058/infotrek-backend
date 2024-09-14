const {pool} = require("./index")

exports.initializeDB = async () => {
    const USER = await pool.query(`
        CREATE TABLE IF NOT EXISTS USER_DETAILS
        (
            NAME     VARCHAR(50),
            ID       UUID PRIMARY KEY,
            EMAIL    VARCHAR(100) UNIQUE,
            PASSWORD VARCHAR(200),
            ROLE     VARCHAR(5) DEFAULT 'user'
        )`);

    if (USER) {
        console.log("USER TABLE CREATED/NOT TOUCHED");
    } else {
        throw new Error("Creation of Tables Failed");
    }
    const GAME = await pool.query(`
        CREATE TABLE IF NOT EXISTS GAME
        (
            ID         UUID PRIMARY KEY,
            START_TIME timestamp,
            PARAGRAPH  VARCHAR(2000),
            NAME       VARCHAR(100),
            ORGANIZER  VARCHAR(100)
        )`);
    if (GAME) {
        console.log("GAME TABLE CREATED/NOT TOUCHED");
    } else {
        throw new Error("Creation of Tables Failed");
    }
    const PERF = await pool.query(`
        CREATE TABLE IF NOT EXISTS PERFORMANCE
        (
            ID         UUID PRIMARY KEY,
            GAME_ID    UUID REFERENCES GAME,
            USER_ID    UUID REFERENCES USER_DETAILS,
            TIME_TAKEN INTEGER
        )`);

    if (PERF) {
        console.log("PERFORMANCE TABLE CREATED/NOT TOUCHED");
    } else {
        throw new Error("Creation of Tables Failed");
    }
    return true;
}