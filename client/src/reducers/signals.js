"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var webSocets_1 = require("../actions/webSocets");
var signalRetrieve = function (state, action) {
    var name = action.data.name;
    return __assign({}, state, (_a = {}, _a[name] = action.data, _a));
    var _a;
};
exports.signals = function (state, action) {
    if (state === void 0) { state = {}; }
    var type = action.type;
    switch (type) {
        case webSocets_1.ACTION_SIGNAL_RETRIEVE:
            return signalRetrieve(state, action);
        default:
            return state;
    }
};