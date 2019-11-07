import { NextPage } from "next";
import AppLayout from "../components/AppLayout";
import fetch from 'isomorphic-unfetch';

type AboutProps = {
    data?: object
}

const About: NextPage<AboutProps> = (props) => (
    <div>
        <p>Redis test page</p>
        <p>Test response: {JSON.stringify(props.data, null, 2)}</p>
    </div>
);

About.getInitialProps = async function () {
    const res = await fetch('http://api:8080/redis')
    const data = await res.json()
    console.log(`Response : ${data}`)
    return {
        data: data
    }
}
export default AppLayout(About);