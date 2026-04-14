const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/customers', (req, res) => {
    db.all("SELECT * FROM customers ORDER BY createdAt DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Mock data initialization for MVP
app.post('/api/customers/mock', (req, res) => {
    const mockData = [
        { name: 'João Silva', email: 'joao@example.com', status: 'Ativo', revenue: 1200.50, segment: 'VIP', lastPurchaseDate: '2023-10-01' },
        { name: 'Maria Souza', email: 'maria@example.com', status: 'Inativo', revenue: 450.00, segment: 'Comum', lastPurchaseDate: '2023-05-15' },
        { name: 'Carlos Santos', email: 'carlos@example.com', status: 'Ativo', revenue: 890.00, segment: 'Novo', lastPurchaseDate: '2023-10-25' }
    ];

    const stmt = db.prepare("INSERT OR IGNORE INTO customers (name, email, status, revenue, segment, lastPurchaseDate) VALUES (?, ?, ?, ?, ?, ?)");
    mockData.forEach(c => {
        stmt.run(c.name, c.email, c.status, c.revenue, c.segment, c.lastPurchaseDate);
    });
    stmt.finalize();

    res.json({ message: 'Mock data initialized' });
});

// Handle friendly URLs manually for the multi-page app approach
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/clientes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'clientes.html'));
});

// Fallback to login for unknown paths
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
