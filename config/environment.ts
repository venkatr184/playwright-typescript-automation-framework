import dotenv from 'dotenv';

dotenv.config({
  path: process.env.ENV_FILE ?? '.env',
  quiet: true,
});

const baseUrl = process.env.BASE_URL;
const apiBaseUrl = process.env.API_BASE_URL;

if (!baseUrl) {
  throw new Error(
    'BASE_URL is required. Define it in .env locally or as a GitHub Actions variable.',
  );
}

if (!apiBaseUrl) {
  throw new Error(
    'API_BASE_URL is required. Define it in .env locally or as a GitHub Actions variable.',
  );
}

/*
function getRequiredVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Required environment variable "${name}" is missing.`);
  }

  return value;
}
*/

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
  baseUrl,
  apiBaseUrl,
  // baseUrl: getRequiredVariable('BASE_URL'),
  // apiBaseUrl: getRequiredVariable('API_BASE_URL'),
  defaultTimeout: getNumberVariable('DEFAULT_TIMEOUT', 30_000),
  expectTimeout: getNumberVariable('EXPECT_TIMEOUT', 10_000),
};
