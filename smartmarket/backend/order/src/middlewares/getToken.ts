import axios from 'axios';
let token: string;




const createToKen= async (req: any,res: any,next: any) => {
const secret: string = "efghyyj";
const consumer:string = "effgfhh"

//const auth: string = new Buffer.from(`${consumer}:${secret}`).toString('base64')
//get access token from safaricom
await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant",
{
    headers: {
       // authorization: `Basic ${auth}`
    },
}
).then((data) => {
    token = data.data.access_token
    console.log(data.data)
    next()
}).catch ((err) => {
console.log(err)
res.status(400).json(err.message)
})
}


const stkPush = async(req: any,res: any) => {
    const shortCode = 174379
    const phone = req.body.phone.substring(1)
    const amount = req.body.amount;
    const passkey = "bfb279fbdbcf1..."
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
     const date = new Date();
     const timestamp = 
     date.getFullYear() +
     ("0" + (date.getMonth() +1)).slice(-2) +
     ("0" + (date.getDate() +1)).slice(-2) +
     ("0" + (date.getHours() +1)).slice(-2) +
     ("0" + (date.getMinutes() +1)).slice(-2) +
     ("0" + (date.getSeconds() +1)).slice(-2) 

     //const password = new Buffer.from(shortCOde + passkey + timestamp).toString("base64");

     const data = {
        BusinessShortCode: shortCode,
      //  Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: 174379,
        PhoneNumber: `254${phone}`,
        callBackURL: "https://mydomain/stk",
        AccountReference: "Digital-Market",
        TransactionDesc: "Order payment"

     };

     await axios.post(url, data, {
        headers: {
            authorization: `Bearer ${token}`
        }
     }).then((data) => {
        console.log(data)
        res.status(200).json(data.data)
     }).catch((err)=>{
        console.log(err)
        res.status(400).json(err.message)
     })


}

export default createToKen 