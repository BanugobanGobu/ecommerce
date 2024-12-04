import { Request, Response } from 'express';
import product from "../models/ProductModel"



interface ProductInput {
    name: String;
    description: String;
    price: Number;
    stock: Number;
    images?: String[]
}


export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, stock } = req.body;

        const files = req.files as Express.Multer.File[];
        const imagePaths = files.map((file) => file.path);

        const newProduct = new product({
            name,
            description,
            price,
            stock,
            images: imagePaths,
        });

        await newProduct.save();
        res.status(201).json( newProduct );
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: "Error creating product", error: error.message });
        } else {
            res.status(400).json({ message: "Unknown error occurred" });
        }
    }
};