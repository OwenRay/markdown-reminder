import {promises} from 'fs'
import { GIT_USERNAME, REPO, REPO_DIR} from "./config.ts";
const {exists} = promises;

export async function clone () {
    if (await exists(`${REPO_DIR.name}/.git`)) {
        return
    }

    const output = Bun.spawnSync(
        ['git', 'clone', `https://${GIT_USERNAME}@github.com/${REPO}.git`, REPO_DIR.name!],
        {
            stdout: 'inherit'
        }
    )
    if(output.exitCode !== 0) {
        console.log('git clone failed', output)
        throw new Error('git clone failed')
    }
    console.log('git clone successful');
}
export function pull () {
    const output = Bun.spawnSync(
        ['git', 'pull'],
        {
            cwd: REPO_DIR.name!
        }
    );
    if(output.exitCode !== 0) {
        console.log('git pull failed', `${output.stderr}`)
        throw new Error('git pull failed')
    }
}
