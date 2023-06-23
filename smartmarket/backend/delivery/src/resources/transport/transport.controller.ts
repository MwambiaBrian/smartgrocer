import {Router, Response,Request, NextFunction} from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middlewares/error.middleware';
import validate from './transport.validate'
import TransportService from './transport.service';



class TransportController implements Controller {
    public path = '/transport'
    public router = Router();
    private transport = new TransportService

    constructor() {
        this.initialiseRoutes();
       
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
//validationMiddleware(validate.create),
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
            const {transportEmail, transportMobileNumber, ownerId, transportType, transportNumber} = req.body;
           
            const newtransport = await this.transport.create(transportEmail, transportMobileNumber, ownerId, transportType, transportNumber)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json({ newtransport}) 
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
            const business = await this.transport.retrieveById(id)
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
            
            const transport  = await this.transport.deleteById(id)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json({ transport}) 
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
           
            
            const transports = await this.transport.retrieve()
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             res.json({ transports}) 
        } catch(error: any) {
            next(new HttpException(400, error.message))
        }

    }
}

export default TransportController