import express, { json } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
//this is my api key
const myApiKey = "fc326449f15c4972a33144451231811";
app.use(bodyParser.urlencoded({ extended: true }));

//variable for the first time api request.
let Cityname = "Almora";


app.get("/",async(req,res)=>{
    //try and catch block for error handling.
    try {
        const result = await axios.get("http://api.weatherapi.com/v1/current.json?",{
            params:{
                key : myApiKey,
                q : Cityname
            }
        });
        res.render("index.ejs",{
            temperature : JSON.stringify(result.data.current.temp_c)+" °C",
            condition :JSON.stringify(result.data.current.condition.text ),
            image: result.data.current.condition.icon  ,
            windSpeed :  JSON.stringify(result.data.current.wind_kph)+" kph",
            humidity : JSON.stringify(result.data.current.humidity),
            CityName : Cityname
        });
       
    } catch (error) {
        //custom error
        console.log(" Connection Problem.");
    }

});

//for getting the user's search
app.post("/",(req, res)=>{
    Cityname = req.body.location;
    res.redirect("/");
});



app.listen(port,()=>{
    console.log(`Server Running on Port ${port}`);
});