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
            `${this.path}/earnings/:id`,
           this.getEarnings,
          
           
        );

        this.router.get(
            `${this.path}`,
           this.retrieve,
          
           
        );

        this.router.delete(
            `${this.path}/:id`,
           this.deleteById,
          
           
        );
        this.router.put(
            `${this.path}/:id`,
           this.updateEarnings,
          
           
        );
    }

    private  create =  async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> =>{
        try {
            const {name, businessEmail,businessType, businessPhoneNumber, ownerId, location} = req.body;
            console.log(name)
            const newbusiness = await this.business.create(name, businessEmail, businessType, businessPhoneNumber,ownerId, location)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json({ newbusiness}) 
        } catch(error: any) {
            next(new HttpException(400, error.message))
        }

    }
    private  getEarnings =  async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> =>{
        try {
            const {id} = req.params;
         
            const account = await this.business.getEarnings(id)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json(account) 
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
         
            const business = await this.business.retrieveById(id)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json(business) 
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
            
            const business = await this.business.deleteById(id)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json({ business}) 
        } catch(error: any) {
            next(new HttpException(400, error.message))
        }

    }
    private  updateEarnings =  async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> =>{
        try {
            const {id} = req.params;
            const {amount}=req.body;
            
            const earnings = await this.business.updateEarnings(id, amount)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json(earnings) 
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