const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/public/js/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "weback.bundle.js"
    }
};