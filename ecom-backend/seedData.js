require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const connectDB = require('./config/db');

const sampleProducts = [
  // Skincare
  {
    name: "Vitamin C Serum",
    price: 1299,
    category: "skincare",
    type: "serum",
    quantity: 50,
    minQuantity: 10,
    discount: 15,
    image: "https://www.datocms-assets.com/42755/1663132448-img_6566.jpg?auto=format&fit=max&w=1200",
    description: "Brightening vitamin C serum for glowing skin",
    brand: "GlowUp",
    rating: 0,
    numReviews: 0,
    views: 0
  },
  {
    name: "Gentle Face Cleanser",
    price: 899,
    category: "skincare",
    type: "cleanser",
    quantity: 30,
    minQuantity: 5,
    discount: 10,
    image: "https://i5.walmartimages.com/asr/de7297a5-2a9b-45c6-aa0d-03959b9c0a38.3bc6dd6ac21674bd80c79319c20a2a35.jpeg",
    description: "Mild cleanser for all skin types",
    brand: "PureSkin",
    rating: 0,
    numReviews: 0
  },
  {
    name: "CeraVe Hydrating Facial Cleanser",
    price: 1199,
    category: "skincare",
    type: "cleanser",
    quantity: 40,
    minQuantity: 8,
    discount: 15,
    image: "https://i5.walmartimages.com/asr/3dc31b81-f958-43b9-b32f-1795f3dc83ef.69a7a02e1ccf6cfcc52660ae64f7a76e.jpeg",
    description: "Daily face wash for normal to dry skin",
    brand: "CeraVe",
    rating: 0,
    numReviews: 0
  },
  {
    name: "Best Cleanser for Oily Skin",
    price: 999,
    category: "skincare",
    type: "cleanser",
    quantity: 35,
    minQuantity: 7,
    discount: 20,
    image: "https://i5.walmartimages.com/seo/CeraVe-Foaming-Facial-Cleanser-Daily-Face-Wash-for-Normal-to-Oily-Skin-12-fl-oz_a74a3654-07aa-47c6-9377-117b3a532e6e.fc02eb8e8fc31ee17f086caa896a8d87.jpeg",
    description: "Deep cleansing formula for oily skin",
    brand: "OilControl",
    rating: 0,
    numReviews: 0
  },
  {
    name: "CeraVe Hydrating Cleanser 12oz",
    price: 1399,
    category: "skincare",
    type: "cleanser",
    quantity: 25,
    minQuantity: 5,
    discount: 10,
    image: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw8b2f3571/product/March%202023%20packshot%20updates/Toleriane_HydratingGentleCleanser_400ml-Pump.jpg",
    description: "Hydrating facial cleanser for normal to dry skin, 12 fl oz",
    brand: "CeraVe",
    rating: 0,
    numReviews: 0
  },
  {
    name: "Hydrating Moisturizer",
    price: 1599,
    category: "skincare",
    type: "moisturizer",
    quantity: 25,
    minQuantity: 6,
    discount: 20,
    image: "https://tse4.mm.bing.net/th/id/OIP.0LWOWqipCdUFfaIi7xq3iAHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "24-hour hydrating moisturizer",
    brand: "HydraGlow",
    rating: 0,
    numReviews: 0
  },
  {
    name: "SPF 50 Sunscreen",
    price: 799,
    category: "skincare",
    type: "sunscreen",
    quantity: 40,
    minQuantity: 8,
    discount: 0,
    image: "https://th.bing.com/th?q=Water-Resistant+Sunscreen&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&ucfimg=1&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    description: "Broad spectrum sun protection",
    brand: "SunShield",
    rating: 0,
    numReviews: 0
  },

  // Makeup
  {
    name: "Matte Liquid Lipstick",
    price: 699,
    category: "makeup",
    type: "lipstick",
    quantity: 60,
    minQuantity: 12,
    discount: 25,
    image: "https://th.bing.com/th/id/OIP.-x88Ue8TbVM8eiPZk38edwHaE8?w=279&h=185&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1",
    description: "Long-lasting matte finish lipstick",
    brand: "ColorPop",
    rating: 0,
    numReviews: 0
  },
  {
    name: "Full Coverage Foundation",
    price: 1899,
    category: "makeup",
    type: "foundation",
    quantity: 35,
    minQuantity: 7,
    discount: 15,
    image: "https://ell.h-cdn.co/assets/15/49/elle-editors-picks-foundation-lancome.jpg",
    description: "24-hour full coverage foundation",
    brand: "FlawlessBase",
    rating: 0,
    numReviews: 0
  },
  {
    name: "Eyeshadow Palette",
    price: 2299,
    category: "makeup",
    type: "eyeshadow",
    quantity: 20,
    minQuantity: 4,
    discount: 30,
    image: "https://i5.walmartimages.com/asr/347320d5-7ff2-45ea-b231-c9c9efcada62_2.8a8371b80a1d8d46b5e7dd38d54f36cc.jpeg",
    description: "12-shade eyeshadow palette",
    brand: "EyeArt",
    rating: 0,
    numReviews: 0
  },
  {
    name: "Volumizing Mascara",
    price: 999,
    category: "makeup",
    type: "mascara",
    quantity: 45,
    minQuantity: 9,
    discount: 0,
    image: "https://images.pexels.com/photos/2688992/pexels-photo-2688992.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description: "Waterproof volumizing mascara",
    brand: "LashMax",
    rating: 0,
    numReviews: 0
  },

  // Haircare
  {
    name: "Argan Oil Shampoo",
    price: 1199,
    category: "haircare",
    type: "shampoo",
    quantity: 30,
    minQuantity: 6,
    discount: 20,
    image: "https://tse1.mm.bing.net/th/id/OIP.rieoAEEXFFpRXfHHjjvxnwHaL8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Nourishing argan oil shampoo",
    brand: "HairLux",
    rating: 0,
    numReviews: 0
  },
  {
    name: "Deep Conditioning Treatment",
    price: 1499,
    category: "haircare",
    type: "conditioner",
    quantity: 25,
    minQuantity: 5,
    discount: 15,
    image: "https://th.bing.com/th/id/OIP.licn4xCHOE1QlEUXElz-cQHaHa?w=158&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1",
    description: "Intensive hair repair treatment",
    brand: "RepairPro",
    rating: 0,
    numReviews: 0
  },
  {
    name: "Coconut Hair Oil",
    price: 599,
    category: "haircare",
    type: "hair-oil",
    quantity: 50,
    minQuantity: 10,
    discount: 10,
    image: "https://tse1.mm.bing.net/th/id/OIP.uWgnrwY9HPHilMcOoXntuQHaJT?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Pure coconut oil for hair nourishment",
    brand: "NaturalCare",
    rating: 0,
    numReviews: 0
  },
  {
    name: "Heat Protection Spray",
    price: 899,
    category: "haircare",
    type: "styling",
    quantity: 40,
    minQuantity: 8,
    discount: 0,
    image: "https://tse2.mm.bing.net/th/id/OIP.ZNBKJJQ0auptzy8K6_eR6AHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Protects hair from heat damage",
    brand: "StyleGuard",
    rating: 0,
    numReviews: 0
  },

  // Bodycare
  {
    name: "Shea Butter Body Lotion",
    price: 799,
    category: "bodycare",
    type: "body-lotion",
    quantity: 35,
    minQuantity: 7,
    discount: 15,
    image: "https://i5.walmartimages.com/asr/d5e84791-f34b-4e27-93e2-6075ea4557c1.e7c7846781bdf4b51426c9c5b31dd549.jpeg",
    description: "Rich shea butter body moisturizer",
    brand: "SoftSkin",
    rating: 0,
    numReviews: 0
  },
  {
    name: "Refreshing Body Wash",
    price: 649,
    category: "bodycare",
    type: "body-wash",
    quantity: 45,
    minQuantity: 9,
    discount: 20,
    image: "https://m.media-amazon.com/images/I/61y-ciVAQXL._SL1500_.jpg",
    description: "Energizing citrus body wash",
    brand: "FreshStart",
    rating: 0,
    numReviews: 0
  },
  {
    name: "Exfoliating Body Scrub",
    price: 999,
    category: "bodycare",
    type: "scrub",
    quantity: 30,
    minQuantity: 6,
    discount: 25,
    image: "https://vriske.com/wp-content/uploads/2021/08/Scarlett-Whitening-Body-Care-1536x1024.jpeg",
    description: "Dead sea salt body scrub",
    brand: "ScrubAway",
    rating: 0,
    numReviews: 0
  },
  {
    name: "Rose Body Mist",
    price: 1299,
    category: "bodycare",
    type: "perfume",
    quantity: 25,
    minQuantity: 5,
    discount: 10,
    image: "https://cdn.pixabay.com/photo/2023/06/01/06/21/perfume-8032808_1280.jpg",
    description: "Romantic rose fragrance mist",
    brand: "FloralScents",
    rating: 0,
    numReviews: 0
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Add sample products
    await Product.insertMany(sampleProducts);
    console.log('Added sample products');
    
    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ email: 'admin@TrendyTints.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@TrendyTints.com',
        password: 'admin123',
        isAdmin: true
      });
      console.log('Created admin user');
    }
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();