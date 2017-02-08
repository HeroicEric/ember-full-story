# ember-full-story

This addon inserts the [FullStory][full-story] recording script into the
`<head>` of the page for you.

## Installation

```
ember install ember-full-story
```

After installing the addon, you **MUST** provide a configuration value for your
org. You can find it in the settings tab on your [FullStory][full-story] dashboard,
inside the recording script.

It looks something like the following:

```javascript
window['_fs_org'] = 'XXXXX';
```

## Configuration

You can configure some of the variables used in the inserted recording script.

```
// config/environment.js

ENV['ember-full-story'] = {
  debug: false,                        // default
  enabledEnvironments: ['production'], // default
  host: 'www.fullstory.com',           // default
  namespace: 'FS',                     // default
  org: 'YourOrg'                       // required, no default
};
```

[full-story]: https://fullstory.com/
