const router = require('express').Router();
const { Order, User } = require('../db/')

// get --> .../ api / user /
router.get('/', async (req, res, next) => {
	try {
		let user = await User.findAll();
		res.send(user);
	} catch (error) {
		next(error);
	}
});

// get --> .../ api / user / :userId
router.get('/:userId', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.userId, {
			include: [Order]
		});
		if (!user) {
			res.sendStatus(404).end();
		}
		res.json(user);
	} catch (error) {
		next(error);
	}
});

// post --> .../ api / user / newuser
router.post('/newUser', async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		res.sendStatus(204).json(user);
	} catch (error) {
		next(error);
	}
});

// put --> .../ api / user / :userId
router.put('/:userId', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.userId, { include: [Robot] });
		if (!user) {
			res.sendStatus(404).end();
		}
		await User.update(req.body);
		res.status(202).json(user);
	} catch (error) {
		next(error);
	}
});

// delete --> .../ api / user / :userId
router.delete('/:userId', async (req, res, next) => {
	try {
		let user = await User.destroy({
			where: {
				id: req.params.userId
			}
		});
		if (!user) {
			res.sendStatus(404).end();
		}
		res.status(204).end();
	} catch (error) {
		next(error);
	}
});
module.exports = router;
