## Changelog

#### v1.1.1
 - Switches to GPL v3 licensing model
 

#### v1.1.0
 - Fix internal handling of calls of `customMid()` (#6)
 - Added debug calls with `util.debuglog()` for easier tracing in production (#9)
 - Fix handling of acknowledges of subscribed data (#10, #11)
 - Fix variable cleanup preventing reopening the connection after bein closed (#12, #13)
 - Extended implementation of `_raw` parameter for the raw buffer exchanged (#14)
 - Implemented parsing of MID 0035 (#15)
 - Implemented parsing of MID 0106 (#16)


#### 1.0.4
 - Added support for node 6.x


#### 1.0.3

- Fixed [#3](https://github.com/netsmarttech/node-open-protocol/issues/3)
- Changed type of MID61.toolSerialNumber to `string`


#### 1.0.2

- Update test
- Emit error on fail parser
- New control of callback on case Disable Link Layer


#### 1.0.1

- Change field toolSerialNumber on MID 0065 for `string`
- Add control of fail on keep alive
- Fix resend error on parser error
- Add control of socket timeout
- Fix issues #1 and #2


#### 1.0.0

- First release published to npm
