# Environment setup
- npm i

- Create config.json file from config.json.sample

# Where to get userToken?

- https://api.slack.com/apps

- Create new app

- Go to `OAuth & Permissions`

- Select the following `User Token Scopes`: chat:write, im:history, im:read, im:write, mpim:history
![Alt text](images/user_scopes.png "User scopes")

- Scroll up and copy `User OAuth Token`

- If the run script fails with authentication errors, try `Reinstall to ...`

# Run script

- Update config.json file

- Run `node index.js`

