//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const {
    expect
} = require('chai');

const MID = require('../src/mid/0065.js');

describe("MID 0065", () => {

    it("parser rev 1", (done) => {

        let msg = {
            mid: 65,
            revision: 1,
            payload: Buffer.from("01987654987902KNV158746985321BGR152498503565041111050061071" +
                "080002310900180102017-05-30:15:30:55111")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 1,
                payload: {
                    tighteningID: 9876549879,
                    numberVIN: "KNV158746985321BGR1524985",
                    parameterSetID: 565,
                    batchCounter: 1111,
                    tighteningStatus: 0,
                    torqueStatus: 1,
                    angleStatus: 1,
                    torque: 231,
                    angle: 180,
                    timeStamp: "2017-05-30:15:30:55",
                    batchStatus: 1
                }
            });

            done();
        });
    });

    it("parser rev 2", (done) => {

        let msg = {
            mid: 65,
            revision: 2,
            payload: Buffer.from("01369852147502KNX9875421547854DCVF25VFG031056048780508" +
                "0665000076565083636090100110120130140150160170189638527415" +
                "19000656200002521123452255523654789246325412585236" +
                "26254632795623145874512282018-06-06:12:20:00")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 2,
                payload: {
                    tighteningID: 3698521475,
                    numberVIN: "KNX9875421547854DCVF25VFG",
                    jobID: 1056,
                    parameterSetID: 878,
                    strategy: 8,
                    strategyOptions: 65000,
                    batchSize: 6565,
                    batchCounter: 3636,
                    tighteningStatus: 0,
                    batchStatus: 0,
                    torqueStatus: 0,
                    angleStatus: 0,
                    rundownAngleStatus: 0,
                    currentMonitoringStatus: 0,
                    selftapStatus: 0,
                    prevailTorqueMonitoringStatus: 0,
                    prevailTorqueCompensateStatus: 0,
                    tighteningErrorStatus: 9638527415,
                    torque: 656,
                    angle: 25,
                    rundownAngle: 12345,
                    currentMonitoringValue: 555,
                    selftapTorque: 654789,
                    prevailTorque: 632541,
                    jobSequenceNumber: 85236,
                    syncTighteningID: 25463,
                    toolSerialNumber: "95623145874512",
                    timeStamp: "2018-06-06:12:20:00"
                }
            });

            done();
        });
    });

    it("parser rev 3", (done) => {

        let msg = {
            mid: 65,
            revision: 3,
            payload: Buffer.from("01369852147502KNX9875421547854DCVF25VFG031056048780508" +
                "0665000076565083636090100110120130140150160170189638527415" +
                "19000656200002521123452255523654789246325412585236" +
                "26254632795623145874512282018-06-06:12:20:002923007")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 3,
                payload: {
                    tighteningID: 3698521475,
                    numberVIN: "KNX9875421547854DCVF25VFG",
                    jobID: 1056,
                    parameterSetID: 878,
                    strategy: 8,
                    strategyOptions: 65000,
                    batchSize: 6565,
                    batchCounter: 3636,
                    tighteningStatus: 0,
                    batchStatus: 0,
                    torqueStatus: 0,
                    angleStatus: 0,
                    rundownAngleStatus: 0,
                    currentMonitoringStatus: 0,
                    selftapStatus: 0,
                    prevailTorqueMonitoringStatus: 0,
                    prevailTorqueCompensateStatus: 0,
                    tighteningErrorStatus: 9638527415,
                    torque: 656,
                    angle: 25,
                    rundownAngle: 12345,
                    currentMonitoringValue: 555,
                    selftapTorque: 654789,
                    prevailTorque: 632541,
                    jobSequenceNumber: 85236,
                    syncTighteningID: 25463,
                    toolSerialNumber: "95623145874512",
                    timeStamp: "2018-06-06:12:20:00",
                    torqueValuesUnit: 2,
                    resultType: 7
                }
            });

            done();
        });
    });

    it("parser rev 4", (done) => {

        let msg = {
            mid: 65,
            revision: 4,
            payload: Buffer.from("01369852147502KNX9875421547854DCVF25VFG031056048780508" +
                "0665000076565083636090100110120130140150160170189638527415" +
                "19000656200002521123452255523654789246325412585236" +
                "26254632795623145874512282018-06-06:12:20:002923007" +
                "31Part2-Sucesso     ASD    32Part3-Sucesso     QWE    " +
                "33Part4-Sucesso     ZXC    ")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 4,
                payload: {
                    tighteningID: 3698521475,
                    numberVIN: "KNX9875421547854DCVF25VFG",
                    jobID: 1056,
                    parameterSetID: 878,
                    strategy: 8,
                    strategyOptions: 65000,
                    batchSize: 6565,
                    batchCounter: 3636,
                    tighteningStatus: 0,
                    batchStatus: 0,
                    torqueStatus: 0,
                    angleStatus: 0,
                    rundownAngleStatus: 0,
                    currentMonitoringStatus: 0,
                    selftapStatus: 0,
                    prevailTorqueMonitoringStatus: 0,
                    prevailTorqueCompensateStatus: 0,
                    tighteningErrorStatus: 9638527415,
                    torque: 656,
                    angle: 25,
                    rundownAngle: 12345,
                    currentMonitoringValue: 555,
                    selftapTorque: 654789,
                    prevailTorque: 632541,
                    jobSequenceNumber: 85236,
                    syncTighteningID: 25463,
                    toolSerialNumber: "95623145874512",
                    timeStamp: "2018-06-06:12:20:00",
                    torqueValuesUnit: 2,
                    resultType: 7,
                    identifierPart2: "Part2-Sucesso     ASD",
                    identifierPart3: "Part3-Sucesso     QWE",
                    identifierPart4: "Part4-Sucesso     ZXC"
                }
            });

            done();
        });
    });

    it("parser rev 5", (done) => {

        let msg = {
            mid: 65,
            revision: 5,
            payload: Buffer.from("01369852147502KNX9875421547854DCVF25VFG031056048780508" +
                "0665000076565083636090100110120130140150160170189638527415" +
                "19000656200002521123452255523654789246325412585236" +
                "26254632795623145874512282018-06-06:12:20:002923007" +
                "31Part2-Sucesso     ASD    32Part3-Sucesso     QWE    " +
                "33Part4-Sucesso     ZXC    34AABB")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 5,
                payload: {
                    tighteningID: 3698521475,
                    numberVIN: "KNX9875421547854DCVF25VFG",
                    jobID: 1056,
                    parameterSetID: 878,
                    strategy: 8,
                    strategyOptions: 65000,
                    batchSize: 6565,
                    batchCounter: 3636,
                    tighteningStatus: 0,
                    batchStatus: 0,
                    torqueStatus: 0,
                    angleStatus: 0,
                    rundownAngleStatus: 0,
                    currentMonitoringStatus: 0,
                    selftapStatus: 0,
                    prevailTorqueMonitoringStatus: 0,
                    prevailTorqueCompensateStatus: 0,
                    tighteningErrorStatus: 9638527415,
                    torque: 656,
                    angle: 25,
                    rundownAngle: 12345,
                    currentMonitoringValue: 555,
                    selftapTorque: 654789,
                    prevailTorque: 632541,
                    jobSequenceNumber: 85236,
                    syncTighteningID: 25463,
                    toolSerialNumber: "95623145874512",
                    timeStamp: "2018-06-06:12:20:00",
                    torqueValuesUnit: 2,
                    resultType: 7,
                    identifierPart2: "Part2-Sucesso     ASD",
                    identifierPart3: "Part3-Sucesso     QWE",
                    identifierPart4: "Part4-Sucesso     ZXC",
                    customerToghteningErrorCode: "AABB"
                }
            });

            done();
        });
    });

    it("parser rev 6", (done) => {

        let msg = {
            mid: 65,
            revision: 6,
            payload: Buffer.from("01369852147502KNX9875421547854DCVF25VFG031056048780508" +
                "0665000076565083636090100110120130140150160170189638527415" +
                "19000656200002521123452255523654789246325412585236" +
                "26254632795623145874512282018-06-06:12:20:002923007" +
                "31Part2-Sucesso     ASD    32Part3-Sucesso     QWE    " +
                "33Part4-Sucesso     ZXC    34AABB35000012360000000565")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 6,
                payload: {
                    tighteningID: 3698521475,
                    numberVIN: "KNX9875421547854DCVF25VFG",
                    jobID: 1056,
                    parameterSetID: 878,
                    strategy: 8,
                    strategyOptions: 65000,
                    batchSize: 6565,
                    batchCounter: 3636,
                    tighteningStatus: 0,
                    batchStatus: 0,
                    torqueStatus: 0,
                    angleStatus: 0,
                    rundownAngleStatus: 0,
                    currentMonitoringStatus: 0,
                    selftapStatus: 0,
                    prevailTorqueMonitoringStatus: 0,
                    prevailTorqueCompensateStatus: 0,
                    tighteningErrorStatus: 9638527415,
                    torque: 656,
                    angle: 25,
                    rundownAngle: 12345,
                    currentMonitoringValue: 555,
                    selftapTorque: 654789,
                    prevailTorque: 632541,
                    jobSequenceNumber: 85236,
                    syncTighteningID: 25463,
                    toolSerialNumber: "95623145874512",
                    timeStamp: "2018-06-06:12:20:00",
                    torqueValuesUnit: 2,
                    resultType: 7,
                    identifierPart2: "Part2-Sucesso     ASD",
                    identifierPart3: "Part3-Sucesso     QWE",
                    identifierPart4: "Part4-Sucesso     ZXC",
                    customerToghteningErrorCode: "AABB",
                    prevailTorqueCompensateValue: 12,
                    toghteningErrorStatus: 565
                }
            });

            done();
        });
    });

    it("parser rev 7", (done) => {

        let msg = {
            mid: 65,
            revision: 7,
            payload: Buffer.from("01369852147502KNX9875421547854DCVF25VFG031056048780508" +
                "0665000076565083636090100110120130140150160170189638527415" +
                "19000656200002521123452255523654789246325412585236" +
                "26254632795623145874512282018-06-06:12:20:002923007" +
                "31Part2-Sucesso     ASD    32Part3-Sucesso     QWE    " +
                "33Part4-Sucesso     ZXC    34AABB35000012360000000565" +
                "37000098765438APERTO DIFERENCIAL       ")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 7,
                payload: {
                    tighteningID: 3698521475,
                    numberVIN: "KNX9875421547854DCVF25VFG",
                    jobID: 1056,
                    parameterSetID: 878,
                    strategy: 8,
                    strategyOptions: 65000,
                    batchSize: 6565,
                    batchCounter: 3636,
                    tighteningStatus: 0,
                    batchStatus: 0,
                    torqueStatus: 0,
                    angleStatus: 0,
                    rundownAngleStatus: 0,
                    currentMonitoringStatus: 0,
                    selftapStatus: 0,
                    prevailTorqueMonitoringStatus: 0,
                    prevailTorqueCompensateStatus: 0,
                    tighteningErrorStatus: 9638527415,
                    torque: 656,
                    angle: 25,
                    rundownAngle: 12345,
                    currentMonitoringValue: 555,
                    selftapTorque: 654789,
                    prevailTorque: 632541,
                    jobSequenceNumber: 85236,
                    syncTighteningID: 25463,
                    toolSerialNumber: "95623145874512",
                    timeStamp: "2018-06-06:12:20:00",
                    torqueValuesUnit: 2,
                    resultType: 7,
                    identifierPart2: "Part2-Sucesso     ASD",
                    identifierPart3: "Part3-Sucesso     QWE",
                    identifierPart4: "Part4-Sucesso     ZXC",
                    customerToghteningErrorCode: "AABB",
                    prevailTorqueCompensateValue: 12,
                    toghteningErrorStatus: 565,
                    stationID: 987654,
                    stationName: "APERTO DIFERENCIAL"
                }
            });

            done();
        });
    });

    it("serializer rev 1", (done) => {

        let msg = {
            mid: 65,
            revision: 1,
            payload: {
                tighteningID: 9876549879,
                numberVIN: "KNV158746985321BGR1524985",
                parameterSetID: 565,
                batchCounter: 1111,
                tighteningStatus: 0,
                torqueStatus: 1,
                angleStatus: 1,
                torque: 231,
                angle: 180,
                timeStamp: "2017-05-30:15:30:55",
                batchStatus: 1
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 1,
                payload: Buffer.from("01987654987902KNV158746985321BGR152498503565041111050061071" +
                    "080002310900180102017-05-30:15:30:55111")
            });

            done();
        });
    });

    it("serializer rev 2", (done) => {

        let msg = {
            mid: 65,
            revision: 2,
            payload: {
                tighteningID: 3698521475,
                numberVIN: "KNX9875421547854DCVF25VFG",
                jobID: 1056,
                parameterSetID: 878,
                strategy: 8,
                strategyOptions: 65000,
                batchSize: 6565,
                batchCounter: 3636,
                tighteningStatus: 0,
                batchStatus: 0,
                torqueStatus: 0,
                angleStatus: 0,
                rundownAngleStatus: 0,
                currentMonitoringStatus: 0,
                selftapStatus: 0,
                prevailTorqueMonitoringStatus: 0,
                prevailTorqueCompensateStatus: 0,
                tighteningErrorStatus: 9638527415,
                torque: 656,
                angle: 25,
                rundownAngle: 12345,
                currentMonitoringValue: 555,
                selftapTorque: 654789,
                prevailTorque: 632541,
                jobSequenceNumber: 85236,
                syncTighteningID: 25463,
                toolSerialNumber: 95623145874512,
                timeStamp: "2018-06-06:12:20:00"
            }

        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 2,
                payload: Buffer.from("01369852147502KNX9875421547854DCVF25VFG031056048780508" +
                    "0665000076565083636090100110120130140150160170189638527415" +
                    "19000656200002521123452255523654789246325412585236" +
                    "26254632795623145874512282018-06-06:12:20:00")
            });

            done();
        });
    });

    it("serializer rev 3", (done) => {

        let msg = {
            mid: 65,
            revision: 3,
            payload: {
                tighteningID: 3698521475,
                numberVIN: "KNX9875421547854DCVF25VFG",
                jobID: 1056,
                parameterSetID: 878,
                strategy: 8,
                strategyOptions: 65000,
                batchSize: 6565,
                batchCounter: 3636,
                tighteningStatus: 0,
                batchStatus: 0,
                torqueStatus: 0,
                angleStatus: 0,
                rundownAngleStatus: 0,
                currentMonitoringStatus: 0,
                selftapStatus: 0,
                prevailTorqueMonitoringStatus: 0,
                prevailTorqueCompensateStatus: 0,
                tighteningErrorStatus: 9638527415,
                torque: 656,
                angle: 25,
                rundownAngle: 12345,
                currentMonitoringValue: 555,
                selftapTorque: 654789,
                prevailTorque: 632541,
                jobSequenceNumber: 85236,
                syncTighteningID: 25463,
                toolSerialNumber: "95623145874512",
                timeStamp: "2018-06-06:12:20:00",
                torqueValuesUnit: 2,
                resultType: 7
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 3,
                payload: Buffer.from("01369852147502KNX9875421547854DCVF25VFG031056048780508" +
                    "0665000076565083636090100110120130140150160170189638527415" +
                    "19000656200002521123452255523654789246325412585236" +
                    "26254632795623145874512282018-06-06:12:20:002923007")
            });

            done();
        });
    });

    it("serializer rev 4", (done) => {

        let msg = {
            mid: 65,
            revision: 4,
            payload: {
                tighteningID: 3698521475,
                numberVIN: "KNX9875421547854DCVF25VFG",
                jobID: 1056,
                parameterSetID: 878,
                strategy: 8,
                strategyOptions: 65000,
                batchSize: 6565,
                batchCounter: 3636,
                tighteningStatus: 0,
                batchStatus: 0,
                torqueStatus: 0,
                angleStatus: 0,
                rundownAngleStatus: 0,
                currentMonitoringStatus: 0,
                selftapStatus: 0,
                prevailTorqueMonitoringStatus: 0,
                prevailTorqueCompensateStatus: 0,
                tighteningErrorStatus: 9638527415,
                torque: 656,
                angle: 25,
                rundownAngle: 12345,
                currentMonitoringValue: 555,
                selftapTorque: 654789,
                prevailTorque: 632541,
                jobSequenceNumber: 85236,
                syncTighteningID: 25463,
                toolSerialNumber: 95623145874512,
                timeStamp: "2018-06-06:12:20:00",
                torqueValuesUnit: 2,
                resultType: 7,
                identifierPart2: "Part2-Sucesso     ASD    ",
                identifierPart3: "Part3-Sucesso     QWE    ",
                identifierPart4: "Part4-Sucesso     ZXC    "
            }

        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 4,
                payload: Buffer.from("01369852147502KNX9875421547854DCVF25VFG031056048780508" +
                    "0665000076565083636090100110120130140150160170189638527415" +
                    "19000656200002521123452255523654789246325412585236" +
                    "26254632795623145874512282018-06-06:12:20:002923007" +
                    "31Part2-Sucesso     ASD    32Part3-Sucesso     QWE    " +
                    "33Part4-Sucesso     ZXC    ")
            });

            done();
        });
    });

    it("serializer rev 5", (done) => {

        let msg = {
            mid: 65,
            revision: 5,
            payload: {
                tighteningID: 3698521475,
                numberVIN: "KNX9875421547854DCVF25VFG",
                jobID: 1056,
                parameterSetID: 878,
                strategy: 8,
                strategyOptions: 65000,
                batchSize: 6565,
                batchCounter: 3636,
                tighteningStatus: 0,
                batchStatus: 0,
                torqueStatus: 0,
                angleStatus: 0,
                rundownAngleStatus: 0,
                currentMonitoringStatus: 0,
                selftapStatus: 0,
                prevailTorqueMonitoringStatus: 0,
                prevailTorqueCompensateStatus: 0,
                tighteningErrorStatus: 9638527415,
                torque: 656,
                angle: 25,
                rundownAngle: 12345,
                currentMonitoringValue: 555,
                selftapTorque: 654789,
                prevailTorque: 632541,
                jobSequenceNumber: 85236,
                syncTighteningID: 25463,
                toolSerialNumber: 95623145874512,
                timeStamp: "2018-06-06:12:20:00",
                torqueValuesUnit: 2,
                resultType: 7,
                identifierPart2: "Part2-Sucesso     ASD    ",
                identifierPart3: "Part3-Sucesso     QWE    ",
                identifierPart4: "Part4-Sucesso     ZXC    ",
                customerToghteningErrorCode: "AABB"
            }

        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 5,
                payload: Buffer.from("01369852147502KNX9875421547854DCVF25VFG031056048780508" +
                    "0665000076565083636090100110120130140150160170189638527415" +
                    "19000656200002521123452255523654789246325412585236" +
                    "26254632795623145874512282018-06-06:12:20:002923007" +
                    "31Part2-Sucesso     ASD    32Part3-Sucesso     QWE    " +
                    "33Part4-Sucesso     ZXC    34AABB")
            });

            done();
        });
    });

    it("serializer rev 6", (done) => {

        let msg = {
            mid: 65,
            revision: 6,
            payload: {
                tighteningID: 3698521475,
                numberVIN: "KNX9875421547854DCVF25VFG",
                jobID: 1056,
                parameterSetID: 878,
                strategy: 8,
                strategyOptions: 65000,
                batchSize: 6565,
                batchCounter: 3636,
                tighteningStatus: 0,
                batchStatus: 0,
                torqueStatus: 0,
                angleStatus: 0,
                rundownAngleStatus: 0,
                currentMonitoringStatus: 0,
                selftapStatus: 0,
                prevailTorqueMonitoringStatus: 0,
                prevailTorqueCompensateStatus: 0,
                tighteningErrorStatus: 9638527415,
                torque: 656,
                angle: 25,
                rundownAngle: 12345,
                currentMonitoringValue: 555,
                selftapTorque: 654789,
                prevailTorque: 632541,
                jobSequenceNumber: 85236,
                syncTighteningID: 25463,
                toolSerialNumber: 95623145874512,
                timeStamp: "2018-06-06:12:20:00",
                torqueValuesUnit: 2,
                resultType: 7,
                identifierPart2: "Part2-Sucesso     ASD    ",
                identifierPart3: "Part3-Sucesso     QWE    ",
                identifierPart4: "Part4-Sucesso     ZXC    ",
                customerToghteningErrorCode: "AABB",
                prevailTorqueCompensateValue: 12,
                toghteningErrorStatus: 565
            }

        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 6,
                payload: Buffer.from("01369852147502KNX9875421547854DCVF25VFG031056048780508" +
                    "0665000076565083636090100110120130140150160170189638527415" +
                    "19000656200002521123452255523654789246325412585236" +
                    "26254632795623145874512282018-06-06:12:20:002923007" +
                    "31Part2-Sucesso     ASD    32Part3-Sucesso     QWE    " +
                    "33Part4-Sucesso     ZXC    34AABB35000012360000000565")
            });

            done();
        });
    });

    it("serializer rev 7", (done) => {

        let msg = {
            mid: 65,
            revision: 7,
            payload: {
                tighteningID: 3698521475,
                numberVIN: "KNX9875421547854DCVF25VFG",
                jobID: 1056,
                parameterSetID: 878,
                strategy: 8,
                strategyOptions: 65000,
                batchSize: 6565,
                batchCounter: 3636,
                tighteningStatus: 0,
                batchStatus: 0,
                torqueStatus: 0,
                angleStatus: 0,
                rundownAngleStatus: 0,
                currentMonitoringStatus: 0,
                selftapStatus: 0,
                prevailTorqueMonitoringStatus: 0,
                prevailTorqueCompensateStatus: 0,
                tighteningErrorStatus: 9638527415,
                torque: 656,
                angle: 25,
                rundownAngle: 12345,
                currentMonitoringValue: 555,
                selftapTorque: 654789,
                prevailTorque: 632541,
                jobSequenceNumber: 85236,
                syncTighteningID: 25463,
                toolSerialNumber: 95623145874512,
                timeStamp: "2018-06-06:12:20:00",
                torqueValuesUnit: 2,
                resultType: 7,
                identifierPart2: "Part2-Sucesso     ASD    ",
                identifierPart3: "Part3-Sucesso     QWE    ",
                identifierPart4: "Part4-Sucesso     ZXC    ",
                customerToghteningErrorCode: "AABB",
                prevailTorqueCompensateValue: 12,
                toghteningErrorStatus: 565,
                stationID: 987654,
                stationName: "APERTO DIFERENCIAL       "
            }

        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 65,
                revision: 7,
                payload: Buffer.from("01369852147502KNX9875421547854DCVF25VFG031056048780508" +
                    "0665000076565083636090100110120130140150160170189638527415" +
                    "19000656200002521123452255523654789246325412585236" +
                    "26254632795623145874512282018-06-06:12:20:002923007" +
                    "31Part2-Sucesso     ASD    32Part3-Sucesso     QWE    " +
                    "33Part4-Sucesso     ZXC    34AABB35000012360000000565" +
                    "37000098765438APERTO DIFERENCIAL       ")
            });

            done();
        });
    });

    it("Should return error, parser with invalid revision", (done) => {

        let msg = {
            mid: 65,
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
            mid: 65,
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