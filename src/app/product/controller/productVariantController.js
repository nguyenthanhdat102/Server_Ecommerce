const ProductVariant = require("../model/productVariantModel");
const respond = require("../../../helper/response");
// =====================================================
// [GET] get all variant
const getVariants = async (req, res) => {
   const productId = req.params;
   try {
      const variants = await ProductVariant.find({ product: productId });
      return respond(res, 200, null, null, variants);
   } catch (error) {
      return respond(res, 500, null, error, "Internal Server Error");
   }
};

// [GET] get a variant
const getVariant = async (req, res) => {
   const productId = req.params;
   const variantId = req.query;
   try {
      const variant = await ProductVariant.find({
         product: productId,
         _id: variantId,
      });
      if (!variant) {
         return respond(
            res,
            404,
            null,
            "Không tìm thấy sản phẩm hoặc biến thể yêu cầu !"
         );
      }
      return respond(res, 200, null, null, variant);
   } catch (error) {
      return respond(res, 500, null, error, "Internal Server Error");
   }
};

// [POST] Create product variant
const createVariant = async (req, res) => {
   const productId = req.params;
   const data = req.body;
   try {
      const newVariant = await ProductVariant.create({
         ...data,
         product: productId,
      });
      return respond(
         res,
         200,
         "Thêm mới biến thể thành công !",
         null,
         newVariant
      );
   } catch (error) {
      return respond(res, 500, null, error, "Internal Server Error");
   }
};

// [PUT] Update product variant
const updateVariant = async (req, res) => {
   const productId = req.params;
   const data = req.body;
   try {
      const updateVariant = await ProductVariant.findByIdAndUpdate(
         productId,
         data,
         { new: true }
      );
      if (!updateVariant) {
         return respond(
            res,
            404,
            null,
            "Không tìm thấy sản phẩm hoặc biến thể yêu cầu !"
         );
      }
      return respond(res, 200, null, null, updateVariant);
   } catch (error) {
      return respond(res, 500, null, error, "Internal Server Error");
   }
};

// [PUT] Update product variant
const deleteVariant = async (req, res) => {
   const productId = req.params;
   try {
      const deleteVariant = await ProductVariant.findByIdAndDelete(productId);
      if (!deleteVariant) {
         return respond(
            res,
            404,
            null,
            "Không tìm thấy sản phẩm hoặc biến thể yêu cầu !"
         );
      }
      return respond(res, 200, null, null, deleteVariant);
   } catch (error) {
      return respond(res, 500, null, error, "Internal Server Error");
   }
};

// =====================================================
module.exports = {
   getVariant,
   getVariants,
   createVariant,
   updateVariant,
   deleteVariant
};
