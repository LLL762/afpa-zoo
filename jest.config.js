/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./src/test/init/EnvVars.ts"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
