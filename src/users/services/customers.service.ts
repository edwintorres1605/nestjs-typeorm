import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../../users/entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOneBy({ id: id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(data);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOneBy({ id: id });
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  delete(id: number) {
    return this.customerRepo.delete(id);
  }

  /* private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Nicolas',
      lastName: 'Molina',
      phone: '3111111212',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...data,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, changes: UpdateCustomerDto) {
    const customer = this.findOne(id);
    const index = this.customers.findIndex((item) => item.id === id);
    this.customers[index] = {
      ...customer,
      ...changes,
    };
    return this.customers[index];
  }

  remove(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  } */
}
