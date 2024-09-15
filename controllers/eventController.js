const pool = require("../DB/index.js").pool;
const { v4: uuidv4 } = require("uuid");

exports.createEvent = async (req, res) => {
  const { name, description, dateFrom, dateTo, location, category, status } =
    req.body;
  const id = uuidv4();

  if (
    !(
      name &&
      description &&
      dateFrom &&
      dateTo &&
      location &&
      category &&
      status
    )
  ) {
    return res.status(400).json({
      message:
        "Please send the details: {name, description, dateFrom, dateTo, location, category, status} ",
    });
  }
  try {
    const result = await pool.query(
      "INSERT INTO EVENT_DETAILS(id,name,description,date_from,date_to, location, category, status) VALUES($1,$2,$3,$4,$5, $6, $7, $8) RETURNING *",
      [id, name, description, dateFrom, dateTo, location, category, status]
    );
    return res.status(201).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "something went wrong",
    });
  }
};

exports.registerEvent = async (req, res) => {
  const { user_id, event_id, status } = req.body;
  const id = uuidv4();

  if (!(user_id && event_id && status)) {
    return res.status(400).json({
      message: "Please send the details: {user_id, event_id, status} ",
    });
  }
  try {
    const result = await pool.query(
      "INSERT INTO EVENT_REGISTRATIONS(id, user_id, event_id, status) VALUES($1,$2,$3,$4) RETURNING *",
      [id, user_id, event_id, status]
    );
    return res.status(201).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "something went wrong",
    });
  }
};
exports.unRegisterEvent = async (req, res) => {
  const { user_id, event_id } = req.body;
  const id = uuidv4();

  if (!(user_id && event_id)) {
    return res.status(400).json({
      message: "Please send the details: {user_id, event_id, status} ",
    });
  }
  try {
    const result = await pool.query(
      "DELETE FROM EVENT_REGISTRATIONS WHERE USER_ID=$1 AND EVENT_ID=$2 RETURNING *",
      [user_id, event_id]
    );
    return res.status(201).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "something went wrong",
    });
  }
};

exports.updateEvent = async (req, res) => {
  const { name, desc, dateFrom, dateTo, location, category, status, id } =
    req.body;

  if (!(name && desc && dateFrom && dateTo && location && category && status)) {
    return res.status(400).json({
      message:
        "Please send the details: {name, desc, dateFrom, dateTo, location, category, status, id} ",
    });
  }

  try {
    const result = await pool.query(
      "UPDATE EVENT_DETAILS SET NAME=$1, DESCRIPTION=$2, DATE_FROM=$3, DATE_TO=$4, LOCATION=$5, CATEGORY=$6, STATUS=$7 WHERE ID=$8 RETURNING *",
      [name, desc, dateFrom, dateTo, location, category, status, id]
    );
    return res.status(200).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "something went wrong",
    });
  }
};
exports.deleteEvent = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Please send id",
    });
  }

  try {
    const result = await pool.query(
      "DELETE FROM EVENT_DETAILS WHERE ID=$1  RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "event not found with this id",
      });
    }
    return res.status(200).json({
      message: "deleted",
      deleted_id: result.rows[0].id,
    });
  } catch (e) {
    console.log(e);
    if (e.code === "22P02") {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }
    return res.status(400).json({
      message: "something went wrong",
    });
  }
};

exports.getEvent = async (req, res) => {
  const eventID = req.params.id;
  if (!eventID) {
    return res.status(400).json({
      message: "Please specify the id",
    });
  }

  try {
    const result = await pool.query("SELECT * FROM EVENT_DETAILS WHERE ID=$1", [
      eventID,
    ]);

    return res.status(200).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(401).json(e);
  }
};
exports.getEvents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM EVENT_DETAILS ORDER BY DATE_FROM"
    );
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(400).json();
  }
};

exports.checkParticipation = async (req, res) => {
  const { game, user } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM PERFORMANCE WHERE GAME_ID=$1 and USER_ID=$2",
      [game, user]
    );

    res.status(200).json(result.rows.length);
  } catch (e) {
    console.log(e);
    res.status(400).json();
  }
};
