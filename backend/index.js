// Load secret keys from .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Supabase using keys from .env
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const PORT = process.env.PORT || 3000;

// Route 1: Get all tour packages
app.get('/packages', async (req, res) => {
  const { data, error } = await supabase.from('packages').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Route 2: Get one tour package by ID
app.get('/packages/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('id', req.params.id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

// Route 3: Create a new tour package
app.post('/packages', async (req, res) => {
  const { name, description, price, duration_days, image_url } = req.body;
  const { data, error } = await supabase
    .from('packages')
    .insert([{ name, description, price, duration_days, image_url }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// Route 4: Update an existing tour package
app.put('/packages/:id', async (req, res) => {
  const { name, description, price, duration_days, image_url } = req.body;
  const { data, error } = await supabase
    .from('packages')
    .update({ name, description, price, duration_days, image_url })
    .eq('id', req.params.id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// Route 5: Delete a tour package
app.delete('/packages/:id', async (req, res) => {
  const { error } = await supabase
    .from('packages')
    .delete()
    .eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Package deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
