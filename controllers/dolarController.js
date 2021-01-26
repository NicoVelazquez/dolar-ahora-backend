const Dolar = require('../models/dolar');

exports.getAll = async (req, res) => {
    Dolar.find()
        .then(dollars => res.status(200).json(dollars))
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.update = async (req, res, next) => {
    const dolars = req.body;
    const now = new Date();

    try{
        for(let dolar of dolars){
            console.log(dolar);
            const name = dolar.name;
            const source = dolar.source;
            const editDolar = await Dolar.findOne({name: name, source: source});
            if (!editDolar) {
                console.log('No encontro dolar name.');
                throw new Error('No dollar found to edit.');
            }
            editDolar.buy = dolar.buy || 0;
            editDolar.sell = dolar.sell || 0;
            editDolar.date = now;
            editDolar.save()
                .then()
                .catch(err => {
                    console.log('catch then');
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                });
        }
        res.status(200).json('Update successful.')
    } catch (e) {
        console.log('[Error] - Error updating dollar');
        res.status(500).json('Error updating dollars.');
    }
};
