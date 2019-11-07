import Header from "./Header";
import * as React from "react";
import { NextPage, NextPageContext } from "next";

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
};

type LayoutProps = {
    children: any,
    title: string
};

// High order component
const AppLayout = (Page: React.FunctionComponent | NextPage<any>) =>
    class AppLayoutComponent extends React.Component {
        static async getInitialProps(ctx: NextPageContext) {
            let componentProps = {}
            let pageIntialProps = (Page as NextPage<any>).getInitialProps;
            if (pageIntialProps != undefined) {
                componentProps = await pageIntialProps(ctx)
            }
            return {
                ...componentProps
            }
        }
        render() {
            return (
                <div style={layoutStyle}>
                    <Header />
                    <div className="page-content">
                        <Page {...this.props} />
                    </div>
                </div>
            )
        }
    };

export default AppLayout;