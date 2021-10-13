import { authoriseUser } from '../../../../helpers/auth';
import { SendBulkMessagesUseCase } from "../../usecases/send-bulk-message-usecase";


const sendBulkMessagesUseCase = new SendBulkMessagesUseCase();

const endpoint = async (req, res) => {
    const user = authoriseUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorised' });

    try {
        console.log("bulk root GW -------------------------------------------------------------------------")
        // console.log("Req query: ", req.query)
        console.log(Buffer.isBuffer(req.body))
        console.log("obj", req.body)
    
        // parse from buffer to string
        const fromBuffer = req.body.toString();
        console.log("Parsed!!!!!!!!");
        console.log(Buffer.isBuffer(fromBuffer));
        console.log(typeof fromBuffer);
    
        let parsedJSON;

        try {
            console.log("FROM JSON!!!!!!!!")
            parsedJSON = JSON.parse(fromBuffer);
            console.log(typeof parsedJSON);
            console.log("parsed", parsedJSON);
        } catch (e) {
            parsedJSON = {}
        }
        


        await sendBulkMessagesUseCase.sendMessages(
            parsedJSON
        );
        res.status(200).json({})
    } catch (err) {
        console.log('Error: ' + err);
        res.json({ error: `Server error` });
    }
};

export default endpoint;
