/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('rooms', {
        id: 'id',
        user_id: {
            type: 'INTEGER',
            notNull: true,
            references: 'users(id)',
        },
        room_name: {
            type: 'TEXT',
            notNull: true,
        },
        room_type: {
            type: 'TEXT',
            notNull: true,
        },
    });
    pgm.createTable('sensor_data', {
        id: 'id',
        room_id: {
            type: 'INTEGER',
            notNull: true,
            references: 'rooms(id)',
        },
        value: {
            type: 'INTEGER',
            notNull: true,
        },
        type: {
            type: 'TEXT',
            notNull: true,
        },
    });

    pgm.sql(`INSERT INTO rooms(user_id, room_name, room_type)
        VALUES (1, 'Master Bedroom', 'Bedroom')`);

    pgm.sql(`INSERT INTO sensor_data(room_id, value, type)
        VALUES (1, 72, 'Temperature')`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('sensor_data');
    pgm.dropTable('rooms');
}
