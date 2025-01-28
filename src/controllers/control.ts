import { Request, Response } from 'express';
import Stock from '../models/Stock'; // Asegúrate de importar tu modelo de Stock

export const addStock = async (req: Request, res: Response) => {
    const { producto_id, cantidad } = req.body;
    try {
        // Buscar el registro de stock existente para el producto
        const existingStock = await Stock.findOne({ where: { producto_id } });

        if (existingStock) {
            // Si existe, actualizar la cantidad
            existingStock.cantidad += cantidad;
            existingStock.fecha_transaccion = new Date();
            await existingStock.save();
            res.status(200).json(existingStock);
        } else {
            // Si no existe, crear un nuevo registro de stock
            const newStock = await Stock.create({
                producto_id,
                cantidad,
                entrada_salida: 1, // 1 para entrada
                fecha_transaccion: new Date(),
            });
            res.status(201).json(newStock);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error adding stock' });
    }
};

export const removeStock = async (req: Request, res: Response) => {
    const { producto_id, cantidad } = req.body;
    try {
        // Buscar el registro de stock existente para el producto
        const existingStock = await Stock.findOne({ where: { producto_id } });

        if (existingStock) {
            // Si existe, actualizar la cantidad
            existingStock.cantidad -= cantidad;
            existingStock.fecha_transaccion = new Date();
            await existingStock.save();
            res.status(200).json(existingStock);
        } else {
            res.status(404).json({ error: 'Stock not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error removing stock' });
    }
};

export const getStockByProduct = async (req: Request, res: Response) => {
    const { producto_id } = req.params;
    try {
        const stockEntries = await Stock.findAll({ where: { producto_id } });
        res.json(stockEntries);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stock information' });
    }
};