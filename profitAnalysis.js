// 盈亏分析模块

// 初始化盈亏分析
function initProfitAnalysis() {
    // 加载成本设置
    loadCostSettings();
    
    // 成本设置表单
    document.getElementById('costForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveCostSettings();
    });
    
    // 产品成本表单
    document.getElementById('productCostForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveProductCost();
    });
    
    // 显示产品成本列表
    renderProductCostList();
    
    // 计算盈亏
    calculateProfit();
}

// 保存成本设置
function saveCostSettings() {
    const costs = {
        rent: parseFloat(document.getElementById('rentCost').value) || 0,
        labor: parseFloat(document.getElementById('laborCost').value) || 0,
        utility: parseFloat(document.getElementById('utilityCost').value) || 0,
        other: parseFloat(document.getElementById('otherCost').value) || 0
    };
    
    localStorage.setItem('fixedCosts', JSON.stringify(costs));
    alert(t('profit.costSaved'));
    calculateProfit();
}

// 加载成本设置
function loadCostSettings() {
    const costs = JSON.parse(localStorage.getItem('fixedCosts')) || {
        rent: 0, labor: 0, utility: 0, other: 0
    };
    
    document.getElementById('rentCost').value = costs.rent;
    document.getElementById('laborCost').value = costs.labor;
    document.getElementById('utilityCost').value = costs.utility;
    document.getElementById('otherCost').value = costs.other;
}

// 保存产品成本
function saveProductCost() {
    let productName = document.getElementById('costProductName').value;
    
    // 如果选择了自定义产品
    if (productName === 'custom') {
        const customName = document.getElementById('customCostProductName').value.trim();
        if (!customName) {
            alert(t('sales.enterCustomName'));
            return;
        }
        productName = customName;
    }
    
    const materialCost = parseFloat(document.getElementById('materialCost').value);
    
    const productCosts = getProductCosts();
    productCosts[productName] = materialCost;
    
    localStorage.setItem('productCosts', JSON.stringify(productCosts));
    alert(`${productName} ${t('profit.productCostSaved')} ${formatCurrency(materialCost)}`);
    
    document.getElementById('materialCost').value = '';
    document.getElementById('customCostProductGroup').style.display = 'none';
    document.getElementById('costProductName').value = '招牌菜A';
    renderProductCostList();
    calculateProfit();
}

// 切换自定义成本产品输入框
function toggleCustomCostProduct() {
    const select = document.getElementById('costProductName');
    const customGroup = document.getElementById('customCostProductGroup');
    const customInput = document.getElementById('customCostProductName');
    
    if (select.value === 'custom') {
        customGroup.style.display = 'block';
        customInput.required = true;
    } else {
        customGroup.style.display = 'none';
        customInput.required = false;
        customInput.value = '';
    }
}

// 获取产品成本
function getProductCosts() {
    return JSON.parse(localStorage.getItem('productCosts')) || {};
}

// 渲染产品成本列表
function renderProductCostList() {
    const productCosts = getProductCosts();
    const listDiv = document.getElementById('productCostList');
    
    if (Object.keys(productCosts).length === 0) {
        listDiv.innerHTML = `<p style="color: #999;">${t('profit.noCostConfig')}</p>`;
        return;
    }
    
    listDiv.innerHTML = Object.entries(productCosts).map(([product, cost]) => `
        <div class="cost-item">
            <span>${product}</span>
            <strong>${formatCurrency(cost)}</strong>
        </div>
    `).join('');
}

// 计算盈亏
function calculateProfit() {
    const sales = DataStorage.get('sales');
    const expenses = DataStorage.get('expenses');
    const fixedCosts = JSON.parse(localStorage.getItem('fixedCosts')) || {
        rent: 0, labor: 0, utility: 0, other: 0
    };
    const productCosts = getProductCosts();
    
    // 获取当月数据
    const thisMonth = new Date().toISOString().slice(0, 7);
    const monthlySales = sales.filter(s => s.date.startsWith(thisMonth));
    const monthlyExpenses = expenses.filter(e => e.date.startsWith(thisMonth));
    
    // 计算总收入
    const totalRevenue = monthlySales.reduce((sum, s) => sum + s.total, 0);
    
    // 计算固定成本
    const totalFixedCost = fixedCosts.rent + fixedCosts.labor + 
                           fixedCosts.utility + fixedCosts.other;
    
    // 计算变动成本（根据产品销量）
    let totalVariableCost = 0;
    const productStats = {};
    
    monthlySales.forEach(sale => {
        const costPerUnit = productCosts[sale.product] || 0;
        const productCost = costPerUnit * sale.quantity;
        totalVariableCost += productCost;
        
        if (!productStats[sale.product]) {
            productStats[sale.product] = {
                quantity: 0,
                revenue: 0,
                cost: 0
            };
        }
        
        productStats[sale.product].quantity += sale.quantity;
        productStats[sale.product].revenue += sale.total;
        productStats[sale.product].cost += productCost;
    });
    
    // 加上其他支出
    const otherExpenses = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);
    
    // 总成本
    const totalCost = totalFixedCost + totalVariableCost + otherExpenses;
    
    // 净利润
    const netProfit = totalRevenue - totalCost;
    
    // 利润率
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue * 100) : 0;
    
    // 更新显示
    document.getElementById('profitRevenue').textContent = formatCurrency(totalRevenue);
    document.getElementById('profitTotalCost').textContent = formatCurrency(totalCost);
    document.getElementById('profitFixedCost').textContent = formatCurrency(totalFixedCost);
    document.getElementById('profitVariableCost').textContent = formatCurrency(totalVariableCost + otherExpenses);
    document.getElementById('profitNet').textContent = formatCurrency(netProfit);
    document.getElementById('profitNet').style.color = netProfit >= 0 ? '#10b981' : '#ff4757';
    document.getElementById('profitMargin').textContent = `${profitMargin.toFixed(2)}%`;
    document.getElementById('profitMargin').style.color = profitMargin >= 0 ? '#10b981' : '#ff4757';
    
    // 产品利润分析表
    renderProductProfitTable(productStats);
    
    // 盈亏平衡点分析
    calculateBreakeven(monthlySales, totalFixedCost, productCosts);
    
    // 绘制利润趋势图
    drawProfitTrendChart();
}

