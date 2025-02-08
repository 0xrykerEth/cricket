const express = require('express');
const router = express.Router();
const Cricket = require('../models/data')

router.get('/search', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Find Player</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f4f4f4;
                    flex-direction: column;
                }
                .container {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    width: 300px;
                    text-align: center;
                }
                .form-group {
                    margin-bottom: 10px;
                }
                .form-group input {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                .submit-btn {
                    background-color: blue;
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
                <h2>Find Player</h2>
                <form action="/search/player" method="GET">
                    <div class="form-group">
                        <input type="text" name="name" placeholder="Enter player name" required>
                    </div>
                    <button type="submit" class="submit-btn">Search</button>
                </form>
            </div>
        </body>
        </html>
    `);
});
router.get('/search/player', async (req, res) => {
    try {
        const playerName = req.query.name;
        if (!playerName) {
            return res.send('<h3 style="color:red;">Please enter a player name.</h3>');
        }

        const player = await Cricket.findOne({ where: { name: playerName } });
        if (!player) {
            return res.send('<h3 style="color:red;">Player not found.</h3>');
        }

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Player Details</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background-color: #f4f4f4;
                        flex-direction: column;
                    }
                    .container {
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        width: 300px;
                        text-align: center;
                    }
                    img {
                        width: 100%;
                        border-radius: 5px;
                        margin-top: 10px;
                    }
                    .edit-btn {
                        margin-top: 10px;
                        padding: 8px;
                        background-color: orange;
                        border: none;
                        color: white;
                        cursor: pointer;
                        border-radius: 4px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>${player.name}</h2>
                    <p><strong>Date of Birth:</strong> ${new Date(player.dob).toLocaleDateString()}</p>
                    <p><strong>Birthplace:</strong> ${player.birthplace}</p>
                    <p><strong>Matches:</strong> ${player.matches}</p>
                    <p><strong>Score:</strong> ${player.score}</p>
                    <p><strong>Fifties:</strong> ${player.fifties}</p>
                    <p><strong>Centuries:</strong> ${player.centuries}</p>
                    <p><strong>Wickets:</strong> ${player.wickets}</p>
                    <p><strong>Average:</strong> ${player.average}</p>
                    <img src="${player.photo}" alt="Player Photo">

                    <form action="/update" method="GET">
                        <input type="hidden" name="id" value="${player.id}">
                        <button type="submit" class="edit-btn">Edit</button>
                    </form>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        res.status(500).send('<h3 style="color:red;">Error fetching player data.</h3>');
    }
});

module.exports = router;
