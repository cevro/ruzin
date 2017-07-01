import * as React from 'react';
import {connect} from 'react-redux';
import {ws} from '../../webSocetClient';
import {
    onMessageRetrieve,
    onRouteRetrieve,
    onSectorRetrieve,
    onSignalRetrieve
} from '../../actions/webSocets';
import {registerRoutes} from '../../actions/route-builder';

class Downloader extends React.Component<any, void> {
    componentDidMount() {
        ws.onmessage = ({data}) => {
            const parsedData = JSON.parse(data);
            console.log(data);
            const {type} = parsedData;
            switch (type) {
                case 'message':
                    const {onMessage} = this.props;
                    onMessage(parsedData);
                    break;
                case 'cesta':
                    const {onRoute} = this.props;
                    onRoute(parsedData);
                    break;
                case 'signal':
                    const {onSignal} = this.props;
                    onSignal(parsedData);
                    break;
                case 'obvod':
                    const {onSector} = this.props;
                    onSector(parsedData);
                    break;
                case 'available_routes':
                    const {onRegisterAvailableRoutes} = this.props;
                    onRegisterAvailableRoutes(parsedData.routes);
                    break;
                default:
                    console.log('no match');
            }
        };
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        onMessage: (data) => dispatch(onMessageRetrieve(data)),
        onRoute: (data) => dispatch(onRouteRetrieve(data)),
        onSignal: (data) => dispatch(onSignalRetrieve(data)),
        onSector: (data) => dispatch(onSectorRetrieve(data)),
        onRegisterAvailableRoutes: (routes) => dispatch(registerRoutes(routes)),
    };
};

export default connect(null, mapDispatchToProps)(Downloader);
