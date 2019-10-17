import React from 'react';

export interface RESTAPIProps { }
interface RESTAPIState {
    response?: JSON
}
export class RESTAPI extends React.Component<RESTAPIProps, RESTAPIState> {
    constructor(props: RESTAPIProps) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        // TODO: lets not use localhost
        fetch("http://localhost:8080/redis")
            .then(res => res.json())
            .then((data) => {
                this.setState({ response: data })
            })
            .catch(console.log)
    }
    render() {
        return <h1>{JSON.stringify(this.state.response, null, 2)}</h1>
    }
}