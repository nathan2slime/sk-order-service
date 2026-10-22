import { Body, Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

import { CreateOrderDto } from '~/app/order/order.dto';
import { OrderService } from '~/app/order/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('create')
  async create(@Res() res: Response, @Body() body: CreateOrderDto) {
    const item = await this.orderService.create(body);

    res.status(HttpStatus.CREATED).json(item);
  }
}
