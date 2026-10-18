import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import http from "http";
import {Server} from "socket.io";

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
const server = http.createServer(app);

const db=mysql.createConnection({
   host: process.env.DB_HOST || "localhost",
   user: process.env.DB_USER || "root",
   password: process.env.DB_PASSWORD || "ramsaran",
   database: process.env.DB_NAME || "test" 
})

db.connect((error) => {
    if (error) {
        console.error("MySQL connection failed:", error.message);
    } else {
        console.log("Connected to MySQL database");
    }
});

app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ Message: "Username and password are required." });
    }

    db.query("INSERT INTO user (username,password) VALUES (?,?)", [username, password], (err, data) => {
        if (err) {
            console.error("Signup error:", err);
            return res.status(500).json({ Message: "Error while creating user." });
        }
        return res.status(201).json({ Status: "Success" });
    });
});

app.post("/login",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    db.query("SELECT * FROM user WHERE username=? AND password=?", [username, password], (err, result) => {
        if (err) {
            console.error("Login error:", err);
            return res.status(500).json({ err: "Database error" });
        }

        if (result && result.length > 0) {
            return res.json(result[0]);
        }

        return res.status(401).json({ message: "No user found" });
    });
});


app.post("/adm_log",(req,res)=>{
    const adm_user = req.body.user;
    const adm_pwd = req.body.password;

    if (!adm_user || !adm_pwd) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    db.query("SELECT * FROM admin WHERE adm_user=? AND adm_pwd=?", [adm_user, adm_pwd], (err, result) => {
        if (err) {
            console.error("Admin login error:", err);
            return res.status(500).json({ err: "Database error" });
        }

        if (result && result.length > 0) {
            return res.json(result[0]);
        }

        return res.status(401).json({ message: "No user found" });
    });
});

app.post("/servmem_log",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    db.query("SELECT * FROM servicemember WHERE servmem_id=? AND servmem_pwd=?", [username, password], (err, result) => {
        if (err) {
            console.error("Service member login error:", err);
            return res.status(500).json({ err: "Database error" });
        }

        if (result && result.length > 0) {
            return res.json(result[0]);
        }

        return res.status(401).json({ message: "No user found" });
    });
});

app.post("/customer_log",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    db.query("SELECT * FROM customercare WHERE customer_id=? AND customer_pwd=?", [username, password], (err, result) => {
        if (err) {
            console.error("Customer care login error:", err);
            return res.status(500).json({ err: "Database error" });
        }

        if (result && result.length > 0) {
            return res.json(result[0]);
        }

        return res.status(401).json({ message: "No user found" });
    });
});



