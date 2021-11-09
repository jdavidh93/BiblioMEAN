import express from "express";
import vendors from "../controllers/vendors.js";
const router = express.Router()

router.post("/registerVendors", vendors.registerVerdors);
router.get("/listVendors", vendors.listVendors);
router.put("/updateVendors", vendors.updateVendors);
router.delete("/deleteVendors/:_id", vendors.deleteVendors);


export default router