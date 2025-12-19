# zhc_ubisys_c4_ota
external converter for use in zigbee2mqtt as zigbee herdsman converter that can temporarily be used in zigbee2mqtt to allow OTA updates even when no OTA cluster is published

This converter forces genOta (0x0019) as an output cluster on endpoint 232 so zigbee-herdsman can pick an OTA endpoint. This is documented functionality in Ubisys technical pdf.

# My Test
I used this to update my Ubisys C4 devices from 2.5.0 to 2.6.1
Zigbee2MQTT version 2.7.1
Frontend version 2.4.2
zigbee-herdsman-converters version 25.83.1
zigbee-herdsman version 7.0.4

# Not needed after 2.6.1
See release note https://www.ubisys.de/en/support/firmware/change-logs-c4-series-2/ 
quote: "OTA client cluster included in the simple descriptor of the management application endpoint" for version 2.6.1, so going fwd it will not be needed anymore.

# To use this
in Zigbee2Mqtt, add externalConverter.js as external converter. On the devices check that they changed from native support to external.
Click reconfiguere so the endpoints get newly discovered
after this OTA should work.

Once update is complete remove the external converter, it is not needed anymore
