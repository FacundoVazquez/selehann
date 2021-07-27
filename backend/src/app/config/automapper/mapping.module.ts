import { classes } from '@automapper/classes';
import { AutomapperModule as AutomapperModuleNest } from '@automapper/nestjs';

export const AutomapperModule = AutomapperModuleNest.forRoot({
  options: [{ name: '', pluginInitializer: classes }],
  singular: true,
});
