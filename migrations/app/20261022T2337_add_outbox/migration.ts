#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/47131bc5bbe56a8f3198c7ed1698fec817646d39c0116c6a1da07b0d815472fb/contract';
import startContract from '../../snapshots/47131bc5bbe56a8f3198c7ed1698fec817646d39c0116c6a1da07b0d815472fb/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/f10d56605f7bd3b6674be74c1fcf8715c0394ab88424ace21c4e8e88b7ff1497/contract';
import endContract from '../../snapshots/f10d56605f7bd3b6674be74c1fcf8715c0394ab88424ace21c4e8e88b7ff1497/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropConstraint({
        schema: 'orders',
        table: 'order_itens',
        constraint: 'order_itens_orderId_fkey',
        kind: 'foreignKey',
      }),
      this.dropIndex({
        schema: 'orders',
        table: 'order_itens',
        index: 'order_itens_orderId_idx_d284871b',
      }),
      this.dropColumn({ schema: 'orders', table: 'order_itens', column: 'orderId' }),
      this.dropColumn({ schema: 'orders', table: 'orders', column: 'createdAt' }),
      this.dropColumn({ schema: 'orders', table: 'orders', column: 'updateAt' }),
      this.createTable({
        schema: 'orders',
        table: 'Outbox',
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
      this.addColumn({
        schema: 'orders',
        table: 'orders',
        column: col('created_at', 'timestamptz', {
          notNull: true,
          default: fn(sql`now()`),
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.addRequiredColumnToEmptyTable({
        schema: 'orders',
        table: 'order_itens',
        column: 'order_id',
        type: 'text',
      }),
      this.addColumnWithTemporaryDefault({
        schema: 'orders',
        table: 'orders',
        column: 'updated_at',
        type: 'timestamptz',
        temporaryDefault: sql`'epoch'`,
      }),
      this.createIndex({
        schema: 'orders',
        table: 'Outbox',
        index: 'Outbox_order_id_idx_39ad19ad',
        columns: ['order_id'],
      }),
      this.createIndex({
        schema: 'orders',
        table: 'order_itens',
        index: 'order_itens_order_id_idx_39ad19ad',
        columns: ['order_id'],
      }),
      this.addForeignKey({
        schema: 'orders',
        table: 'Outbox',
        foreignKey: {
          name: 'Outbox_order_id_fkey',
          columns: ['order_id'],
          references: { schema: 'orders', table: 'orders', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'orders',
        table: 'order_itens',
        foreignKey: {
          name: 'order_itens_order_id_fkey',
          columns: ['order_id'],
          references: { schema: 'orders', table: 'orders', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
