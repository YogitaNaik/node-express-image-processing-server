var multer = require("multer");

const imageProcessor = require("./imageProcessor");

const {Router} = require("express");
const router = Router();

function filename(request,file,callback) {
  callback(null,file.originalname);
};

var objlit = {
    destination: 'api/uploads/',
    filename,
};

const storage = multer.diskStorage(objlit);


function fileFilter(request,file,callback) {
  if (file.mimetype !== 'image/png')
  {
	  request.fileValidationError = 'Wrong file type';
	  callback(null,false,new Error('Wrong file type'));
  }
  else {callback(null,true); }
};

const upload = multer({
    fileFilter,
    storage,
});

router.post('/upload',upload.single('photo'), async (request, response) => {
 if (request.fileValidationError) 
	 return response.status(400).json({error: request.fileValidationError});
	 
 try{
	 await imageProcessor(request.file.filename);
	}catch{
	 }
 return response.status(201).json({success: true});
	
 });
 
 var path = require("path");

const photoPath = path.resolve(__dirname,'../../client/photo-viewer.html');
router.get('/photo-viewer', (request, response) => {response.sendFile(photoPath)});
 
 module.exports = router;