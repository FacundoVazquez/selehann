import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { Role } from 'src/domain/schemas/users/role.enum';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  readonly pageSize: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  readonly currentPage: number;
}

export class FindManyUserDto extends PaginationDto {
  @IsOptional()
  @IsEnum(Role)
  readonly role: Role;
}
