const EconomyNews = require('../models/economyNews');
const PoliticNews = require('../models/politicsNews');


exports.getEconomyNews = async (req, res, next) => {
    const results = +req.params.results || 3;

    EconomyNews.find().sort({date: -1}).limit(results)
        .then(news => res.status(200).json(news))
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.getPoliticNews = async (req, res, next) => {
    const results = +req.params.results || 3;

    PoliticNews.find().sort({date: -1}).limit(results)
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

exports.getEconomyPaginated = async (req, res, next) => {

    const resultPerPage = +req.params.numberOfResults;
    const page = +req.params.page || 1;
    const topResults = +req.params.topResults || 1;

    try {
        const foundNews = await EconomyNews.find()
            .sort({date: -1})
            .skip((resultPerPage * page) - resultPerPage + topResults)
            .limit(resultPerPage);
        const totalNews = await EconomyNews.count() - topResults;
        const result = {
            'news': foundNews,
            'totalNews': totalNews,
            'currentPage': page,
            'pages': Math.ceil(totalNews / resultPerPage)
        };
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getPoliticPaginated = async (req, res, next) => {

    const resultPerPage = +req.params.numberOfResults;
    const page = +req.params.page || 1;
    const topResults = +req.params.topResults || 1;

    try {
        const foundNews = await PoliticNews.find()
            .sort({date: -1})
            .skip((resultPerPage * page) - resultPerPage + topResults)
            .limit(resultPerPage);
        const totalNews = await PoliticNews.count() - topResults;
        const result = {
            'news': foundNews,
            'totalNews': totalNews,
            'currentPage': page,
            'pages': Math.ceil(totalNews / resultPerPage)
        };
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
