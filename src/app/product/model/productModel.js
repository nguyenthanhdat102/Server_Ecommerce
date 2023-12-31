const mongoose = require("mongoose");
// =====================================================

const productSchema = mongoose.Schema(
   {
      name: { type: String, required: true },
      thumbnail: { type: String },
      gallery: [
         {
            _id: {
               type: mongoose.Schema.Types.ObjectId,
               index: true,
               required: true,
               auto: true,
            },
            image: { type: String, require: true },
         },
      ],
      category: { type: mongoose.Types.ObjectId, ref: "Category" },
      brand: { type: mongoose.Types.ObjectId, ref: "Brand" },
      comment: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
      view: { type: Number, min: 0, default: 0 },
      slug: { type: String },
      status: { type: Boolean, default: true },
      public: { type: Boolean, default: false },
   },
   {
      timestamps: true,
   }
);

// =====================================================
module.exports = mongoose.model("Product", productSchema);
