import { count } from 'console';
import {execute} from '../library/exec.js'

async function parameterExplode(){
    var diskSpaceRaw = await execute('df -h');
    //Fix 'map auto_home', 'Mounted on'
    diskSpaceRaw = diskSpaceRaw.replace('map auto_home','mapauto_home')
    diskSpaceRaw = diskSpaceRaw.replace('Mounted on','Mountedon')
    diskSpaceRaw = diskSpaceRaw.replace(/ +(?= )/g,'')
    diskSpaceRaw = diskSpaceRaw.split('\n')
    var diskSpaceArray = [];
    for (var data of diskSpaceRaw){
        diskSpaceArray.push(data.split(' '))
    }
    var diskSpace = []
    for(var i = 1; i<diskSpaceArray.length; i++){
        diskSpace.push({})
        for(var j = 0; j<diskSpaceArray[0].length; j++){
            try{
                diskSpaceArray[i][j] = diskSpaceArray[i][j].replace('mapauto_home','map auto_home')
            }
            catch (e) {
                //Do nothing
            }

            try{
                diskSpaceArray[0][j] = diskSpaceArray[0][j].replace('Mountedon','Mounted on')
            }
            catch (e) {
                //Do nothing
            }
            diskSpace[i-1][diskSpaceArray[0][j]] = diskSpaceArray[i][j]  
        }
    }
    return diskSpace
    
}

async function warning_list(warning_percentage){
    var warn_list = []
    var diskSpace = await parameterExplode()
    for (var data of diskSpace){
        switch(process.platform){
            case 'darwin':
                var capacity = parseInt(data.Capacity.replace('%',''))
                break
            case 'linux':
                var capacity = parseInt(data['Use%'].replace('%',''))
                break
        }
        if(capacity >= warning_percentage){
            warn_list.push(data)
        }
    }
    return warn_list
}
export const diskSpace = async function(){
    if(process.platform == 'darwin' || process.platform == 'linux'){
        var spcae = await warning_list(80)
        return spcae
    }
    else{
        return `Sorry this module support only macos and linux at this moment 
        This Platform is `+process.platform
    }
    
}