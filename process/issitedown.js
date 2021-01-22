import linkCheck from 'link-check'
import LineNotify from '../library/line_notify.js'

export default function(list_of_url){
    for (var data of list_of_url){
        linkCheck(data, function (err, result) {
            if (err) {
                console.error(err);
                return;
            }
            if(result.status == 'dead'){
                console.log(`Site: `+result.link+` is `+result.status);
                LineNotify(`Site: `+result.link+` is `+result.status)
            }
        });
    }
}