export default {
  routerOptions: {
    caseSensitive: false,
    ignoreTrailingSlash: true,
  },
  ajv: {
    customOptions: {
      coerceTypes: "array",
      removeAdditional: "all",
    },
  },
  logger: true,
};
