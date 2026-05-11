const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../config/db");


// SUPER ADMIN LOGIN

router.post("/superadmin/login", (req, res) => {

    const { email, password } = req.body;

    const superAdmin = {
        email: "admin@byepo.com",
        password: "admin123"
    };

    if (
        email === superAdmin.email &&
        password === superAdmin.password
    ) {

        return res.status(200).json({
            message: "Super Admin Login Successful"
        });

    } else {

        return res.status(401).json({
            message: "Invalid Credentials"
        });

    }

});


// ADMIN SIGNUP

router.post("/admin/signup", async (req, res) => {

    const {
        username,
        email,
        password,
        organization_id
    } = req.body;

    try {

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const role = "admin";

        const query = `
            INSERT INTO users
            (username, email, password, role, organization_id)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            query,
            [
                username,
                email,
                hashedPassword,
                role,
                organization_id
            ],
            (err, result) => {

                if (err) {

                    return res.status(500).json({
                        message: "Signup Failed",
                        error: err
                    });

                }

                return res.status(201).json({
                    message: "Admin Signup Successful"
                });

            }
        );

    } catch (error) {

        return res.status(500).json({
            message: "Server Error"
        });

    }

});


// ADMIN LOGIN

router.post("/admin/login", (req, res) => {

    const { email, password } = req.body;

    const query =
        "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], async (err, results) => {

        if (err) {

            return res.status(500).json({
                message: "Server Error"
            });

        }

        if (results.length === 0) {

            return res.status(404).json({
                message: "User Not Found"
            });

        }

        const user = results[0];

        const isMatch =
            await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                organization_id: user.organization_id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            message: "Admin Login Successful",
            token
        });

    });

});

module.exports = router;