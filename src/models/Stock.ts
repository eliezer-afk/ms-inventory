import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Stock extends Model {
    public id!: number;
    public producto_id!: number;
    public fecha_transaccion!: Date;
    public cantidad!: number;
    public entrada_salida!: number; // 1: entrada, 2: salida
}

Stock.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_transaccion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    cantidad: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    entrada_salida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[1, 2]], // 1 para entrada, 2 para salida
        },
    },
}, {
    sequelize,
    modelName: 'Stock',
    tableName: 'stocks',
    timestamps: false,
});

export default Stock;