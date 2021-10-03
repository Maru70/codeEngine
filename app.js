const { request } = require("express");
const express = require("express");
const app = express();
const mysql = require("mysql");
app.set("view engine", "ejs");

//DB接続
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'maruo/2021',
  database: '100cherry_list'
});

//DB接続に失敗した場合
connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('DB接続に成功しました');
});

app.get('/', (req, res) => {
  console.log("GETされた"); 
  connection.query(
    'SELECT * FROM 100cherry_list_new',
    (error, results) => {
      res.render('top.ejs',{web:results});
    }
  );
});


app.post('/',(req,res) => {
  console.log("POSTされた"); 

  connection.query(
    'SELECT * FROM 100cherry_list_new',
    (error, results) => {
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
console.log("サーバーが起動しました");