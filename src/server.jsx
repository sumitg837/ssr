import "@babel/polyfill"
import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable-ssr-addon';
// import { StaticRouter } from 'react-router';
import { StaticRouter, matchPath } from 'react-router-dom';
import bodyParser from 'body-parser';
import webpack from 'webpack';

// import { createStore } from 'redux'
// import { Provider } from 'react-redux'

import serialize from 'serialize-javascript';

import App from '../src/_components/app';
import Routes from './routes';
// import store from './components/store';

import { matchRoutes } from 'react-router-config';

const manifest = require('../dist/react-loadable-ssr-addon.json');
const server = express();

server.use('/dist', express.static('dist'));



server.use(bodyParser.json());
server.get('*', (req, res) => {
    const activeRoute = Routes.find(
        (route) => matchPath(req.url, route)
    ) || {}
    const promise = activeRoute.fetchInitialData
        ? activeRoute.fetchInitialData(req.path)
        : Promise.resolve()

    promise.then(dataArr => {
        const modules = new Set();
        const context = { dataArr };


        const html = renderToString(
                <StaticRouter location={req.url} context={context}>
                    <Loadable.Capture report={moduleName => modules.add(moduleName)}>
                        <App />
                    </Loadable.Capture>
                </StaticRouter>
        );

        const bundles = getBundles(manifest, [...manifest.entrypoints, ...Array.from(modules)]);

        const styles = bundles.css || [];
        const scripts = bundles.js || [];

        res.send(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>React Loadable SSR Add-on Example</title>
          ${styles.map(style => {
            return `<link href="/dist/${style.file}" rel="stylesheet" />`;
        }).join('\n')}
      <script>window.__INITIAL_DATA__ = ${serialize(dataArr)}</script>
        </head>
        <body>
          <div id="app">${html}</div>
          ${scripts.map(script => {
            return `<script src="./dist/${script.file}"></script>`
        }).join('\n')}
        </body>
      </html>
    `);
    }).catch(e => {
        console.log(e)
        res.send(e)
    })


});

Loadable.preloadAll().then(() => {
    server.listen(3003, () => {
        console.log('Running on http://localhost:3003/');
    });
}).catch(err => {
    console.log(err);
});