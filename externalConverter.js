const m = require('zigbee-herdsman-converters/lib/modernExtend');
const ota = require('zigbee-herdsman-converters/lib/ota');

// ZCL cluster ID for genOta
const GEN_OTA_CLUSTER_ID = 0x0019;
// ubisys “management” endpoint
const UBISYS_MGMT_ENDPOINT = 232;

function ensureOtaClientClusterOnEndpoint232(device) {
    if (!device || typeof device.getEndpoint !== 'function') return false;

    const ep = device.getEndpoint(UBISYS_MGMT_ENDPOINT);
    if (!ep || !Array.isArray(ep.outputClusters)) return false;

    // Avoid duplicates
    if (!ep.outputClusters.includes(GEN_OTA_CLUSTER_ID)) {
        ep.outputClusters.push(GEN_OTA_CLUSTER_ID);
        return true;
    }
    return false;
}

const definition = {
    zigbeeModel: ['C4 (5504)'],
    model: 'C4 (5504)',
    vendor: 'ubisys',
    description: 'Ubisys C4 (5504) – OTA workaround for old firmware (force genOta on endpoint 232)',

    // Keep what the UI generated (your deviceEndpoints/commands…)
    extend: [
        m.deviceEndpoints({endpoints: {'1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '232': 232}}),
        m.commandsOnOff({endpointNames: ['1', '2', '3', '4']}),
        m.commandsLevelCtrl({endpointNames: ['1', '2', '3', '4']}),
        m.commandsColorCtrl({endpointNames: ['1', '2', '3', '4']}),
        m.commandsWindowCovering({endpointNames: ['5', '6']}),
    ],

    // This is what makes Zigbee2MQTT show it in the OTA list again.
    // Prefer the ubisys OTA provider when available.
    ota: (ota && ota.ubisys) ? ota.ubisys : true,

    // Apply the patch whenever Z2M touches the device (startup/announce/messages).
    onEvent: async (type, data, device) => {
        ensureOtaClientClusterOnEndpoint232(device);
    },

    // Also apply it on (re)configure to make testing deterministic.
    configure: async (device) => {
        ensureOtaClientClusterOnEndpoint232(device);
    },
};

module.exports = definition;
