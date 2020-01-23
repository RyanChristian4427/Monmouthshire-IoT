/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addColumn('users', {
        refresh_token: {
            type: 'UUID',
            notNull: false,
        },
    });
    pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    pgm.sql(`INSERT INTO users(first_name, last_name, email, hashed_password, refresh_token)
        VALUES ('smoke', 'test', 'smoketesthome@example.com', '$2b$12$dNetpytUYbAg0Yud55CB.OIIGNACrIPpxZAW4G8md9eman7qdawz2',
                   uuid_generate_v1())
        `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropColumn('users', ['refresh_token']);
}
