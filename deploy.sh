#!/bin/sh

git pull &&
npm run migration &&
npm run start:prod
