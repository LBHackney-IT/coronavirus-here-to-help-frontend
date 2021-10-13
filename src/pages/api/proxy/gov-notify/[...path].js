import { authoriseUser } from '../../../../helpers/auth';
import { SendMessageUseCase } from '../../usecases/send-message-usecase';
const sendMessageUseCase = new SendMessageUseCase();

const endpoint = async (req, res) => {
    const user = authoriseUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorised' });

    try {
        console.log("gov-notify root GW -------------------------------------------------------------------------")
        console.log("Req query: ", req.query)
        console.log(Buffer.isBuffer(req.body))
        console.log(Object.getPrototypeOf(req.body))
        console.log(req.body)
    
        // parse from buffer to string
        const fromBuffer = req.body.toString();
        console.log("Parsed!!!!!!!!");
        console.log(Buffer.isBuffer(fromBuffer));
        console.log(typeof fromBuffer);
    
        console.log("FROM JSON!!!!!!!!")
        const parsedJSON = JSON.parse(fromBuffer);
        console.log(typeof parsedJSON);
        console.log(parsedJSON);



        const { path, ...queryParams } = req.query;
        const response = await sendMessageUseCase.sendMessage(path, queryParams, parsedJSON);
        res.json(response.data);
    } catch (error) {
        console.log('Error:' + error);
        res.json(error);
    }
};

export default endpoint;
