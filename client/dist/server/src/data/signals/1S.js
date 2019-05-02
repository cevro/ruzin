"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signal_1 = require("../../inc/objects/signal/signal");
var ardu_1 = require("../../ardu");
exports.default = new signal_1.Signal({
    name: '1S',
    arduino: ardu_1.default,
    port: 11,
    type: signal_1.VCHODOVE,
});
//# sourceMappingURL=1S.js.map