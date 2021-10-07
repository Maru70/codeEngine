const { request } = require("express");
const express = require("express");
const app = express();
const mysql = require("mysql");
const log4js = require("log4js");
const logger = log4js.getLogger();

//ログの設定
logger.level = 'all';
log4js.configure(
  {
    "appenders": {
      "console": {
        "type": "console"
      },
      "system": {
        "type": "dateFile",
        "filename": "log/system.log",
        "pattern": "-yyyy-MM-dd"
      }
    },
    "categories": {
      "default": {
        "appenders": [
          "console",
          "system"
        ],
        "level": "all"
      }
    }
  }
)

app.set("view engine", "ejs");

//DB接続
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'maruo/2021',
  database: '100cherry_list'
});

 //DB接続
 connection.connect((err) => {
  if (err) {
    //DB接続に失敗した場合
    logger.error('error DB接続時エラー: ' + err.stack);
    return;
  }
  logger.info('DB接続に成功しました');
});

app.get('/', (req, res) => {
  logger.info("GETされた"); 
  res.render('top.ejs');
});

app.post('/',(req,res) => {
  logger.info("POSTされた"); 

  connection.query(
    'SELECT * FROM 100cherry_list_new',
    (error, results) => {
      if(error){
        //データ取得に失敗した場合
        logger.error('error データ取得時エラー: ' + err.stack);
      }
      //データ取得
      logger.info('データ取得に成功しました');
      res.render('result.ejs',{web:results});
    }
  );

  /*
  //★★POSTで送信された都道府県を取得★★未解決
  
  //表示用配列の宣言
  var prefArray = new Array();
  //データアクセス
  connection.query(
    'SELECT * FROM 100cherry_list_new',
    (error, results) => {
      
      //DBから取得したデータ分forをまわす
     for(let i =0 ,len = results.lenght;i<len; i++)
      {
        if(results[i]["pre"] == str)
        {
          //表示用配列に格納
          prefArray[i] = results[i];
        }
      }
      for(var i =0;prefArray.lenght<i; i++)
      {
        // divの部分を取得
        var getResult = document.getElementById('getResult');
        // 表示したいデータを指定する
        var arrayUrl = document.createTextNode(prefArray[i].uri);
        // 要素を指定し、その要素の子要素としてデータを表示する
        getResult.appendChild(arrayUrl);

        // 次に、nameを表示する
        //var arrayName = document.createTextNode(prefArray[i].name);
        //getResult.appendChild(arrayName);
      }
      res.render('result.ejs');
    })*/
});
app.listen(8080);
logger.info("サーバーが起動しました");