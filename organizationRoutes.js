const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/create", (req, res) => {

    const { name } = req.body;

    const query =
        "INSERT INTO organizations (name) VALUES (?)";

    db.query(query, [name], (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Error creating organization",
                error: err
            });

        }

        return res.status(201).json({
            message: "Organization Created Successfully"
        });

    });

});

module.exports = router;