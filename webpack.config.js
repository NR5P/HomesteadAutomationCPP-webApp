const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/public/js/main.js",
    output: {
        path: path.resolve(__dirname, "src/public/js/bundles"),
        filename: "weback.bundle.js"
    }
};