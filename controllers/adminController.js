const pool = require("../DB/index.js").pool;
function min(x, y) {
  if (x < y) return x;
  return y;
}

function max(x, y) {
  if (x > y) return x;
  return y;
}

exports.getUsers = async (_, res) => {
  try {
    const result = await pool.query(
      "SELECT ID, NAME, EMAIL, ROLE FROM USER_DETAILS"
    );
    const range = `posts 0-10/${max(1, result.rows.length)}`;
    console.log(range);
    res.set("Content-Range", range);
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(400).json();
  }
};
exports.getUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const result = await pool.query("SELECT * FROM USER_DETAILS WHERE ID=$1", [
      id,
    ]);
    console.log(result.rows[0]);
    const range = `posts 0-10/${max(1, result.rows.length)}`;
    console.log(range);
    res.set("Content-Range", range);
    res.status(200).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    res.status(400).json();
  }
};
exports.getEvents = async (_, res) => {
  try {
    const result = await pool.query("SELECT * FROM EVENT_DETAILS");
    const range = `posts 0-10/${max(1, result.rows.length)}`;
    console.log(range);
    res.set("Content-Range", range);
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(400).json();
  }
};
exports.createEvent = async (req, res) => {
  const data = req.body;
  const id = uuidv4();

  try {
    // const result = await pool.query("INSERT INTO GAME(id,start_time,paragraph,name,organizer) VALUES($1,$2,$3,$4,$5) RETURNING *", [id, start_time, paragraph, name, organizer]);
    console.log(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "something went wrong",
    });
  }
};
