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
    const price = req.body.price;
    const description = req.body.description;
    const image = result.secure_url;
   
    //res.secure_url

    const newFoodData = {
        name,
        price,
        description,
        image
       
    }
    
    const newFood = new Food(newFoodData);

    newFood.save()
        .then(()=> res.json('Food Added'))
        .catch(err => res.status(400).json('Error: '+ err));
});


router.get('/foods', async (req, res) => {
    const todos = await Food.find();
    res.json(todos);
})


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