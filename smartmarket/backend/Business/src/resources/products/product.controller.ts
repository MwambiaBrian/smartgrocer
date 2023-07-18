import {Router, Request,Response, NextFunction} from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from './product.validate'
import ProductService from './product.service'
import cloudinary from '../../utils/cloudinary';

class ProductController implements Controller {
    public path = '/products'
    public router = Router();
    private productService = new ProductService()

    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
           this.create
          
           
        );

        this.router.get(
            `${this.path}`,
            
           this.retrieve 
           
        );

        this.router.get(
            `${this.path}/:id`,
           this.retrieveById,
          
           
        );

        this.router.delete(
            `${this.path}/:id`,
           this.deleteById,
          
           
        );
    }

    private  create = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> => {

        try {
                const {businessId,name, category, price, img, desc} = req.body;
            if (img) {
              const uploadedResponse = await cloudinary.uploader.upload(img, {
                upload_preset: "digital-market",
              });
        
              if (uploadedResponse) {
                // const product = new Product({
                //   name,
                //   category,
                //   desc,
                //   price,
                //   image: uploadedResponse,
                // });
                const savedProduct = await this.productService.create(businessId,name, category, price, uploadedResponse.url, desc);
                //const savedProduct = await product.save();
                res.status(200).json(savedProduct);
              }
            }
          } catch (error) {
            console.log(error);
            res.status(500).send(error);
          }

        // try {
        //     const {name, category, price, img, desc} = req.body;
        //     console.log(name)
        //     const product = await this.productService.create(name, category, price,img, desc);
        //     res.json({ product}) 
        // } catch(error:any) {
        //     next(new HttpException(400, error.message))
        // }
        

    }

    private  retrieve = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> => {
        try {
           
            
            const products = await this.productService.retrieve();
            res.send(products) 
        } catch(error:any) {
            next(new HttpException(400, error.message))
        }

    }

    private  retrieveById =  async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> =>{
        try {
            const {id} = req.params;
            console.log(id);
            const business = await this.productService.retrieveById(id)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json({ business}) 
        } catch(error: any) {
            next(new HttpException(400, error.message))
        }

    }

    private  deleteById =  async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> =>{
        try {
            const {id} = req.params;
            
            const product = await this.productService.deleteById(id)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json({ product}) 
        } catch(error: any) {
            next(new HttpException(400, error.message))
        }

    }
}

export default ProductController