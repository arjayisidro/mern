'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper

main().catch(console.error);
