#!/usr/bin/env bun
import {GH_PAT, GIT_USERNAME} from './config.ts'

console.log('protocol=https');
console.log('host=github.com');
console.log(`username=${GIT_USERNAME}`);
console.log(`password=${GH_PAT}`);
