require('dotenv').config();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const notifyserviceid = process.env.NOTIFYSRVICEID;
const client = require('twilio')(accountSid, authToken);
exports.smsNotify = async (numberList,msgBody) => {
  try{ 
    const numbers = []; 
    for (var i = 0; i < numberList.length; i++) {
        numbers.push(JSON.stringify({
        binding_type: 'sms',
        address: numberList[i],
      }),
      )
    }
    const notificationOpts = {
      toBinding: numbers,
      body: msgBody,
    };
    const send = await client.notify.services(notifyserviceid).notifications.create(notificationOpts);
    return send;
  } catch (error) { 
    // console.log(error);
    return error
  }
}