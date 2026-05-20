// On Railway (production), env vars come from Railway dashboard directly.
// Locally, load them from .env file.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Allow requests only from known frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://tour-package-manager.vercel.app',
  'https://tour-package-manager-j21f9gw2o-joyaltitus-projects.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow server-to-server requests (no origin) and listed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

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
  console.log(`SUPABASE_URL loaded: ${process.env.SUPABASE_URL ? 'YES' : 'NO'}`);
});
