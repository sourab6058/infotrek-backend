const pool = require("../DB/index.js").pool;
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const id = uuidv4();
  const password = await bcrypt.hash(req.body.password, 12);

  try {
    let result = await pool.query(
      "INSERT INTO USER_DETAILS VALUES ($1,$2,$3,$4) RETURNING name,id,email",
      [name, id, email, password]
    );
    const token = signToken(result.rows[0].id);

    res.status(201).json({
      message: "success",
      token,
      data: result.rows[0],
    });
  } catch (e) {
    if (e.code === "23505") {
      res.status(400).json({
        message: "user already exists",
        detail: e.detail,
      });
    } else {
      res.status(400).json({
        message: "bad request",
      });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "please provide email and password",
    });
  }
  try {
    let user = await pool.query("SELECT * FROM USER_DETAILS WHERE EMAIL=$1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "wrong email or password",
      });
    }
    const userPassword = user.rows[0].password;
    const correctPassword = await bcrypt.compare(password, userPassword);

    if (correctPassword) {
      const token = signToken(user.rows[0].id);
      user.rows[0].password = undefined;
      const id = user.rows[0].id;
      let events = await pool.query(
        "SELECT * FROM EVENT_REGISTRATIONS WHERE USER_ID=$1",
        [id]
      );
      res.status(200).json({
        message: "success",
        token,
        data: { ...user.rows[0], events: events.rows },
      });
    } else {
      res.status(400).json({
        message: "wrong email or password",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { username, email, dob, gender } = req.body;
  try {
    let user = await pool.query(
      "UPDATE USER_DETAILS SET NAME=$1, EMAIL=$2, DOB=$3, GENDER=$4 WHERE ID=$5 RETURNING *",
      [username, email, dob, gender, id]
    );

    if (user.rows.length > 0) {
      res.status(200).json({
        message: "success",
        data: user.rows[0],
      });
    } else {
      res.status(400).json({
        message: "wrong email or password",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
exports.uploadPic = async (req, res) => {
  const id = req.params.id;
  const filename = req.file.filename;
  console.log(id, filename);
  try {
    if (!req.file) {
      return res.status(401).json({ message: "No file uploaded" });
    }

    const oldFileName = await pool.query(
      "SELECT IMG_URL FROM USER_DETAILS WHERE ID=$1",
      [id]
    );
    if (oldFileName.rows[0].img_url !== "default.png") {
      console.log("remove file");
      const imagePath = path.join(
        __dirname,
        "public",
        "imgs",
        oldFileName.rows[0].img_url
      );
      fs.stat(imagePath, function (err, stats) {
        console.log(stats); //here we got all information of file in stats variable

        if (err) {
          return console.error(err);
        }
        fs.unlink(imagePath, async function (err) {
          if (err) return console.log(err);
          console.log("file deleted successfully");
        });
      });
    }
    const data = await pool.query(
      "UPDATE USER_DETAILS SET IMG_URL=$1 WHERE ID=$2 RETURNING *",
      [filename, id]
    );
    res
      .status(200)
      .json({ message: "File uploaded successfully", data: data.rows[0] });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ message: "Something went wrong, unable to upload profile pic." });
  }
};
exports.protect = async (req, res, next) => {
  //1 Get the token and check if it's exists
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "You're not logged in",
    });
  }

  //2 Verify the token

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    //3 Check if user still exists

    const freshUser = await pool.query(
      "SELECT * FROM USER_DETAILS WHERE ID=$1",
      [decoded.id]
    );

    if (!freshUser || freshUser.rows.length === 0) {
      return res.status(401).json({
        message: "You're not logged in",
      });
    }
    req.user = freshUser.rows[0];
    next();
  } catch (e) {
    return res.status(400).json({
      message: "You're not logged in",
    });
  }

  //4 Check if user changed password after the Token was issued

  //Grant access to protected route
};

exports.authorizeAdmin = async (req, res, next) => {
  // console.log(req.user)
  if (req.user.role.toLowerCase() === "admin") {
    next();
  } else {
    return res.status(401).json({
      message: "You're not authorized to perform this action",
    });
  }
};
