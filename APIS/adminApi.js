const exp=require("express");
const adminApiObj=exp.Router();
const errorHandler=require("express-async-handler");
const { ErrorHandler } = require("@angular/core");
//import 
const verifyToken=require("./middlewares/verifyToken")

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")
//configure cloudinary
cloudinary.config({
    cloud_name: 'dtrhafbol',
    api_key: '471847945156575',
    api_secret: 'H7vKMedZ5nAeWlIjbjtNebdk3OY'
});
//configure cloudinary storage

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'adminproduct',
        format: async (req, file) => 'jpg', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});
//congigure multer
var upload = multer({ storage: storage });
//extract body of req obj
adminApiObj.use(exp.json())

adminApiObj.get("/allproducts",errorHandler(async(req,res,next)=>{

    let adminProductCollectionObj = req.app.get("adminProductCollectionObj");
    let products = await adminProductCollectionObj.find().toArray();
    //console.log("products are",products)
    res.send({message:products})
}))

//get one products
adminApiObj.get("/oneproduct/:pCategory",errorHandler(async(req,res,next)=>{
    
    let adminProductCollectionObj = req.app.get("adminProductCollectionObj");
    //console.log(adminProductCollectionObj)
    let products = await adminProductCollectionObj.find({pCategory :req.params.pCategory}).toArray();
    //console.log("products are",products)

    res.send({message:products})
}))


//adding products to database

adminApiObj.post("/productdetails",upload.single('photo'),errorHandler(async (req,res,next)=>{
    console.log("url is ",req.file.path);
    //get product collectionobject

    let adminProductCollectionObj=req.app.get("adminProductCollectionObj");
   console.log("product details obj is",req.body)
   let proObj=JSON.parse(req.body.proObj);
    //add Imagelink
    proObj.ImgLink = req.file.path;
let success=await adminProductCollectionObj.insertOne(proObj)
        res.send({message:"product created"})

    
}))



//delete all products
adminApiObj.post("/delete",errorHandler(async(req,res,next)=>{
    
        let adminProductCollectionObj = req.app.get("adminProductCollectionObj");
        let productObj =  req.body;
        
        console.log("product object is",productObj);
        //check for product in db
        let product = await adminProductCollectionObj.findOne({pname:productObj.pname});
    
        if(product!==null){
            let remove=await adminProductCollectionObj.deleteOne({pname:productObj.pname});
            res.send({message:true});
        }
    
    }))
// get product data for editing 
adminApiObj.get("/getproductdata/:pname",errorHandler(async (req,res,next)=>{
        let adminProductCollectionObj = req.app.get("adminProductCollectionObj") ;
        let proObj=await adminProductCollectionObj.findOne({pname:req.params.pname});
        console.log(proObj);
        if(proObj!==null){
            res.send({Details:proObj})
        }
        else{
            res.send({message:"product not found"})
        }
        
        }))
// updating the product details
adminApiObj.put("/updateproduct",errorHandler(async(req,res,next)=>{
            //console.log(req.body)
            let Allproducts=req.app.get("adminProductCollectionObj")
            let productDetails=await Allproducts.findOne({pname:req.body.pname})
            if(productDetails!==null){
                let edit=await Allproducts.updateOne({pname:req.body.pname},{$set:{
                    pname:req.body.pname,
                    pbrand:req.body.pbrand,
                    pmodel:req.body.pmodel,
                    pCategory:req.body.pCategory,
                    pdate:req.body.pdate,
                    pcol:req.body.pcol,
                    pprice:req.body.pprice,
                    psoldby:req.body.psoldby,
                    pdescription:req.body.pdescription,
                    pInstructions:req.body.pInstructions,
                    pdisclaimer:req.body.pdisclaimer,
                }});
                res.send({message:true});
            }
            else{
                res.send({message:"product not found"})
            }
        }))



























module.exports=adminApiObj;