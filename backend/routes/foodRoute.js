import express from 'express'
import { createFoodItem,getAllFoodItems,deleteFoodItem } from '../controllers/foodController.js';
import multer from 'multer'

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})
foodRouter.post('/add',upload.single('image'),createFoodItem)
foodRouter.get('/list',getAllFoodItems)
foodRouter.post('/remove', deleteFoodItem)

export default foodRouter;

