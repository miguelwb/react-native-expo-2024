export async function initializeDatabase(database) {
    try {
        await database.execAsync(`
            DROP TABLE IF EXISTS bicycles;
            
            DROP TABLE IF EXISTS users;

            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                email TEXT NOT NULL UNIQUE,
                senha TEXT NOT NULL DEFAULT 'A123456a!',
                role TEXT NOT NULL DEFAULT 'USER',
                created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATE
            );

            CREATE TABLE IF NOT EXISTS bicycles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                user_nome TEXT,
                foto IMAGE,
                valor_estimado REAL,
                marca TEXT,
                modelo TEXT,
                data_fabricacao TEXT,
                categoria TEXT,
                created_at DATE DEFAULT CURRENT_TIMESTAMP,
                update_at DATE,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (user_nome) REFERENCES users(nome)
            );

            CREATE INDEX IF NOT EXISTS idx_users_nome ON bicycles (nome);

            INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Super','super@email.com','A123456a!','SUPER');
            INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Admin','admin@email.com','A123456a!','ADMIN');
            INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('User','user@email.com','A123456a!','USER');

            `);
    } catch (error) {
        console.log(error);
    }
}