# withings-request <sup>[![Version Badge](http://vb.teelaun.ch/tellnes/withings-request.svg)](https://npmjs.org/package/withings-request)</sup>

[![Dependency Status](https://david-dm.org/tellnes/withings-request.png)](https://david-dm.org/tellnes/withings-request)
[![Tips](http://img.shields.io/gittip/tellnes.png)](https://www.gittip.com/tellnes/)

[![NPM](https://nodei.co/npm/withings-request.png)](https://nodei.co/npm/withings-request/)


The Withings OAuth implementation is not perfect. This lib hides that.

Getting the token and token secret is outside the scope of this lib. You can use
[passport-withings](https://github.com/mowens/passport-withings)
to do that.

Please see [withings-stream](https://github.com/tellnes/withings-stream)
for an even higher abstraction.

## Usage

```js
var options =
  { consumerKey: '...'
  , consumerSecret: '...'
  , token: '...'
  , tokenSecret: '...'
  , userid: '...'
  , timeout: 10000
  }
var withings = require('withings-request')(options)

withings('measure', 'getmeas', { startdate: 1222819200, enddate: 1223190167 }, function (err, body) {
  if (err) throw err
  console.log(body)
})
```

## Install

    $ npm install withings-request

## License

MIT
