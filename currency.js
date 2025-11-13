// 货币切换模块

// 支持的货币
const currencies = {
    CNY: {
        symbol: '¥',
        name: '人民币',
        nameKo: '위안화',
        nameEn: 'Chinese Yuan',
        rate: 1
    },
    KRW: {
        symbol: '₩',
        name: '韩元',
        nameKo: '원',
        nameEn: 'Korean Won',
        rate: 180  // 1人民币 ≈ 180韩元
    },
    USD: {
        symbol: '$',
        name: '美元',
        nameKo: '달러',
        nameEn: 'US Dollar',
        rate: 0.14  // 1人民币 ≈ 0.14美元
    },
    EUR: {
        symbol: '€',
        name: '欧元',
        nameKo: '유로',
        nameEn: 'Euro',
        rate: 0.13  // 1人民币 ≈ 0.13欧元
    },
    JPY: {
        symbol: '¥',
        name: '日元',
        nameKo: '엔',
        nameEn: 'Japanese Yen',
        rate: 21  // 1人民币 ≈ 21日元
    }
};

// 当前货币
let currentCurrency = localStorage.getItem('currency') || 'CNY';

// 是否启用货币转换
let enableConversion = localStorage.getItem('enableConversion') === 'true';

// 获取当前货币符号
function getCurrencySymbol() {
    return currencies[currentCurrency]?.symbol || '¥';
}

// 获取货币名称
function getCurrencyName() {
    const lang = localStorage.getItem('language') || 'zh';
    const curr = currencies[currentCurrency];
    if (!curr) return '人民币';
    
    if (lang === 'ko') return curr.nameKo;
    if (lang === 'en') return curr.nameEn;
    return curr.name;
}

// 切换货币
function switchCurrency(code) {
    currentCurrency = code;
    localStorage.setItem('currency', code);
    
    // 更新按钮状态
    document.querySelectorAll('.currency-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('currency-' + code)?.classList.add('active');
    
    // 更新所有金额显示
    updateAllAmounts();
}

// 切换货币转换模式
function toggleConversion() {
    enableConversion = !enableConversion;
    localStorage.setItem('enableConversion', enableConversion);
    
    const checkbox = document.getElementById('enableConversion');
    if (checkbox) {
        checkbox.checked = enableConversion;
    }
    
    updateAllAmounts();
}

// 转换金额
function convertAmount(amount, fromCurrency = 'CNY') {
    if (!enableConversion || currentCurrency === fromCurrency) {
        return amount;
    }
    
    // 先转换为CNY基准
    const baseAmount = amount / (currencies[fromCurrency]?.rate || 1);
    // 再转换为目标货币
    return baseAmount * (currencies[currentCurrency]?.rate || 1);
}

// 格式化金额
function formatCurrency(amount, showSymbol = true) {
    const convertedAmount = enableConversion ? convertAmount(amount) : amount;
    const symbol = getCurrencySymbol();
    
    // 根据货币类型决定小数位数
    let decimals = 2;
    if (currentCurrency === 'KRW' || currentCurrency === 'JPY') {
        decimals = 0; // 韩元和日元通常不显示小数
    }
    
    const formatted = convertedAmount.toFixed(decimals);
    return showSymbol ? `${symbol}${formatted}` : formatted;
}

// 更新所有金额显示
function updateAllAmounts() {
    // 更新所有.stat-value元素
    document.querySelectorAll('.stat-value').forEach(el => {
        const text = el.textContent;
        const match = text.match(/([¥₩$€])?([\d,]+\.?\d*)/);
        if (match) {
            const amount = parseFloat(match[2].replace(/,/g, ''));
            if (!isNaN(amount)) {
                el.textContent = formatCurrency(amount);
            }
        }
    });
    
    // 重新渲染所有表格
    if (typeof renderSalesTable === 'function') renderSalesTable();
    if (typeof renderInventoryTable === 'function') renderInventoryTable();
    if (typeof renderExpenseTable === 'function') renderExpenseTable();
    if (typeof calculateProfit === 'function') calculateProfit();
    if (typeof updateDashboard === 'function') updateDashboard();
    
    // 更新货币显示名称
    updateCurrencyDisplay();
}

// 更新货币显示
function updateCurrencyDisplay() {
    const currencyNameEl = document.getElementById('currentCurrencyName');
    if (currencyNameEl) {
        currencyNameEl.textContent = getCurrencyName();
    }
    
    const conversionInfo = document.getElementById('conversionInfo');
    if (conversionInfo && enableConversion) {
        conversionInfo.style.display = 'block';
        const rate = currencies[currentCurrency]?.rate || 1;
        conversionInfo.innerHTML = `
            <small style="color: #666;">
                汇率：1 CNY = ${rate} ${currentCurrency}
                <br>显示金额已自动转换
            </small>
        `;
    } else if (conversionInfo) {
        conversionInfo.style.display = 'none';
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    // 设置当前货币按钮为活动状态
    const savedCurrency = localStorage.getItem('currency') || 'CNY';
    document.getElementById('currency-' + savedCurrency)?.classList.add('active');
    
    // 设置转换复选框
    const checkbox = document.getElementById('enableConversion');
    if (checkbox) {
        checkbox.checked = enableConversion;
    }
    
    // 延迟更新，确保其他脚本已加载
    setTimeout(() => {
        updateAllAmounts();
    }, 200);
});


