import { postNewReading } from './client';
import ZWave from 'openzwave-shared';

const nodes = [];
const zwave = new ZWave({
    ConsoleOutput: false,
    Logging: false,
    SaveConfiguration: false,
    DriverMaxAttempts: 3,
    PollInterval: 500,
    SuppressValueRefresh: true,
});

zwave.on('driver ready', function(homeid) {
    console.log('scanning homeid=0x%s...', homeid.toString(16));
});

zwave.on('driver failed', function() {
    console.log('failed to start driver');
    zwave.disconnect();
    process.exit();
});

zwave.on('node added', function(nodeid) {
    nodes[nodeid] = {
        manufacturer: '',
        manufacturerid: '',
        product: '',
        producttype: '',
        productid: '',
        type: '',
        name: '',
        loc: '',
        classes: {},
        ready: false,
    };
    console.log('new node added, now ' + nodes.length + ' nodes');
});

zwave.on('value added', function(nodeid, comclass, value) {
    if (!nodes[nodeid]['classes'][comclass]) {
        nodes[nodeid]['classes'][comclass] = {};
        nodes[nodeid]['classes'][comclass][value.index] = value;
        if (readingIsValid(value)) {
            postNewReading(value);
        }
    }
});

zwave.on('value changed', function(nodeid, comclass, value) {
    if (nodes[nodeid]['ready']) {
        console.log('node%d: changed: %d:%s:%s->%s', nodeid, comclass,
            value['label'],
            nodes[nodeid]['classes'][comclass][value.index]['value'],
            value['value']);
    }
    nodes[nodeid]['classes'][comclass][value.index] = value;
    console.log('value changed for node%d: label: %s, value: ' +
        value['value'] + ', unit: %s', nodeid, value['unit']);
    if (readingIsValid(value)) {
        postNewReading(value);
    }
});

const readingIsValid = (reading) => {
    const validEvents = ['Temperature', 'Luminance', 'Relative Humidity', 'Ultraviolet', 'Home Security'];
    return validEvents.indexOf(reading['label']) > -1;
};

zwave.on('value removed', function(nodeid, comclass, index) {
    if (nodes[nodeid]['classes'][comclass] && nodes[nodeid]['classes'][comclass][index]) {
        delete nodes[nodeid]['classes'][comclass][index];
    }
});

zwave.on('node ready', function(nodeid, nodeinfo) {
    nodes[nodeid]['manufacturer'] = nodeinfo.manufacturer;
    nodes[nodeid]['manufacturerid'] = nodeinfo.manufacturerid;
    nodes[nodeid]['product'] = nodeinfo.product;
    nodes[nodeid]['producttype'] = nodeinfo.producttype;
    nodes[nodeid]['productid'] = nodeinfo.productid;
    nodes[nodeid]['type'] = nodeinfo.type;
    nodes[nodeid]['name'] = nodeinfo.name;
    nodes[nodeid]['loc'] = nodeinfo.loc;
    nodes[nodeid]['ready'] = true;

    for (let comclass in nodes[nodeid]['classes']) {
        console.log('node%d: class %d', nodeid, comclass);
        switch (comclass) {
            case 0x25: // COMMAND_CLASS_SWITCH_BINARY
            case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
                var valueIds = nodes[nodeid]['classes'][comclass];
                for (valueId in valueIds) {
                    zwave.enablePoll(valueId);
                    break;
                }
                console.log('node%d:   %s=%s', nodeid, values[idx]['label'], values[idx]['value']);
        }
    }
});

zwave.on('scan complete', function() {
    console.log('====> scan complete, hit ^C to finish.');
    // Add a new device to the ZWave controller
    if (zwave.hasOwnProperty('beginControllerCommand')) {
        // using legacy mode (OpenZWave version < 1.3) - no security
        zwave.beginControllerCommand('AddDevice', true);
    } else {
        // using new security API
        // set this to 'true' for secure devices eg. door locks
        zwave.addNode(false);
    }
});


zwave.connect('/dev/ttyACM0');

process.on('SIGINT', function() {
    console.log('disconnecting...');
    zwave.disconnect('/dev/ttyACM0');
    process.exit();
});