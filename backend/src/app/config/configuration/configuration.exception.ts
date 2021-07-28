const CONFIGURATION_ERROR = 'ConfigurationError';

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = CONFIGURATION_ERROR;
  }
}
