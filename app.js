// 数据存储类
class DataStorage {
    static get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static add(key, item) {
        const data = this.get(key);
        data.push(item);
        this.set(key, data);
    }

    static remove(key, index) {
        const data = this.get(key);
        data.splice(index, 1);
        this.set(key, data);
    }
}

// 页面导航
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page).classList.add('active');
        
        if (page === 'dashboard') {
            updateDashboard();
        } else if (page === 'profit') {
            calculateProfit();
        }
    });
});

// 初始化日期选择器为今天
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => input.value = today);
    
    const monthInput = document.getElementById('reportMonth');
    if (monthInput) {
        monthInput.value = new Date().toISOString().slice(0, 7);
    }
    
    initApp();
});

function initApp() {
    initSales();
    initInventory();
    initExpenses();
    initProfitAnalysis();
    updateDashboard();
}

// ===== 销售管理 =====
function initSales() {
    const form = document.getElementById('salesForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addSale();
    });
    renderSalesTable();
}

function addSale() {
    let productName = document.getElementById('productName').value;
    
    // 如果选择了自定义产品
    if (productName === 'custom') {
        const customName = document.getElementById('customProductName').value.trim();
        if (!customName) {
            alert(t('sales.enterCustomName'));
            return;
        }
        productName = customName;
    }
    
    const sale = {
        id: Date.now(),
        product: productName,
        price: parseFloat(document.getElementById('productPrice').value),
        quantity: parseInt(document.getElementById('productQuantity').value),
        date: document.getElementById('saleDate').value
    };
    
    sale.total = sale.price * sale.quantity;
    
    DataStorage.add('sales', sale);
    renderSalesTable();
    updateDashboard();
    document.getElementById('salesForm').reset();
    document.getElementById('customProductGroup').style.display = 'none';
    document.getElementById('saleDate').value = new Date().toISOString().split('T')[0];
    alert(t('sales.success'));
}

// 切换自定义产品输入框
function toggleCustomProduct() {
    const select = document.getElementById('productName');
    const customGroup = document.getElementById('customProductGroup');
    const customInput = document.getElementById('customProductName');
    
    if (select.value === 'custom') {
        customGroup.style.display = 'block';
        customInput.required = true;
    } else {
        customGroup.style.display = 'none';
        customInput.required = false;
        customInput.value = '';
    }
}

function renderSalesTable() {
    const tbody = document.getElementById('salesTableBody');
    const sales = DataStorage.get('sales');
    
    if (sales.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">${t('sales.noRecords')}</td></tr>`;
        return;
    }
    
    const deleteText = t('sales.delete');
    
    tbody.innerHTML = sales.map((sale, index) => `
        <tr>
            <td>${sale.date}</td>
            <td>${sale.product}</td>
            <td>${formatCurrency(sale.price)}</td>
            <td>${sale.quantity}</td>
            <td>${formatCurrency(sale.total)}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteSale(${index})">${deleteText}</button>
            </td>
        </tr>
    `).join('');
}

function deleteSale(index) {
    if (confirm(t('sales.deleteConfirm'))) {
        DataStorage.remove('sales', index);
        renderSalesTable();
        updateDashboard();
    }
}

// ===== 库存管理 =====
function initInventory() {
    const form = document.getElementById('inventoryForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addInventory();
    });
    renderInventoryTable();
}

function addInventory() {
    const item = {
        id: Date.now(),
        name: document.getElementById('materialName').value,
        quantity: parseFloat(document.getElementById('materialQuantity').value),
        unit: document.getElementById('materialUnit').value,
        price: parseFloat(document.getElementById('materialPrice').value)
    };
    
    item.total = item.quantity * item.price;
    
    DataStorage.add('inventory', item);
    renderInventoryTable();
    document.getElementById('inventoryForm').reset();
    alert(t('inventory.success'));
}

function renderInventoryTable() {
    const tbody = document.getElementById('inventoryTableBody');
    const inventory = DataStorage.get('inventory');
    
    if (inventory.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">${t('inventory.noRecords')}</td></tr>`;
        return;
    }
    
    const deleteText = t('inventory.delete');
    
    tbody.innerHTML = inventory.map((item, index) => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.unit}</td>
            <td>${formatCurrency(item.price)}</td>
            <td>${formatCurrency(item.total)}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteInventory(${index})">${deleteText}</button>
            </td>
        </tr>
    `).join('');
}

function deleteInventory(index) {
    if (confirm(t('inventory.deleteConfirm'))) {
        DataStorage.remove('inventory', index);
        renderInventoryTable();
    }
}

// ===== 支出管理 =====
function initExpenses() {
    const form = document.getElementById('expenseForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addExpense();
    });
    renderExpenseTable();
}

function addExpense() {
    const expense = {
        id: Date.now(),
        type: document.getElementById('expenseType').value,
        amount: parseFloat(document.getElementById('expenseAmount').value),
        date: document.getElementById('expenseDate').value,
        note: document.getElementById('expenseNote').value
    };
    
    DataStorage.add('expenses', expense);
    renderExpenseTable();
    updateDashboard();
    document.getElementById('expenseForm').reset();
    document.getElementById('expenseDate').value = new Date().toISOString().split('T')[0];
    alert(t('expenses.success'));
}

function renderExpenseTable() {
    const tbody = document.getElementById('expenseTableBody');
    const expenses = DataStorage.get('expenses');
    
    if (expenses.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">${t('expenses.noRecords')}</td></tr>`;
        return;
    }
    
    const deleteText = t('expenses.delete');
    
    tbody.innerHTML = expenses.map((expense, index) => `
        <tr>
            <td>${expense.date}</td>
            <td>${expense.type}</td>
            <td>${formatCurrency(expense.amount)}</td>
            <td>${expense.note || '-'}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteExpense(${index})">${deleteText}</button>
            </td>
        </tr>
    `).join('');
}

