import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "http://localhost:3000/api/docs-json",
    },
    output: {
      mode: "tags-split",
      target: "src/shared/api/generated/endpoints.ts",
      schemas: "src/shared/api/generated/models",
      client: "fetch",
      baseUrl: "http://localhost:3000",
      clean: true,
      prettier: false,
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
    },
  },
});
