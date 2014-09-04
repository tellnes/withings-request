var querystring = require('querystring')
  , inherits = require('util').inherits
  , request = require('request')
  , http = require('http')
  , OAuth = require('oauth').OAuth

module.exports = function (options) {
  var oauthToken = options.token
    , oauthTokenSecret = options.tokenSecret
    , userid = options.userid
    , wbsUrl = options.wbsUrl || 'http://wbsapi.withings.net/'
    , timeout = options.timeout || 10000;

  var oauth = new OAuth(
      '' // request_token
    , '' // access_token
    , options.consumerKey
    , options.consumerSecret
    , '1.0'
    , '' // callback url
    , 'HMAC-SHA1'
    //, nonceSize
    //, customHeaders
    )

  return function (service, action, params, cb) {
    if (!cb) {
      cb = params
      params = {}
    }

    params.action = action
    params.userid = params.userid || userid

    var url = oauth.signUrl(
        wbsUrl + service + '?' + querystring.stringify(params)
      , oauthToken
      , oauthTokenSecret
      )

    request({url: url, timeout: timeout}, function (err, res, body) {
      if (err) return cb(err)

      if (res.statusCode !== 200) {
        return cb(new Error('Unecpected HTTP Status Code: ' +
                              res.statusCode + ' ' + http.STATUS_CODES[res.statusCode]
                            )
                  )
      }

      try {
        body = JSON.parse(body)
      } catch(err) {
        return cb(err)
      }

      if (body.status) {
        return cb(new WithingsError(body.status))
      }

      cb(null, body.body, res)
    })
  }
}


function WithingsError(code) {
  Error.call(this)
  Error.captureStackTrace(this)
  this.name = 'WithingsError'
  this.message =
    [ '['
    , String(code)
    , '] '
    , (WithingsError.messages[code] || 'undefined error code')
    ].join('')
  this.code = code
}
inherits(WithingsError, Error)
module.exports.WithingsError = WithingsError

WithingsError.messages =
  {  247: 'The userid is absent or incorrect'
  ,  250: 'The provided userid and/or Oauth credentials do not match'
  ,  286: 'No such subscription was found'
  ,  293: 'The callback URL is either absent or incorrect'
  ,  294: 'No such subscription could be deleted'
  ,  304: 'The comment is either absent or incorrect'
  ,  305: 'Too many notifications are already set'
  ,  342: 'The signature (using Oauth) is invalid.'
  ,  343: 'Wrong Notification Callback Url don\'t exist'
  ,  601: 'Too Many Request'
  , 2554: 'Wrong action or wrong webservice'
  , 2555: 'An unknown error occurred'


  // https://github.com/simplificator/simplificator-withings/blob/7a08090be8a9c80fafb7f3ba1d47391c48c33ef9/lib/withings/error.rb#L6
  ,  249: 'Called an action with invalid oauth credentials'

  // I'm getting this when sending empty parameters
  ,  246: 'Invalid parameter'
}

WithingsError.prototype.valueOf = function () {
  return this.code
}