function deleteExpense(index) {
    if (confirm(t('expenses.deleteConfirm'))) {
        DataStorage.remove('expenses', index);
        renderExpenseTable();
        updateDashboard();
    }
}

// ===== 仪表盘 =====
function updateDashboard() {
    const sales = DataStorage.get('sales');
    const expenses = DataStorage.get('expenses');
    
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = today.slice(0, 7);
    
    // 今日销售额
    const todaySales = sales
        .filter(s => s.date === today)
        .reduce((sum, s) => sum + s.total, 0);
    
    // 本月销售额
    const monthSales = sales
        .filter(s => s.date.startsWith(thisMonth))
        .reduce((sum, s) => sum + s.total, 0);
    
    // 本月支出
    const monthExpenses = expenses
        .filter(e => e.date.startsWith(thisMonth))
        .reduce((sum, e) => sum + e.amount, 0);
    
    // 本月利润
    const monthProfit = monthSales - monthExpenses;
    
    document.getElementById('todaySales').textContent = formatCurrency(todaySales);
    document.getElementById('monthSales').textContent = formatCurrency(monthSales);
    document.getElementById('monthExpenses').textContent = formatCurrency(monthExpenses);
    document.getElementById('monthProfit').textContent = formatCurrency(monthProfit);
    document.getElementById('monthProfit').style.color = monthProfit >= 0 ? '#10b981' : '#ff4757';
    
    // 绘制销售趋势图
    drawSalesChart();
}

let salesChartInstance = null;

function drawSalesChart() {
    const sales = DataStorage.get('sales');
    const last7Days = [];
    const salesByDay = {};
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        last7Days.push(dateStr);
        salesByDay[dateStr] = 0;
    }
    
    sales.forEach(sale => {
        if (salesByDay.hasOwnProperty(sale.date)) {
            salesByDay[sale.date] += sale.total;
        }
    });
    
    const data = last7Days.map(date => salesByDay[date]);
    const labels = last7Days.map(date => date.slice(5));
    
    const ctx = document.getElementById('salesChart');
    
    if (salesChartInstance) {
        salesChartInstance.destroy();
    }
    
    salesChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: t('dashboard.salesAmount'),
                data: data,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: t('dashboard.salesTrend')
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// ===== 报表分析 =====
let productChartInstance = null;
let expenseChartInstance = null;

function generateReport() {
    const month = document.getElementById('reportMonth').value;
    if (!month) {
        alert(t('reports.selectMonthPrompt'));
        return;
    }
    
    const sales = DataStorage.get('sales').filter(s => s.date.startsWith(month));
    const expenses = DataStorage.get('expenses').filter(e => e.date.startsWith(month));
    
    const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const profit = totalSales - totalExpenses;
    const margin = totalSales > 0 ? (profit / totalSales * 100).toFixed(2) : 0;
    
    document.getElementById('reportSales').textContent = formatCurrency(totalSales);
    document.getElementById('reportExpenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('reportProfit').textContent = formatCurrency(profit);
    document.getElementById('reportProfit').style.color = profit >= 0 ? '#10b981' : '#ff4757';
    document.getElementById('reportMargin').textContent = `${margin}%`;
    document.getElementById('reportMargin').style.color = margin >= 0 ? '#10b981' : '#ff4757';
    
    // 产品销售分布
    const productSales = {};
    sales.forEach(sale => {
        productSales[sale.product] = (productSales[sale.product] || 0) + sale.total;
    });
    
    const productLabels = Object.keys(productSales);
    const productData = Object.values(productSales);
    
    const productCtx = document.getElementById('productChart');
    if (productChartInstance) {
        productChartInstance.destroy();
    }
    
    if (productLabels.length === 0) {
        productCtx.parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #999;">暂无数据</p>';
    } else {
        productChartInstance = new Chart(productCtx, {
            type: 'doughnut',
            data: {
                labels: productLabels,
                datasets: [{
                    data: productData,
                    backgroundColor: [
                        '#667eea',
                        '#764ba2',
                        '#f093fb',
                        '#4facfe',
                        '#43e97b'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // 支出类型分布
    const expenseTypes = {};
    expenses.forEach(expense => {
        expenseTypes[expense.type] = (expenseTypes[expense.type] || 0) + expense.amount;
    });
    
    const expenseLabels = Object.keys(expenseTypes);
    const expenseData = Object.values(expenseTypes);
    
    const expenseCtx = document.getElementById('expenseChart');
    if (expenseChartInstance) {
        expenseChartInstance.destroy();
    }
    
    if (expenseLabels.length === 0) {
        expenseCtx.parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #999;">暂无数据</p>';
    } else {
        expenseChartInstance = new Chart(expenseCtx, {
            type: 'bar',
            data: {
                labels: expenseLabels,
                datasets: [{
                    label: '支出金额（元）',
                    data: expenseData,
                    backgroundColor: '#ff4757'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

