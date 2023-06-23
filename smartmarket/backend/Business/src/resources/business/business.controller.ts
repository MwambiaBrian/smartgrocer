import {Router, Response,Request, NextFunction} from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from './business.validate'
import BusinessService from './business.service';



class BusinessController implements Controller {
    public path = '/businesses'
    public router = Router();
    private business = new BusinessService

    constructor() {
        this.initialiseRoutes();
       
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
           this.create,
          
           
        );
        this.router.get(
            `${this.path}/:id`,
           this.retrieveById,
          
           
        );

        this.router.get(
            `${this.path}`,
           this.retrieve,
          
           
        );

        this.router.delete(
            `${this.path}/:id`,
           this.deleteById,
          
           
        );
    }

    private  create =  async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> =>{
        try {
            const {name, businessEmail, ownerId, desc} = req.body;
            console.log(name)
            const newbusiness = await this.business.create(name, businessEmail, ownerId, desc)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json({ newbusiness}) 
        } catch(error: any) {
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
            const business = await this.business.retrieveById(id)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.send({ business}) 
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
            const {id} = req.body;
            
            const business = await this.business.deleteById(id)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json({ business}) 
        } catch(error: any) {
            next(new HttpException(400, error.message))
        }

    }

    private  retrieve = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> =>{
        try {
           
            
            const businesses = await this.business.retrieve()
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json({ businesses}) 
        } catch(error: any) {
            next(new HttpException(400, error.message))
        }

    }
}

export default BusinessController