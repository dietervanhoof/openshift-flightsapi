const router = require('express').Router();
const cmdargs = require('../../../utils/cmdargs');
const databaseService = new (require('../../../services/database.service'))(cmdargs.parseArguments());

router.get('/', async function(req, res, next) {
    return res.json(await databaseService.getFlights());
});

router.get('/:flightId', async function(req, res, next) {
    const flightId = req.params.flightId;
    return res.json(await databaseService.getFlight(flightId));
});

router.post('/', async function(req, res, next) {
    // TODO: Validate the definition before adding
    try {
        const result = await databaseService.createNewFlight(req.body);
        return res.status(201).json({ outcome: 'created' });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: e });
    }
});

module.exports = router;
