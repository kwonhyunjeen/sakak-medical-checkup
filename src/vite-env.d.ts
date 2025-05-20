/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_CANDIY_API_KEY: string;
  readonly VITE_MOCK_API: "on" | "off";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
