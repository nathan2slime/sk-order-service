#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/31dcb3ca53fa5103e271eeec203b6e5a0142b5001ae1651531d1ba7d11730366/contract';
import endContract from '../../snapshots/31dcb3ca53fa5103e271eeec203b6e5a0142b5001ae1651531d1ba7d11730366/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'orders' }),
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'orders',
        table: 'order_itens',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('orderId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('price', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('productId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('quantity', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'orders',
        table: 'orders',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updateAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'orders_status_check_da4228e5',
            sql`"status" IN ('PENDING', 'PROCESSING', 'FAILED', 'CANCELLED', 'CONFIRMED', 'COMPLETED')`,
          ),
        ],
      }),
      this.createIndex({
        schema: 'orders',
        table: 'order_itens',
        index: 'order_itens_orderId_idx_d284871b',
        columns: ['orderId'],
      }),
      this.addForeignKey({
        schema: 'orders',
        table: 'order_itens',
        foreignKey: {
          name: 'order_itens_orderId_fkey',
          columns: ['orderId'],
          references: { schema: 'orders', table: 'orders', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
