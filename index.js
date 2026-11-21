import { authorize } from './authorize.js';
import { downloadSpamEmails } from './download-spam.js';
//import { listLabels } from './listLabels.js';

try {
  const auth = await authorize();
  //await listLabels(auth);
  await downloadSpamEmails(auth);
} catch (error) {
  console.error('Error downloading spam emails:', error);
}