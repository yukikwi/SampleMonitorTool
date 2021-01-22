import {diskSpace} from './process/diskspace.js'
import cron from 'node-cron'
import e1m from './work/e1min.js'

console.log("Starting...")
console.log(await diskSpace())
cron.schedule('* * * * *', async function(){
    e1m()
});