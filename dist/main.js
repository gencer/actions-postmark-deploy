"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const postmark = require("postmark");
async function run() {
    const from = core.getInput('from');
    const to = core.getInput('to');
    const message = core.getInput('message');
    const token = core.getInput('POSTMARK_TOKEN') || process.env.POSTMARK_TOKEN;
    core.debug('Sending Email');
    var client = new postmark.Client(token);
    client.sendEmail({
        "From": from,
        "To": to,
        "Subject": "Deployment Succeeded",
        "TextBody": "Hello from Postmark!"
    });
    core.debug('Email sent');
    return;
}
async function execute() {
    try {
        return await run();
    }
    catch ({ to, from, message }) {
        core.error(`Failed to send to ${to} from ${from} with message ${message}`);
        core.setFailed(to);
    }
}
module.exports = execute;
execute();
