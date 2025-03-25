import { v4 as uuidv4 } from 'uuid';

const FRESHDESK_DOMAIN = 'bdcatalyst.freshdesk.com';
const SCHEMA_ID = 16150275;
const API_KEY = '';

async function sendFeedback(pagePath, helpful) {
  const url = `https://${FRESHDESK_DOMAIN}/api/v2/custom_objects/schemas/${SCHEMA_ID}/records`;

  const data = {
    data: {
      name: uuidv4(), // Unique identifier required by Freshdesk
      page_path: pagePath,
      timestamp: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
      helpful: helpful
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(API_KEY + ':X').toString('base64')}`
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    console.log('Feedback submitted successfully:', await response.json());
  } else {
    console.error('Error submitting feedback:', response.status, await response.text());
  }
}


const createRandomFeedbackRecords = (n = 10) => {
  function getRandomPath() {
    const pagePaths = [
      '/',                                       '/404',                                   
      '/about/bdc-fellows',                      '/about/key-collaborations',
      '/about/overview/eep',                     '/about/overview',
      '/about/research-communities',             '/about/studies',
      '/accessibility',                          '/help-and-support/contact-us',
      '/help-and-support/support',               '/join-bdc',
      '/join-bdc/success',                       '/news-and-events/latest-updates',
      '/news-and-events/news-coverage',          '/news-and-events/published-research',
      '/privacy',                                '/use-bdc/analyze-data/bdc-workspaces',
      '/use-bdc/analyze-data',                   '/use-bdc/explore-data/check-data',
      '/use-bdc/explore-data/dug',               '/use-bdc/explore-data',
      '/use-bdc/share-data',                     '/user-resources/terms-of-use',
      '/user-resources/usage-costs',             '/user-resources/usage-terms',
      '/user-resources/user-faqs'               
    ];
    return pagePaths[Math.floor(Math.random() * pagePaths.length)];
  };
  function getRandomHelpfulnessValue() {
    return Math.random() > 0.5 ? 1 : 0;
  };
  for (let i = 0; i < n; i += 1) {
    sendFeedback(getRandomPath(), getRandomHelpfulnessValue());
  }  
}

createRandomFeedbackRecords(25);
