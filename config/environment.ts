import dotenv from 'dotenv';

dotenv.config({
  path: process.env.ENV_FILE ?? '.env',
});

function getRequiredVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Required environment variable "${name}" is missing.`);
  }

  return value;
}

function getNumberVariable(name: string, defaultValue: number): number {
  const rawValue = process.env[name];

  if (!rawValue) {
    return defaultValue;
  }

  const parsedValue = Number(rawValue);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Environment variable "${name}" must be a valid number.`);
  }

  return parsedValue;
}

export const environment = {
  baseUrl: getRequiredVariable('BASE_URL'),
  apiBaseUrl: getRequiredVariable('API_BASE_URL'),
  defaultTimeout: getNumberVariable('DEFAULT_TIMEOUT', 30_000),
  expectTimeout: getNumberVariable('EXPECT_TIMEOUT', 10_000),
};
