const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const router = express.Router();
const Cricket = require('../models/data')

router.get('/home',(req,res) => {
    res.sendFile(path.join(__dirname,'../','views','index.html'))
})


router.post('/home', async (req, res) => {
    try {
        const { name, dob, photo, birthplace, career, matches, score, fifties, centuries, wickets, average } = req.body;

        const newPlayer = await Cricket.create({
            name,
            dob,
            photo,
            birthplace,
            career,
            matches,
            score,
            fifties,
            centuries,
            wickets,
            average
        });

        res.status(201).json({ message: 'Player added successfully!', player: newPlayer });
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;