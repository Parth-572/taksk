const {pool} = require("../db/db")
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  try {
    const { name, email, password, board, field, standard, dob } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.staus(400).json({
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const dobObj = new Date(dob);
    const age = new Date().getFullYear() - dobObj.getFullYear();

    //make user

    const result = await pool.query(
      `INSERT INTO users (name, email, password, board, field, standard, dob, age) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [name, email, hashedPassword, board, field, standard, dob, age]
    );

    return res.status(201).json({
      message: "User registerd Successfully",
      userId: result.rows[0].id,
    });
  } catch (error) {
    console.log("Error :", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

module.exports = {registerController}
