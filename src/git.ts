import {promises} from 'fs'
import {GH_PAT, GIT_USERNAME, REPO, REPO_DIR} from "./config.ts";
const {exists} = promises;

export async function clone () {
    if (await exists(`${REPO_DIR.name}/.git`)) {
        return
    }
    let url = 'git@github.com:';
    if(GH_PAT) {
        url = `https://${GIT_USERNAME}@github.com/`;
    }
    const success = executeGitCommand('clone', '--verbose', `${url}${REPO}.git`, '.')
    if(!success) {
        throw new Error('git clone failed');
    }
    console.log('git clone successful');
}
export function pull () {
    executeGitCommand('pull');
}

function executeGitCommand (...args: string[]) {
    let credentialsHelper:string[] = [];
    if(GH_PAT) {
        const credentials = [
            'protocol=https',
            'host=github.com',
            `username=${GIT_USERNAME}`,
            `password=${GH_PAT}`
        ]
        const helper = `!echo -e "${credentials.join('\\n')}";`;
        credentialsHelper = ['-c', `credential.helper=${helper}`]
    }

    const output = Bun.spawnSync(
        ['git', ...credentialsHelper, ...args],
        {
            env: {
                GIT_TRACE: '1',
            },
            stdout: 'inherit',
            stderr: 'inherit',
            cwd: REPO_DIR.name!
        }
    );
    if(output.exitCode !== 0) {
        console.warn('git command failed', `${output.stderr}`, `${output.stdout}`)
    }
    console.log(output.exitCode);
    return output.exitCode===0;
}
