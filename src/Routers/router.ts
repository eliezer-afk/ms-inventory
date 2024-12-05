import { Router } from 'express';
import { addStock, removeStock, getStockByProduct } from '../controllers/control';

const router = Router();

router.post('/add', addStock);
router.post('/remove', removeStock);
router.get('/product/:producto_id', getStockByProduct);

export default router;