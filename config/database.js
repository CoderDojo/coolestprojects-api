var databaseConfig = { 
    user: process.env['DB_USER'] || "",
    password: process.env['DB_PASSWORD'] || "",
    database: process.env['DB_NAME'] || "coolestprojectsapp",
    host: process.env['DB_HOST'] || "localhost",
    port: 3306
};

module.exports = databaseConfig;