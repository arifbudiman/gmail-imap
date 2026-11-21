import { google } from 'googleapis';

/**
 * Lists the labels in the user's account.
 */
export async function listLabels(auth) {
  // Create a new Gmail API client.
  const gmail = google.gmail({ version: 'v1', auth });
  // Get the list of labels.
  const result = await gmail.users.labels.list({
    userId: 'me',
  });
  const labels = result.data.labels;
  if (!labels || labels.length === 0) {
    console.log('No labels found.');
    return;
  }
  console.log('Labels:');
  // Print the name of each label.
  labels.forEach((label) => {
    console.log(`- ${label.name}`);
  });
}