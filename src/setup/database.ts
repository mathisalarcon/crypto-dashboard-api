import * as mysql from "mysql2/promise";
import * as models from "../sql/models.json";

async function updateTables(connection: mysql.Connection) {
    for(let [table, columns] of Object.entries(models)) {
        let query = `CREATE TABLE IF NOT EXISTS \`${table}\` (`;
        
        for(let [column, type] of Object.entries(columns)) {
            if(column == '__add') query += type;
            else query += `${column} ${type},\n`;
        };

        if(query.endsWith(",\n")) query = query.slice(0, -2);

        query += ");";

        await connection.execute(query);
    };
};

export async function connect(): Promise<mysql.Connection> {
    if(!process.env.DB_NAME) throw new Error("Database name not found. Please set the DB_NAME environment variable.");

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME
        });
        await connection.connect();
        await updateTables(connection);
        return connection;
    } catch (err) {
        // TODO: Handle error
        if((err as any).code == 'ER_BAD_DB_ERROR') {
            const temp_connection = await mysql.createConnection({
                host: process.env.DB_HOST || "localhost",
                user: process.env.DB_USER || "root",
                password: process.env.DB_PASSWORD || "",
                database: "mysql"
            });
            await temp_connection.connect();
            await temp_connection.execute(`CREATE DATABASE \`${process.env.DB_NAME}\``);
            await temp_connection.end();
            return await connect();
        } else if((err as any).code == 'ER_ACCESS_DENIED_ERROR') {
            throw new Error("Invalid database credentials. Please check your .env file.");
        } else {
            throw err;
        }
    }
};