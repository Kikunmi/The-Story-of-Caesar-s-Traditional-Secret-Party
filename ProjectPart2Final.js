const alphabet = "abcdefghijklmnopqrstuvwxyz";

/**
 * Encrypts a message using Caesar Cipher with added complexity:
 * - Shifts letters by `shiftValue`
 * - Preserves case (uppercase/lowercase)
 * - Non-alphabet characters remain unchanged
 * - Inserts a random letter after every two encrypted letters
 *
 * @param {string} message - The original plaintext message
 * @param {number} shiftValue - The number of positions to shift each letter
 * @returns {string} - The encrypted message
 */

function encrypt(message, shiftValue) {
  let encryptedMessage = ""; // Stores the final encrypted message
  let counter = 0; // Tracks how many letters have been processed (for random insertion)

  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    const lowerChar = char.toLowerCase();
    const index = alphabet.indexOf(lowerChar);

    if (index === -1) {
      // If the character is not in the alphabet (e.g., space, punctuation), keep it unchanged
      encryptedMessage += char;
      continue;
    }

    // Calculate new index after shifting, using modulo for wrap-around
    const newIndex = (index + shiftValue) % alphabet.length;
    const encryptedChar = alphabet[newIndex];

    // Preserve original case (uppercase stays uppercase)
    encryptedMessage += char === char.toUpperCase() ? encryptedChar.toUpperCase() : encryptedChar;
    counter++;

    // After every two letters, insert a random letter from the alphabet
    if (counter === 2) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      encryptedMessage += randomLetter;
      counter = 0; // Reset counter after inserting random letter
    }
  }

  return encryptedMessage;
}

/**
 * Decrypts a message encrypted with the above method:
 * - Removes random letters inserted during encryption
 * - Shifts letters back by `shiftValue`
 *
 * @param {string} encryptedMessage - The encrypted message
 * @param {number} shiftValue - The number of positions originally used for shifting
 * @returns {string} - The decrypted (original) message
 */

function decrypt(encryptedMessage, shiftValue) {
  let decryptedMessage = ""; // Stores the final decrypted message
  let counter = 0; // Tracks real letters to skip random ones
  for (let i = 0; i < encryptedMessage.length; i++) {
    const char = encryptedMessage[i];
    const lowerChar = char.toLowerCase();
    const index = alphabet.indexOf(lowerChar);

    if (index === -1) {
      // Non-alphabet characters remain unchanged
      decryptedMessage += char;
      continue;
    }

    // Skip random letters after every two real letters
    if (counter === 2) {
      counter = 0; // Reset counter and skip this character
      continue;
    }

    // Calculate original index by reversing the shift
    let originalIndex = (index - shiftValue) % alphabet.length;
    if (originalIndex < 0) originalIndex += alphabet.length; // Handle negative wrap-around

    const decryptedChar = alphabet[originalIndex];
    decryptedMessage += char === char.toUpperCase() ? decryptedChar.toUpperCase() : decryptedChar;
    counter++;
  }

  return decryptedMessage;
}

// Test with Caesar's secret message
const secretMessage = "Iueuan jrxuq cjythdykwxaj mixkqtaeml ebv wHenckvbkei rqdmt fHukckvi.r Jbxuihus, tmxayiwfuxh sjxau amenhtv 'zQkhhuubyjkit' yjew jhxux mxydatij. zJxmu hvymhihj ajel kldlsuyjb dyju yid uekdh qIbkqsxa xsxqqdvduzb wuqzhdoi qjxwu waueo xjem jfxuy dpuntj dgkvuiwj.";

console.log("Decrypted:", decrypt(secretMessage, 42));
``