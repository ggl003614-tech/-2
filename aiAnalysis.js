// AI分析模块

// AI配置
const AI_ENDPOINTS = {
    openai: 'https://api.openai.com/v1/chat/completions',
    tongyi: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
    gemini: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    deepseek: 'https://api.deepseek.com/v1/chat/completions'
};

// 保存AI配置
function saveAIConfig() {
    const provider = document.getElementById('aiProvider').value;
    const apiKey = document.getElementById('aiApiKey').value;
    
    if (!apiKey) {
        alert(t('ai.enterApiKey'));
        return;
    }
    
    localStorage.setItem('aiProvider', provider);
    localStorage.setItem('aiApiKey', apiKey);
    alert(t('ai.configSaved'));
}

// 获取AI配置
function getAIConfig() {
    return {
        provider: localStorage.getItem('aiProvider') || 'openai',
        apiKey: localStorage.getItem('aiApiKey') || ''
    };
}

// 加载AI配置
document.addEventListener('DOMContentLoaded', () => {
    const config = getAIConfig();
    const providerSelect = document.getElementById('aiProvider');
    const apiKeyInput = document.getElementById('aiApiKey');
    
    if (providerSelect && config.provider) {
        providerSelect.value = config.provider;
    }
    if (apiKeyInput && config.apiKey) {
        apiKeyInput.value = config.apiKey;
    }
});

