'use strict';
var greet=require('./hello');
var s='Michael';
greet(s);
//fs文件模块
//var fs=require('fs');
/* fs.readFile('./test.txt',function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
        console.log(data.length+'bytes');
        var text = data.toString('utf-8');
        console.log(text);
    }
}); */
/* try{var data=fs.readFileSync('./server.js','utf-8');
console.log(data);
}catch(err){

} */
/* var data='This is new file';
fs.writeFile('new.txt',data,function(err){
    if(err){
        console.log(err);
    }else{
        console.log('ok');
    }
}); */
//fs.stat()
/* fs.stat('./server.js',function(err,stat){
    if(err){
        console.log(err);
    }else{
        console.log('isFile'+stat.isFile());//是否为文件
        console.log('isDirectory:'+stat.isDirectory());//是否是目录
        if(stat.isFile()){
            console.log('size:'+stat.size);//文件大小
            console.log('birth time:'+stat.birthtime);//创建时间，Date对象
            console.log('modified time:'+stat.mtime);
        }
    };
}); */
//stream
/* var rs=fs.createReadStream('./test.txt','utf-8');
rs.on('data',function(chunk){
    console.log('DATA');
    console.log(chunk);
});
rs.on('end',function(){
    console.log('END');
});
rs.on('error',function(err){
    console.log('ERROR:'+err);
});
var ws1=fs.createWriteStream('stream.txt','utf-8');
ws1.write('使用Stream写入文本数据..\n');
ws1.write('END.');
ws1.end();
var ws2=fs.createWriteStream('stream2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n','utf-8'));
ws2.write(new Buffer('END','utf-8'));
ws2.end();
var rs_joint=fs.createReadStream('stream2.txt');
var ws_copy=fs.createWriteStream('copied.txt');
rs_joint.pipe(ws_copy);
readable.pipe(writable,{end:false}); */
/* //http模块
var http=require('http');//导入http模块
//创建http server,并传入回调函数
var server=http.createServer(function(request,response){
    //回调函数接收request和response对象
    //获得htpp请求的method和url
    console.log(request.method+':'+request.url);
    //将http响应200写入response,同时设置content-type:test/html
    response.writeHead(200,{'Content-Type':'text/html'});
    //降http响应的html内容写入response
    response.end('<h1>Hello http</h1>');  
});
//让服务器监听8090端口
server.listen(8090);
console.log('Server is running at http://127.0.0.1:8090/');
//引入url模块
var url=require('url');
console.log(url.parse('http://user:pass@host.com:8090/path/to/file?query=string#hash'));
//引入path模块 构造目录
var path=require('path');
//解析当前目录
var workDir=path.resolve('.');
//组合完整的文件路径
var filePath=path.join(workDir,'pub','sheet.html'); */

//实现一个文件服务器
var 
    fs=require('fs'),
    url=require('url'),
    path=require('path'),
    http=require('http');

//从命令参数获取root目录，默认是当前目录
var root=path.resolve(process.argv[2] || ',');
console.log('Static root dir:'+root);
//创建服务器
var server=http.createServer(function(request,response){
    //获得URL的path
    var pathname=url.parse(request.url).pathname;
    //获得对应的本地文件路径
    var filepath=path.join(root,pathname);
    console.log(filepath);
    //获取文件状态
    fs.stat(filepath,function(err,stat){
        if(!err&&stat.isFile()){
            //没有出错并且文件存在
            console.log('200'+request.url);
            //发送200响应
            response.writeHead(200);
            //将文件流导向response
            fs.createReadStream(filepath).pipe(response);
        }else{
            //出错了或者文件不存咋
            console.log('404'+request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        };
    });
});
server.listen(8070);
//console.log('Server is running at http://127.0.0.1:8070/');