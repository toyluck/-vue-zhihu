/**
 * Created by hyc on 2016/12/22.
 */
const AV = require('./av'),
    http = require('http'),
    https = require('https'),
    log4js = require('log4js'),
    logger = log4js.getLogger('hyc-'),
    stream = require('stream').Transform
    , HashTable = require('./HashTable')
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
function parseReq(req) {
    const type = req.query.type
    // 1. 检查是否符合标准
    const data = req.query.data
    let uri = ''
    switch (type) {
        // 2. 检查是否有type
        case 'rev-64':
            // http://stackoverflow.com/questions/23097928/node-js-btoa-is-not-defined-error
            // 3. 根据type解密url
            uri = new Buffer(data, 'base64').toString().split('').reverse().join('')
            break
    }
    return uri
}

const downloadImg = function (uri) {
    console.log(uri)
    const av = new AV.Promise()

    let filename = uri.match(/(\w+)(\.\w+)+(?!.*(\w+)(\.\w+)+)/g)
    if (!filename) {
        av.reject(ERRORCODE[1])
        return av
    }
    console.log('==========filename================' + filename)

    filename = filename[0]
    let httprequest = http
    if (/^https:\/\//.test(uri)) {
        httprequest = https
    } else if (!/^http:\/\//.test(uri)) {

        av.reject(ERRORCODE[1])
        return av
    }

    const readfile = function (res) {
        if (res.statusCode !== 200) {
            console.log('===========readfile===============')

            return av.reject(ERRORCODE[1])
        }

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

        const chucks = []
        res.on('data', (d) => {
            chucks.push(d)
        })
        res.on('error', () => av.reject(ERRORCODE[5]))
        res.on('end', () => {
            // const base64 = new Buffer(chucks, 'binary')
            const dd = Buffer.concat(chucks)
            av.resolve({filename, dd})
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


module.exports = {
    fetchImageData: (req, res) => {
        const uri = parseReq(req)
        if (uri === '') {
            res.send(ERRORCODE[1])
        } else
            run(function*() {
                let result = HashTable.get(uri)
                if (!result) {
                    const query = new AV.Query('_File')

                    const first = query.equalTo('name', uri).first();
                    result = yield first;
                }
                if (!result) {
                    const imgData = yield downloadImg(uri);
                    logger.info(imgData)
                    if (imgData.code) {
                        logger.error(imgData)
                        res.send(imgData)
                        return
                    }
                    const avFile = new AV.File(uri, imgData.dd)
                    result = yield  avFile.save()
                }
                HashTable.set(uri, result)
                logger.info('==============================')
                !result.url || logger.error(result)
                logger.info('resulturl  = ', result.url)

                const url = typeof result.url === 'function'
                    ? result.url()
                    : result.url || result._serverData.url;
                console.log('url = ', url)
                res.send({
                    status: 200,
                    data: {
                        url: url,
                        id: result.id
                    }
                })

            })
    }
}
