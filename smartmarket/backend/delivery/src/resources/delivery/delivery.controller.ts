import {Router, Response,Request, NextFunction} from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middlewares/error.middleware';
import validate from './delivery.validate'
import DeliveryService from './delivery.service';



class DeliveryController implements Controller {
    public path = '/delivery'
    public router = Router();
    private delivery = new DeliveryService

    constructor() {
        this.initialiseRoutes();
       
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
           // validationMiddleware(validate.create),
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
            const {items, sellerAddress, buyerAddress} = req.body;
            const newdelivery = await this.delivery.create(items, sellerAddress, buyerAddress)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json({ newdelivery}) 
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
            const business = await this.delivery.retrieveById(id)
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
            
            const business = await this.delivery.deleteById(id)
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
           
            
            const businesses = await this.delivery.retrieve()
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json({ businesses}) 
        } catch(error: any) {
            next(new HttpException(400, error.message))
        }

    }
}

export default DeliveryController