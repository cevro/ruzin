import { sectors } from '../../definitions/Sectors';
import Sector from '../objects/Sector';
import { Message } from '../../../../definitions/interfaces';

export const sectorFactory = new class {

    private readonly sectors: Sector[];

    constructor() {
        this.sectors = sectors.map((value => {
            return new Sector(value);
        }));
    }

    public findById(id: number): Sector {
        for (const index in this.sectors) {
            if (this.sectors.hasOwnProperty(index)) {
                if (this.sectors[index].id === id) {
                    return this.sectors[index];
                }
            }
        }
        throw new Error();
    }

    public dump() {
        return this.sectors.map((sector) => {
            return sector.dumpData();
        });
    }

    public dataReceive(message: Message) {
        if (message.entity !== 'sector') {
            return;
        }
        const {data} = message;
        const sector = this.findById(data.id);
        sector.state = data.state;
    }
};
