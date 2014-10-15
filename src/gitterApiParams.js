'use strict';

module.exports = function(config) {
  var botName = config.botName
    , githubUserId = config.githubUserId
    , ghAvatarsUrl = 'https://avatars.githubusercontent.com/u/'
    , params = { method: 'post', data: { burstStart: false } }

  params.url = 'https://gitter.im/api/v1/rooms/' + config.room +'/chatMessages'
  params.data.fromUser = {
      id: config.gitterUserId
    , username: botName
    , displayName: botName
    , fallbackDisplayName: botName
    , url: '/' + botName
    , avatarUrlSmall: ghAvatarsUrl + config.githubUserId + '?v=2&s=60'
    , avatarUrlMedium: ghAvatarsUrl + config.githubUserId + '?v=2&s=128'
    , v: 3
    , scopes: {
        public_repo: true
      , private_repo: true
    }
  }

  return params
}
