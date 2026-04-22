const crypto = require('crypto');
require('dotenv').config({path: '.env'});


// In production, this MUST be a 32-byte string stored in our .env file
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY ? Buffer.from(process.env.ENCRYPTION_KEY, 'hex') : crypto.randomBytes(32);
const ALGORITHM = process.env.ENCRYPTION_ALGORITHM;


function encryptApiKey(text) {
    const iv = crypto.randomBytes(16); // initialization vector
    const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');

    // we retunr IV, encrypted text and auth tag seperated by colons
    return `${iv.toString('hex')}:${encrypted}:${authTag}`;
}

function decryptApiKey(encryptedData) {
    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = parts[1];
    const authTag = Buffer.from(parts[2], 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

// test in locally
// const rawKey = "sk-ant-api03-MySuperSecretAnthropicKey-12345";
// console.log("1. Original Key:", rawKey);

// const encryptedKey = encryptApiKey(rawKey);
// console.log("2. What goes into the database:", encryptedKey);

// const decryptedKey = decryptApiKey(encryptedKey);
// console.log("3. Decrypted for agent use:", decryptedKey);