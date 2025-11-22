const mongoose = require('mongoose');
const app = require("./app.js");

const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL;

mongoose.connect(`${DBURL}`)
    .then(() => {
        console.log("✅ Database connected");
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ DB connection failed:", err);
    });