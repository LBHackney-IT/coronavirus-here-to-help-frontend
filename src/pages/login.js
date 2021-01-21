import { ReactNode, useMemo } from 'react';
import { useRouter } from 'next/router';
import { createLoginUrl } from '../helpers/auth';
import Layout from '../components/layout';
import Link from 'next/link';

const Home = () => {
    const router = useRouter();
    const loginUrl = useMemo(() => {
        const { redirect = '/dashboard' } = router.query;
        return createLoginUrl(redirect);
    }, [router]);

    console.log(router);
    console.log(router.query);


    return (
        <Layout>
            <h1>Staff login</h1>

            <Link href={loginUrl}>
                <a className="govuk-button lbh-button lbh-button--start govuk-button--start">
                    Log in with Google{' '}
                    <svg
                        className="govuk-button__start-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.5"
                        height="19"
                        viewBox="0 0 33 40"
                        role="presentation"
                        focusable="false"
                    >
                        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
                    </svg>
                </a>
            </Link>

            <p className="lbh-body">
                If you think you should be able to access this but can’t, contact
                Hackney IT.
            </p>
            <p className="lbh-body">
                If you’re trying to upload a document, follow the link you were sent.
            </p>
        </Layout>
    );
};

export default Home;