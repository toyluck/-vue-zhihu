/**
 * Created by hyc on 2016/12/23.
 */
const AV = require('./av'),
    http = require('http'),
    https = require('https'),
    stream = require('stream').Transform,
    HashTable = require('./HashTable'),
    fs = require('fs'),
    uri = 'http://pic3.zhimg.com/02f261c372d459632ce0a328d2d4314a.jpg'
const ERRORCODE = {
    1: {
        code: 1,
        message: 'Invalid url'
    },
    2: {
        code: 2,
        message: 'Invalid image'
    },
    3: {
        code: 3,
        message: 'Invalid extension'
    },
    4: {
        code: 4,
        message: 'Image too larger'
    },
    5: {
        code: 5,
        message: 'read file eror'
    },
    6: {
        code: 6,
        message: 'Time out!'
    }
}


const downloadImg = function (uri) {
    console.log(uri)
    const av = new AV.Promise()

    let filename = uri.match(/(\w+)(\.\w+)+(?!.*(\w+)(\.\w+)+)/g)
    if (!filename) {
        av.reject(ERRORCODE[1])
        return av
    }

    filename = filename[0]
    let httprequest = http
    if (/^https:\/\//.test(uri)) {
        httprequest = https
    } else if (/^https:\/\//.test(uri)) {
        av.reject(ERRORCODE[1])
        return av
    }
    const readfile = function (res) {
        if (res.statusCode !== 200) {
            console.log('===========readfile===============')

            return av.reject(ERRORCODE[1])
        }
        const f=fs.createWriteStream('file.jpg')
        // 检查contenttype
        let types = res.headers['content-type'].split('/')
        if (!types.length || types[0] !== 'image') {
            av.reject(ERRORCODE[2])
            return av
        }
        if (['jpg', 'jpeg', 'gif', 'png', 'webp', 'svg'].indexOf(types[1]) === -1) {
            av.reject(ERRORCODE[3])
            return av
        }

        // let chucks = getReadableStream

        let chucks = []
        res.on('data', (d) => {
            // chucks += d
            chucks.push(d)
            // f.write(d)
        })
        res.on('error', () => av.reject(ERRORCODE[5]))
        res.on('end', () => {
            const base64 = new Buffer(chucks, 'binary')
            const fd = Buffer.concat(chucks);
            // f.write(fd)

            av.resolve({filename, fd})
        })
    }
    // 4. 进行流处理 下载图片
    const request = httprequest.request(uri)
    request.setTimeout(10000, () => av.reject(ERRORCODE[6]))
    request.on('response', readfile)
    request.end()
    return av
}


function run(generator) {
    const task = generator()
    let result = task.next()

    function step() {
        if (!result.done) {
            const value = result.value;
            if (typeof value.then === 'function') {
                value.then(res => {
                    result = task.next(res, {arguments: arguments})
                    step()
                }).catch(err => {
                    result = task.next(err)
                })
            } else if (value === 'function') {
                value((err, data) => {

                })
            }
            else {
                result = task.next(value)
                step()
            }
        }
    }

    step()
}

run(function*() {
    console.log(HashTable)
    let result = HashTable.get(uri)
    if (result)return result
    const query = new AV.Query('_File')

    const first = query.equalTo('name', uri).first();
    result = yield first;

    if (result) {

        const imgData = yield downloadImg(uri);
        console.log(imgData)
        const avFile = new AV.File(uri, imgData.fd)
        result = yield avFile.save()

    }
    console.log('result = ', result)
    const url = typeof result.url === 'function' ? result.url() : result.url;
    console.log('url = ', url)

    HashTable.set(uri, result)

})


