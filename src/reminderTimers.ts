import type {BunFile} from "bun";
import path from "path";
import {promises} from 'fs'
import {DATE_REGEX, REPO_DIR} from "./config.ts";
import {notify} from "./notify.ts";
const { readdir } = promises

let timers: NodeJS.Timeout[] = []
export async function reminderTimers () {
    const files = await readFilesRecursively(REPO_DIR.name!)

    timers.forEach(timer => { clearTimeout(timer) })
    timers = []
    return files.map(async file => {
        const content = await file.text()
        const matches = content.match(new RegExp(`.*${DATE_REGEX}.*`, 'g'))
        return matches && setReminderForMatches(matches)
    })
}

async function readFilesRecursively (dir: string) {
    const entries = await readdir(dir, { withFileTypes: true })
    const files: BunFile[] = []

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.name.startsWith('.')) {
            continue
        }
        if (entry.isDirectory()) {
            files.push(...(await readFilesRecursively(fullPath)))
            continue
        }
        files.push(Bun.file(fullPath))
    }
    return files
}


function setReminderForMatches (matches: string[]) {
    return matches
        ?.map(match => ({
            line: match,
            date: new Date(match.match(new RegExp(DATE_REGEX))![0])
        }))
        .map(match => ({
                ...match,
                diff: match.date.getTime() - new Date().getTime()
            })
        )
        .filter(({ diff }) => diff > 0)
        ?.map(async ({ line, date, diff }) => {
            console.log('preparing reminder for', line);
            timers.push(setTimeout(() => {
                console.log('sending reminder for', line);
                notify(`Reminder: ${line}`)
            }, diff))
        })
}
