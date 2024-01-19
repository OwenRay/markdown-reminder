# markdown-reminder

This project fetches a specified GitHub repository, detects timestamps in the repository's content, and sends notifications at these timestamps. It uses environment variables for configuration, including the repository to clone, the update interval, the Pushbullet API token for sending notifications, and the regular expression for matching date and time strings. The project can be run locally or in a Docker container.

## Installation

This project uses [Bun](https://bun.sh) as a JavaScript runtime and package manager. To install the dependencies, run:

```bash
bun install
```

## Usage

To run the project with Bun, use the following command:

```bash
bun start
```

## Running with Docker
Run in docker with the following command

```bash
docker run -e REPO=user/repo -e GH_PAT=github_pat -e PUSHBULLET_TOKEN=some_token OwenRay/markdown-reminder
```

Replace the environment variables with the actual values.

## All possible options
| Option            | Default Value                             | Description                           |
|-------------------|-------------------------------------------|---------------------------------------|
| `REPO`            | -                                         | The repository to clone               |
| `GH_PAT`          | -                                         | GitHub Personal Access Token          |
| `PUSHBULLET_TOKEN`| -                                         | Pushbullet API token                  |
| `UPDATE_INTERVAL` | 3600000                                   | Interval to check for updates in ms   |
| `DATE_REGEX`      | `\d{2,4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}` | Regular expression for date match     |
