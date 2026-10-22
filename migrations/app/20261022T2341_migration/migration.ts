#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/8f8be4a0605b9b519d229768b60e69162324d40b5eef2125f2c3c19621d79da8/contract';
import endContract from '../../snapshots/8f8be4a0605b9b519d229768b60e69162324d40b5eef2125f2c3c19621d79da8/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/f10d56605f7bd3b6674be74c1fcf8715c0394ab88424ace21c4e8e88b7ff1497/contract';
import startContract from '../../snapshots/f10d56605f7bd3b6674be74c1fcf8715c0394ab88424ace21c4e8e88b7ff1497/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'orders', table: 'Outbox' }),
      this.createTable({
        schema: 'orders',
        table: 'outbox',
        columns: [
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('event_id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('order_id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('published_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'orders',
        table: 'outbox',
        index: 'outbox_order_id_idx_39ad19ad',
        columns: ['order_id'],
      }),
      this.addForeignKey({
        schema: 'orders',
        table: 'outbox',
        foreignKey: {
          name: 'outbox_order_id_fkey',
          columns: ['order_id'],
          references: { schema: 'orders', table: 'orders', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
