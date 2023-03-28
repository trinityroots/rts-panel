# RTS Panel

RTS Panel is a dashboard and control panel for RTS Token.
See: https://github.com/trinityroots/rts-token

## Getting Started

### Development
```bash
yarn install
npm start
```
This will run a local server serving content on localhost:3000/rts-panel

### Deployment
```bash
npm run deploy
```
The above command will build the entire repo into a servable build for Github Pages.
It will create a new branch gh-pages which will act as the deployment branch. Github Pages will automatically serve the static files in the build branch after Github Actions has finished running.

## Features

- Dashboard
- Transfer
- Approve
- Access Control
- Supply Control
- Real-time Activity Log and Notifications

## Maintenance

GH Pages gives you 404 when accessing the page

Solution:
```bash
git checkout gh-pages
git commit --allow-empty -m "Updates"
git push origin gh-pages
```