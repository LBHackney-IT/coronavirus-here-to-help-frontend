import { authoriseUser } from '../../../../helpers/auth';
import { SendBulkMessagesUseCase } from "../../usecases/send-bulk-message-usecase";


const sendBulkMessagesUseCase = new SendBulkMessagesUseCase();

const endpoint = async (req, res) => {
    const user = authoriseUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorised' });

    try {
        console.log("REQ")
        console.dir(req)
        console.log("DATA",req.data)
        console.log("BODY", req.body)
        await sendBulkMessagesUseCase.sendMessages(
            req.body
        );
        res.status(200).json({})
    } catch (err) {
        console.log('Error: ' + err);
        res.json({ error: `Server error` });
    }
};

export default endpoint;
