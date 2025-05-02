// Generate a secure random string for JWT secret key

const crypto = require('crypto');

// Generate a 64 character hex string (32 bytes)
const generateSecureSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

const jwtSecret = generateSecureSecret();
console.log('Your JWT Secret Key:');
console.log(jwtSecret);
// Example output: 3f7d8e5a1b6c9d2e0f4a7b5c8d1e9f6a3b5c7d0e2f4a6b8c0d2e4f6a8b0c2d4e
