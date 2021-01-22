import Cookie from 'universal-cookie';
import jsonwebtoken from 'jsonwebtoken';
import authGroupsJson from '../../auth-groups.json';

const secret = process.env.HACKNEY_JWT_SECRET;
const cookieName = process.env.NEXT_PUBLIC_HACKNEY_COOKIE_NAME;
const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
const environmentKey = process.env.NEXT_PUBLIC_REACT_APP_ENV;
const authGroups = authGroupsJson[environmentKey];
const AUTH_WHITELIST = [
    '/login',
    '/access-denied'
];

export const createLoginUrl = (redirect) =>
    `https://auth.hackney.gov.uk/auth?redirect_uri=${baseUrl}${redirect}`;

export const pathIsWhitelisted = (path) =>
    AUTH_WHITELIST.includes(path);

export const userIsInValidGroup = (user) => {
    if(process.env.NEXT_PUBLIC_REACT_APP_ENV === 'dev') return true;

    Object.values(authGroups).some((group) => user.groups.includes(group));
};

export const serverSideRedirect = (
    res,
    location
) => {
    res.writeHead(302, { Location: location });
    res.end();
};

export const authoriseUser = (req) => {
    try {
        const cookies = new Cookie(req.headers.cookie ?? '');
        const token = cookies.get(cookieName);

        if (!token) return;

        if(process.env.NEXT_PUBLIC_REACT_APP_ENV === 'dev') return true;

        return jsonwebtoken.verify(token, secret);
    } catch (err) {
        if (err instanceof jsonwebtoken.JsonWebTokenError) {
            return;
        }

        throw err;
    }
};

export const unsafeExtractUser = () => {
    const cookies = new Cookie();
    const token = cookies.get(cookieName);

    if (!token) return;

    return jsonwebtoken.decode(token);
};