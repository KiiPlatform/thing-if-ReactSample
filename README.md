# thing-if-ReactSample
A sample app built top of [react-admin framework](https://github.com/marmelab/react-admin) for [thing-if-JSSDK](https://github.com/KiiPlatform/thing-if-JSSDK)

## Installation
1. Clone this repository:

```
git clone https://github.com/KiiPlatform/thing-if-ReactSample.git
```
2. Go to the repository folder and modify src/config.js

```js
export const KiiApp = {
  appID: 'your-app-id',
  appKey: 'your-app-key',
  site: 'your-app-site'
}
```

Change above `your-app-id` ,`your-app-key`, `your-app-site` with your kii apps credentials.

3. Go to the root repository folder and run bellow on your bash terminal

```
yarn install && yarn start
```

4. Open your browser and access http://0.0.0.0:3000/

5. Login with your pre registered Kii User (this version does not have user registration functionality)

## KiiCloud Features
- Login
- Onbaord a thing
- Display Thing state
- Send command with predefined trait
- Create, Update, Delete Triggers

