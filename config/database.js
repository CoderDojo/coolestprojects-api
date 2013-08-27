var databaseConfig = { 
    user: process.env['DB_USER'] || "root",
    password: process.env['DB_PASSWORD'] || "",
    database: process.env['DB_NAME'] || process.env['APP_NAME'] || "coolestprojects",
    host: process.env['DB_HOST'] || "localhost",
    port: 3306
};

module.exports = databaseConfig;