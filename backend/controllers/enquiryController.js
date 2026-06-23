const pool = require("../db");

// Create Enquiry
const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, destination, message } = req.body;

    const newEnquiry = await pool.query(
      `INSERT INTO enquiries
      (name,email,phone,destination,message)
      VALUES($1,$2,$3,$4,$5)
      RETURNING *`,
      [name, email, phone, destination, message]
    );

    res.status(201).json({
      message: "Enquiry Created Successfully",
      enquiry: newEnquiry.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// Get All Enquiries
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await pool.query(
      "SELECT * FROM enquiries ORDER BY id ASC"
    );

    res.json(enquiries.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// Update Enquiry
const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, phone, destination, message } = req.body;

    const updated = await pool.query(
      `UPDATE enquiries
      SET name=$1,
          email=$2,
          phone=$3,
          destination=$4,
          message=$5
      WHERE id=$6
      RETURNING *`,
      [name, email, phone, destination, message, id]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({
        message: "Enquiry Not Found"
      });
    }

    res.json({
      message: "Enquiry Updated Successfully",
      enquiry: updated.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// Delete Enquiry
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await pool.query(
      "DELETE FROM enquiries WHERE id=$1 RETURNING *",
      [id]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({
        message: "Enquiry Not Found"
      });
    }

    res.json({
      message: "Enquiry Deleted Successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry
};