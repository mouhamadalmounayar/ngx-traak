export class ConfigurationMissingException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationMissingException";
  }
}

export class ConfigurationParameterMissing extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationParameterMissing";
  }
}

export const CONFIGURATION_MISSING = "Configuration is missing.";
export const MISSING_PARAM = (param: string) => `Missing parameter: ${param}`;
