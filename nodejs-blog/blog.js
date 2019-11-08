const http = require('http');
const fs = require('fs');
const path = require('path');
const Turl = require('url');
const date = require('./date')
var querystring = require('querystring')

const hostname = 'localhost';
const port = 8083;

const server = http.createServer();
let Tdate = date;
server.on('request', function (req, res) {
	//静态资源处理部分
	var pathurl=path.join(__dirname, req.url);
	console.log(pathurl)
	var parseurl= path.parse(pathurl);
	console.log(parseurl);
	console.log(parseurl.ext);
	if (parseurl.ext == '.jpg' ||parseurl.ext == '.png'){
		console.log('等于.jpg');
		console.log(parseurl.dir.split('\\').length);
		if (parseurl.dir.split('\\').length == 5){
			console.log('=========5555555555');
			parseurl.dir += '\\resource\\';
			console.log(parseurl.dir);
		}else if (parseurl.dir.split('\\').length > 5){
			let pds = parseurl.dir.split('\\');
			console.log(pds);
			pds.splice(5,0,'resource');
			console.log(pds);
			console.log('dadadadadadada55555555555555');
			parseurl.dir = pds.join("\\") + "\\";
			console.log(parseurl.dir)
		}
		parseurl.base = parseurl.dir +parseurl.base;
		console.log(parseurl.base);
		try{

			res.end(fs.readFileSync(parseurl.base))
		}catch (e) {

			console.log("the file not exist...")
		}

	} else if(parseurl.ext == '.css'){
		let pds = parseurl.dir.split('\\');
		console.log(pds);
		pds.splice(5,0,'resource');
		console.log(pds);
		console.log('dadadadadadada55555555555555');
		parseurl.dir = pds.join("\\") + "\\";
		console.log(parseurl.dir)
		parseurl.base = parseurl.dir +parseurl.base;
		console.log(parseurl.base);
		try{

			res.end(fs.readFileSync(parseurl.base))
		}catch (e) {

			console.log("the file not exist...")
		}
		console.log('css文件')
	} else if(parseurl.ext == '.jpeg'){
		let pds = parseurl.dir.split('\\');
		console.log(pds);
		pds.splice(5,0,'resource');
		console.log(pds);
		console.log('dadadadadadada55555555555555');
		parseurl.dir = pds.join("\\") + "\\";
		console.log(parseurl.dir)
		parseurl.base = parseurl.dir +parseurl.base;
		console.log(parseurl.base);
		try{
			res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'})
			res.end(fs.readFileSync(parseurl.base))
		}catch (e) {

			console.log("the file not exist...")
		}
		console.log('jpeg文件')
	} else if(parseurl.ext == '.js'){
		let pds = parseurl.dir.split('\\');
		console.log(pds);
		pds.splice(5,0,'resource');
		console.log(pds);
		console.log('dadadadadadada55555555555555');
		parseurl.dir = pds.join("\\") + "\\";
		console.log(parseurl.dir)
		parseurl.base = parseurl.dir +parseurl.base;
		console.log(parseurl.base);
		try{
			res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'})
			res.end(fs.readFileSync(parseurl.base))
		}catch (e) {

			console.log("the file not exist...")
		}
	} else {
		console.log('其他类型文件')
	}
	console.log('收到请求了，请求路径是：' + req.url);
	console.log('请求我的客户端的地址是：', req.socket.remoteAddress, req.socket.remotePort);
	let url = req.url;
	//路由部分
	console.log('url:',url);
	if(url === '/'){
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
		fs.readFile('./resource/index.html','utf-8',function (err,data) {
			if(err) {
				console.log('list.html loading is failed :' + err)
			}else {
				res.end(data)
			}
		})
	}else if(url === '/listmanager') {
		console.log('列表页访问')
		console.log()
		console.log(req.headers.cookie)
		var cooki = req.headers.cookie




		if (cooki && cooki == "666666"){
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			fs.readFile('./resource/list.html','utf-8',function (err,data) {
				if(err) {
					console.log('list.html loading is failed :' + err)
				}else {
					res.end(data)
				}
			})
		}else{
			res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'})
			res.end('请先登录')
		}



	} else if (url == '/addChapter'){
		console.log('addChapter')
		console.log(req.headers.cookie)
		//cooki 需要更好的处理,以后再说吧
		var cooki = req.headers.cookie

		if (cooki && cooki == "666666"){
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			fs.readFile('./resource/addChapter.html','utf-8',function (err,date) {
				if(err) {
					console.log('addChapter.html loading is failed :' + err)
				}else {
					console.log("xxxxxxxxxxxxxxdddd")

					res.end(date)
				}})
		}else{
			res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'})
			res.end('请先登录')
		}

	} else if (url === '/login'){
		console.log('登录页访问')
		res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
		fs.readFile('./resource/login.html','utf-8',function (err,date) {
			if(err) {
				console.log('list.html loading is failed :' + err);
			}else {
				res.end(date)
			}
		})
	}else if(url === '/logining'){
		var body = "";
		req.on('data', function (chunk) {
			body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
			console.log("chunk:",chunk);
			body = querystring.parse(body);
			console.log(body)
		});
		req.on('end',function () {
			if (body.username == 'admin' && body.password == 'admin'){
				console.log('密码正确');
				res.writeHead(301, {'Location': '/list','Set-Cookie':'666666'});

				res.end();
			} else {
				res.writeHead(401,{"Content-Type":"text/html;charset=utf-8"});
				console.log('密码错误');
				var err = {feedcode:0};
				res.end(JSON.stringify(err))
			}
		});

		console.log('密码验证')

	}else if (url === '/list'){
		console.log('chapterlist访问')
		res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
		fs.readFile('./resource/chapterList.html','utf-8',function (err,date) {
			if(err) {
				console.log('list.html loading is failed :' + err);
			}else {
				res.end(date)
			}
		})
	} else if (url === "/getCldate"){
		res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
		console.log(date)
		let datastr =  JSON.stringify(Tdate.chapterList);
		res.end(datastr)
	} else if(url === "/add"){
		let body = "";
		req.on('data', function (chunk) {
			body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
			console.log("chunk:",chunk);
			body = querystring.parse(body);
			console.log(body);
			let addone = {};
			console.log(Tdate.chapterList[Tdate.chapterList.length - 1])
			console.log(Tdate.chapterList[Tdate.chapterList.length - 1].chapterId)

			addone.chapterId = Tdate.chapterList[Tdate.chapterList.length - 1].chapterId +1;
			addone.chapterName = body.title;
			addone.chapterContent = body.content;
			addone.imgPath = "images/1442201163344838-lp.jpg";
			addone.chapterDes = "人生，原本就该这样。再大的事，无非是个经历而己";
			addone.publishTimer = "2019-08-19";
			addone.author = "admin";
			addone.views = "111";
			console.log(addone);
			Tdate.chapterList.push(addone);
			res.end();
		});
		res.end();


		console.log("添加文章接口被调用")
	} else {
		//其他部分
		var parseObj = Turl.parse(req.url, true);
		console.log(parseObj);
		var pathname = parseObj.pathname; //相当于无参数的url路径
		console.log(pathname);
		if(pathname =="/del"){
			console.log(parseObj.query.id)
			let id = parseObj.query.id;
			let Ddate = Tdate.chapterList;
			Ddate.splice(id,1)
			console.log(Ddate.length)
			console.log(Ddate)
			Tdate.chapterList = Ddate;
			res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
			let Ta = JSON.stringify(Tdate.chapterList)
			res.end(Ta)
		}
		if(pathname === "/detail"){
			console.log("获取到了参数")
			var query = parseObj.query.chapterId;
			console.log(query)
			res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
			fs.readFile('./resource/chapter.html','utf-8',function (err,date) {
				if(err) {
					console.log('list.html loading is failed :' + err);
				}else {
					console.log(req.url)
					res.end(date)
				}
			})
		}else if(pathname == "/getDD"){
			res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
			console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
			console.log("chipid")
			var query = parseObj.query.chapterId -1;
			console.log(query)
			console.log(date.chapterList[query])
			let datastr =  JSON.stringify(Tdate.chapterList[query]);
			res.end(datastr)
		}else if(url === "/del"){
			console.log("del访问")
			res.end()

		} else {
			res.end('404 Not Found.')
		}
	}

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});