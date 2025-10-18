# Environment setup
- npm i

- Create config.json file from config.json.sample

# Where to get userToken?

- https://api.slack.com/apps

- Create new app

- Go to `OAuth & Permissions`

- Select the following `User Token Scopes`
![Alt text](images/user_scopes.png "User scopes")

- Scroll up and copy `User OAuth Token`
![Alt text](images/user_token.png "User token")

- If the run script fails with authentication errors, try `Reinstall to DSS`

# Run script

- Update config.json file

- Run `node index.js`

