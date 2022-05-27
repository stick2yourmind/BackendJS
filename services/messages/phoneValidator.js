const twilio = require('twilio')
const { TWILIO } = require('../../config')

const TWILIO_ACCOUNT_SID = TWILIO.ACCOUNT
const TWILIO_TOKEN = TWILIO.TOKEN

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_TOKEN)
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const phoneIsValid = async (phoneNumberToValid) => {
  let isValid = null
  try {
    const responseFetched = await twilioClient.lookups.v1.phoneNumbers(phoneNumberToValid)
      .fetch({ type: ['carrier'] })
      .then(phoneNumber => phoneNumber.carrier)
    if (responseFetched?.type && (responseFetched?.type.localeCompare('mobile') === 0)) { isValid = true } else isValid = false
  } catch (e) {
    isValid = false
    console.log(e.message)
  }
  return isValid
}

module.exports = phoneIsValid
