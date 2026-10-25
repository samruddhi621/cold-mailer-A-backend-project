import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";
import mailRoutes from "./routes/mail.routes.js";

const app = express();
const PORT=5000;

app.use(express.json());

app.use("/api/mail", mailRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/file", fileRoutes);

connectDB()

app.get("/", (req,res)=>{
    res.send("Coldmailer API is Running");
})


app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
