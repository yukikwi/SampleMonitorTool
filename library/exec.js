import {exec} from 'child_process'

function execPromise(command) {
    return new Promise(function(resolve, reject) {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(stdout.trim());
        });
    });
}

export async function execute(command, callback){
    var exec_out = await execPromise(command);
    return exec_out
};