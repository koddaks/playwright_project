const { expect } = require("@playwright/test");

exports.RandomPage = class RandomPage {
  constructor() {}

  // Valid data generators

  validEmailGenerator(generatedEmail) {
    const symbols = "abcdefghijklmnopqrstuvwxyz1234567890";
    let string = "";
    for (let x = 0; x < 15; x++) {
      string += symbols[Math.floor(Math.random() * symbols.length)];
    }
    generatedEmail = string + "@gmail.com";
    return generatedEmail;
  }

  validUsernameGenerator(generatedUsername) {
    const symbols = "abcdefghijklmnopqrstuvwxyz1234567890";
    let string = "";

    for (let x = 0; x < 15; x++) {
      string += symbols[Math.floor(Math.random() * symbols.length)];
    }
    generatedUsername = string[0].toUpperCase() + string.slice(1);
    return generatedUsername;
  }

  validPasswordGenerator(generatedPassword) {
    const symbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.!";
    let string = "";
    for (let x = 0; x < 20; x++) {
      string += symbols[Math.floor(Math.random() * symbols.length)];
    }
    generatedPassword = string;
    return generatedPassword;
  }

  validPhoneGenerator(generatedPhone) {
    const symbols = "1234567890";
    let string = "";
    for (let x = 0; x < 20; x++) {
      string += symbols[Math.floor(Math.random() * symbols.length)];
    }
    generatedPhone = string;
    return generatedPhone;
  }

  validNameSurnameGenerator(generatedUsername) {
    const symbols = "abcdefghijklmnopqrstuvwxyz";
    let string = "";
    for (let x = 0; x < 15; x++) {
      string += symbols[Math.floor(Math.random() * symbols.length)];
    }
    generatedUsername = string[0].toUpperCase() + string.slice(1);
    return generatedUsername;
  }

  // Invalid data generators

  invalidEmailGenerator(generatedEmail) {
    const symbols = "!@#$%^&*(";
    let string = "";
    for (let x = 0; x < 15; x++) {
      string += symbols[Math.floor(Math.random() * symbols.length)];
    }
    generatedEmail = string + "gmail.com";
    return generatedEmail;
  }

  invalidUsernameGenerator(generatedUsername) {
    const symbols = "!@#$%^&*(";
    let string = "";

    for (let x = 0; x < 15; x++) {
      string += symbols[Math.floor(Math.random() * symbols.length)];
    }
    generatedUsername = string[0].toUpperCase() + string.slice(1);
    return generatedUsername;
  }

  invalidPasswordGenerator(generatedPassword) {
    const symbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.!";
    let string = "";
    for (let x = 0; x < 3; x++) {
      string += symbols[Math.floor(Math.random() * symbols.length)];
    }
    generatedPassword = string;
    return generatedPassword;
  }

  invalidPhoneGenerator(generatedPhone) {
    const symbols = "abcdefghijklmnopqrstuvwxyz";
    let string = "";
    for (let x = 0; x < 20; x++) {
      string += symbols[Math.floor(Math.random() * symbols.length)];
    }
    generatedPhone = string;
    return generatedPhone;
  }

  invalidNameSurnameGenerator(generatedUsername) {
    const symbols = "!@#$%^&*(";
    let string = "";
    for (let x = 0; x < 15; x++) {
      string += symbols[Math.floor(Math.random() * symbols.length)];
    }
    generatedUsername = string[0].toUpperCase() + string.slice(1);
    return generatedUsername;
  }
};