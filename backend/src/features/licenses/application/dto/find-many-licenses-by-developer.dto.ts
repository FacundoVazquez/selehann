import { IsString } from 'class-validator';

export class FindManyLicensesByDeveloper {
  @IsString()
  id: string;
}
