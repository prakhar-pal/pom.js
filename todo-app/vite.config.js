import path from "path";
import { defineConfig } from "vite";
export default defineConfig(config => {
    console.log("vite config:", config);
    return {
        resolve: {
            alias: config.mode === "development" ? {
                "@lawki/pom.js" : path.join(__dirname, '../lib/pom.ts')
            } : null
        }
    };
});