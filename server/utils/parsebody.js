 function parseData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let str = ''
            ctx.req.on('data', (data) => {
                str += data
                console.log(str);
                
            })
            ctx.req.addListener('end', () => {
                resolve(parseUrl(str))
            })
        } catch (err) {
            reject(err)
        }
    });
}

function parseUrl(url) {
    let obj = {}
    let arr = url.split('&')
    arr.forEach((e, i) => {
        let temparr = e.split('=')
        obj[temparr[0]] = temparr[1]
    });
    return obj
}

exports.parseData = parseData;