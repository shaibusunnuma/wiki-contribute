const generalConfig = {
  instance: 'https://www.wikidata.org',
  wgScriptPath: '/w',

  credentials: {
    // either a username and password
    username: 'my-wikidata-username',
    // Optional: generate a dedicated password with tailored rights on /wiki/Special:BotPasswords
    // See the 'Credentials' paragraph below
    password: 'my-wikidata-password',

    // OR OAuth tokens
    oauth: {
      // Obtained at registration
      // https://www.mediawiki.org/wiki/OAuth/For_Developers#Registration
      consumer_key: 'your-consumer-token',
      consumer_secret: 'your-secret-token',
      // Obtained when the user authorized your service
      // see https://www.mediawiki.org/wiki/OAuth/For_Developers#Authorization
      token: 'a-user-token',
      token_secret: 'a-secret-token'
    }
  },

  // Flag to activate the 'anonymous' mode,
  anonymous: true,

  // Optional
  // See https://meta.wikimedia.org/wiki/Help:Edit_summary
  // Default: empty
  summary: 'some edit summary common to all the edits',

  // See https://www.mediawiki.org/wiki/Manual:Tags
  // Default: on Wikidata [ 'WikibaseJS-edit' ], empty for other Wikibase instances
  tags: [ 'mobile edit' ],

  // Default: `wikidata-edit/${pkg.version} (https://github.com/maxlath/wikidata-edit)`
  userAgent: 'my-project-name/v3.2.5 (https://project.website)',

  // See https://www.mediawiki.org/wiki/Manual:Bots
  // Default: false
  bot: true,

  // See https://www.mediawiki.org/wiki/Manual:Maxlag_parameter
  // Default: 5
  maxlag: 2
}

const wbEdit = require('wikibase-edit')(generalConfig)
//wbEdit.label.set({ id, language, value })