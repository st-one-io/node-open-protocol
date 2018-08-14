# MIDs Groups

## Subscribe and Unsubcribe

| Key | MID Data | MID Subscribe | MID Unsubscribe | MID Ack |
|-----|:--------:|:-------------:|:---------------:|:-------:|
|psetSelected|15|14|17|16|
|lockAtBatchDoneUpload|22|21|24|23|
|jobInfo|35|34|37|36|
|vin|52|51|54|53|
|lastTightening|61|60|63|62|
|alarm|71|70|73|72|
|alarmStatus|76| | |77|
|alarmAcknowledged|74| | |75|
|multiSpindleStatus|91|90|93|92|
|multiSpindleResult|101|100|103|102|
|lastPowerMACSTighteningResultStationData|106|105|109|108|
|jobLineControl|121|120|126|125|
|multipleIdentifierResultParts|152|151|154|153|
|statusExternallyMonitoredInputs|211|210|213|212|
|relayFunction|217|216|219|218|
|digitalInputFunction|221|220|223|222|
|userData|242|241|244|243|
|selectorSocketInfo|251|250|253|252|
|toolTagID|262|261|264|263|
|automaticManualMode|401|400|403|402|
|openProtocolCommandsDisabled|421|420|423|422|
|motorTuningResultData|501|500|503|502|


## Request

| Key | MID Request | MID Reply |
|-----|:-----------:|:---------:|
|psetID|10|11|
|psetData|12|13|
|jobIdUpload|30|31|
|jobDataUpload|32|33|
|toolDataUpload|40|41|
|oldTighteningResultUpload|64|65|
|readTimeUpload|80|81|
|ioDeviceStatus|214|215|
|toolTagID|260|262|
|histogramUpload|300|301|
|autoDisableSettings|410|411|
|modeIdUpload|2600|2601|
|modeDataUpload|2602|2603|
|keepAlive|9999|9999|


## Command

| Key | MID Command |
|-----|:-----------:|
|communicationStop|3|
|selectPset|18|
|setPsetBatchSize|19|
|resetPsetBatchCounter|20|
|parameterUserSetDownload|25|
|selectJob|38|
|jobRestart|39|
|disableTool|42|
|enableTool|43|
|disconnectTool|44|
|setCalibrationValue|45|
|setPrimaryTool|46|
|toolPairingHandling|47|
|vinDownload|50|
|setTime|82|
|displayUserTextOnCompact|110|
|displayUserTextOnGraph|111|
|flashGreenLightOnTool|113|
|abortJob|127|
|jobBatchIncrement|128|
|jobBatchDecrement|129|
|jobOff|130|
|setJobLineControlStart|131|
|setJobLineAlert1|132|
|setJobLineAlert2|133|
|executeDynamicJob|140|
|identifierDownload|150|
|bypassIdentifier|155|
|resetLatestIdentifier|156|
|resetAllIdentifiers|157|
|setExternallyControlledRelays|200|
|setDigitalInputFunction|224|
|resetDigitalInputFunction|225|
|userDataDownload|240|
|userDataDownloadWithOffset|245|
|selectorControlGreenLights|254|
|selectorControlRedLights|255|
|controllerReboot|270|
|motorTuning|504|
|deviceCommand|2100|
|passwordRequest|2502|
|passwordResponse|2503|
|selectParameterSetDynamically|2505|
|selectMode|2606|
