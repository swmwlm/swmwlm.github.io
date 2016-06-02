// 使用node http request 模拟发送评论进行灌水 使用node comment.js命令
var http=require('http')
var querystring=require('querystring')

var postData=querystring.stringify({
	comment:"33333",
	proId:"9c2f0d10-e800-4380-88c1-5b2c7881e46c"
})

var options={
	hostname:'www.baidu.com',
	port:8080,
	path:'/usercenter/addProjectComment',
	method:'POST',
	headers:{
		'Host': '',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0',
		'Accept': '*/*',
		'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
		'Accept-Encoding': 'gzip, deflate',
		'DNT': 1,
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'X-Requested-With': 'XMLHttpRequest',
		'Referer': '',
		'Content-Length': postData.length,
		'Cookie': '',
		'Connection': 'keep-alive'
	}
}

var dataStr=''
var req=http.request(options,function(res){
	console.log('Status:'+ res.statusCode)
	console.log('Headers:'+ JSON.stringify(res.headers))

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk))
		console.log(typeof chunk)
		dataStr+=chunk
	})
	res.on('end',function(){
		console.log('评论完毕！')
		console.log('Data:'+dataStr)
	})
})
req.on('error',function(e){
	console.log('Error:'+e.message)
})
req.write(postData)
req.end()
