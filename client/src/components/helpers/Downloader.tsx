import * as React from 'react';
import { connect } from 'react-redux';
import { Message } from '../definitions/interfaces';
import {
    connectionClose,
    onMessageRetrieve,
    successSend,
} from '../../actions/webSocets';
import { Store } from '../../reducers';

interface State {
    onMessage?: (data: Message) => void;
    onRegisterAvailableRoutes?: (data) => void;
    onConnectionClose?: () => void;
    messagesToSend?: {
        [key: number]: Message;
    };
    onSuccessSend?: (id: string) => void;
}

class Downloader extends React.Component<State, {}> {
    private ws: WebSocket;

    public componentDidMount() {
        this.connect();
    }

    public componentDidUpdate() {
        for (const index in this.props.messagesToSend) {
            if (this.props.messagesToSend.hasOwnProperty(index)) {
                try {
                    this.ws.send(JSON.stringify(this.props.messagesToSend[index]));
                    this.props.onSuccessSend(index);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    public render() {
        return <div className="list-group-item">
            {this.ws && this.getStateLabel(this.ws.readyState)}
        </div>;
    }

    private getStateLabel(state: number) {
        switch (state) {
            case 0:
                return <span className="text-info">CONNECTING...</span>;
            case 1:
                return <span className="text-success">OPEN</span>;
            case 2:
                return <span className="text-warning">CLOSING...</span>;
            case 3:
                return <span className="text-danger">CLOSED</span>;
            default:
                return <span className="text-muted">undefined</span>;
        }
    }

    private connect() {
        const url = 'ws://' + window.location.hostname + ':8081/';
        this.ws = new WebSocket(url, 'echo-protocol');
        this.ws.onmessage = ({data}) => {
            const parsedData: Message = JSON.parse(data);
            this.props.onMessage(parsedData);
        };
        this.ws.onclose = () => {
            this.props.onConnectionClose();
            this.ws.close();
            setTimeout(() => {
                this.connect();
                this.forceUpdate();
            }, 1000);
        };
        /*   this.ws.onerror = () => {
               this.ws.close();
               setTimeout(() => {
                   this.connect();
                   this.forceUpdate();
               }, 1000);
           };*/
        this.ws.onopen = () => {
            this.forceUpdate();
        };
    }
}

const mapDispatchToProps = (dispatch): State => {
    return {
        onMessage: (data) => dispatch(onMessageRetrieve(data)),
        onConnectionClose: () => dispatch(connectionClose()),
        onSuccessSend: (id) => dispatch(successSend(id)),
    };
};
const mapStateToProps = (store: Store): State => {
    return {
        messagesToSend: store.toSendBuffer.messages,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Downloader);
