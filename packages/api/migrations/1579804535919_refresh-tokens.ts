/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addColumn('users', {
        refresh_token: {
            type: 'UUID',
            notNull: false,
        },
    });
    pgm.createExtension('uuid-ossp');
    pgm.sql(`INSERT INTO users(first_name, last_name, email, hashed_password, refresh_token)
                  VALUES ('smoke', 'test', 'smoketesthome@example.com', '$2b$12$dNetpytUYbAg0Yud55CB.OIIGNACrIPpxZAW4G8md9eman7qdawz2',
                    uuid_generate_v1());
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropColumn('users', ['refresh_token']);
    pgm.dropExtension('uuid-ossp');
    pgm.sql(`DELETE FROM users WHERE email = 'smoketesthome@example.com'`); // eslint-disable-line @typescript-eslint/quotes
}
