import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private service: InventoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new inventory record' })
  @ApiBody({ type: CreateInventoryDto })
  @ApiResponse({ status: 201, description: 'Inventory created successfully' })
  create(@Body() body: CreateInventoryDto) {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all inventory records' })
  @ApiResponse({ status: 200, description: 'List of inventory' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get inventory by ID' })
  @ApiParam({ name: 'id', description: 'Inventory ID' })
  @ApiResponse({ status: 200, description: 'Inventory found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an inventory record' })
  @ApiParam({ name: 'id', description: 'Inventory ID' })
  @ApiBody({ type: UpdateInventoryDto })
  @ApiResponse({ status: 200, description: 'Inventory updated' })
  update(@Param('id') id: string, @Body() body: UpdateInventoryDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an inventory record' })
  @ApiParam({ name: 'id', description: 'Inventory ID' })
  @ApiResponse({ status: 200, description: 'Inventory deleted' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
