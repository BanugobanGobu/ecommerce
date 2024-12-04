import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import 'dotenv/config'
import cors from "cors"
import userRoutes from "./src/routes/UserRoutes";
import productRoutes from "./src/routes/ProductRoutes"
import path from "path";

const app = express();
const port: string | number = process.env.PORT ?? 3000;

const mongoUrl: string = process.env.MONGO_URL as string;

app.get("/", (req: Request, res: Response): void => {
    res.send("This server was created for Banugoban backend project");
});

if (!mongoUrl) {
    console.error("MongoDB connection URL is missing in environment variables.");
    process.exit(1)
}
app.use(express.json())
app.use(cors())

app.use("/user", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/product", productRoutes)

mongoose.connect(mongoUrl)
    .then(() => {
        app.listen(port, () => {
            console.log(`server running at port:${port} and MongoDB connected successfully`);
        });
    })
    .catch((error: Error) => {
        console.log("Error connecting to MongoDB:", error);
    });




