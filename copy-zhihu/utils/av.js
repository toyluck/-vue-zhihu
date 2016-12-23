/**
 * Created by hyc on 2016/12/22.
 */
var AV = require('leancloud-storage');
var APP_ID = '3SolcMvwQ7y1JhEoJy923RD1-gzGzoHsz';
var APP_KEY = '5cy5Uy1o5vbI1OLdSyiS5yBR';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
module.exports= AV