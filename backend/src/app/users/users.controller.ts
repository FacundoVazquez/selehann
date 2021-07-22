import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  // constructor(private readonly leadService: LeadService) {}

  @Get()
  findAll(): number {
    console.log(process.env);
    return 1;
  }
}
