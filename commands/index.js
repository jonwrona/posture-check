module.exports = {
  Ping: require('./ping'),
  Speak: require('./speak'),
  Subscribe: require('./subscribe'),
  Unsubscribe: require('./unsubscribe'),

  // sandbox command for messing around
  Sandbox: process.env.NODE_ENV !== 'production' && require('./sandbox'),
};