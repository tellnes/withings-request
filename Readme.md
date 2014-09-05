# withings-request <sup>[![Version Badge](http://vb.teelaun.ch/tellnes/withings-request.svg)](https://npmjs.org/package/withings-request)</sup>

[![Dependency Status](https://david-dm.org/tellnes/withings-request.png)](https://david-dm.org/tellnes/withings-request)
[![devDependency Status](https://david-dm.org/tellnes/withings-request/dev-status.png)](https://david-dm.org/tellnes/withings-request#info=devDependencies)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/tellnes/withings-request/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

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
