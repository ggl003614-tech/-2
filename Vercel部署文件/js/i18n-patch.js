// 多语言补丁 - 自动为未标记的元素添加翻译

document.addEventListener('DOMContentLoaded', () => {
    // 等待DOM完全加载后再应用补丁
    setTimeout(applyI18nPatch, 150);
});

function applyI18nPatch() {
    // 盈亏分析页面
    addI18nToProfitPage();
    
    // 报表分析页面
    addI18nToReportsPage();
    
    // AI分析页面
    addI18nToAIPage();
}

// 盈亏分析页面补丁
function addI18nToProfitPage() {
    const profitSection = document.getElementById('profit');
    if (!profitSection) return;
    
    // 标题
    const h2 = profitSection.querySelector('h2');
    if (h2 && !h2.hasAttribute('data-i18n')) {
        h2.setAttribute('data-i18n', 'profit.title');
    }
    
    // 成本设置标题
    const costSettingH3 = profitSection.querySelectorAll('h3')[0];
    if (costSettingH3) {
        costSettingH3.setAttribute('data-i18n', 'profit.costSettings');
    }
    
    // 成本设置标签
    const costLabels = profitSection.querySelectorAll('#costForm label');
    if (costLabels[0]) costLabels[0].setAttribute('data-i18n', 'profit.rent');
    if (costLabels[1]) costLabels[1].setAttribute('data-i18n', 'profit.labor');
    if (costLabels[2]) costLabels[2].setAttribute('data-i18n', 'profit.utility');
    if (costLabels[3]) costLabels[3].setAttribute('data-i18n', 'profit.other');
    
    // 保存按钮
    const saveCostBtn = profitSection.querySelector('#costForm button[type="submit"]');
    if (saveCostBtn) saveCostBtn.setAttribute('data-i18n', 'profit.saveCost');
    
    // 产品成本配置
    const productCostH3 = profitSection.querySelectorAll('h3')[1];
    if (productCostH3) {
        productCostH3.setAttribute('data-i18n', 'profit.productCost');
    }
    
    // 产品成本表单标签
    const costFormLabels = profitSection.querySelectorAll('#productCostForm label');
    if (costFormLabels[0]) costFormLabels[0].setAttribute('data-i18n', 'profit.productName');
    if (costFormLabels[1]) costFormLabels[1].setAttribute('data-i18n', 'sales.customProductName');
    if (costFormLabels[2]) costFormLabels[2].setAttribute('data-i18n', 'profit.materialCost');
    
    // 产品选项
    const costProductOptions = profitSection.querySelectorAll('#costProductName option');
    if (costProductOptions[0]) costProductOptions[0].setAttribute('data-i18n', 'sales.products.dishA');
    if (costProductOptions[1]) costProductOptions[1].setAttribute('data-i18n', 'sales.products.dishB');
    if (costProductOptions[2]) costProductOptions[2].setAttribute('data-i18n', 'sales.products.snack');
    if (costProductOptions[3]) costProductOptions[3].setAttribute('data-i18n', 'sales.products.drink');
    if (costProductOptions[4]) costProductOptions[4].setAttribute('data-i18n', 'sales.products.setMeal');
    if (costProductOptions[5]) costProductOptions[5].setAttribute('data-i18n', 'sales.customProduct');
    
    // 设置产品成本按钮
    const setCostBtn = profitSection.querySelector('#productCostForm button[type="submit"]');
    if (setCostBtn) setCostBtn.setAttribute('data-i18n', 'profit.setCost');
    
    // 统计卡片
    const statCards = profitSection.querySelectorAll('.stat-card h3');
    if (statCards[0]) statCards[0].setAttribute('data-i18n', 'profit.totalRevenue');
    if (statCards[1]) statCards[1].setAttribute('data-i18n', 'profit.totalCost');
    if (statCards[2]) statCards[2].setAttribute('data-i18n', 'profit.netProfit');
    if (statCards[3]) statCards[3].setAttribute('data-i18n', 'profit.profitMargin');
    
    // 产品利润分析表
    const profitTableH3 = profitSection.querySelectorAll('.table-card h3')[0];
    if (profitTableH3) profitTableH3.setAttribute('data-i18n', 'profit.productProfit');
    
    const profitTableTh = profitSection.querySelectorAll('.table-card table th');
    if (profitTableTh[0]) profitTableTh[0].setAttribute('data-i18n', 'profit.productName');
    if (profitTableTh[1]) profitTableTh[1].setAttribute('data-i18n', 'profit.salesVolume');
    if (profitTableTh[2]) profitTableTh[2].setAttribute('data-i18n', 'profit.salesAmount');
    if (profitTableTh[3]) profitTableTh[3].setAttribute('data-i18n', 'profit.cost');
    if (profitTableTh[4]) profitTableTh[4].setAttribute('data-i18n', 'profit.grossProfit');
    if (profitTableTh[5]) profitTableTh[5].setAttribute('data-i18n', 'profit.grossMargin');
    
    // 盈亏平衡分析
    const breakevenH3 = profitSection.querySelectorAll('.form-card h3');
    for (let h3 of breakevenH3) {
        if (h3.textContent.includes('盈亏平衡')) {
            h3.setAttribute('data-i18n', 'profit.breakeven');
        }
    }
}

