import request from 'request'
 
export default function(msg){
    request({
        method: 'POST',
        uri: 'https://notify-api.line.me/api/notify',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          'bearer': process.env.LINE_token
        },
        form: {
          message: msg
        }
      }, (err, httpResponse, body) => {
        if(err){
          console.log(err);
        } else {
            console.log(httpResponse)
            console.log(body)
        }
    });
}