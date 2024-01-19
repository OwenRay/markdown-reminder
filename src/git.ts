import {promises} from 'fs'
import {GH_PAT, REPO, REPO_DIR} from "./config.ts";
const {exists} = promises;

export async function clone () {
    if (await exists(`${REPO_DIR.name}/.git`)) {
        return
    }

    const output = Bun.spawnSync(
        ['git', 'clone', `https://${GH_PAT}@github.com/${REPO}`, REPO_DIR.name!],
        {
            env: { GIT_USER: 'OwenRay', GIT_PASS: GH_PAT }
        }
    )
    if(output.exitCode !== 0) {
        console.log('git clone failed', output)
        throw new Error('git clone failed')
    }
}
export function pull () {
    const output = Bun.spawnSync(
        ['git', 'pull'],
        {
            cwd: REPO_DIR.name!
        }
    );
    if(output.exitCode !== 0) {
        console.log('git pull failed', output)
        throw new Error('git pull failed')
    }
}
