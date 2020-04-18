const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const Photo = require('../models /Photo');
const auth = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req,res) => {
    let photos;

    if(req.query.user) {
        photos =  await Photo.find({user: req.query.user}).populate('user')
    } else {
        photos = await Photo.find().populate('user')
    }

    return res.send(photos);
});

router.post('/',[auth, upload.single('image')], async (req, res) => {
   const photoData = {
       title: req.body.title,
       image: req.body.image
   };
    if (req.file) {
        photoData.image = req.file.filename;
    }
   photoData.user = req.user._id;

   const photo = new Photo(photoData);

   try {
        await photo.save();
        return res.send(photo)
   } catch (error) {
       return res.status(400).send(error)
   }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) {
            res.status(400).send({error: "Wrong Id"})
        } else {
            await Photo.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted'})
        }
    } catch (error) {
        res.status(400).send(error)
    }
});



module.exports = router;

