const sqlite3 = require('sqlite3').verbose();

// Путь к файлу базы данных SQLite
const DB_PATH = './data/database.db';
function connectDatabase(){
  
}
function createDatabase() {
    const query=`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS Workers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      firstname TEXT NOT NULL,
      lastname TEXT NOT NULL, 
      phone TEXT NOT NULL,
      age INTEGER NOT NULL,
      email TEXT
      FOREIGN KEY (user_id) REFERENCES Users (id)
    );
    
    CREATE TABLE IF NOT EXISTS Clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstname TEXT NOT NULL,
      lastname TEXT NOT NULL, 
      phone TEXT NOT NULL,
      age INTEGER NOT NULL,
      email TEXT
    );
    
    CREATE TABLE IF NOT EXISTS CosmetologyServices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      photo TEXT,
      price REAL NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS HairdressingServices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT NOT NULL,
      photo TEXT,
      gender TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS Cosmetology_Receipts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cosmetology_id INTEGER,
      FOREIGN KEY (cosmetology_receipt_id) REFERENCES CosmetologyServicesReceipts (id),
      FOREIGN KEY (cosmetology_id) REFERENCES CosmetologyServices (id)
    );
    
    CREATE TABLE IF NOT EXISTS Hairdressing_Receipts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hairdressing_id INTEGER,
      FOREIGN KEY (hairdressing_receipt_id) REFERENCES HairdressingServicesReceipts (id),
      FOREIGN KEY (hairdressing_id) REFERENCES HairdressingServices (id)
    );
    
    CREATE TABLE IF NOT EXISTS CosmetologyServicesReceipts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cosmetology_id INTEGER,
      date_time TEXT NOT NULL,
      total_cost REAL NOT NULL,
      client_id INTEGER,
      FOREIGN KEY (client_id) REFERENCES Clients(id)
    );
    
    CREATE TABLE IF NOT EXISTS HairdressingServicesReceipts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hairdressing_id INTEGER,
      date_time TEXT NOT NULL,
      total_cost REAL NOT NULL,
      client_id INTEGER,
      FOREIGN KEY (client_id) REFERENCES Clients(id)
    );
    
    CREATE TABLE IF NOT EXISTS Registr_Hairdressing_Receipts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registr_id INTEGER,
      hairdressing_receipt_id INTEGER,
      FOREIGN KEY (registr_id) REFERENCES Registr (id),
      FOREIGN KEY (hairdressing_receipt_id) REFERENCES CosmetologyServicesReceipts (id)
    );
    CREATE TABLE IF NOT EXISTS Registr_Cosmetology_Receipts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registr_id INTEGER,
      cosmetology_receipt_id INTEGER,
      FOREIGN KEY (registr_id) REFERENCES Registr (id),
      FOREIGN KEY (cosmetology_receipt_id) REFERENCES CosmetologyServicesReceipts (id)
    );
    CREATE TABLE IF NOT EXISTS Registr (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date_start TEXT NOT NULL,
      date_end TEXT NOT NULL,
      total_cost REAL NOT NULL
    );
    `
    return executeQuery(query)
  }
// Функция для выполнения запросов к базе данных SQLite
function executeQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
      db.close();
    });
  });
}
function insertData(table,parameters) {
    let columns = Object.keys(parameters).join(', ')
    let values = Object.values(parameters)
    let placeholders = values.map(() => '?').join(', ')
    
    let query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    return executeQuery(query,values);
  }
  
  function updateData(table,parameters,condition) {
    const sets = Object.keys(parameters).map(column => `${column} = ?`).join(', ');
    const values = Object.values(parameters);
    const query = `UPDATE ${table} SET ${sets} WHERE ${condition}`
    return executeQuery(query,values);
  }
  
  // Функция для удаления данных из таблицы
  function deleteData(table,condition) {

    return executeQuery(query);
  }
  
  // Функция для выборки данных из таблицы
  function selectData(table,columns='*',condition='') {
    const query= `SELECT ${columns} FROM ${table} ${condition ?`WHERE ${condition}`:''}`
    return executeQuery('SELECT * FROM users');
  }
  
  module.exports = {
    createDatabase,
    insertData,
    updateData,
    deleteData,
    selectData,
  };