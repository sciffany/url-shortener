const express = require('express');
const router = express.Router();

const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

// @route POST /api/url/shorten
// @desc Create short URL
router.post('/shorten', async (req, res) => {
    console.log("here")
    const { longUrl } = req.body
    const baseUrl = config.get('baseUrl');

    // Check valid base url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL');
    }

    // Create url code
    const urlCode = shortid.generate();

    // Check long url
    if (validUrl.isUri(longUrl)) {
        try {

            // Check if long url is in database
            let url = await Url.findOne({longUrl})

            if (url) {
                res.json(url);
            } else {

                // Create new long and short url and save to database
                const shortUrl = baseUrl + '/' + urlCode;

                const url = new Url({
                    longUrl, shortUrl, urlCode,
                    date: new Date()
                });

                await url.save();

                res.json(url);
            }
        } catch (err) {

            console.error(err);
            res.status(500).json('Server error');
        }
    } else {

        // If long url is invalid, server error
        res.status(401).json('Invalid long url');
    }
});

module.exports = router;
