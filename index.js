
let helper = require('./helpers'), [,,operation,...data] =process.argv,parsedData;

(function parsingData (arr){
    parsedData = arr.reduce((prev,ele)=>{
        let [key,val] = ele.split("=");
        prev[key] = val;
        return prev;
    },{})
})(data)

switch(operation){
    case 'add':
        helper.add(parsedData);
        break;
    case 'edit':
        helper.edit(parsedData);
        break;
    case 'check':
        helper.check(parsedData.id);
        break;
    case 'uncheck':
        helper.uncheck(parsedData.id);
        break;
    case 'remove':
        helper.remove(parsedData.id);
        break;
    case 'list':
        helper.list(parsedData.type);
        break;
    default:
        helper.getNote(parsedData.id);
}


