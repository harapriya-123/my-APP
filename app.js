const mysql=require('mysql');
const express=require('express');
const path=require('path');

const app=express();
app.use(express.json());

//MYSQL CONNECTION
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Hara@200',
    database:'myCollege'

});

db.connect((err)=>{
    if(err) throw err;
    console.log('MySQL Connected...');
});

//serve HTML Form  
app.get('/student', (req, res) => {
    const sql = 'SELECT * FROM student';
    db.query(sql, (err, result) => {
        if (err) throw err;
        // Build a HTML table
        let html = `
            <h2> All Students </h2>
            <table border="1" cellpadding="5" cellspacing="0">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
        `;
        result.forEach((row) => {
            html += `<tr>
                        <td>${row.id}</td>
                        <td>${row.name}</td>
                    </tr>`;
        });
        html += '</table> <br> <a href="/">Back to form</a>';
        res.send(html);
    });
});

app.use(express.urlencoded({extended:true}));
//INSERT DATA INTO MYSQL
app.post('/student',(req,res)=>{
    const {id,name}=req.body;
    const sql='INSERT INTO student (id,name) VALUES (?,?)';
    db.query(sql, [id,name],(err,result)=>{
        if (err)
            console.error('Error inserting data:', err);
        console.log('Data inserted:',id);
        res.send('Data inserted successfully!');
    });
});

//start server 
app.listen(3000,()=>{
    console.log('API running at http://localhost:3000');
});