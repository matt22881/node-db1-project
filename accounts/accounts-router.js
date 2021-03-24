const express = require('express')
const Accounts = require('./accounts-model')
const ExpressError = require('./../api/express-error');

const router = express.Router()

async function checkId(req, res, next) {
    try {
        const account = await Accounts.getById(req.params.id);
        if (account) {
            req.account = account;
            next()
        } else {
            const err = new ExpressError('id not found', 404);
            next(err);
        }
    } 
    catch (err) {
        next(new ExpressError(err, 500));
    }
  
  }

function checkPayload(req, res, next) {
    const newAccount = req.body;
    if (!newAccount.name && !newAccount.budget) {
        const err = new ExpressError('body must include name, budget, or both', 400);
        next(err);
    } else {
        next()
    }
}

router.get('/', async (req, res, next) => {
    try {
        res.json(await Accounts.get());
    } 
    catch (err) {
        next(new ExpressError(err, 500));
    }
})

router.get('/:id', checkId, (req, res) => {
    res.status(200).json(req.account)
})

router.post('/', checkPayload, async (req, res, next) => {
    try {
        const data = await Accounts.create(req.body);
        res.status(201).json(data);
    } 
    catch (err) {
        next(new ExpressError(err, 500));
    }
})

router.put('/:id', checkPayload, checkId, async (req, res, next) => {
    try {
        const data = await Accounts.update(req.params.id, req.body)
        res.json(data)
    } 
    catch (err) {
        next(new ExpressError(err, 500));
    }
})

router.delete('/:id', checkId, async (req, res, next) => {
    try {
        await Accounts.remove(req.params.id);
        res.status(204).send("");
    } 
    catch (err) {
        next(new ExpressError(err, 500));
    }
})

router.use((err, req, res) => {
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({ message: err.message, stack: err.stack })
})

module.exports = router