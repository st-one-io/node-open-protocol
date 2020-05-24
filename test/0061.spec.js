//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const {
    expect
} = require('chai');

const MID = require('../src/mid/0061.js');

describe("MID 0061", () => {

    it("parser rev 1", (done) => {

        let msg = {
            mid: 61,
            revision: 1,
            payload: Buffer.from("010005028803Teste Diego - Airbag     04KNX25698542QWSDFE-56984AS050206753078562087541091101111122325291385621414754682152365981625836174567818147851912548202018-05-29:16:55:55212018-05-01:00:10:55221232536589652")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 1,
                payload: {
                    cellID: 5,
                    channelID: 88,
                    torqueControllerName: "Teste Diego - Airbag",
                    numberVIN: "KNX25698542QWSDFE-56984AS",
                    jobID: 2,
                    parameterSetID: 753,
                    batchSize: 8562,
                    batchCounter: 7541,
                    _tighteningStatus: 1,
                    tighteningStatus: "OK",
                    _torqueStatus: 1,
                    _angleStatus: 1,
                    torqueStatus: "OK",
                    angleStatus: "OK",
                    torqueMinLimit: 2325.29,
                    torqueMaxLimit: 8562.14,
                    torqueFinalTarget: 7546.82,
                    torque: 2365.98,
                    angleMin: 25836,
                    angleMax: 45678,
                    finalAngleTarget: 14785,
                    angle: 12548,
                    timeStamp: "2018-05-29:16:55:55",
                    timeLastChange: "2018-05-01:00:10:55",
                    _batchStatus: 1,
                    batchStatus: "OK",
                    tighteningID: 2536589652
                }
            });

            done();
        });
    });

    it("parser rev 2", (done) => {

        let msg = {
            mid: 61,
            revision: 2,
            payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G0585250685207020800020096532105645111121131141150162170180191200000000250216523652263515623652356245465232554765265566527564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:35")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 2,
                payload: {
                    cellID: 25,
                    channelID: 52,
                    torqueControllerName: "FREIO DE MAO - GOLF",
                    numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                    jobID: 8525,
                    parameterSetID: 852,
                    strategy: "Torque control / angle monitoring",
                    _strategy: 2,
                    strategyOptions: [
                        undefined,
                        undefined,
                        "Batch",
                        undefined,
                        "PVT Compensate",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _strategyOptions: 20,
                    batchSize: 6532,
                    batchCounter: 5645,
                    _tighteningStatus: 1,
                    tighteningStatus: "OK",
                    _batchStatus: 1,
                    batchStatus: "OK",
                    _torqueStatus: 1,
                    torqueStatus: "OK",
                    _angleStatus: 1,
                    angleStatus: "OK",
                    _rundownAngleStatus: 0,
                    rundownAngleStatus: "LOW",
                    _currentMonitoringStatus: 2,
                    currentMonitoringStatus: "HIGH",
                    _selftapStatus: 0,
                    selftapStatus: "LOW",
                    _prevailTorqueMonitoringStatus: 0,
                    prevailTorqueMonitoringStatus: "LOW",
                    _prevailTorqueCompensateStatus: 1,
                    prevailTorqueCompensateStatus: "OK",
                    tighteningErrorStatus: [
                        undefined,
                        "Rundown angle min shut off",
                        undefined,
                        "Angle max shut off",
                        "Self-tap torque max shut off",
                        "Self-tap torque min shut off",
                        "Prevail torque max shut off",
                        "Prevail torque min shut off",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _tighteningErrorStatus: 250,
                    torqueMinLimit: 6523.65,
                    torqueMaxLimit: 6351.56,
                    torqueFinalTarget: 6523.56,
                    torque: 5465.23,
                    angleMin: 54765,
                    angleMax: 55665,
                    finalAngleTarget: 56421,
                    angle: 56465,
                    rundownAngleMin: 65235,
                    rundownAngleMax: 56484,
                    rundownAngle: 56646,
                    currentMonitoringMin: 154,
                    currentMonitoringMax: 585,
                    currentMonitoringValue: 546,
                    selftapMin: 4879.56,
                    selftapMax: 5487.45,
                    selftapTorque: 0.12,
                    prevailTorqueMonitoringMin: 5456.59,
                    prevailTorqueMonitoringMax: 5454.58,
                    prevailTorque: 5454.85,
                    tighteningID: 5464135465,
                    jobSequenceNumber: 54586,
                    syncTighteningID: 64785,
                    toolSerialNumber: "56484897796456",
                    timeStamp: "2018-06-24:23:58:30",
                    timeLastChange: "1993-06-24:23:30:35"
                }
            });

            done();
        });
    });

    it("parser rev 3", (done) => {

        let msg = {
            mid: 61,
            revision: 3,
            payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G05852506852070208000200965321056451111211311411501621701801912000000002502165236522635156236523562454652325547652655665" +
                "27564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:35" +
                "47APERTO CUBO              4814904")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 3,
                payload: {
                    cellID: 25,
                    channelID: 52,
                    torqueControllerName: "FREIO DE MAO - GOLF",
                    numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                    jobID: 8525,
                    parameterSetID: 852,
                    strategy: "Torque control / angle monitoring",
                    _strategy: 2,
                    strategyOptions: [
                        undefined,
                        undefined,
                        "Batch",
                        undefined,
                        "PVT Compensate",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _strategyOptions: 20,
                    batchSize: 6532,
                    batchCounter: 5645,
                    _tighteningStatus: 1,
                    tighteningStatus: "OK",
                    _batchStatus: 1,
                    batchStatus: "OK",
                    _torqueStatus: 1,
                    torqueStatus: "OK",
                    _angleStatus: 1,
                    angleStatus: "OK",
                    _rundownAngleStatus: 0,
                    rundownAngleStatus: "LOW",
                    _currentMonitoringStatus: 2,
                    currentMonitoringStatus: "HIGH",
                    _selftapStatus: 0,
                    selftapStatus: "LOW",
                    _prevailTorqueMonitoringStatus: 0,
                    prevailTorqueMonitoringStatus: "LOW",
                    _prevailTorqueCompensateStatus: 1,
                    prevailTorqueCompensateStatus: "OK",
                    tighteningErrorStatus: [
                        undefined,
                        "Rundown angle min shut off",
                        undefined,
                        "Angle max shut off",
                        "Self-tap torque max shut off",
                        "Self-tap torque min shut off",
                        "Prevail torque max shut off",
                        "Prevail torque min shut off",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _tighteningErrorStatus: 250,
                    torqueMinLimit: 6523.65,
                    torqueMaxLimit: 6351.56,
                    torqueFinalTarget: 6523.56,
                    torque: 5465.23,
                    angleMin: 54765,
                    angleMax: 55665,
                    finalAngleTarget: 56421,
                    angle: 56465,
                    rundownAngleMin: 65235,
                    rundownAngleMax: 56484,
                    rundownAngle: 56646,
                    currentMonitoringMin: 154,
                    currentMonitoringMax: 585,
                    currentMonitoringValue: 546,
                    selftapMin: 4879.56,
                    selftapMax: 5487.45,
                    selftapTorque: 0.12,
                    prevailTorqueMonitoringMin: 5456.59,
                    prevailTorqueMonitoringMax: 5454.58,
                    prevailTorque: 5454.85,
                    tighteningID: 5464135465,
                    jobSequenceNumber: 54586,
                    syncTighteningID: 64785,
                    toolSerialNumber: "56484897796456",
                    timeStamp: "2018-06-24:23:58:30",
                    timeLastChange: "1993-06-24:23:30:35",
                    parameterSetName: "APERTO CUBO",
                    _torqueValuesUnit: 1,
                    torqueValuesUnit: "Nm",
                    _resultType: 4,
                    resultType: "Batch decrement"
                }
            });

            done();
        });
    });

    it("parser rev 4", (done) => {

        let msg = {
            mid: 61,
            revision: 4,
            payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G05852506852070208000200965321056451111211311411501621701801912000000002502165236522635156236523562454652325547652655665" +
                "27564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:35" +
                "47APERTO CUBO              4814904" +
                "50AAAaaaBBBbbbEEEeeeGGGgggg51Diego Luiz Teste MID     52Teste               teste")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 4,
                payload: {
                    cellID: 25,
                    channelID: 52,
                    torqueControllerName: "FREIO DE MAO - GOLF",
                    numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                    jobID: 8525,
                    parameterSetID: 852,
                    strategy: "Torque control / angle monitoring",
                    _strategy: 2,
                    strategyOptions: [
                        undefined,
                        undefined,
                        "Batch",
                        undefined,
                        "PVT Compensate",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _strategyOptions: 20,
                    batchSize: 6532,
                    batchCounter: 5645,
                    _tighteningStatus: 1,
                    tighteningStatus: "OK",
                    _batchStatus: 1,
                    batchStatus: "OK",
                    _torqueStatus: 1,
                    torqueStatus: "OK",
                    _angleStatus: 1,
                    angleStatus: "OK",
                    _rundownAngleStatus: 0,
                    rundownAngleStatus: "LOW",
                    _currentMonitoringStatus: 2,
                    currentMonitoringStatus: "HIGH",
                    _selftapStatus: 0,
                    selftapStatus: "LOW",
                    _prevailTorqueMonitoringStatus: 0,
                    prevailTorqueMonitoringStatus: "LOW",
                    _prevailTorqueCompensateStatus: 1,
                    prevailTorqueCompensateStatus: "OK",
                    tighteningErrorStatus: [
                        undefined,
                        "Rundown angle min shut off",
                        undefined,
                        "Angle max shut off",
                        "Self-tap torque max shut off",
                        "Self-tap torque min shut off",
                        "Prevail torque max shut off",
                        "Prevail torque min shut off",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _tighteningErrorStatus: 250,
                    torqueMinLimit: 6523.65,
                    torqueMaxLimit: 6351.56,
                    torqueFinalTarget: 6523.56,
                    torque: 5465.23,
                    angleMin: 54765,
                    angleMax: 55665,
                    finalAngleTarget: 56421,
                    angle: 56465,
                    rundownAngleMin: 65235,
                    rundownAngleMax: 56484,
                    rundownAngle: 56646,
                    currentMonitoringMin: 154,
                    currentMonitoringMax: 585,
                    currentMonitoringValue: 546,
                    selftapMin: 4879.56,
                    selftapMax: 5487.45,
                    selftapTorque: 0.12,
                    prevailTorqueMonitoringMin: 5456.59,
                    prevailTorqueMonitoringMax: 5454.58,
                    prevailTorque: 5454.85,
                    tighteningID: 5464135465,
                    jobSequenceNumber: 54586,
                    syncTighteningID: 64785,
                    toolSerialNumber: "56484897796456",
                    timeStamp: "2018-06-24:23:58:30",
                    timeLastChange: "1993-06-24:23:30:35",
                    parameterSetName: "APERTO CUBO",
                    _torqueValuesUnit: 1,
                    torqueValuesUnit: "Nm",
                    _resultType: 4,
                    resultType: "Batch decrement",
                    identifierPart2: "AAAaaaBBBbbbEEEeeeGGGgggg",
                    identifierPart3: "Diego Luiz Teste MID",
                    identifierPart4: "Teste               teste"
                }
            });

            done();
        });
    });

    it("parser rev 5", (done) => {

        let msg = {
            mid: 61,
            revision: 5,
            payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G05852506852070208000200965321056451111211311411501621701801912000000002502165236522635156236523562454652325547652655665" +
                "27564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:35" +
                "47APERTO CUBO              481490450AAAaaaBBBbbbEEEeeeGGGgggg51Diego Luiz Teste MID     52Teste               teste53AABB")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 5,
                payload: {
                    cellID: 25,
                    channelID: 52,
                    torqueControllerName: "FREIO DE MAO - GOLF",
                    numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                    jobID: 8525,
                    parameterSetID: 852,
                    strategy: "Torque control / angle monitoring",
                    _strategy: 2,
                    strategyOptions: [
                        undefined,
                        undefined,
                        "Batch",
                        undefined,
                        "PVT Compensate",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _strategyOptions: 20,
                    batchSize: 6532,
                    batchCounter: 5645,
                    _tighteningStatus: 1,
                    tighteningStatus: "OK",
                    _batchStatus: 1,
                    batchStatus: "OK",
                    _torqueStatus: 1,
                    torqueStatus: "OK",
                    _angleStatus: 1,
                    angleStatus: "OK",
                    _rundownAngleStatus: 0,
                    rundownAngleStatus: "LOW",
                    _currentMonitoringStatus: 2,
                    currentMonitoringStatus: "HIGH",
                    _selftapStatus: 0,
                    selftapStatus: "LOW",
                    _prevailTorqueMonitoringStatus: 0,
                    prevailTorqueMonitoringStatus: "LOW",
                    _prevailTorqueCompensateStatus: 1,
                    prevailTorqueCompensateStatus: "OK",
                    tighteningErrorStatus: [
                        undefined,
                        "Rundown angle min shut off",
                        undefined,
                        "Angle max shut off",
                        "Self-tap torque max shut off",
                        "Self-tap torque min shut off",
                        "Prevail torque max shut off",
                        "Prevail torque min shut off",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _tighteningErrorStatus: 250,
                    torqueMinLimit: 6523.65,
                    torqueMaxLimit: 6351.56,
                    torqueFinalTarget: 6523.56,
                    torque: 5465.23,
                    angleMin: 54765,
                    angleMax: 55665,
                    finalAngleTarget: 56421,
                    angle: 56465,
                    rundownAngleMin: 65235,
                    rundownAngleMax: 56484,
                    rundownAngle: 56646,
                    currentMonitoringMin: 154,
                    currentMonitoringMax: 585,
                    currentMonitoringValue: 546,
                    selftapMin: 4879.56,
                    selftapMax: 5487.45,
                    selftapTorque: 0.12,
                    prevailTorqueMonitoringMin: 5456.59,
                    prevailTorqueMonitoringMax: 5454.58,
                    prevailTorque: 5454.85,
                    tighteningID: 5464135465,
                    jobSequenceNumber: 54586,
                    syncTighteningID: 64785,
                    toolSerialNumber: "56484897796456",
                    timeStamp: "2018-06-24:23:58:30",
                    timeLastChange: "1993-06-24:23:30:35",
                    parameterSetName: "APERTO CUBO",
                    _torqueValuesUnit: 1,
                    torqueValuesUnit: "Nm",
                    _resultType: 4,
                    resultType: "Batch decrement",
                    identifierPart2: "AAAaaaBBBbbbEEEeeeGGGgggg",
                    identifierPart3: "Diego Luiz Teste MID",
                    identifierPart4: "Teste               teste",
                    customerToghteningErrorCode: "AABB"
                }
            });

            done();
        });
    });

    it("parser rev 6", (done) => {

        let msg = {
            mid: 61,
            revision: 6,
            payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G05852506852070208000200965321056451111211311411501621701801912000000002502165236522635156236523562454652325547652655665" +
                "27564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:35" +
                "47APERTO CUBO              481490450AAAaaaBBBbbbEEEeeeGGGgggg51Diego Luiz Teste MID     52Teste               teste53AABB54000056550000000032")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 6,
                payload: {
                    cellID: 25,
                    channelID: 52,
                    torqueControllerName: "FREIO DE MAO - GOLF",
                    numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                    jobID: 8525,
                    parameterSetID: 852,
                    strategy: "Torque control / angle monitoring",
                    _strategy: 2,
                    strategyOptions: [
                        undefined,
                        undefined,
                        "Batch",
                        undefined,
                        "PVT Compensate",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _strategyOptions: 20,
                    batchSize: 6532,
                    batchCounter: 5645,
                    _tighteningStatus: 1,
                    tighteningStatus: "OK",
                    _batchStatus: 1,
                    batchStatus: "OK",
                    _torqueStatus: 1,
                    torqueStatus: "OK",
                    _angleStatus: 1,
                    angleStatus: "OK",
                    _rundownAngleStatus: 0,
                    rundownAngleStatus: "LOW",
                    _currentMonitoringStatus: 2,
                    currentMonitoringStatus: "HIGH",
                    _selftapStatus: 0,
                    selftapStatus: "LOW",
                    _prevailTorqueMonitoringStatus: 0,
                    prevailTorqueMonitoringStatus: "LOW",
                    _prevailTorqueCompensateStatus: 1,
                    prevailTorqueCompensateStatus: "OK",
                    tighteningErrorStatus: [
                        undefined,
                        "Rundown angle min shut off",
                        undefined,
                        "Angle max shut off",
                        "Self-tap torque max shut off",
                        "Self-tap torque min shut off",
                        "Prevail torque max shut off",
                        "Prevail torque min shut off",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _tighteningErrorStatus: 250,
                    torqueMinLimit: 6523.65,
                    torqueMaxLimit: 6351.56,
                    torqueFinalTarget: 6523.56,
                    torque: 5465.23,
                    angleMin: 54765,
                    angleMax: 55665,
                    finalAngleTarget: 56421,
                    angle: 56465,
                    rundownAngleMin: 65235,
                    rundownAngleMax: 56484,
                    rundownAngle: 56646,
                    currentMonitoringMin: 154,
                    currentMonitoringMax: 585,
                    currentMonitoringValue: 546,
                    selftapMin: 4879.56,
                    selftapMax: 5487.45,
                    selftapTorque: 0.12,
                    prevailTorqueMonitoringMin: 5456.59,
                    prevailTorqueMonitoringMax: 5454.58,
                    prevailTorque: 5454.85,
                    tighteningID: 5464135465,
                    jobSequenceNumber: 54586,
                    syncTighteningID: 64785,
                    toolSerialNumber: "56484897796456",
                    timeStamp: "2018-06-24:23:58:30",
                    timeLastChange: "1993-06-24:23:30:35",
                    parameterSetName: "APERTO CUBO",
                    _torqueValuesUnit: 1,
                    torqueValuesUnit: "Nm",
                    _resultType: 4,
                    resultType: "Batch decrement",
                    identifierPart2: "AAAaaaBBBbbbEEEeeeGGGgggg",
                    identifierPart3: "Diego Luiz Teste MID",
                    identifierPart4: "Teste               teste",
                    customerToghteningErrorCode: "AABB",
                    prevailTorqueCompensateValue: 0.56,
                    _tighteningErrorStatus2: 32,
                    tighteningErrorStatus2: [
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        "Reaction bar failed",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ]
                }
            });

            done();
        });
    });

    it("parser rev 7", (done) => {

        let msg = {
            mid: 61,
            revision: 7,
            payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G05852506852070208000200965321056451111211311411501621701801912000000002502165236522635156236523562454652325547652655665" +
                "27564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:35" +
                "47APERTO CUBO              481490450AAAaaaBBBbbbEEEeeeGGGgggg51Diego Luiz Teste MID     52Teste               teste53AABB54000056550000000032" +
                "560000100572020202")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 7,
                payload: {
                    cellID: 25,
                    channelID: 52,
                    torqueControllerName: "FREIO DE MAO - GOLF",
                    numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                    jobID: 8525,
                    parameterSetID: 852,
                    strategy: "Torque control / angle monitoring",
                    _strategy: 2,
                    strategyOptions: [
                        undefined,
                        undefined,
                        "Batch",
                        undefined,
                        "PVT Compensate",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _strategyOptions: 20,
                    batchSize: 6532,
                    batchCounter: 5645,
                    _tighteningStatus: 1,
                    tighteningStatus: "OK",
                    _batchStatus: 1,
                    batchStatus: "OK",
                    _torqueStatus: 1,
                    torqueStatus: "OK",
                    _angleStatus: 1,
                    angleStatus: "OK",
                    _rundownAngleStatus: 0,
                    rundownAngleStatus: "LOW",
                    _currentMonitoringStatus: 2,
                    currentMonitoringStatus: "HIGH",
                    _selftapStatus: 0,
                    selftapStatus: "LOW",
                    _prevailTorqueMonitoringStatus: 0,
                    prevailTorqueMonitoringStatus: "LOW",
                    _prevailTorqueCompensateStatus: 1,
                    prevailTorqueCompensateStatus: "OK",
                    tighteningErrorStatus: [
                        undefined,
                        "Rundown angle min shut off",
                        undefined,
                        "Angle max shut off",
                        "Self-tap torque max shut off",
                        "Self-tap torque min shut off",
                        "Prevail torque max shut off",
                        "Prevail torque min shut off",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _tighteningErrorStatus: 250,
                    torqueMinLimit: 6523.65,
                    torqueMaxLimit: 6351.56,
                    torqueFinalTarget: 6523.56,
                    torque: 5465.23,
                    angleMin: 54765,
                    angleMax: 55665,
                    finalAngleTarget: 56421,
                    angle: 56465,
                    rundownAngleMin: 65235,
                    rundownAngleMax: 56484,
                    rundownAngle: 56646,
                    currentMonitoringMin: 154,
                    currentMonitoringMax: 585,
                    currentMonitoringValue: 546,
                    selftapMin: 4879.56,
                    selftapMax: 5487.45,
                    selftapTorque: 0.12,
                    prevailTorqueMonitoringMin: 5456.59,
                    prevailTorqueMonitoringMax: 5454.58,
                    prevailTorque: 5454.85,
                    tighteningID: 5464135465,
                    jobSequenceNumber: 54586,
                    syncTighteningID: 64785,
                    toolSerialNumber: "56484897796456",
                    timeStamp: "2018-06-24:23:58:30",
                    timeLastChange: "1993-06-24:23:30:35",
                    parameterSetName: "APERTO CUBO",
                    _torqueValuesUnit: 1,
                    torqueValuesUnit: "Nm",
                    _resultType: 4,
                    resultType: "Batch decrement",
                    identifierPart2: "AAAaaaBBBbbbEEEeeeGGGgggg",
                    identifierPart3: "Diego Luiz Teste MID",
                    identifierPart4: "Teste               teste",
                    customerToghteningErrorCode: "AABB",
                    prevailTorqueCompensateValue: 0.56,
                    _tighteningErrorStatus2: 32,
                    tighteningErrorStatus2: [
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        "Reaction bar failed",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    compensatedAngle: 1.00,
                    finalAngleDecimal: 20202.02
                }
            });

            done();
        });
    });

    it("parser rev 998", (done) => {

        let msg = {
            mid: 61,
            revision: 998,
            payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G05852506852070208000200965321056451111211311411501621701801912000000002502165236522635156236523562454652325547652655665" +
                "27564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:35" +
                "47APERTO CUBO              481490450AAAaaaBBBbbbEEEeeeGGGgggg51Diego Luiz Teste MID     52Teste               teste53AABB54000056550000000032" +
                "5605570158ABCDEF12345")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 998,
                payload: {
                    cellID: 25,
                    channelID: 52,
                    torqueControllerName: "FREIO DE MAO - GOLF",
                    numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                    jobID: 8525,
                    parameterSetID: 852,
                    strategy: "Torque control / angle monitoring",
                    _strategy: 2,
                    strategyOptions: [
                        undefined,
                        undefined,
                        "Batch",
                        undefined,
                        "PVT Compensate",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _strategyOptions: 20,
                    batchSize: 6532,
                    batchCounter: 5645,
                    _tighteningStatus: 1,
                    tighteningStatus: "OK",
                    _batchStatus: 1,
                    batchStatus: "OK",
                    _torqueStatus: 1,
                    torqueStatus: "OK",
                    _angleStatus: 1,
                    angleStatus: "OK",
                    _rundownAngleStatus: 0,
                    rundownAngleStatus: "LOW",
                    _currentMonitoringStatus: 2,
                    currentMonitoringStatus: "HIGH",
                    _selftapStatus: 0,
                    selftapStatus: "LOW",
                    _prevailTorqueMonitoringStatus: 0,
                    prevailTorqueMonitoringStatus: "LOW",
                    _prevailTorqueCompensateStatus: 1,
                    prevailTorqueCompensateStatus: "OK",
                    tighteningErrorStatus: [
                        undefined,
                        "Rundown angle min shut off",
                        undefined,
                        "Angle max shut off",
                        "Self-tap torque max shut off",
                        "Self-tap torque min shut off",
                        "Prevail torque max shut off",
                        "Prevail torque min shut off",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    _tighteningErrorStatus: 250,
                    torqueMinLimit: 6523.65,
                    torqueMaxLimit: 6351.56,
                    torqueFinalTarget: 6523.56,
                    torque: 5465.23,
                    angleMin: 54765,
                    angleMax: 55665,
                    finalAngleTarget: 56421,
                    angle: 56465,
                    rundownAngleMin: 65235,
                    rundownAngleMax: 56484,
                    rundownAngle: 56646,
                    currentMonitoringMin: 154,
                    currentMonitoringMax: 585,
                    currentMonitoringValue: 546,
                    selftapMin: 4879.56,
                    selftapMax: 5487.45,
                    selftapTorque: 0.12,
                    prevailTorqueMonitoringMin: 5456.59,
                    prevailTorqueMonitoringMax: 5454.58,
                    prevailTorque: 5454.85,
                    tighteningID: 5464135465,
                    jobSequenceNumber: 54586,
                    syncTighteningID: 64785,
                    toolSerialNumber: "56484897796456",
                    timeStamp: "2018-06-24:23:58:30",
                    timeLastChange: "1993-06-24:23:30:35",
                    parameterSetName: "APERTO CUBO",
                    _torqueValuesUnit: 1,
                    torqueValuesUnit: "Nm",
                    _resultType: 4,
                    resultType: "Batch decrement",
                    identifierPart2: "AAAaaaBBBbbbEEEeeeGGGgggg",
                    identifierPart3: "Diego Luiz Teste MID",
                    identifierPart4: "Teste               teste",
                    customerToghteningErrorCode: "AABB",
                    prevailTorqueCompensateValue: 0.56,
                    _tighteningErrorStatus2: 32,
                    tighteningErrorStatus2: [
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        "Reaction bar failed",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    numberStagesMultiStage: 5,
                    numberStageResults: 1,
                    stageResult: "ABCDEF12345"
                }
            });

            done();
        });
    });

    it("parser rev 999", (done) => {

        let msg = {
            mid: 61,
            revision: 999,
            payload: Buffer.from("KNX0102365478501541BR123608123357485740110123456987652018-02-25:11:33:222018-01-20:20:30:559876543210")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 999,
                payload: {
                    numberVIN: "KNX0102365478501541BR1236",
                    jobID: 8,
                    parameterSetID: 123,
                    batchSize: 3574,
                    batchCounter: 8574,
                    _tighteningStatus: 1,
                    tighteningStatus: "OK",
                    _batchStatus: 0,
                    batchStatus: "NOK",
                    _torqueStatus: 1,
                    torqueStatus: "OK",
                    angleStatus: "LOW",
                    _angleStatus: 0,
                    torque: 1234.56,
                    angle: 98765,
                    timeStamp: "2018-02-25:11:33:22",
                    timeLastChange: "2018-01-20:20:30:55",
                    tighteningID: 9876543210
                }
            });

            done();
        });
    });

    it("serializer rev 1", (done) => {

        let msg = {
            mid: 61,
            revision: 1,
            payload: {
                cellID: 5,
                channelID: 88,
                torqueControllerName: "Teste Diego - Airbag",
                numberVIN: "KNX25698542QWSDFE-56984AS",
                jobID: 2,
                parameterSetID: 753,
                batchSize: 8562,
                batchCounter: 7541,
                tighteningStatus: "OK",
                torqueStatus: "OK",
                angleStatus: "OK",
                torqueMinLimit: 2325.29,
                torqueMaxLimit: 8562.14,
                torqueFinalTarget: 7546.82,
                torque: 2365.98,
                angleMin: 25836,
                angleMax: 45678,
                finalAngleTarget: 14785,
                angle: 12548,
                timeStamp: "2018-05-29:16:55:55",
                timeLastChange: "2018-05-01:00:10:55",
                batchStatus: "OK",
                tighteningID: 2536589652

            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 1,
                payload: Buffer.from("010005028803Teste Diego - Airbag     04KNX25698542QWSDFE-56984AS050206753078562087541091101111122325291385621414754682152365981625836174567818147851912548202018-05-29:16:55:55212018-05-01:00:10:55221232536589652")
            });

            done();
        });
    });

    it("serializer rev 2", (done) => {

        let msg = {
            mid: 61,
            revision: 2,
            payload: {
                cellID: 25,
                channelID: 52,
                torqueControllerName: "FREIO DE MAO - GOLF",
                numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                jobID: 8525,
                parameterSetID: 852,
                strategy: 54,
                strategyOptions: 65698,
                batchSize: 6532,
                batchCounter: 5645,
                tighteningStatus: 1,
                batchStatus: 1,
                torqueStatus: "High",
                angleStatus: 1,
                rundownAngleStatus: 0,
                currentMonitoringStatus: 2,
                selftapStatus: 3,
                prevailTorqueMonitoringStatus: 9,
                prevailTorqueCompensateStatus: 8,
                tighteningErrorStatus: 9856875265,
                torqueMinLimit: 6523.65,
                torqueMaxLimit: 6351.56,
                torqueFinalTarget: 6523.56,
                torque: 5465.23,
                angleMin: 54765,
                angleMax: 55665,
                finalAngleTarget: 56421,
                angle: 56465,
                rundownAngleMin: 65235,
                rundownAngleMax: 56484,
                rundownAngle: 56646,
                currentMonitoringMin: 154,
                currentMonitoringMax: 585,
                currentMonitoringValue: 546,
                selftapMin: 4879.56,
                selftapMax: 5487.45,
                selftapTorque: 0.12,
                prevailTorqueMonitoringMin: 5456.59,
                prevailTorqueMonitoringMax: 5454.58,
                prevailTorque: 5454.85,
                tighteningID: 5464135465,
                jobSequenceNumber: 54586,
                syncTighteningID: 64785,
                toolSerialNumber: "56484897796456",
                timeStamp: "2018-06-24:23:58:30",
                timeLastChange: "1993-06-24:23:30:35"
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 2,
                payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G0585250685207540865698096532105645111121132141150162173189198209856875265216523652263515623652356245465232554765265566527564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:35")
            });

            done();
        });
    });

    it("serializer rev 3", (done) => {

        let msg = {
            mid: 61,
            revision: 3,
            payload: {
                cellID: 25,
                channelID: 52,
                torqueControllerName: "FREIO DE MAO - GOLF",
                numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                jobID: 8525,
                parameterSetID: 852,
                strategy: 54,
                strategyOptions: 65698,
                batchSize: 6532,
                batchCounter: 5645,
                tighteningStatus: 1,
                batchStatus: 1,
                torqueStatus: 1,
                angleStatus: 1,
                rundownAngleStatus: 0,
                currentMonitoringStatus: 2,
                selftapStatus: 3,
                prevailTorqueMonitoringStatus: 9,
                prevailTorqueCompensateStatus: 8,
                tighteningErrorStatus: 9856875265,
                torqueMinLimit: 6523.65,
                torqueMaxLimit: 6351.56,
                torqueFinalTarget: 6523.56,
                torque: 5465.23,
                angleMin: 54765,
                angleMax: 55665,
                finalAngleTarget: 56421,
                angle: 56465,
                rundownAngleMin: 65235,
                rundownAngleMax: 56484,
                rundownAngle: 56646,
                currentMonitoringMin: 154,
                currentMonitoringMax: 585,
                currentMonitoringValue: 546,
                selftapMin: 4879.56,
                selftapMax: 5487.45,
                selftapTorque: 0.12,
                prevailTorqueMonitoringMin: 5456.59,
                prevailTorqueMonitoringMax: 5454.58,
                prevailTorque: 5454.85,
                tighteningID: 5464135465,
                jobSequenceNumber: 54586,
                syncTighteningID: 64785,
                toolSerialNumber: "56484897796456",
                timeStamp: "2018-06-24:23:58:30",
                timeLastChange: "1993-06-24:23:30:35",
                parameterSetName: "APERTO CUBO",
                torqueValuesUnit: "Nm",
                resultType: "Reference setup"
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 3,
                payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G0585250685207540865698096532105645111121131141150162173189198209856875265216523652263515623652356245465232554765265566527564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:3547APERTO CUBO              4814908")
            });

            done();
        });
    });

    it("serializer rev 4", (done) => {

        let msg = {
            mid: 61,
            revision: 4,
            payload: {
                cellID: 25,
                channelID: 52,
                torqueControllerName: "FREIO DE MAO - GOLF",
                numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                jobID: 8525,
                parameterSetID: 852,
                strategy: 54,
                strategyOptions: 65698,
                batchSize: 6532,
                batchCounter: 5645,
                tighteningStatus: 1,
                batchStatus: 1,
                torqueStatus: 1,
                angleStatus: 1,
                rundownAngleStatus: 0,
                currentMonitoringStatus: 2,
                selftapStatus: 3,
                prevailTorqueMonitoringStatus: 9,
                prevailTorqueCompensateStatus: 8,
                tighteningErrorStatus: 9856875265,
                torqueMinLimit: 6523.65,
                torqueMaxLimit: 6351.56,
                torqueFinalTarget: 6523.56,
                torque: 5465.23,
                angleMin: 54765,
                angleMax: 55665,
                finalAngleTarget: 56421,
                angle: 56465,
                rundownAngleMin: 65235,
                rundownAngleMax: 56484,
                rundownAngle: 56646,
                currentMonitoringMin: 154,
                currentMonitoringMax: 585,
                currentMonitoringValue: 546,
                selftapMin: 4879.56,
                selftapMax: 5487.45,
                selftapTorque: 0.12,
                prevailTorqueMonitoringMin: 5456.59,
                prevailTorqueMonitoringMax: 5454.58,
                prevailTorque: 5454.85,
                tighteningID: 5464135465,
                jobSequenceNumber: 54586,
                syncTighteningID: 64785,
                toolSerialNumber: "56484897796456",
                timeStamp: "2018-06-24:23:58:30",
                timeLastChange: "1993-06-24:23:30:35",
                parameterSetName: "APERTO CUBO",
                torqueValuesUnit: 1,
                resultType: 88,
                identifierPart2: "AAAaaaBBBbbbEEEeeeGGGgggg",
                identifierPart3: "Diego Luiz Teste MID",
                identifierPart4: "Teste               teste"
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 4,
                payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G0585250685207540865698096532105645111121131141150162173189198209856875265216523652263515623652356245465232554765265566527564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:3547APERTO CUBO              481498850AAAaaaBBBbbbEEEeeeGGGgggg51Diego Luiz Teste MID     52Teste               teste")
            });

            done();
        });
    });

    it("serializer rev 5", (done) => {

        let msg = {
            mid: 61,
            revision: 5,
            payload: {
                cellID: 25,
                channelID: 52,
                torqueControllerName: "FREIO DE MAO - GOLF",
                numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                jobID: 8525,
                parameterSetID: 852,
                strategy: 54,
                strategyOptions: 65698,
                batchSize: 6532,
                batchCounter: 5645,
                tighteningStatus: 1,
                batchStatus: 1,
                torqueStatus: 1,
                angleStatus: 1,
                rundownAngleStatus: 0,
                currentMonitoringStatus: 2,
                selftapStatus: 3,
                prevailTorqueMonitoringStatus: 9,
                prevailTorqueCompensateStatus: 8,
                tighteningErrorStatus: 9856875265,
                torqueMinLimit: 6523.65,
                torqueMaxLimit: 6351.56,
                torqueFinalTarget: 6523.56,
                torque: 5465.23,
                angleMin: 54765,
                angleMax: 55665,
                finalAngleTarget: 56421,
                angle: 56465,
                rundownAngleMin: 65235,
                rundownAngleMax: 56484,
                rundownAngle: 56646,
                currentMonitoringMin: 154,
                currentMonitoringMax: 585,
                currentMonitoringValue: 546,
                selftapMin: 4879.56,
                selftapMax: 5487.45,
                selftapTorque: 0.12,
                prevailTorqueMonitoringMin: 5456.59,
                prevailTorqueMonitoringMax: 5454.58,
                prevailTorque: 5454.85,
                tighteningID: 5464135465,
                jobSequenceNumber: 54586,
                syncTighteningID: 64785,
                toolSerialNumber: "56484897796456",
                timeStamp: "2018-06-24:23:58:30",
                timeLastChange: "1993-06-24:23:30:35",
                parameterSetName: "APERTO CUBO",
                torqueValuesUnit: 1,
                resultType: 88,
                identifierPart2: "AAAaaaBBBbbbEEEeeeGGGgggg",
                identifierPart3: "Diego Luiz Teste MID",
                identifierPart4: "Teste               teste",
                customerToghteningErrorCode: "AABB"
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 5,
                payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G0585250685207540865698096532105645111121131141150162173189198209856875265216523652263515623652356245465232554765265566527564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:3547APERTO CUBO              481498850AAAaaaBBBbbbEEEeeeGGGgggg51Diego Luiz Teste MID     52Teste               teste53AABB")
            });

            done();
        });
    });

    it("serializer rev 6", (done) => {

        let msg = {
            mid: 61,
            revision: 6,
            payload: {
                cellID: 25,
                channelID: 52,
                torqueControllerName: "FREIO DE MAO - GOLF",
                numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                jobID: 8525,
                parameterSetID: 852,
                strategy: "Torque control",
                strategyOptions: 65698,
                batchSize: 6532,
                batchCounter: 5645,
                tighteningStatus: 1,
                batchStatus: 1,
                torqueStatus: 1,
                angleStatus: 1,
                rundownAngleStatus: 0,
                currentMonitoringStatus: 2,
                selftapStatus: 3,
                prevailTorqueMonitoringStatus: 9,
                prevailTorqueCompensateStatus: 8,
                tighteningErrorStatus: 9856875265,
                torqueMinLimit: 6523.65,
                torqueMaxLimit: 6351.56,
                torqueFinalTarget: 6523.56,
                torque: 5465.23,
                angleMin: 54765,
                angleMax: 55665,
                finalAngleTarget: 56421,
                angle: 56465,
                rundownAngleMin: 65235,
                rundownAngleMax: 56484,
                rundownAngle: 56646,
                currentMonitoringMin: 154,
                currentMonitoringMax: 585,
                currentMonitoringValue: 546,
                selftapMin: 4879.56,
                selftapMax: 5487.45,
                selftapTorque: 0.12,
                prevailTorqueMonitoringMin: 5456.59,
                prevailTorqueMonitoringMax: 5454.58,
                prevailTorque: 5454.85,
                tighteningID: 5464135465,
                jobSequenceNumber: 54586,
                syncTighteningID: 64785,
                toolSerialNumber: "56484897796456",
                timeStamp: "2018-06-24:23:58:30",
                timeLastChange: "1993-06-24:23:30:35",
                parameterSetName: "APERTO CUBO",
                torqueValuesUnit: 1,
                resultType: 88,
                identifierPart2: "AAAaaaBBBbbbEEEeeeGGGgggg",
                identifierPart3: "Diego Luiz Teste MID",
                identifierPart4: "Teste               teste",
                customerToghteningErrorCode: "AABB",
                prevailTorqueCompensateValue: 0.56,
                tighteningErrorStatus2: [
                    undefined,
                    true,
                    undefined,
                    true,
                    true,
                    true,
                    true,
                    true,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                ]
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 6,
                payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G0585250685207010865698096532105645111121131141150162173189198209856875265216523652263515623652356245465232554765265566527564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:3547APERTO CUBO              481498850AAAaaaBBBbbbEEEeeeGGGgggg51Diego Luiz Teste MID     52Teste               teste53AABB54000056550000000250")
            });

            done();
        });
    });

    it("serializer rev 7", (done) => {

        let msg = {
            mid: 61,
            revision: 7,
            payload: {
                cellID: 25,
                channelID: 52,
                torqueControllerName: "FREIO DE MAO - GOLF",
                numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                jobID: 8525,
                parameterSetID: 852,
                strategy: 54,
                strategyOptions: 65698,
                batchSize: 6532,
                batchCounter: 5645,
                tighteningStatus: 1,
                batchStatus: 1,
                torqueStatus: 1,
                angleStatus: 1,
                rundownAngleStatus: 0,
                currentMonitoringStatus: 2,
                selftapStatus: 3,
                prevailTorqueMonitoringStatus: 9,
                prevailTorqueCompensateStatus: 8,
                tighteningErrorStatus: 9856875265,
                torqueMinLimit: 6523.65,
                torqueMaxLimit: 6351.56,
                torqueFinalTarget: 6523.56,
                torque: 5465.23,
                angleMin: 54765,
                angleMax: 55665,
                finalAngleTarget: 56421,
                angle: 56465,
                rundownAngleMin: 65235,
                rundownAngleMax: 56484,
                rundownAngle: 56646,
                currentMonitoringMin: 154,
                currentMonitoringMax: 585,
                currentMonitoringValue: 546,
                selftapMin: 4879.56,
                selftapMax: 5487.45,
                selftapTorque: 0.12,
                prevailTorqueMonitoringMin: 5456.59,
                prevailTorqueMonitoringMax: 5454.58,
                prevailTorque: 5454.85,
                tighteningID: 5464135465,
                jobSequenceNumber: 54586,
                syncTighteningID: 64785,
                toolSerialNumber: "56484897796456",
                timeStamp: "2018-06-24:23:58:30",
                timeLastChange: "1993-06-24:23:30:35",
                parameterSetName: "APERTO CUBO",
                torqueValuesUnit: 1,
                resultType: 88,
                identifierPart2: "AAAaaaBBBbbbEEEeeeGGGgggg",
                identifierPart3: "Diego Luiz Teste MID",
                identifierPart4: "Teste               teste",
                customerToghteningErrorCode: "AABB",
                prevailTorqueCompensateValue: 0.56,
                tighteningErrorStatus2: 65000,
                compensatedAngle: 1.00,
                finalAngleDecimal: 20202.02
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 7,
                payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G0585250685207540865698096532105645111121131141150162173189198209856875265216523652263515623652356245465232554765265566527564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:3547APERTO CUBO              481498850AAAaaaBBBbbbEEEeeeGGGgggg51Diego Luiz Teste MID     52Teste               teste53AABB54000056550000065000560000100572020202")
            });

            done();
        });
    });

    it("serializer rev 998", (done) => {

        let msg = {
            mid: 61,
            revision: 998,
            payload: {
                cellID: 25,
                channelID: 52,
                torqueControllerName: "FREIO DE MAO - GOLF",
                numberVIN: "KXNHWSDGDGHGVDHGFGHFGF52G",
                jobID: 8525,
                parameterSetID: 852,
                strategy: 54,
                strategyOptions: 65698,
                batchSize: 6532,
                batchCounter: 5645,
                tighteningStatus: 1,
                batchStatus: 1,
                torqueStatus: 1,
                angleStatus: 1,
                rundownAngleStatus: 0,
                currentMonitoringStatus: 2,
                selftapStatus: 3,
                prevailTorqueMonitoringStatus: 9,
                prevailTorqueCompensateStatus: 8,
                tighteningErrorStatus: 9856875265,
                torqueMinLimit: 6523.65,
                torqueMaxLimit: 6351.56,
                torqueFinalTarget: 6523.56,
                torque: 5465.23,
                angleMin: 54765,
                angleMax: 55665,
                finalAngleTarget: 56421,
                angle: 56465,
                rundownAngleMin: 65235,
                rundownAngleMax: 56484,
                rundownAngle: 56646,
                currentMonitoringMin: 154,
                currentMonitoringMax: 585,
                currentMonitoringValue: 546,
                selftapMin: 4879.56,
                selftapMax: 5487.45,
                selftapTorque: 0.12,
                prevailTorqueMonitoringMin: 5456.59,
                prevailTorqueMonitoringMax: 5454.58,
                prevailTorque: 5454.85,
                tighteningID: 5464135465,
                jobSequenceNumber: 54586,
                syncTighteningID: 64785,
                toolSerialNumber: "56484897796456",
                timeStamp: "2018-06-24:23:58:30",
                timeLastChange: "1993-06-24:23:30:35",
                parameterSetName: "APERTO CUBO",
                torqueValuesUnit: 1,
                resultType: 88,
                identifierPart2: "AAAaaaBBBbbbEEEeeeGGGgggg",
                identifierPart3: "Diego Luiz Teste MID",
                identifierPart4: "Teste               teste",
                customerToghteningErrorCode: "AABB",
                prevailTorqueCompensateValue: 0.56,
                tighteningErrorStatus2: 65000,
                numberStagesMultiStage: 5,
                numberStageResults: 1,
                stageResult: "ABCDEF12345"
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 998,
                payload: Buffer.from("010025025203FREIO DE MAO - GOLF      04KXNHWSDGDGHGVDHGFGHFGF52G0585250685207540865698096532105645111121131141150162173189198209856875265216523652263515623652356245465232554765265566527564212856465296523530564843156646321543358534546354879563654874537000012385456593954545840545485415464135465425458643647854456484897796456452018-06-24:23:58:30461993-06-24:23:30:3547APERTO CUBO              481498850AAAaaaBBBbbbEEEeeeGGGgggg51Diego Luiz Teste MID     52Teste               teste53AABB540000565500000650005605570158ABCDEF12345")
            });

            done();
        });
    });

    it("serializer rev 999", (done) => {

        let msg = {
            mid: 61,
            revision: 999,
            payload: {
                numberVIN: "KNX0102365478501541BR1236",
                jobID: 8,
                parameterSetID: 123,
                batchSize: 3574,
                batchCounter: 8574,
                batchStatus: "NOK",
                tighteningStatus: "OK",
                torqueStatus: "OK",
                angleStatus: "Low",
                torque: 1234.56,
                angle: 98765,
                timeStamp: "2018-02-25:11:33:22",
                timeLastChange: "2018-01-20:20:30:55",
                tighteningID: 9876543210
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 61,
                revision: 999,
                payload: Buffer.from("KNX0102365478501541BR123608123357485740110123456987652018-02-25:11:33:222018-01-20:20:30:559876543210")
            });

            done();
        });
    });

    it("Should return error, parser with invalid revision", (done) => {

        let msg = {
            mid: 61,
            revision: 12,
            payload: Buffer.from("")
        };

        MID.parser(msg, {}, (err, data) => {
            expect(err).to.be.an('error');
            done();
        });
    });

    it("Should return error, serializer with invalid revision", (done) => {

        let msg = {
            mid: 61,
            revision: 12,
            payload: {}
        };

        MID.serializer(msg, {}, (err, data) => {
            expect(err).to.be.an('error');
            done();
        });
    });

    it("Should return array revision", (done) => {

        let revisions = MID.revision();

        expect(revisions).to.have.lengthOf(7);
        done();

    });


});