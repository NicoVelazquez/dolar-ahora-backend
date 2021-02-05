const EconomyNews = require('../models/economyNews');
const PoliticNews = require('../models/politicsNews');


exports.getTopEconomy = async (req, res) => {
    EconomyNews.find().sort({date: -1}).limit(3)
        .then(news => res.status(200).json(news))
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.getTopPolitic = async (req, res) => {
    PoliticNews.find().sort({date: -1}).limit(3)
        .then(news => res.status(200).json(news))
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.addEconomy = async (req, res, next) => {
    let newsArray = req.body;
    let lastNewsIndex;


    try {
        const lastNews = await EconomyNews.findOne().sort({date: -1});
        lastNews ? lastNewsIndex = newsArray.findIndex(e => e.title === lastNews.title) : lastNewsIndex = -1;
        lastNewsIndex >= 0 ? newsArray.length = lastNewsIndex : null;

        if (newsArray.length === 0) {
            console.log('Post successful, no new economy news.');
            return res.status(200).json('Post successful, no new economy news.')
        }

        newsArray = newsArray.reverse();

        EconomyNews.insertMany(newsArray)
            .then(() => res.status(200).json('Post successful (economy).'))
            .catch(err => {
                console.log('catch then');
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    } catch (e) {
        console.log('[Error] - Error posting economy news.');
        res.status(500).json('Error posting economy news.');
    }
};

exports.addPolitic = async (req, res, next) => {
    let newsArray = req.body;
    let lastNewsIndex;

    try {
        const lastNews = await PoliticNews.findOne().sort({date: -1});
        lastNews ? lastNewsIndex = newsArray.findIndex(e => e.title === lastNews.title) : lastNewsIndex = -1;
        lastNewsIndex >= 0 ? newsArray.length = lastNewsIndex : null;

        if (newsArray.length === 0) {
            console.log('Post successful, no new politic news.');
            return res.status(200).json('Post successful, no new politic news.')
        }

        newsArray = newsArray.reverse();

        PoliticNews.insertMany(newsArray)
            .then(() => res.status(200).json('Post successful (Politic).'))
            .catch(err => {
                console.log('catch then');
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    } catch (e) {
        console.log('[Error] - Error posting politic news.');
        res.status(500).json('Error posting politic news.');
    }
};
