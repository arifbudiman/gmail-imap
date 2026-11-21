import fs from 'node:fs/promises';
import path from 'node:path';
import { google } from 'googleapis';

/**
 * Fetch and save emails from Gmail SPAM folder.
 */
export async function downloadSpamEmails(auth) {
  const gmail = google.gmail({ version: 'v1', auth });

  const listRes = await gmail.users.messages.list({
    userId: 'me',
    labelIds: ['SPAM'],
    includeSpamTrash: true,
    q: 'from:(@outlook.com OR @hotmail.com)',
    maxResults: 100,
  });

  const messages = listRes.data.messages || [];
  if (messages.length === 0) {
    console.log('No spam messages found.');
    return;
  }

  console.log(`Found ${messages.length} spam messages. Downloading...`);
  await fs.mkdir('spam_emails', { recursive: true });

  for (const message of messages) {
    const msgRes = await gmail.users.messages.get({
      userId: 'me',
      id: message.id,
      format: 'raw',
    });

    const rawEmail = Buffer.from(msgRes.data.raw, 'base64url').toString('utf-8');
    const filePath = path.join('spam_emails', `${message.id}.eml`);

    await fs.writeFile(filePath, rawEmail);
    console.log(`Saved: ${filePath}`);
  }
}