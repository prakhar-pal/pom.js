import path from "path";
export default {
    resolve: {
        alias: {
            "@lawki/pom.js": path.join(__dirname, '../lib/pom.ts')
        }
    }
}