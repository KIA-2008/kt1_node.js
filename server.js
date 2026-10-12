const express = require("express")
const mongoose = require("mongoose")
const Phone = require("./models/Phone")

const PORT = 5000

const app = express()
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/phones").then(()=>{ 
    console.log("Успешное подключение к БД");
}).catch((error)=>{ 
    console.log("Ошибка при подключении к БД: " + error); 
}) 

app.get("/phones" , async (req , res)=>{ 
    try{
        const phones = await Phone.find()
        res.json(phones)
        console.log(phones);
        
    }catch(error){
        console.log("Ошибка при получении продуктов: " + error);
    }
})

app.get("/phones/:id", async (req, res) => {
    try{
      const {id} = req.params
  
      const phone = await Phone.findById(id)
      if (!phone) {
        res.send("Такой смартфон не найден")
      }
      res.json(phone)
  
    }catch(error){
      console.log("Такой смартфон не найден: " , error);
      
    }
  });

app.post("/addphone", async (req , res)=>{
    const { title, color, description, price } =req.body 
    const newPhone = await Phone.create({ 
        title, color, description, price 
    })
    await newPhone.save() 
    res.send("Телефон успешно добавлен!")
}) 

app.patch('/phone/:id' , async (req , res)=> {
    try {
    const {id} = req.params
    console.log(id);

    const {title , color, description, price} = req.body
    const updatePhone = await Phone.findByIdAndUpdate(id ,{title, color, description, price})
    if(!updatePhone){
        res.send("Такого смартфона не существует!")
    }
    res.send("Данные успешно изменены")        
    } catch (error) {
        console.log("Ошибка, не удалось выполнить команду" + error);
        
    }
})


app.delete("/deletephone/:id" , async (req , res)=>{ 
    try{ 
        const {id} = req.params 
        console.log(id);
        
        const phone = await Phone.findByIdAndDelete(id) 
        if (!phone) {
            res.send("Такого смартфона нет ")
        }
        res.send("Смартфон успешно удален") 
    }catch(error){ 
        console.log("Ошибка при удалении смартфона: " + error); 
    } 
}) 

app.listen(PORT, ()=>{
    console.log("Сервер успешно запущен, порт: " + PORT);
})
