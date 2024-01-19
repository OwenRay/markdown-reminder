import {clone, pull} from "./src/git.ts";
import {UPDATE_INTERVAL} from "./src/config.ts";
import {reminderTimers} from "./src/reminderTimers.ts";

await clone();
void updateGitAndResetTimers()
setInterval(updateGitAndResetTimers, UPDATE_INTERVAL);
async function updateGitAndResetTimers () {
    console.log('updating git repo')
    pull();
    await reminderTimers();
    console.log('all ready')
}
