import { authoriseUser } from '../../../../helpers/auth';
import { SendMessageUseCase } from '../../usecases/send-message-usecase';
const sendMessageUseCase = new SendMessageUseCase();

const endpoint = async (req, res) => {
    const user = authoriseUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const { path, ...queryParams } = req.query;
        req.body = obj.toString();
        console.log("We Hit the endpoint!!!! 999999999999999999999999999999999999999999")
        console.log(Buffer.isBuffer(req.body));
        console.log(typeof req.body);
        const response = await sendMessageUseCase.sendMessage(path, queryParams, req.body);
        res.json(response.data);
    } catch (error) {
        console.log('Error:' + error);
        res.json(error);
    }
};

export default endpoint;