app.get("/services",(req,res)=>{
    const q="SELECT * FROM service_detail";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.get("/service_det",(req,res)=>{
    const q="SELECT * FROM service_detail";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.get("/serviced",(req,res)=>{
    
    const q="SELECT * FROM saran_2";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.get("/data_one",(req,res)=>{
    const q="SELECT * FROM service_detail";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.get("/data_log",(req,res)=>{
    const q="SELECT * FROM user";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.get("/data_cust",(req,res)=>{
    const q="SELECT * FROM chat";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.get("/data_book",(req,res)=>{
    const q="SELECT * FROM schedule";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.get("/data_books",(req,res)=>{
    const q="SELECT * FROM accept";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.get("/data_1",(req,res)=>{
    const q="SELECT * FROM user";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})


app.delete("/delete/:id",(req, res)=>{
    const ServId = req.params.id;

    db.query("DELETE FROM service_detail WHERE id = ?",[ServId],(err, data)=>{
        console.log(err);
    })
})
app.delete("/delete_accept/:id",(req, res)=>{
    const ServId = req.params.id;

    db.query("DELETE FROM schedule WHERE id = ?",[ServId],(err, data)=>{
        console.log(err);
    })
})
app.delete("/delete_chat/:id",(req, res)=>{
    const ServId = req.params.id;

    db.query("DELETE FROM chat WHERE id = ?",[ServId],(err, data)=>{
        console.log(err);
    })
})
app.delete("/delete_1/:id",(req, res)=>{
    const ServId = req.params.id;

    db.query("DELETE FROM saran_2 WHERE id = ?",[ServId],(err, data)=>{
        console.log(err);
    })
})

app.put("/update/:id",(req, res)=>{
    const ServId = req.params.id;

    const values=[req.body.name, req.body.emailid, req.body.dob, req.body.phno, req.body.experience, req.body.joiningdate, req.body.servname, req.body.location];

    db.query("UPDATE service_detail SET name=?,emailid=?,dob=?,phno=?,experience=?,joiningdate=?,servname=?,location=? WHERE id=?",[...values,ServId],(err, data)=>{
        console.log(err);
    })
})
app.put("/update_accept/:id",(req, res)=>{
    const ServId = req.params.id;

    const values=[req.body.timing];

    db.query("UPDATE accept SET timing=? WHERE id=?",[...values,ServId],(err, data)=>{
        console.log(err);
    })
})

app.get("/servicesone/:id",(req,res)=>{
    const ServId=req.params.id;
    db.query("SELECT * FROM service_detail WHERE id=?",[ServId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.get("/acceptedone/:id",(req,res)=>{
    const ServId=req.params.id;
    db.query("SELECT * FROM accept WHERE id=?",[ServId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.post("/select/:id",(req,res)=>{
    const ServId = req.params.id;

    db.query("INSERT INTO saran_2 (servimg,id,name,emailid,dob,phno,experience,joiningdate,servname,location) SELECT * FROM saran WHERE id=?",[ServId],(err, data)=>{
        console.log(err);
    })
})

app.post("/accept/:id",(req,res)=>{
    const ServId = req.params.id;

    db.query("INSERT INTO accept (id,userid,username,useremailid,userphno,houseno,streetname,areaname,location,date,descr) SELECT * FROM schedule WHERE id=?",[ServId],(err, data)=>{
        console.log(err);
    })
})
app.post("/rating",(req,res)=>{

    db.query("INSERT INTO rating (servimg,id,name) SELECT servimg,id,name FROM saran",(err, data)=>{
        console.log(err);
    })
})

app.get("/rating_one",(req, res)=>{
    const q="Select * FROM rating";
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.put("/selected/:id",(req, res)=>{
    
    const ServId = req.params.id;
    const values=[req.body.userid, req.body.username, req.body.useremailid, req.body.userphno, req.body.useraddress]

    db.query("UPDATE saran_2 SET userid=?, username=?, useremailid=?, userphno=?, useraddress=? WHERE id=?",[...values,ServId],(err,data)=>{
        console.log(err);    
    });
})
// app.put("/image/:id",(req, res)=>{
    
//     const ServId = req.params.id;
//     const images=req.body;


//     db.query("UPDATE saran SET servimg='?' WHERE id=?",[images,ServId],(err,result)=>{
//         // if(err){
//         //     res.send({err:err})
//         // }

//         if(err){
//             res.send({message:"Image file size is large"});
            
//         }
//         else{
//             res.send(result);
//         }
//     });
// })

app.post("/addsch",(req,res)=>{
    const id=req.body.id;
    const userid=req.body.userid;
    const username=req.body.username;
    const useremailid=req.body.useremailid;
    const userphno=req.body.userphno;
    const houseno=req.body.houseno;
    const streetname=req.body.streetname;
    const areaname=req.body.areaname;
    const location=req.body.location;
    const date=req.body.date;
    const descr=req.body.descr;
    
    db.query("INSERT INTO schedule (id,userid,username,useremailid,userphno,houseno,streetname,areaname,location,date,descr) VALUES (?,?,?,?,?,?,?,?,?,?,?)",[id,userid,username,useremailid,userphno,houseno,streetname,areaname,location,date,descr],(err,data)=>{
        if(err) return res.json({Message:"Error"});
        return res.json({Status:"Success"});   
    });
    
});

app.post("/addchat",(req,res)=>{
    const chatid=req.body.chatid;
    const roomid=req.body.roomid;

    if (!chatid || !roomid) {
        return res.status(400).json({ Message: "Chat ID and room ID are required." });
    }
    
    db.query("INSERT INTO chat (chatid,roomid) VALUES (?,?)",[chatid,roomid],(err,data)=>{
        if (err) {
            console.error("Add chat record error:", err);
            return res.status(500).json({ Message: "Error while storing chat room." });
        }
        return res.status(201).json({ Status: "Success" });
    });
});

app.get("/chat_table",(req,res)=>{
    const q="SELECT * FROM chat";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.post("/add",(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const emailid=req.body.emailid;
    const dob=req.body.dob;
    const phno=req.body.phno;
    const experience=req.body.experience;
    const joiningdate=req.body.joiningdate;
    const servname=req.body.servname;
    const location=req.body.location;
    const servimg=req.body.servimg;
    const servlogo=req.body.servlogo;
    
    db.query("INSERT INTO service_detail (id,name,emailid,dob,phno,experience,joiningdate,servname,location,servimg,servlogo) VALUES (?,?,?,?,?,?,?,?,?,?,?)",[id,name,emailid,dob,phno,experience,joiningdate,servname,location,servimg,servlogo],(err,result)=>{
        if(err) return res.json({Message:"Error"});
        return res.json({Status:"Success"});
    });
    
});
// app.use('Image',express.static('Image'));
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'C:\Image')
    },
    filename:(req,file,cb)=>{
        console.log(file)
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
})
const upload=multer({
    storage:storage
})

// app.set("view engine","ejs");

// app.get("/upload",(req,res)=>{
//     res.render("upload");
// });

app.post("/upload/:id",upload.single('image'),(req,res)=>{
    // console.log(req.file);
    const ServId = req.params.id;
    const image=req.file.filename;
    // const sql=
    db.query("UPDATE service_detail SET servimg='?' WHERE id='?'",[image,ServId],(err,result)=>{
        if(err) return res.json({Message:"Error"});
        return res.json({Status:"Success"});
    })
});



const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      const room = String(data || "").trim();
      if (!room) return;

      socket.join(room);
      socket.data.room = room;
      console.log(`User with ID: ${socket.id} joined room: ${room}`);
    });
  
    socket.on("send_message", (data) => {
      if (!data || !data.room || !String(data.message || "").trim()) return;

      const message = {
        room: String(data.room),
        author: String(data.author || "Anonymous"),
        message: String(data.message).trim(),
        time: data.time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      io.in(message.room).emit("receive_message", message);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

server.listen(3001,()=>{
    console.log("connected to backend")
})