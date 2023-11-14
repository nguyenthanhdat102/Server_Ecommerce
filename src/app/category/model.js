const mongoose = require("mongoose");
// =====================================================
const categorySchema = mongoose.Schema(
   {
      name: { type: String, require: true },
      slug: { type: String },
   },
   {
      timestamps: true,
   }
);

// =====================================================
module.exports = mongoose.model("Category", categorySchema);
