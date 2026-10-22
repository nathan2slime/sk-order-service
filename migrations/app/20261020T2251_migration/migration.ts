#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/31dcb3ca53fa5103e271eeec203b6e5a0142b5001ae1651531d1ba7d11730366/contract';
import startContract from '../../snapshots/31dcb3ca53fa5103e271eeec203b6e5a0142b5001ae1651531d1ba7d11730366/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/47131bc5bbe56a8f3198c7ed1698fec817646d39c0116c6a1da07b0d815472fb/contract';
import endContract from '../../snapshots/47131bc5bbe56a8f3198c7ed1698fec817646d39c0116c6a1da07b0d815472fb/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      ...this.renameColumn({
        schema: 'orders',
        table: 'order_itens',
        column: 'productId',
        to: 'skuId',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
