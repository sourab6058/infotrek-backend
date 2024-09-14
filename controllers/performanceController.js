const pool = require("../DB/index.js").pool;
const {v4: uuidv4} = require('uuid');

exports.createPerformance = async (req, res) => {
    const {user_id, game_id, time_taken} = req.body;
    const id = uuidv4();
    if (!user_id || !game_id || !time_taken) {
        return res.status(400).json({
            message: "please send user_id,game_id and time_taken"
        })
    }
    try {
        let result = await pool.query("INSERT INTO PERFORMANCE(ID,GAME_ID,USER_ID,TIME_TAKEN) VALUES($1,$2,$3,$4) RETURNING *", [id, game_id, user_id, time_taken]);
        return res.status(201).json(result.rows[0]);
    } catch (e) {
        console.log(e);
        if (e.code === "23505") {
            return res.status(400).json({
                message: "Already Played the game", details: e.detail
            })
        }
        return res.status(400).json({
            message: "something went wrong"
        })
    }
}

exports.getPerformance = async (req, res) => {
    const {game_id} = req.params;
    if (!game_id) {
        return res.status(400).json({
            message: "Please provide game_id"
        })
    }
    try {
        const results = await pool.query("SELECT * FROM PERFORMANCE WHERE GAME_ID=$1 ORDER BY TIME_TAKEN ASC", [game_id]);

        return res.status(200).json(results.rows);
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            message: "something went wrong"
        })
    }
}

exports.getLeaderBoard = async (req, res) => {
    const {game_id} = req.params;
    if (!game_id) {
        return res.status(400).json({
            message: "Please provide game_id"
        })
    }
    try {
        const results = await pool.query("SELECT U.ID,P.game_id,P.time_taken,U.name,U.email FROM PERFORMANCE P INNER JOIN USER_DETAILS U ON P.USER_ID=U.ID WHERE P.GAME_ID=$1 ORDER BY P.TIME_TAKEN ASC", [game_id]);

        return res.status(200).json(results.rows);
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            message: "something went wrong"
        })
    }
}

