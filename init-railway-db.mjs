import mysql from 'mysql2/promise';

const DATABASE_URL = 'mysql://root:GdipoPJZDpaZhwxCyItvzQlxXyDiKqUS@mainline.proxy.rlwy.net:11172/railway';

async function initDatabase() {
  console.log('Connecting to Railway MySQL...');
  
  const connection = await mysql.createConnection(DATABASE_URL);
  
  console.log('Connected! Creating tables...');

  // Create users table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(320) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL DEFAULT '',
      name TEXT,
      phone VARCHAR(20),
      date_of_birth TIMESTAMP NULL,
      state VARCHAR(100),
      city VARCHAR(100),
      is_verified BOOLEAN NOT NULL DEFAULT FALSE,
      is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
      role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      last_signed_in TIMESTAMP NULL
    )
  `);
  console.log('✓ Created users table');

  // Create sessions table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      token VARCHAR(500) NOT NULL UNIQUE,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  console.log('✓ Created sessions table');

  // Create password_reset_tokens table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      token VARCHAR(255) NOT NULL UNIQUE,
      expires_at TIMESTAMP NOT NULL,
      used_at TIMESTAMP NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  console.log('✓ Created password_reset_tokens table');

  // Create fantasy_teams table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS fantasy_teams (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      contest_id INT NULL,
      api_match_id VARCHAR(100) NOT NULL,
      match_name VARCHAR(255),
      team_name VARCHAR(100) NOT NULL,
      captain_player_id VARCHAR(100),
      vice_captain_player_id VARCHAR(100),
      total_points INT DEFAULT 0,
      \`rank\` INT NULL,
      status ENUM('draft', 'submitted', 'locked') NOT NULL DEFAULT 'draft',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  console.log('✓ Created fantasy_teams table');

  // Create player_selections table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS player_selections (
      id INT AUTO_INCREMENT PRIMARY KEY,
      team_id INT NOT NULL,
      player_id VARCHAR(100) NOT NULL,
      player_name VARCHAR(255) NOT NULL,
      player_role VARCHAR(50),
      team_name VARCHAR(100),
      is_captain BOOLEAN NOT NULL DEFAULT FALSE,
      is_vice_captain BOOLEAN NOT NULL DEFAULT FALSE,
      points INT DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (team_id) REFERENCES fantasy_teams(id) ON DELETE CASCADE
    )
  `);
  console.log('✓ Created player_selections table');

  // Verify tables
  const [tables] = await connection.execute('SHOW TABLES');
  console.log('\nTables in database:');
  tables.forEach(row => {
    console.log('  -', Object.values(row)[0]);
  });

  await connection.end();
  console.log('\n✓ Database initialization complete!');
}

initDatabase().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