// 报表分析页面补丁
function addI18nToReportsPage() {
    const reportsSection = document.getElementById('reports');
    if (!reportsSection) return;
    
    // 标题
    const h2 = reportsSection.querySelector('h2');
    if (h2 && !h2.hasAttribute('data-i18n')) {
        h2.setAttribute('data-i18n', 'reports.title');
    }
    
    // 筛选标签和按钮
    const filterLabel = reportsSection.querySelector('.report-filters label');
    if (filterLabel) filterLabel.setAttribute('data-i18n', 'reports.selectMonth');
    
    const generateBtn = reportsSection.querySelector('.report-filters button');
    if (generateBtn) generateBtn.setAttribute('data-i18n', 'reports.generate');
    
    // 统计卡片
    const statCards = reportsSection.querySelectorAll('.stat-card h3');
    if (statCards[0]) statCards[0].setAttribute('data-i18n', 'reports.totalSales');
    if (statCards[1]) statCards[1].setAttribute('data-i18n', 'reports.totalExpenses');
    if (statCards[2]) statCards[2].setAttribute('data-i18n', 'reports.netProfit');
    if (statCards[3]) statCards[3].setAttribute('data-i18n', 'reports.profitMargin');
    
    // 图表标题
    const chartTitles = reportsSection.querySelectorAll('.chart-container h3');
    if (chartTitles[0]) chartTitles[0].setAttribute('data-i18n', 'reports.productDistribution');
    if (chartTitles[1]) chartTitles[1].setAttribute('data-i18n', 'reports.expenseDistribution');
}

// AI分析页面补丁
function addI18nToAIPage() {
    const aiSection = document.getElementById('ai-analysis');
    if (!aiSection) return;
    
    // 标题
    const h2 = aiSection.querySelector('h2');
    if (h2 && !h2.hasAttribute('data-i18n')) {
        h2.setAttribute('data-i18n', 'ai.title');
    }
    
    // AI配置
    const configH3 = aiSection.querySelectorAll('h3')[0];
    if (configH3) configH3.setAttribute('data-i18n', 'ai.config');
    
    const configLabels = aiSection.querySelectorAll('.form-card .form-group label');
    if (configLabels[0]) configLabels[0].setAttribute('data-i18n', 'ai.platform');
    if (configLabels[1]) configLabels[1].setAttribute('data-i18n', 'ai.apiKey');
    
    const apiKeyInput = aiSection.querySelector('#aiApiKey');
    if (apiKeyInput) apiKeyInput.setAttribute('data-i18n', 'ai.apiKeyPlaceholder');
    
    const saveConfigBtn = aiSection.querySelector('.form-card button');
    if (saveConfigBtn) saveConfigBtn.setAttribute('data-i18n', 'ai.saveConfig');
    
    const tip = aiSection.querySelector('.form-card small');
    if (tip) tip.setAttribute('data-i18n', 'ai.tip');
    
    // AI选项卡片
    const aiOptions = aiSection.querySelectorAll('.ai-option-card');
    if (aiOptions[0]) {
        const h3 = aiOptions[0].querySelector('h3');
        const p = aiOptions[0].querySelector('p');
        if (h3) h3.setAttribute('data-i18n', 'ai.business');
        if (p) p.setAttribute('data-i18n', 'ai.businessDesc');
    }
    if (aiOptions[1]) {
        const h3 = aiOptions[1].querySelector('h3');
        const p = aiOptions[1].querySelector('p');
        if (h3) h3.setAttribute('data-i18n', 'ai.salesTrend');
        if (p) p.setAttribute('data-i18n', 'ai.salesTrendDesc');
    }
    if (aiOptions[2]) {
        const h3 = aiOptions[2].querySelector('h3');
        const p = aiOptions[2].querySelector('p');
        if (h3) h3.setAttribute('data-i18n', 'ai.costOpt');
        if (p) p.setAttribute('data-i18n', 'ai.costOptDesc');
    }
    if (aiOptions[3]) {
        const h3 = aiOptions[3].querySelector('h3');
        const p = aiOptions[3].querySelector('p');
        if (h3) h3.setAttribute('data-i18n', 'ai.inventoryAdv');
        if (p) p.setAttribute('data-i18n', 'ai.inventoryAdvDesc');
    }
    if (aiOptions[4]) {
        const h3 = aiOptions[4].querySelector('h3');
        const p = aiOptions[4].querySelector('p');
        if (h3) h3.setAttribute('data-i18n', 'ai.profitAnalysis');
        if (p) p.setAttribute('data-i18n', 'ai.profitAnalysisDesc');
    }
    if (aiOptions[5]) {
        const h3 = aiOptions[5].querySelector('h3');
        const p = aiOptions[5].querySelector('p');
        if (h3) h3.setAttribute('data-i18n', 'ai.customQuestion');
        if (p) p.setAttribute('data-i18n', 'ai.customQuestionDesc');
    }
    
    // 自定义问题框
    const customH3 = aiSection.querySelector('#customQuestionBox h3');
    if (customH3) customH3.setAttribute('data-i18n', 'ai.askAI');
    
    const customQuestion = aiSection.querySelector('#customQuestion');
    if (customQuestion) customQuestion.setAttribute('data-i18n', 'ai.questionPlaceholder');
    
    const submitBtn = aiSection.querySelector('#customQuestionBox button');
    if (submitBtn) submitBtn.setAttribute('data-i18n', 'ai.submit');
    
    // AI结果卡片
    const resultH3 = aiSection.querySelector('#aiResultCard h3');
    if (resultH3) resultH3.setAttribute('data-i18n', 'ai.result');
    
    const closeBtn = aiSection.querySelector('.ai-result-header button');
    if (closeBtn) closeBtn.setAttribute('data-i18n', 'ai.close');
    
    const copyBtn = aiSection.querySelector('.ai-result-footer button:nth-child(1)');
    if (copyBtn) copyBtn.setAttribute('data-i18n', 'ai.copyResult');
    
    const exportBtn = aiSection.querySelector('.ai-result-footer button:nth-child(2)');
    if (exportBtn) exportBtn.setAttribute('data-i18n', 'ai.exportResult');
}


