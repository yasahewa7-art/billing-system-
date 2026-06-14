const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// බිල් සිස්ටම් එකේ තාවකාලික බඩු ලැයිස්තුව
let products = [
    { id: 1, name: "1/2 Gi pipe pks", full_price: 2000, half_price: 1000, foot_price: 150, stock: 100 },
    { id: 2, name: "3/4 Gi pipe pks", full_price: 3000, half_price: 1500, foot_price: 200, stock: 50 },
    { id: 3, name: "Slon PVC Pipe 20mm", full_price: 850, half_price: 450, foot_price: 50, stock: 200 }
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Servereka running on port ${PORT}...`);
});
