# zhc_ubisys_c4_ota
external converter for use in zigbee2mqtt as zigbee herdsman converter that can temporarily be used in zigbee2mqtt to allow OTA updates even when no OTA cluster is published

I used this to update my Ubisys C4 devices from 2.5.0 to 2.6.1

See release note https://www.ubisys.de/en/support/firmware/change-logs-c4-series-2/ 
quote: "OTA client cluster included in the simple descriptor of the management application endpoint" for version 2.6.1, so going fwd it will not be needed anymore.

# To use this
in Zigbee2Mqtt, add externalConverter.js as external converter. On the devices check that they changed from native support to external.
Click reconfiguere so the endpoints get newly discovered
after this OTA should work.

Once update is complete remove the external converter, it is not needed anymore
