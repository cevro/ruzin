import {Signal, ODDIELOVE} from '../Signal';
import arduino from '../../ardu';

export default new Signal({
    name: '119-1',
    arduino: arduino,
    port: 3,
    type: ODDIELOVE,
});