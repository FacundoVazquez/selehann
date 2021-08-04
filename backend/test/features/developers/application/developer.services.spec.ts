import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AutomapperModule } from 'src/app/config/automapper/mapping.module';
import { hashPassword } from 'src/app/config/crypto';
import { AssetMapping } from 'src/features/assets/application/mapping/asset.mapping';
import { AuthService } from 'src/features/auth/application/auth.services';
import { LoginDto } from 'src/features/auth/application/dto';
import { CredentialsNotValidException } from 'src/features/auth/domain/auth.exceptions';
import { DeveloperService } from 'src/features/developers/application/developer.services';
import { CreateDeveloperDto, DeveloperDto } from 'src/features/developers/application/dto';
import { DeveloperMapping } from 'src/features/developers/application/mapping/developer.mapping';
import { DeveloperProfile } from 'src/features/developers/application/mapping/developer.profile';
import { CreateDeveloperException } from 'src/features/developers/domain/developer.exceptions';
import { Developer } from 'src/features/developers/domain/entities/developer.entity';
import { LicenseMapping } from 'src/features/licenses/application/mapping/licenses.mapping';
import { User } from 'src/features/users/domain/entities/user.entity';
import { EntityManager } from 'typeorm';

describe('Developer service', () => {
  let developerService: DeveloperService;
  let entityManager: EntityManager;

  const mockDeveloperMapping = () => ({
    getDeveloperDto: jest.fn((): Partial<DeveloperDto> => {
      return {
        id: '1',
        fullname: 'fullname',
        active: true,
        assetIds: [],
        licenseIds: [],
      };
    }),
  });

  const mockEntityManager = () => ({
    create: jest.fn((): Partial<Developer> => {
      return {
        id: '1',
        fullname: 'fullname',
        active: true,
      };
    }),

    save: jest.fn((): Partial<Developer> => {
      return {
        id: '1',
        fullname: 'fullname',
        active: true,
        assets: [],
        licenses: [],
      };
    }),
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        DeveloperService,
        AssetMapping,
        LicenseMapping,
        {
          provide: DeveloperMapping,
          useFactory: mockDeveloperMapping,
        },
        {
          provide: EntityManager,
          useFactory: mockEntityManager,
        },
      ],
    }).compile();

    developerService = moduleRef.get<DeveloperService>(DeveloperService);
    entityManager = moduleRef.get<EntityManager>(EntityManager);
  });

  describe('Developer Creation', () => {
    it('should create the developer, then should return an DeveloperDto', async () => {
      const createDeveloperDto: CreateDeveloperDto = {
        fullname: 'fullname',
      };

      const developerDto: DeveloperDto = {
        id: '1',
        fullname: 'fullname',
        active: true,
        assetIds: [],
        licenseIds: [],
      };

      await expect(developerService.createDeveloper(createDeveloperDto)).resolves.toMatchObject(developerDto);
    });
  });
});
