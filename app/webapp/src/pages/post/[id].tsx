import { useRouter } from 'next/router';
import AppLayout from "../../components/AppLayout";
import { NextPage } from 'next';
import fetch from 'isomorphic-unfetch';

type PostProps = {

};
const Post: NextPage = () => {
    const router = useRouter();
    return (
        <div>
            <h1>{router.query.id}</h1>
            <p>This is the post content</p>
        </div>
    );
};
export default AppLayout(Post);
