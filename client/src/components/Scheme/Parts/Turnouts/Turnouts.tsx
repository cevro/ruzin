import * as React from 'react';
import Point from './Turnout';
import { PointDefinition } from '../../../definitions/Points';

interface Props {
    points: PointDefinition[];
}

export default class Turnouts extends React.Component<Props, {}> {

    public render() {

        return (<g>
            {this.props.points.map((signal, signalId) => {
                return <g key={signalId}>
                    <Point definition={signal}/>
                </g>;
            })}
        </g>)
    }
}