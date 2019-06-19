const crypto = require('crypto');
const fs = require('fs');

// nodejs  v10.12.0 +
const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    namedCurve: 'namedCurve',
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'private-key-passphrase'
    }
});

fs.writeFileSync('./assets/public.pem', publicKey);
fs.writeFileSync('./assets/private.pem', privateKey);
