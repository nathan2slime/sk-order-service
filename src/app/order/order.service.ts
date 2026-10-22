import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/database/database.service';

@Injectable()
export class OrderService {
  constructor(private readonly database: DatabaseService) {}

  async create() {}
}
