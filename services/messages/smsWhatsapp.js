const twilio = require('twilio')
const { TWILIO } = require('../../config')

const TWILIO_ACCOUNT_SID = TWILIO.ACCOUNT
const TWILIO_TOKEN = TWILIO.TOKEN

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_TOKEN)
/**
 *  Twilio's API for whatsapp, send messages via whatsapp (outbound only).
 *
 * @param {String} to - phone number. Example: 'whatsapp:+14155238886'
 * @param {String} body - Message to be sended. Example: 'Your order N#1231231 has been processed'
 * @param {Array} [mediaUrl=[]] - Array for only one url img. Example: ['https://i.ibb.co/ygqyZ3f/tuki.webp']
 */
const msgSender = async (from, to, body, mediaUrl = null) => {
  try {
    let msgPayload = {}
    if (mediaUrl === null) {
      msgPayload = {
        body,
        from,
        to
      }
    } else {
      msgPayload = {
        body,
        from,
        mediaUrl,
        to
      }
    }

    const responseFetched = await twilioClient.messages.create(msgPayload)
    console.log(responseFetched)
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = msgSender
