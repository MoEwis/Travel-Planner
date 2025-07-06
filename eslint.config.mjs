// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // ✅ إضافة إعدادات Next.js و TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ✅ قواعد مخصصة لتعطيل تحذيرات مزعجة
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // ✅ تجاهل ملفات prisma وملفات generated بالكامل
  {
    ignores: ["prisma/**", "src/generated/**"],
  },
];
