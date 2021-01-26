import Cookie from 'universal-cookie';
import jsonwebtoken from 'jsonwebtoken';

const secret = process.env.HACKNEY_JWT_SECRET;
const cookieName = process.env.NEXT_PUBLIC_HACKNEY_COOKIE_NAME;
const baseUrl = process.env.APP_URL;
const authGroup = process.env.NEXT_PUBLIC_HACKNEY_GOOGLE_GROUP;
const AUTH_WHITELIST = ['/login', '/access-denied'];

export const createLoginUrl = (redirect) =>
    `https://auth.hackney.gov.uk/auth?redirect_uri=${baseUrl}${redirect}`;

export const pathIsWhitelisted = (path) => AUTH_WHITELIST.includes(path);

export const userIsInValidGroup = (user) => {
    if (process.env.NODE_ENV !== 'production') return true;

    const userInGroup = user.groups.includes(authGroup);
    if (!userInGroup) {
        console.warn('User does not belong to group.', user, authGroup);
    } else {
        console.warn('User does belong to group.', user, authGroup);
    }
    return userInGroup;
};

export const serverSideRedirect = (res, location) => {
    res.writeHead(302, { Location: location });
    res.end();
};

export const authoriseUser = (req) => {
    try {
        const cookies = new Cookie(req.headers.cookie ?? '');
        const token = cookies.get(cookieName);

        if (!token) return;

        if (process.env.NODE_ENV !== 'production') return jsonwebtoken.decode(token);

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
