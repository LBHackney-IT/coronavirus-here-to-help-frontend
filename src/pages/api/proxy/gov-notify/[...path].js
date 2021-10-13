import { authoriseUser } from '../../../../helpers/auth';
import { SendMessageUseCase } from '../../usecases/send-message-usecase';
const sendMessageUseCase = new SendMessageUseCase();

const endpoint = async (req, res) => {
    const user = authoriseUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorised' });
    console.log("gov-notify root GW -------------------------------------------------------------------------")
    console.log("Req query: ", req.query)
    console.log(Buffer.isBuffer(req.body))
    console.log(Object.getPrototypeOf(req.body))
    console.log(req.body)

    // parse from buffer to string
    const requestBody = req.body.toString();
    console.log("Parsed!!!!!!!!");
    console.log(Buffer.isBuffer(requestBody));
    console.log(requestBody);

    try {
        const { path, ...queryParams } = req.query;
        const response = await sendMessageUseCase.sendMessage(path, queryParams, requestBody);
        res.json(response.data);
    } catch (error) {
        console.log('Error:' + error);
        res.json(error);
    }
};

export default endpoint;
