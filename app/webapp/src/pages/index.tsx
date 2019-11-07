import { NextPage } from 'next';
import Link from 'next/link';
import AppLayout from "../components/AppLayout";

type PostLinkProps = {
    id: string
};

const PostLink = (props: PostLinkProps) => (
    <li>
        <Link href="/post/[id]" as={`/post/${props.id}`}>
            <a>Post {props.id}</a>
        </Link>
    </li>
)

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
    <div>
        <h1>user agent2: {userAgent}</h1>
        <ul>
            <PostLink id="first" />
            <PostLink id="second" />
            <PostLink id="third" />
        </ul>
    </div>

);

Home.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
    console.log(userAgent)
    return { userAgent };
};

export default AppLayout(Home);