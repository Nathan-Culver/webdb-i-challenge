const express = require('express');

const db = require('./data/accounts-model');

const server = express();

server.use(express.json());

 server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda webdb-i-challenge!</h2>
      <p>Welcome to the webdb-i-challenge!</p>
    `);
  });

server.get('/api/budget', async (req, res) => {
    try {
      const budget = await db.find();
      res.status(200).json(budget);
    } catch (error) {
      res.status(500).json({
        message: 'Error: Cannot retrieve the budgets',
      });
    }
});

server.get('/api/budget/:id', async (req, res) => {
    const { id } = req.params
    try {
      const budget = await db.findById(id);
      res.status(200).json(budget);
    } catch (error) {
      res.status(500).json({
        message: 'Error: Cannot retrieve the budget',
      });
    }
});

server.post('/api/budget', async (req, res) => {
    try {
      const account = await db.add(req.body);
      res.status(201).json(account);
    } catch (error) {
      res.status(500).json({
        message: 'Error: Cannot retrieve the account',
      });
    }
});

server.put('/api/budget/:id', async (req, res) => {
    const { id } = req.params
    try {
      const account = await db.update(id, req.body);
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: 'The account could not be found' });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error: Cannot retrieve the account',
      });
    }
});

module.exports = server;