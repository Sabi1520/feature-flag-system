const express = require("express");
const router = express.Router();

const db = require("../config/db");


// CREATE FEATURE FLAG

router.post("/create", (req, res) => {

    const {
        feature_key,
        enabled,
        organization_id
    } = req.body;

    const query = `
        INSERT INTO feature_flags
        (feature_key, enabled, organization_id)
        VALUES (?, ?, ?)
    `;

    db.query(
        query,
        [
            feature_key,
            enabled,
            organization_id
        ],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: "Feature Creation Failed",
                    error: err
                });

            }

            return res.status(201).json({
                message: "Feature Flag Created Successfully"
            });

        }
    );

});


// GET ALL FEATURE FLAGS

router.get("/all", (req, res) => {

    const query =
        "SELECT * FROM feature_flags";

    db.query(query, (err, results) => {

        if (err) {

            return res.status(500).json({
                message: "Error Fetching Features"
            });

        }

        return res.status(200).json(results);

    });

});


// ENABLE / DISABLE FEATURE FLAG

router.put("/toggle/:id", (req, res) => {

    const featureId = req.params.id;

    const { enabled } = req.body;

    const query = `
        UPDATE feature_flags
        SET enabled = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [enabled, featureId],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: "Feature Update Failed"
                });

            }

            return res.status(200).json({
                message: "Feature Updated Successfully"
            });

        }
    );

});


// CHECK FEATURE STATUS

router.get(
    "/check/:organizationId/:featureKey",
    (req, res) => {

        const {
            organizationId,
            featureKey
        } = req.params;

        const query = `
            SELECT * FROM feature_flags
            WHERE organization_id = ?
            AND feature_key = ?
        `;

        db.query(
            query,
            [organizationId, featureKey],
            (err, results) => {

                if (err) {

                    return res.status(500).json({
                        message: "Error Checking Feature"
                    });

                }

                if (results.length === 0) {

                    return res.status(404).json({
                        message: "Feature Not Found"
                    });

                }

                return res.status(200).json({
                    feature: results[0].feature_key,
                    enabled: results[0].enabled
                });

            }
        );

    }
);


module.exports = router;