// 渲染产品利润表
function renderProductProfitTable(productStats) {
    const tbody = document.getElementById('productProfitTable');
    
    if (Object.keys(productStats).length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">${t('profit.noData')}</td></tr>`;
        return;
    }
    
    tbody.innerHTML = Object.entries(productStats).map(([product, stats]) => {
        const profit = stats.revenue - stats.cost;
        const margin = stats.revenue > 0 ? (profit / stats.revenue * 100) : 0;
        
        return `
            <tr>
                <td>${product}</td>
                <td>${stats.quantity}</td>
                <td>${formatCurrency(stats.revenue)}</td>
                <td>${formatCurrency(stats.cost)}</td>
                <td style="color: ${profit >= 0 ? '#10b981' : '#ff4757'}">
                    ${formatCurrency(profit)}
                </td>
                <td style="color: ${margin >= 0 ? '#10b981' : '#ff4757'}">
                    ${margin.toFixed(2)}%
                </td>
            </tr>
        `;
    }).join('');
}

// 计算盈亏平衡点
function calculateBreakeven(sales, fixedCost, productCosts) {
    if (sales.length === 0) {
        document.getElementById('avgPrice').textContent = formatCurrency(0);
        document.getElementById('avgCost').textContent = formatCurrency(0);
        document.getElementById('monthlyFixed').textContent = formatCurrency(0);
        document.getElementById('breakevenQty').textContent = '0';
        document.getElementById('breakevenRevenue').textContent = formatCurrency(0);
        return;
    }
    
    // 计算平均售价和平均成本
    const totalQty = sales.reduce((sum, s) => sum + s.quantity, 0);
    const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
    const avgPrice = totalRevenue / totalQty;
    
    let totalCost = 0;
    sales.forEach(sale => {
        const costPerUnit = productCosts[sale.product] || 0;
        totalCost += costPerUnit * sale.quantity;
    });
    const avgCost = totalCost / totalQty;
    
    // 盈亏平衡点 = 固定成本 / (平均售价 - 平均成本)
    const contributionMargin = avgPrice - avgCost;
    const breakevenQty = contributionMargin > 0 ? Math.ceil(fixedCost / contributionMargin) : 0;
    const breakevenRevenue = breakevenQty * avgPrice;
    
    document.getElementById('avgPrice').textContent = formatCurrency(avgPrice);
    document.getElementById('avgCost').textContent = formatCurrency(avgCost);
    document.getElementById('monthlyFixed').textContent = formatCurrency(fixedCost);
    document.getElementById('breakevenQty').textContent = breakevenQty;
    document.getElementById('breakevenRevenue').textContent = formatCurrency(breakevenRevenue);
}

// 绘制利润趋势图
let profitTrendChartInstance = null;

function drawProfitTrendChart() {
    const sales = DataStorage.get('sales');
    const expenses = DataStorage.get('expenses');
    const fixedCosts = JSON.parse(localStorage.getItem('fixedCosts')) || {
        rent: 0, labor: 0, utility: 0, other: 0
    };
    const productCosts = getProductCosts();
    
    // 获取最近6个月的数据
    const months = [];
    const revenueData = [];
    const costData = [];
    const profitData = [];
    
    for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthStr = date.toISOString().slice(0, 7);
        months.push(monthStr);
        
        const monthSales = sales.filter(s => s.date.startsWith(monthStr));
        const monthExpenses = expenses.filter(e => e.date.startsWith(monthStr));
        
        const revenue = monthSales.reduce((sum, s) => sum + s.total, 0);
        
        let variableCost = 0;
        monthSales.forEach(sale => {
            const cost = productCosts[sale.product] || 0;
            variableCost += cost * sale.quantity;
        });
        
        const fixedCost = fixedCosts.rent + fixedCosts.labor + 
                         fixedCosts.utility + fixedCosts.other;
        const otherExp = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
        const totalCost = fixedCost + variableCost + otherExp;
        
        revenueData.push(revenue);
        costData.push(totalCost);
        profitData.push(revenue - totalCost);
    }
    
    const labels = months.map(m => m.slice(5) + '月');
    
    const ctx = document.getElementById('profitTrendChart');
    
    if (profitTrendChartInstance) {
        profitTrendChartInstance.destroy();
    }
    
    profitTrendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: t('profit.revenue'),
                    data: revenueData,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4
                },
                {
                    label: t('profit.cost'),
                    data: costData,
                    borderColor: '#ff4757',
                    backgroundColor: 'rgba(255, 71, 87, 0.1)',
                    tension: 0.4
                },
                {
                    label: t('profit.profit'),
                    data: profitData,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: t('profit.profitTrend')
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

