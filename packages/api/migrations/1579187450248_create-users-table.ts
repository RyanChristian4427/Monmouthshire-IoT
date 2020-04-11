/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('users', {
        id: 'id',
        first_name: {
            type: 'TEXT',
            notNull: true,
        },
        last_name: {
            type: 'TEXT',
            notNull: true,
        },
        email: {
            type: 'TEXT',
            notNull: true,
            unique: true,
        },
        hashed_password: {
            type: 'TEXT',
            notNull: true,
        },
    });
    pgm.sql(`INSERT INTO users(first_name, last_name, email, hashed_password)
        VALUES ('smoke', 'test', 'smoketest@example.com', '$2b$12$dNetpytUYbAg0Yud55CB.OIIGNACrIPpxZAW4G8md9eman7qdawz2');
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('users');
}
