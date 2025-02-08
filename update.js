const express = require('express');
const router = express.Router();
const Cricket = require('../models/data')

router.get('/update', async (req, res) => {
    try {
        const playerId = req.query.id;
        if (!playerId) {
            return res.send('<h3 style="color:red;">No player selected for editing.</h3>');
        }

        const player = await Cricket.findByPk(playerId);
        if (!player) {
            return res.send('<h3 style="color:red;">Player not found.</h3>');
        }

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Edit Player</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background-color: #f4f4f4;
                    }
                    .container {
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        width: 300px;
                    }
                    .container h2 {
                        text-align: center;
                    }
                    .form-group {
                        margin-bottom: 10px;
                    }
                    .form-group label {
                        display: block;
                        font-weight: bold;
                    }
                    .form-group input, .form-group textarea {
                        width: 100%;
                        padding: 8px;
                        margin-top: 5px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                    }
                    .submit-btn {
                        background-color: green;
                        color: white;
                        padding: 10px;
                        border: none;
                        width: 100%;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Edit Player</h2>
                    <form action="/update/player" method="POST">
                        <input type="hidden" name="id" value="${player.id}">
                        <div class="form-group">
                            <label>Name:</label>
                            <input type="text" name="name" value="${player.name}">
                        </div>
                        <div class="form-group">
                            <label>Date of Birth:</label>
                            <input type="date" name="dob" value="${player.dob}">
                        </div>
                        <div class="form-group">
                            <label>Photo URL:</label>
                            <input type="url" name="photo" value="${player.photo}">
                        </div>
                        <div class="form-group">
                            <label>Birthplace:</label>
                            <input type="text" name="birthplace" value="${player.birthplace}">
                        </div>
                        <div class="form-group">
                            <label>Career:</label>
                            <textarea name="career">${player.career}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Number of Matches:</label>
                            <input type="number" name="matches" value="${player.matches}">
                        </div>
                        <div class="form-group">
                            <label>Score:</label>
                            <input type="number" name="score" value="${player.score}">
                        </div>
                        <div class="form-group">
                            <label>Fifties:</label>
                            <input type="number" name="fifties" value="${player.fifties}">
                        </div>
                        <div class="form-group">
                            <label>Centuries:</label>
                            <input type="number" name="centuries" value="${player.centuries}">
                        </div>
                        <div class="form-group">
                            <label>Wickets:</label>
                            <input type="number" name="wickets" value="${player.wickets}">
                        </div>
                        <div class="form-group">
                            <label>Average:</label>
                            <input type="number" step="0.01" name="average" value="${player.average}">
                        </div>
                        <button type="submit" class="submit-btn">Update</button>
                    </form>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        res.status(500).send('<h3 style="color:red;">Error loading player data.</h3>');
    }
});


router.post('/update/player', async (req, res) => {
    try {
        const { id, name, dob, photo, birthplace, career, matches, score, fifties, centuries, wickets, average } = req.body;

        const player = await Cricket.findByPk(id);
        if (!player) {
            return res.send('<h3 style="color:red;">Player not found.</h3>');
        }

        await Cricket.update(
            { name, dob, photo, birthplace, career, matches, score, fifties, centuries, wickets, average },
            { where: { id } }
        );

        res.redirect(`/search/player?name=${encodeURIComponent(name)}`);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).send('<h3 style="color:red;">Error updating player data.</h3>');
    }
});

module.exports = router;