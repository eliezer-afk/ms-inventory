import { Request, Response } from 'express';
import Stock from '../models/Stock';

export const addStock = async (req: Request, res: Response) => {
    const { producto_id, cantidad } = req.body;
    try {
        const newStock = await Stock.create({
            producto_id,
            cantidad,
            entrada_salida: 1, // 1 para entrada
            fecha_transaccion: new Date(),
        });
        res.status(201).json(newStock);
    } catch (error) {
        res.status(500).json({ error: 'Error adding stock' });
    }
};

export const removeStock = async (req: Request, res: Response) => {
    const { producto_id, cantidad } = req.body;
    try {
        const newStock = await Stock.create({
            producto_id,
            cantidad,
            entrada_salida: 2, // 2 para salida
            fecha_transaccion: new Date(),
        });
        res.status(201).json(newStock);
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