// 使用AI分析
async function analyzeWithAI(type) {
    const config = getAIConfig();
    
    if (!config.apiKey) {
        alert(t('ai.configFirst'));
        return;
    }
    
    if (type === 'custom') {
        document.getElementById('customQuestionBox').style.display = 'block';
        document.getElementById('customQuestionBox').scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    // 准备数据
    const data = prepareDataForAI();
    
    // 生成提示词
    const prompt = generatePrompt(type, data);
    
    // 显示加载界面
    showAIResult();
    
    try {
        const result = await callAI(config, prompt);
        displayAIResult(result);
    } catch (error) {
        displayAIResult(`❌ 分析失败：${error.message}\n\n请检查：\n1. API Key是否正确\n2. 网络连接是否正常\n3. API额度是否充足\n4. 是否需要科学上网（OpenAI等）\n\n提示：建议使用国内AI平台（通义千问、DeepSeek）更稳定。`);
    }
}

// 自定义问题
async function askCustomQuestion() {
    const question = document.getElementById('customQuestion').value.trim();
    
    if (!question) {
        alert(t('ai.enterQuestion'));
        return;
    }
    
    const config = getAIConfig();
    
    if (!config.apiKey) {
        alert(t('ai.configFirst'));
        return;
    }
    
    const data = prepareDataForAI();
    const prompt = `作为餐饮店经营顾问，根据以下店铺数据回答问题。

店铺数据：
${JSON.stringify(data, null, 2)}

用户问题：${question}

请提供专业、实用的建议。`;
    
    showAIResult();
    
    try {
        const result = await callAI(config, prompt);
        displayAIResult(result);
    } catch (error) {
        displayAIResult(`❌ 分析失败：${error.message}`);
    }
}

// 准备数据
function prepareDataForAI() {
    const sales = DataStorage.get('sales');
    const expenses = DataStorage.get('expenses');
    const inventory = DataStorage.get('inventory');
    const fixedCosts = JSON.parse(localStorage.getItem('fixedCosts')) || {};
    const productCosts = JSON.parse(localStorage.getItem('productCosts')) || {};
    
    // 当月数据
    const thisMonth = new Date().toISOString().slice(0, 7);
    const monthlySales = sales.filter(s => s.date.startsWith(thisMonth));
    const monthlyExpenses = expenses.filter(e => e.date.startsWith(thisMonth));
    
    // 统计产品销量
    const productSales = {};
    monthlySales.forEach(sale => {
        if (!productSales[sale.product]) {
            productSales[sale.product] = { quantity: 0, revenue: 0 };
        }
        productSales[sale.product].quantity += sale.quantity;
        productSales[sale.product].revenue += sale.total;
    });
    
    // 统计支出类型
    const expenseByType = {};
    monthlyExpenses.forEach(exp => {
        expenseByType[exp.type] = (expenseByType[exp.type] || 0) + exp.amount;
    });
    
    return {
        本月销售总额: monthlySales.reduce((sum, s) => sum + s.total, 0),
        本月销售数量: monthlySales.reduce((sum, s) => sum + s.quantity, 0),
        本月支出总额: monthlyExpenses.reduce((sum, e) => sum + e.amount, 0),
        产品销售明细: productSales,
        支出明细: expenseByType,
        固定成本: fixedCosts,
        产品成本: productCosts,
        库存数量: inventory.length,
        总销售记录数: sales.length
    };
}

// 生成提示词
function generatePrompt(type, data) {
    const prompts = {
        business: `作为餐饮店经营顾问，分析以下经营数据并提供改进建议：

${JSON.stringify(data, null, 2)}

请从以下角度分析：
1. 整体经营状况评估
2. 主要问题和风险
3. 具体改进建议（至少3条）
4. 未来发展方向

请用清晰的格式输出，包含标题和要点。`,

        sales: `作为销售分析专家，根据以下数据预测销售趋势并提供营销建议：

${JSON.stringify(data, null, 2)}

请提供：
1. 销售趋势分析
2. 热销产品识别
3. 滞销产品处理建议
4. 营销策略推荐（至少3个）
5. 定价策略建议`,

        cost: `作为成本控制专家，分析以下成本数据并提供优化方案：

${JSON.stringify(data, null, 2)}

请分析：
1. 成本结构是否合理
2. 高成本环节识别
3. 成本削减方案（至少3个）
4. 成本控制KPI建议`,

        inventory: `作为库存管理专家，根据以下数据提供库存优化建议：

${JSON.stringify(data, null, 2)}

请提供：
1. 库存健康度评估
2. 库存周转分析
3. 采购建议
4. 库存管理优化方案（至少3条）`,

        profit: `作为财务分析师，深度分析以下盈利数据：

${JSON.stringify(data, null, 2)}

请分析：
1. 盈利能力评估
2. 利润率分析
3. 盈利增长点识别
4. 财务风险提示
5. 盈利提升建议（至少5条具体措施）`
    };
    
    return prompts[type] || prompts.business;
}

// 调用AI API
async function callAI(config, prompt) {
    const { provider, apiKey } = config;
    
    switch (provider) {
        case 'openai':
            return await callOpenAI(apiKey, prompt);
        case 'tongyi':
            return await callTongyi(apiKey, prompt);
        case 'gemini':
            return await callGemini(apiKey, prompt);
        case 'deepseek':
            return await callDeepSeek(apiKey, prompt);
        default:
            throw new Error('不支持的AI平台');
    }
}

// OpenAI API
async function callOpenAI(apiKey, prompt) {
    const response = await fetch(AI_ENDPOINTS.openai, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: '你是一位经验丰富的餐饮店经营顾问，擅长数据分析和经营策略。'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || '请求失败');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// 通义千问API
async function callTongyi(apiKey, prompt) {
    const response = await fetch(AI_ENDPOINTS.tongyi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'qwen-turbo',
            input: {
                messages: [
                    {
                        role: 'system',
                        content: '你是一位经验丰富的餐饮店经营顾问。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            },
            parameters: {
                result_format: 'message'
            }
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '请求失败');
    }
    
    const data = await response.json();
    return data.output.choices[0].message.content;
}

// Gemini API
async function callGemini(apiKey, prompt) {
    const url = `${AI_ENDPOINTS.gemini}?key=${apiKey}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || '请求失败');
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// DeepSeek API
async function callDeepSeek(apiKey, prompt) {
    const response = await fetch(AI_ENDPOINTS.deepseek, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: '你是一位经验丰富的餐饮店经营顾问。'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || '请求失败');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// 显示AI结果
function showAIResult() {
    // 创建遮罩层
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.onclick = closeAIResult;
        document.body.appendChild(overlay);
    }
    
    const resultCard = document.getElementById('aiResultCard');
    resultCard.style.display = 'flex';
    
    // 重置内容为加载状态
    document.getElementById('aiResultContent').innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>AI正在分析中，请稍候...</p>
        </div>
    `;
}

// 显示分析结果
function displayAIResult(content) {
    const contentDiv = document.getElementById('aiResultContent');
    
    // 格式化内容 - 支持Markdown格式
    let formatted = content
        // 处理标题
        .replace(/###\s*(.+?)(\n|$)/g, '<h4>$1</h4>')
        .replace(/##\s*(.+?)(\n|$)/g, '<h3>$1</h3>')
        .replace(/#\s*(.+?)(\n|$)/g, '<h3>$1</h3>')
        // 处理加粗
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // 处理段落
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    
    // 处理列表
    const lines = formatted.split('<br>');
    let inList = false;
    let result = [];
    
    for (let line of lines) {
        const trimmed = line.trim();
        // 检查是否是列表项
        if (/^\d+\.\s/.test(trimmed) || /^[-*]\s/.test(trimmed)) {
            if (!inList) {
                result.push('<ul>');
                inList = true;
            }
            // 移除列表标记
            const content = trimmed.replace(/^(\d+\.|-|\*)\s/, '');
            result.push(`<li>${content}</li>`);
        } else {
            if (inList) {
                result.push('</ul>');
                inList = false;
            }
            result.push(line);
        }
    }
    
    if (inList) {
        result.push('</ul>');
    }
    
    formatted = result.join('');
    
    contentDiv.innerHTML = `<div class="ai-content"><p>${formatted}</p></div>`;
}

// 关闭AI结果
function closeAIResult() {
    document.getElementById('aiResultCard').style.display = 'none';
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.remove();
    }
    
    // 隐藏自定义问题框
    document.getElementById('customQuestionBox').style.display = 'none';
    document.getElementById('customQuestion').value = '';
}

// 复制结果
function copyAIResult() {
    const content = document.getElementById('aiResultContent').innerText;
    navigator.clipboard.writeText(content).then(() => {
        alert(t('ai.copied'));
    }).catch(() => {
        alert(t('ai.copyFailed'));
    });
}

// 导出文本
function exportAIResult() {
    const content = document.getElementById('aiResultContent').innerText;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI分析报告_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

