import dotenv from "dotenv";
import { promises } from 'fs'
const { exists, mkdir } = promises

type Config = {
REPO: string;
GH_PAT: string;
UPDATE_INTERVAL: string;
PUSHBULLET_TOKEN: string;
DATE_REGEX: string;
}

const REPO_DIR = Bun.file('.files')
let DATE_REGEX = '\\d{2,4}-\\d{1,2}-\\d{1,2} \\d{1,2}:\\d{1,2}'
let REPO = process.env.REPO || ''
let GH_PAT = process.env.GH_PAT || ''
let UPDATE_INTERVAL = parseInt(process.env.UPDATE_INTERVAL || '')
let PUSHBULLET_TOKEN = process.env.PUSHBULLET_TOKEN || ''


try {
    const file = Bun.file(`${__dirname}/../.env`)
    const text = await file.text()
    const env = dotenv.parse<Config>(text)
    if (!REPO) REPO = env.REPO
    if (!GH_PAT) GH_PAT = env.GH_PAT
    if (!DATE_REGEX) DATE_REGEX = env.DATE_REGEX
    if (!PUSHBULLET_TOKEN) PUSHBULLET_TOKEN = env.PUSHBULLET_TOKEN
    if (!UPDATE_INTERVAL) UPDATE_INTERVAL = parseInt(env.UPDATE_INTERVAL)
} catch (e) {
    console.warn('no .env file found, only using process.env');
}

if (!UPDATE_INTERVAL) UPDATE_INTERVAL = 1000 * 60 * 60 // 1 hour
const GIT_USERNAME = REPO.split('/')[0];

if (!await exists(REPO_DIR.name!)) {
    await mkdir(REPO_DIR.name!)
}

export {
    REPO,
    GH_PAT,
    UPDATE_INTERVAL,
    PUSHBULLET_TOKEN,
    REPO_DIR,
    DATE_REGEX,
    GIT_USERNAME
}
