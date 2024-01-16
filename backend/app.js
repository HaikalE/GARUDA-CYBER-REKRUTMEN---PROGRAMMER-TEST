const express = require('express');
const mysql = require('mysql2/promise'); // Using mysql2 for promises support
const cors = require('cors');
const app = express();
const port = 5000;

// Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); 
const calculateExpirationDate = () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 3);
    return currentDate.toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:mm:ss'
  };
  app.get('/get-voucher/:code', async (req, res) => {
    try {
      const { code } = req.params;
  
      // Retrieve voucher from the database based on the provided code
      const [results] = await pool.query(
        'SELECT * FROM vouchers WHERE code = ?',
        [code]
      );
  
      if (results.length === 0) {
        // If no voucher is found with the provided code
        res.status(404).json({ error: 'Voucher not found' });
      } else {
        const voucher = results[0];
        res.status(200).json(voucher);

      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  app.put('/update-voucher/:code', async (req, res) => {
    try {
      const { code } = req.params;
  
      // Update the 'is_used' field in the database based on the provided code
      const [results] = await pool.query(
        'UPDATE vouchers SET is_used = ? WHERE code = ?',
        [1, code]
      );
  
      // Check if the voucher with the provided code was found and updated
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Voucher not found' });
      } else {
        res.status(200).json({ message: 'Voucher updated successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.post('/create-voucher', async (req, res) => {
    try {
      const { code} = req.body; 
  
      // Calculate expiration date
      const expiration_date = calculateExpirationDate();
  
      // Insert voucher into the database
      const [results] = await pool.query(
        'INSERT INTO vouchers (code, expiration_date) VALUES (?,  ?)',
        [ code, expiration_date]
      );
  
      const insertedVoucherId = results.insertId;
  
      res.status(201).json({ voucher_id: insertedVoucherId });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });