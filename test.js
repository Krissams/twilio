const crypto = require('crypto');

// Function to encrypt a string
function encryptString(input, key) {
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(input, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

// Function to decrypt a string
function decryptString(encryptedInput, key) {
    const parts = encryptedInput.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = Buffer.from(parts[1], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Example usage
const originalString = "YourSecretMessage";
const key = crypto.randomBytes(32); // AES-256 requires a 32-byte key

const encryptedString = encryptString(originalString, key);
const decryptedString = decryptString(encryptedString, key);

console.log(`Original: ${originalString}`);
console.log(`Encrypted: ${encryptedString}`);
console.log(`Decrypted: ${decryptedString}`);