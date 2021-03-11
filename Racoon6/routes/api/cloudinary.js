const express = require('express');
const cloudinary = require('../../utils/cloudinary');
const router = express.Router();
const auth = require('../../middleware/auth');

router.post('/', auth, async (req, res) => {
  // deleting data
  try {
    await cloudinary.uploader.destroy(
      req.body.public_id,
      { type: 'upload', resource_type: 'raw' },
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      }
    );
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
