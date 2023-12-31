const slug = require("slug");
// =====================================================
const Category = require("./categoryModel");
const respond = require("../../helper/response");
const paginate = require("../../helper/paginate");
// =====================================================
const categoryController = {
   //[GET] GET CATEGORIES
   getCategories: async (req, res) => {
      const { q, page = 1, pageSize = 5 } = req.query || {};
      const skip = (page - 1) * pageSize;
      try {
         let categories = [];
         let total = 0;

         if (!q) {
            categories = await Category.find({ status: true })
               .sort({ updatedAt: -1 })
               .skip(skip)
               .limit(parseInt(pageSize));
            total = await Category.find({ status: true }).countDocuments();
         } else {
            categories = await Category.find({ name: q, status: true })
               .sort({ updatedAt: -1 })
               .skip(skip)
               .limit(parseInt(pageSize));
            total = await Category.find({ name: q, status: true }).countDocuments();
         }
         const totalPage = await Math.ceil(total / parseInt(pageSize));

         return respond(res, 200, q, null, {
            categories,
            total,
            totalPage,
            currentPage: parseInt(page),
            pages: paginate(parseInt(page), totalPage),
         });
      } catch (error) {
         return respond(res, 500, null, error, "Internal Server Error");
      }
   },
   //[GET] GET CATEGORY
   getCategory: async (req, res) => {
      const { cateId } = req.params;
      try {
         const category = await Category.findById(cateId);
         if (!category) {
            return respond(res, 404, null, "Không tìm thấy danh mục sản phẩm");
         }
         return respond(res, 200, null, null, category);
      } catch (error) {
         return respond(res, 500, null, error, "Internal Server Error");
      }
   },
   //[POST] CREATE CATEGORY
   createCategory: async (req, res) => {
      const { name } = req.body;
      try {
         const data = {
            name,
            slug: slug(name),
         };
         const newCategory = await Category.create(data);
         return respond(
            res,
            200,
            "Thêm mới danh mục sản phẩm thành công !",
            null,
            newCategory
         );
      } catch (error) {
         return respond(res, 500, null, error, "Internal Server Error");
      }
   },
   //[PUT] UPDATE CATEGORY
   updateCategory: async (req, res) => {
      const { cateId } = req.params;
      const { name } = req.body;
      try {
         const updateCategory = await Category.findByIdAndUpdate(
            { _id: cateId },
            {
               name,
               slug: slug(name),
            },
            { new: true }
         );
         if (!updateCategory) {
            return respond(res, 404, null, "Không tìm thấy danh mục sản phẩm");
         }
         return respond(res, 200, null, null, updateCategory);
      } catch (error) {
         return respond(res, 500, null, error, "Internal Server Error");
      }
   },
   // [PATCH] REMOVE CATEGORY
   deleteCategory: async (req, res) => {
      const { cateId } = req.params;
      try {
         await Category.updateOne({ _id: cateId }, { status: false });
         return respond(res, 200, "Xoá danh mục sản phẩm thành công !", null);
      } catch (error) {
         return respond(res, 500, null, error, "Internal Server Error");
      }
   },
};
// =====================================================
module.exports = categoryController;
