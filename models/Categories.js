const mongoose = require("mongoose");

const Categories = mongoose.model("Category", {
    categoryName: String,
    categoryTag: Array
});

module.exports = Categories;