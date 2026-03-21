const mysql = require('mysql2/promise');

async function initDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'jaikeerthi07a',
    });

    console.log('Connected to MySQL server. Creating database if not exists...');
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'reddot_db'}\`;`);
    console.log('Database ensured.');

    await connection.query(`USE \`${process.env.DB_NAME || 'reddot_db'}\`;`);

    console.log('Creating contacts table if not exists...');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        service VARCHAR(100),
        budget VARCHAR(100),
        timeline VARCHAR(100),
        message TEXT
      );
    `;
    await connection.query(createTableQuery);

    console.log('Contacts table ensured.');
    
    await connection.end();
    console.log('Database initialization complete.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initDB();
