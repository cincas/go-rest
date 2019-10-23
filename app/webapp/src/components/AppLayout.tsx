import Header from "./Header";
import * as React from "react";
import { NextPage } from "next";

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
};

type LayoutProps = {
    children: any,
    title: string
};

// Element
const Layout: React.FunctionComponent<LayoutProps> = (props) => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
    </div>
);

// High order component
const AppLayout = (Page: React.FunctionComponent | NextPage<any>) =>
    class AppLayoutComponent extends React.Component {
        render() {
            return (
                <div style={layoutStyle}>
                    <Header />
                    <div className="page-content">
                        <Page />
                    </div>
                </div>
            )
        }
    };

export default AppLayout;