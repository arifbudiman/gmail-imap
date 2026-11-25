# Gmail IMAP

A Node.js utility that authenticates with Gmail and downloads matching messages from the Spam folder as raw `.eml` files.

> Despite the package name, this project uses the Gmail API rather than a direct IMAP connection.

## What it does

- Opens a Google OAuth 2.0 authorization flow when no local token is available.
- Reuses `token.json` for later runs.
- Searches Gmail's Spam label for messages matching:

  ```text
  from:(@outlook.com OR @hotmail.com)
  ```

- Downloads up to 100 matching messages.
- Saves each message as `spam_emails/<message-id>.eml`.

## Prerequisites

- Node.js
- A Google account
- A Google Cloud project with the Gmail API enabled
- An OAuth 2.0 Desktop app credential

## Google OAuth setup

1. Open the [Google Cloud Console](https://console.cloud.google.com/) and create or select a project.
2. Enable the **Gmail API** for the project.
3. Configure the OAuth consent screen.
4. Add yourself as a test user if the app is still in testing mode.
5. Create an OAuth 2.0 Client ID with the application type **Desktop app**.
6. Download the client configuration JSON.
7. Save it in the repository root as `credentials.json`.

Do not commit `credentials.json` or `token.json`. Both are already excluded by [`.gitignore`](.gitignore).

## Installation

From the repository root:

```bash
npm install
```

## Usage

```bash
node index.js
```

On the first run, a browser opens for Google authorization. After authorization, the utility creates `token.json` and subsequent runs reuse that token.

Matching messages are written to the `spam_emails/` directory. For example:

```text
spam_emails/
  17abc123def456.eml
  17def456ghi789.eml
```

## Permissions

The application requests the Gmail `readonly` scope:

```text
https://www.googleapis.com/auth/gmail.readonly
```

It can read Gmail messages but does not delete, move, or send messages.

## Notes

- The search is limited to the first 100 matching messages.
- The script downloads full raw message content.
- `credentials.json`, `token.json`, and `spam_emails/` contain sensitive data and should not be shared or committed.
- Run the command from the repository root because relative paths in the scripts use `process.cwd()`.

## License

MIT
