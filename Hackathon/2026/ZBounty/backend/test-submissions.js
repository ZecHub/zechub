const http = require('http');

const loginBody = JSON.stringify({ email: 'sponsor@zcash.org', password: 'sponsor123' });

function makeRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch(e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function run() {
  console.log('--- Step 1: Login as sponsor ---');
  const loginRes = await makeRequest({
    hostname: 'localhost', port: 5000,
    path: '/api/auth/login', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(loginBody) }
  }, loginBody);

  console.log('Login status:', loginRes.status);

  if (!loginRes.body.token) {
    console.error('LOGIN FAILED:', loginRes.body);
    return;
  }

  const token = loginRes.body.token;
  console.log('Role:', loginRes.body.user.role);
  console.log('Token (first 40 chars):', token.substring(0, 40) + '...');

  console.log('\n--- Step 2: Fetch /api/bounties/submissions ---');
  const subRes = await makeRequest({
    hostname: 'localhost', port: 5000,
    path: '/api/bounties/submissions', method: 'GET',
    headers: { Authorization: 'Bearer ' + token }
  });

  console.log('Submissions status:', subRes.status);
  console.log('Submissions body:', JSON.stringify(subRes.body, null, 2).substring(0, 1500));
}

run().catch(err => console.error('FATAL:', err));
