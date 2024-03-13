import { Router } from "express";
import mongoose from "mongoose";
import Food from "../models/Food.js";
import multer from "multer";
import cloudinary from "cloudinary";


const router = Router();


const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

const imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });


cloudinary.config({
  cloud_name: "dg7kcjtlu",
  api_key: "189726296272932",
  api_secret: "dMrT32-k3AGZV_6ruShFRIhGdNM"
});



router.post("/upload", upload.single("image"), async(req, res) => {
  
  const result = await cloudinary.v2.uploader.upload(req.file.path);

  const name = req.body.name;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const category = req.body.category;
  const supplier = req.body.supplier;
  const cost = req.body.cost;
    const sellingPrice = req.body.sellingPrice;
    const image = result.secure_url;
   
    //res.secure_url

    const newFoodData = {
        name,
        description,
        quantity,
        category,
        supplier,
        cost,
        sellingPrice,
        image
       
    }
    
    const newFood = new Food(newFoodData);

    newFood.save()
        .then(()=> res.json('Food Added'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.get('/get-food', async (req, res) => {
  const id = req.body.id;
  const food = await Food.findById(id);
  res.json(food);
})


router.get('/:category', async (req, res) => {
  let category = req.params.category;
  // Capitalize the first character of the category
  category = category.charAt(0).toUpperCase() + category.slice(1);
  try {
    const categoryItems = await Food.find({ category: category });
    res.json(categoryItems);
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// router.get('/appetizers', async (req, res) => {
//   try {
//     const appetizers = await Food.find({ category: 'Appetizers' });
//     res.json(appetizers);
//   } catch (error) {
//     console.error("Error fetching appetizers:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.get('/side-dishes', async (req, res) => {
//   try {
//     const sideDishes = await Food.find({ category: 'Side Dishes' });
//     res.json(sideDishes);
//   } catch (error) {
//     console.error("Error fetching side dishes:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.get('/salads', async (req, res) => {
//   try {
//     const salads = await Food.find({ category: 'Salads' });
//     res.json(salads);
//   } catch (error) {
//     console.error("Error fetching salads:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.get('/soups', async (req, res) => {
//   try {
//     const soups = await Food.find({ category: 'Soups' });
//     res.json(soups);
//   } catch (error) {
//     console.error("Error fetching soups:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.get('/desserts', async (req, res) => {
//   try {
//     const desserts = await Food.find({ category: 'Desserts' });
//     res.json(desserts);
//   } catch (error) {
//     console.error("Error fetching desserts:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.get('/beverages', async (req, res) => {
//   try {
//     const beverages = await Food.find({ category: 'Beverages' });
//     res.json(beverages);
//   } catch (error) {
//     console.error("Error fetching beverages:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


// router.get('/specials', async (req, res) => {
//   try {
//     const specials = await Food.find({ category: 'Specials' });
//     res.json(specials);
//   } catch (error) {
//     console.error("Error fetching specials:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });




router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const food = await Food.findById(id);

  res.json(food)
})

router.get('/getImage/:id', async (req, res) => {
  const id = req.params.id;
  const food = await Food.findById(id);
  res.json(food.image);

})

export default router;