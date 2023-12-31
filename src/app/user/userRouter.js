const express = require("express");
const router = express.Router();
const checkRole = require("../../middleware/checkRole");
// =====================================================
const userCtrl = require("./controller/userController");
const addressCtrl = require("./controller/addressController");
// =====================================================
router.get("/", userCtrl.getUsers);
router.get("/:userId", userCtrl.getUser);
router.post("/create", userCtrl.createUser);
router.put("/:userId/update", userCtrl.updateUser);
router.delete("/:userId/delete", userCtrl.deleteUser);
// Address router
router.get("/:userId/address", addressCtrl.getAddresses);
router.get("/:userId/address/:addressId", addressCtrl.getAddress);
router.post("/:userId/address/", checkRole, addressCtrl.createAddress);
router.put("/:userId/address/:addressId", addressCtrl.updateAddress);
router.delete("/:userId/address/:addressId", addressCtrl.deleteAddress);
// =====================================================
module.exports = router;
