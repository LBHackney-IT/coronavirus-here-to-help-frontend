import { authoriseUser } from '../../../../helpers/auth';
import { SendMessageUseCase } from "../../usecases/send-message-usecase";
const sendMessageUseCase = new SendMessageUseCase();

const endpoint = async (req, res) => {
    const user = authoriseUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const { path, ...queryParams } = req.query;
        const response =  await sendMessageUseCase.sendMessage(
            path,
            queryParams
        );

        res.json(response.data)
    } catch (error) {
        console.log('Error:' + error );
        res.json(error);
    }
};

export default endpoint;
