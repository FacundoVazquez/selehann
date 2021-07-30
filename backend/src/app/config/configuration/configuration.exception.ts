const CONFIGURATION_EXCEPTION = 'ConfigurationException';

export class ConfigurationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = CONFIGURATION_EXCEPTION;
  }
}
