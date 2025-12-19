const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

// Get all products with filtering and sorting
router.get("/", async (req, res) => {
  try {
    const {
      category,
      type,
      minPrice,
      maxPrice,
      discount,
      sort,
      page = 1,
      limit = 100,
      admin,
    } = req.query;
    let filter = admin ? {} : { isActive: true };

    if (category) filter.category = new RegExp(`^${category}$`, "i");
    if (type) filter.type = new RegExp(`^\\s*${type}\\s*$`, "i");
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (discount) filter.discount = { $gte: Number(discount) };

    let sortOption = {};
    switch (sort) {
      case "price-low":
        sortOption = { price: 1 };
        break;
      case "price-high":
        sortOption = { price: -1 };
        break;
      case "rating":
        sortOption = { rating: -1 };
        break;
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    if (admin) {
      const products = await Product.find(filter).sort(sortOption);
      res.json({ products });
    } else {
      const skip = (page - 1) * limit;
      const products = await Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

      const total = await Product.countDocuments(filter);

      res.json({
        products,
        pagination: {
          page: Number(page),
          pages: Math.ceil(total / limit),
          total,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Increment product views
router.post("/:id/view", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.json({ message: "View recorded" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (Admin only)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update product (Admin only)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
