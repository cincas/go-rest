import { NextPage } from 'next';
import Link from 'next/link';
import AppLayout from "../components/AppLayout";

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
    <h1>Hello world! 1 - user agent2: {userAgent}</h1>
);

Home.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
    return { userAgent };
};

export default AppLayout(Home);