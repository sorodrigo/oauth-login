# oauth-login

This app is runs on top of Now.sh serverless deployments. The frontend retrieves a `code` from github's oauth login and sends it to a lambda function. This endpoint uses the `code` to request an `access_token`. The token is later sent back for the client to use to interact with Github's API.

## Requirements
1. [Zeit's Now account.](https://zeit.co)
2. [Install Now CLI.](https://zeit.co/download)
3. [Create a Github's oAuth app.](https://developer.github.com/apps/building-oauth-apps/)
4. Setup the following details as [Now secrets](https://zeit.co/docs/v2/serverless-functions/env-and-secrets#adding-secrets):
    - client_id as `@app-client-id`
    - client_secret as `@app-client-secret`
    - redirect_uri as `@app-redirect-url`

![oauth-login.gif](sneak peek)
