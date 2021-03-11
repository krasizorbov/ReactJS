const express = require('express');
const cloudinary = require('../../utils/cloudinary');
const router = express.Router();
const auth = require('../../middleware/auth');

// Delete Cloudinary Data
router.post('/', auth, async (req, res) => {
  try {
    for (let i = 0; i < req.body.length; i++) {
      await cloudinary.uploader.destroy(
        req.body[i].public_id,
        { type: 'upload', resource_type: 'raw' },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }

  // uploading data
  //   try {
  //     await cloudinary.uploader.upload('Krasi.jpg', function (error, result) {
  //       console.log(result, error);
  //     });
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
});
module.exports = router;
