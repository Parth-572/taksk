const bcrypt = require("bcrypt");
const { pool } = require("../db/db"); // PostgreSQL connection pool

const updateController = async (req, res) => {
  const userId = req.params.id; //  user ID from params
  const { name, email, password, board, field, standard, dob, age } = req.body;

  try {
    if (email) {
      const emailCheck = await pool.query(
        "SELECT * FROM users WHERE email = $1 AND id != $2",
        [email, userId]
      );
      if (emailCheck.rows.length > 0) {
        return res.status(400).json({ error: "Email is already in use" });
      }
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateFields = [];
    const updateValues = [];
    let queryIndex = 1;

    if (name) {
      updateFields.push(`name = $${queryIndex++}`);
      updateValues.push(name);
    }
    if (email) {
      updateFields.push(`email = $${queryIndex++}`);
      updateValues.push(email);
    }
    if (hashedPassword) {
      updateFields.push(`password = $${queryIndex++}`);
      updateValues.push(hashedPassword);
    }
    if (board) {
      updateFields.push(`board = $${queryIndex++}`);
      updateValues.push(board);
    }
    if (field) {
      updateFields.push(`field = $${queryIndex++}`);
      updateValues.push(field);
    }
    if (standard) {
      updateFields.push(`standard = $${queryIndex++}`);
      updateValues.push(standard);
    }
    if (dob) {
      updateFields.push(`dob = $${queryIndex++}`);
      updateValues.push(dob);
    }
    if (age) {
      updateFields.push(`age = $${queryIndex++}`);
      updateValues.push(age);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const updateQuery = `
      UPDATE users
      SET ${updateFields.join(", ")}
      WHERE id = $${queryIndex}
      RETURNING *;
    `;
    updateValues.push(userId);

    const result = await pool.query(updateQuery, updateValues);

    return res.status(200).json({
      message: "Profile updated successfully",
      user: result.rows[0], // Return updated user details
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { updateController };
