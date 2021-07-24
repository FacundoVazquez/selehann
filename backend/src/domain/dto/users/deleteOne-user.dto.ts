import { IsNotEmpty } from 'class-validator';

export class DeleteOneUserDto {
  @IsNotEmpty()
  readonly username: string;
}
