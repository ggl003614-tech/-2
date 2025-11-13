// 多语言配置文件

const translations = {
    zh: {
        // 导航菜单
        nav: {
            title: '🍴 餐饮店管理',
            dashboard: '📊 仪表盘',
            sales: '💰 销售管理',
            inventory: '📦 库存管理',
            expenses: '💳 支出管理',
            profit: '📊 盈亏分析',
            reports: '📈 报表分析',
            ai: '🤖 AI智能分析'
        },
        
        // 仪表盘
        dashboard: {
            title: '仪表盘',
            todaySales: '今日销售额',
            monthSales: '本月销售额',
            monthExpenses: '本月支出',
            monthProfit: '本月利润',
            salesTrend: '近7天销售趋势',
            salesAmount: '销售额（元）'
        },
        
        // 销售管理
        sales: {
            title: '销售管理',
            addRecord: '添加销售记录',
            productName: '产品名称',
            selectProduct: '请选择产品',
            customProduct: '➕ 自定义产品',
            customProductName: '自定义产品名称',
            customProductPlaceholder: '输入产品名称',
            price: '单价（元）',
            quantity: '数量',
            date: '日期',
            addSale: '添加销售',
            records: '销售记录',
            product: '产品',
            unitPrice: '单价',
            total: '总额',
            actions: '操作',
            delete: '删除',
            noRecords: '暂无销售记录',
            success: '销售记录添加成功！',
            deleteConfirm: '确定要删除这条销售记录吗？',
            enterCustomName: '请输入自定义产品名称',
            // 预设产品
            products: {
                dishA: '招牌菜A',
                dishB: '招牌菜B',
                snack: '特色小吃',
                drink: '饮品',
                setMeal: '套餐'
            }
        },
        
        // 库存管理
        inventory: {
            title: '库存管理',
            addRecord: '添加库存记录',
            materialName: '原材料名称',
            quantity: '数量',
            unit: '单位',
            unitPrice: '单价（元）',
            addInventory: '添加库存',
            inventoryList: '库存列表',
            material: '原材料',
            totalPrice: '总价',
            actions: '操作',
            delete: '删除',
            noRecords: '暂无库存记录',
            success: '库存记录添加成功！',
            deleteConfirm: '确定要删除这条库存记录吗？',
            // 单位
            units: {
                kg: '千克',
                g: '克',
                L: '升',
                ml: '毫升',
                piece: '个',
                pack: '包'
            }
        },
        
        // 支出管理
        expenses: {
            title: '支出管理',
            addRecord: '添加支出记录',
            type: '支出类型',
            selectType: '请选择类型',
            amount: '金额（元）',
            date: '日期',
            note: '备注',
            notePlaceholder: '选填',
            addExpense: '添加支出',
            records: '支出记录',
            actions: '操作',
            delete: '删除',
            noRecords: '暂无支出记录',
            success: '支出记录添加成功！',
            deleteConfirm: '确定要删除这条支出记录吗？',
            // 支出类型
            types: {
                material: '原材料',
                rent: '房租',
                utility: '水电费',
                salary: '人工工资',
                repair: '设备维修',
                other: '其他'
            }
        },
        
        // 盈亏分析
        profit: {
            title: '盈亏分析',
            costSettings: '成本设置',
            rent: '月房租（元）',
            labor: '月人工成本（元）',
            utility: '月水电费（元）',
            other: '其他固定成本（元/月）',
            saveCost: '保存成本设置',
            productCost: '产品成本配置',
            productName: '产品名称',
            materialCost: '原材料成本（元）',
            setCost: '设置产品成本',
            noCostConfig: '暂无产品成本配置',
            totalRevenue: '本月总收入',
            totalCost: '本月总成本',
            fixedCost: '固定成本',
            variableCost: '变动成本',
            netProfit: '净利润',
            profitMargin: '利润率',
            productProfit: '产品利润分析',
            salesVolume: '销量',
            salesAmount: '销售额',
            cost: '成本',
            grossProfit: '毛利润',
            grossMargin: '毛利率',
            noData: '暂无数据',
            breakeven: '盈亏平衡点分析',
            avgPrice: '平均售价',
            avgCost: '平均成本',
            monthlyFixed: '月固定成本',
            breakevenQty: '需要销售',
            breakevenQtyUnit: '杯才能盈亏平衡',
            breakevenRevenue: '需要营业额达到',
            profitTrend: '最近6个月盈亏趋势',
            revenue: '收入',
            profit: '利润',
            costSaved: '成本设置已保存！',
            productCostSaved: '成本已设置为'
        },
        
        // 报表分析
        reports: {
            title: '报表分析',
            selectMonth: '选择月份',
            generate: '生成报表',
            totalSales: '总销售额',
            totalExpenses: '总支出',
            netProfit: '净利润',
            profitMargin: '利润率',
            productDistribution: '产品销售分布',
            expenseDistribution: '支出类型分布',
            noData: '暂无数据',
            selectMonthPrompt: '请选择月份'
        },
        
        // AI分析
        ai: {
            title: 'AI智能分析',
            config: 'AI配置',
            platform: '选择AI平台',
            apiKey: 'API Key',
            apiKeyPlaceholder: '输入您的API Key',
            saveConfig: '保存配置',
            tip: '提示：API Key仅保存在本地浏览器，不会上传到任何服务器',
            configSaved: 'AI配置已保存！',
            enterApiKey: '请输入API Key',
            configFirst: '请先配置AI API Key',
            // 分析类型
            business: '经营分析',
            businessDesc: '分析整体经营状况，提供改进建议',
            salesTrend: '销售趋势',
            salesTrendDesc: '预测销售趋势，推荐营销策略',
            costOpt: '成本优化',
            costOptDesc: '识别成本高的环节，提供节约方案',
            inventoryAdv: '库存建议',
            inventoryAdvDesc: '智能库存管理，减少浪费',
            profitAnalysis: '盈利分析',
            profitAnalysisDesc: '深度盈利分析，找出增长点',
            customQuestion: '自定义问题',
            customQuestionDesc: '向AI提出您的具体问题',
            askAI: '向AI提问',
            questionPlaceholder: '例如：如何提高招牌菜的销量？',
            submit: '提交问题',
            result: '💡 AI分析结果',
            close: '关闭',
            analyzing: 'AI正在分析中，请稍候...',
            copyResult: '📋 复制结果',
            exportResult: '💾 导出文本',
            copied: '已复制到剪贴板！',
            copyFailed: '复制失败，请手动选择文本复制',
            analysisFailed: '分析失败',
            enterQuestion: '请输入您的问题',
            // AI平台
            platforms: {
                openai: 'OpenAI (ChatGPT)',
                tongyi: '阿里通义千问',
                gemini: 'Google Gemini',
                deepseek: 'DeepSeek'
            }
        },
        
        // 通用
        common: {
            currency: '¥',
            noData: '暂无数据',
            loading: '加载中...',
            success: '成功',
            error: '错误',
            confirm: '确定',
            cancel: '取消',
            delete: '删除',
            edit: '编辑',
            save: '保存',
            back: '返回',
            month: '月'
        }
    },
    
    ko: {
        // 네비게이션 메뉴
        nav: {
            title: '🍴 레스토랑 관리',
            dashboard: '📊 대시보드',
            sales: '💰 매출 관리',
            inventory: '📦 재고 관리',
            expenses: '💳 지출 관리',
            profit: '📊 손익 분석',
            reports: '📈 보고서 분석',
            ai: '🤖 AI 스마트 분석'
        },
        
        // 대시보드
        dashboard: {
            title: '대시보드',
            todaySales: '오늘 매출',
            monthSales: '이번 달 매출',
            monthExpenses: '이번 달 지출',
            monthProfit: '이번 달 이익',
            salesTrend: '최근 7일 매출 추세',
            salesAmount: '매출액 (원)'
        },
        
        // 매출 관리
        sales: {
            title: '매출 관리',
            addRecord: '매출 기록 추가',
            productName: '제품명',
            selectProduct: '제품을 선택하세요',
            customProduct: '➕ 사용자 정의 제품',
            customProductName: '사용자 정의 제품명',
            customProductPlaceholder: '제품명을 입력하세요',
            price: '단가 (원)',
            quantity: '수량',
            date: '날짜',
            addSale: '매출 추가',
            records: '매출 기록',
            product: '제품',
            unitPrice: '단가',
            total: '합계',
            actions: '작업',
            delete: '삭제',
            noRecords: '매출 기록이 없습니다',
            success: '매출 기록이 추가되었습니다!',
            deleteConfirm: '이 매출 기록을 삭제하시겠습니까?',
            enterCustomName: '사용자 정의 제품명을 입력하세요',
            // 기본 제품
            products: {
                dishA: '시그니처 요리A',
                dishB: '시그니처 요리B',
                snack: '특선 스낵',
                drink: '음료',
                setMeal: '세트 메뉴'
            }
        },
        
        // 재고 관리
        inventory: {
            title: '재고 관리',
            addRecord: '재고 기록 추가',
            materialName: '원자재명',
            quantity: '수량',
            unit: '단위',
            unitPrice: '단가 (원)',
            addInventory: '재고 추가',
            inventoryList: '재고 목록',
            material: '원자재',
            totalPrice: '총액',
            actions: '작업',
            delete: '삭제',
            noRecords: '재고 기록이 없습니다',
            success: '재고 기록이 추가되었습니다!',
            deleteConfirm: '이 재고 기록을 삭제하시겠습니까?',
            // 단위
            units: {
                kg: '킬로그램',
                g: '그램',
                L: '리터',
                ml: '밀리리터',
                piece: '개',
                pack: '팩'
            }
        },
        
        // 지출 관리
        expenses: {
            title: '지출 관리',
            addRecord: '지출 기록 추가',
            type: '지출 유형',
            selectType: '유형을 선택하세요',
            amount: '금액 (원)',
            date: '날짜',
            note: '비고',
            notePlaceholder: '선택 사항',
            addExpense: '지출 추가',
            records: '지출 기록',
            actions: '작업',
            delete: '삭제',
            noRecords: '지출 기록이 없습니다',
            success: '지출 기록이 추가되었습니다!',
            deleteConfirm: '이 지출 기록을 삭제하시겠습니까?',
            // 지출 유형
            types: {
                material: '원자재',
                rent: '임대료',
                utility: '수도광열비',
                salary: '인건비',
                repair: '설비 수리',
                other: '기타'
            }
        },
        
        // 손익 분석
        profit: {
            title: '손익 분석',
            costSettings: '비용 설정',
            rent: '월 임대료 (원)',
            labor: '월 인건비 (원)',
            utility: '월 수도광열비 (원)',
            other: '기타 고정비 (원/월)',
            saveCost: '비용 설정 저장',
            productCost: '제품 원가 설정',
            productName: '제품명',
            materialCost: '원자재 비용 (원)',
            setCost: '제품 원가 설정',
            noCostConfig: '제품 원가 설정이 없습니다',
            totalRevenue: '이번 달 총 수익',
            totalCost: '이번 달 총 비용',
            fixedCost: '고정비',
            variableCost: '변동비',
            netProfit: '순이익',
            profitMargin: '이익률',
            productProfit: '제품별 이익 분석',
            salesVolume: '판매량',
            salesAmount: '매출액',
            cost: '비용',
            grossProfit: '매출총이익',
            grossMargin: '매출총이익률',
            noData: '데이터가 없습니다',
            breakeven: '손익분기점 분석',
            avgPrice: '평균 판매가',
            avgCost: '평균 원가',
            monthlyFixed: '월 고정비',
            breakevenQty: '손익분기를 위해',
            breakevenQtyUnit: '개 판매 필요',
            breakevenRevenue: '필요 매출액',
            profitTrend: '최근 6개월 손익 추세',
            revenue: '수익',
            profit: '이익',
            costSaved: '비용 설정이 저장되었습니다!',
            productCostSaved: '원가가 설정되었습니다'
        },
        
        // 보고서 분석
        reports: {
            title: '보고서 분석',
            selectMonth: '월 선택',
            generate: '보고서 생성',
            totalSales: '총 매출',
            totalExpenses: '총 지출',
            netProfit: '순이익',
            profitMargin: '이익률',
            productDistribution: '제품별 매출 분포',
            expenseDistribution: '지출 유형별 분포',
            noData: '데이터가 없습니다',
            selectMonthPrompt: '월을 선택하세요'
        },
        
        // AI 분석
        ai: {
            title: 'AI 스마트 분석',
            config: 'AI 설정',
            platform: 'AI 플랫폼 선택',
            apiKey: 'API Key',
            apiKeyPlaceholder: 'API Key를 입력하세요',
            saveConfig: '설정 저장',
            tip: '팁: API Key는 로컬 브라우저에만 저장되며 서버로 전송되지 않습니다',
            configSaved: 'AI 설정이 저장되었습니다!',
            enterApiKey: 'API Key를 입력하세요',
            configFirst: '먼저 AI API Key를 설정하세요',
            // 분석 유형
            business: '경영 분석',
            businessDesc: '전체 경영 상태 분석 및 개선 제안',
            salesTrend: '매출 추세',
            salesTrendDesc: '매출 추세 예측 및 마케팅 전략 추천',
            costOpt: '비용 최적화',
            costOptDesc: '고비용 항목 식별 및 절감 방안 제공',
            inventoryAdv: '재고 제안',
            inventoryAdvDesc: '스마트 재고 관리, 낭비 감소',
            profitAnalysis: '수익 분석',
            profitAnalysisDesc: '심층 수익 분석, 성장 포인트 발굴',
            customQuestion: '맞춤 질문',
            customQuestionDesc: 'AI에게 구체적인 질문하기',
            askAI: 'AI에게 질문하기',
            questionPlaceholder: '예: 시그니처 요리의 판매를 늘리는 방법은?',
            submit: '질문 제출',
            result: '💡 AI 분석 결과',
            close: '닫기',
            analyzing: 'AI가 분석 중입니다. 잠시만 기다려주세요...',
            copyResult: '📋 결과 복사',
            exportResult: '💾 텍스트 내보내기',
            copied: '클립보드에 복사되었습니다!',
            copyFailed: '복사 실패, 텍스트를 수동으로 선택하여 복사하세요',
            analysisFailed: '분석 실패',
            enterQuestion: '질문을 입력하세요',
            // AI 플랫폼
            platforms: {
                openai: 'OpenAI (ChatGPT)',
                tongyi: '알리바바 Tongyi',
                gemini: 'Google Gemini',
                deepseek: 'DeepSeek'
            }
        },
        
        // 공통
        common: {
            currency: '₩',
            noData: '데이터가 없습니다',
            loading: '로딩 중...',
            success: '성공',
            error: '오류',
            confirm: '확인',
            cancel: '취소',
            delete: '삭제',
            edit: '편집',
            save: '저장',
            back: '돌아가기',
            month: '월'
        }
    },
    
    en: {
        // Navigation Menu
        nav: {
            title: '🍴 Restaurant Management',
            dashboard: '📊 Dashboard',
            sales: '💰 Sales',
            inventory: '📦 Inventory',
            expenses: '💳 Expenses',
            profit: '📊 Profit Analysis',
            reports: '📈 Reports',
            ai: '🤖 AI Analysis'
        },
        
        // Dashboard
        dashboard: {
            title: 'Dashboard',
            todaySales: "Today's Sales",
            monthSales: 'Monthly Sales',
            monthExpenses: 'Monthly Expenses',
            monthProfit: 'Monthly Profit',
            salesTrend: 'Last 7 Days Sales Trend',
            salesAmount: 'Sales Amount (¥)'
        },
        
        // Sales Management
        sales: {
            title: 'Sales Management',
            addRecord: 'Add Sales Record',
            productName: 'Product Name',
            selectProduct: 'Select Product',
            customProduct: '➕ Custom Product',
            customProductName: 'Custom Product Name',
            customProductPlaceholder: 'Enter product name',
            price: 'Unit Price (¥)',
            quantity: 'Quantity',
            date: 'Date',
            addSale: 'Add Sale',
            records: 'Sales Records',
            product: 'Product',
            unitPrice: 'Unit Price',
            total: 'Total',
            actions: 'Actions',
            delete: 'Delete',
            noRecords: 'No sales records',
            success: 'Sales record added successfully!',
            deleteConfirm: 'Are you sure to delete this sales record?',
            enterCustomName: 'Please enter custom product name',
            // Preset Products
            products: {
                dishA: 'Signature Dish A',
                dishB: 'Signature Dish B',
                snack: 'Special Snack',
                drink: 'Beverage',
                setMeal: 'Set Meal'
            }
        },
        
        // Inventory Management
        inventory: {
            title: 'Inventory Management',
            addRecord: 'Add Inventory Record',
            materialName: 'Material Name',
            quantity: 'Quantity',
            unit: 'Unit',
            unitPrice: 'Unit Price (¥)',
            addInventory: 'Add Inventory',
            inventoryList: 'Inventory List',
            material: 'Material',
            totalPrice: 'Total Price',
            actions: 'Actions',
            delete: 'Delete',
            noRecords: 'No inventory records',
            success: 'Inventory record added successfully!',
            deleteConfirm: 'Are you sure to delete this inventory record?',
            // Units
            units: {
                kg: 'Kilogram',
                g: 'Gram',
                L: 'Liter',
                ml: 'Milliliter',
                piece: 'Piece',
                pack: 'Pack'
            }
        },
        
        // Expenses Management
        expenses: {
            title: 'Expenses Management',
            addRecord: 'Add Expense Record',
            type: 'Expense Type',
            selectType: 'Select Type',
            amount: 'Amount (¥)',
            date: 'Date',
            note: 'Note',
            notePlaceholder: 'Optional',
            addExpense: 'Add Expense',
            records: 'Expense Records',
            actions: 'Actions',
            delete: 'Delete',
            noRecords: 'No expense records',
            success: 'Expense record added successfully!',
            deleteConfirm: 'Are you sure to delete this expense record?',
            // Expense Types
            types: {
                material: 'Materials',
                rent: 'Rent',
                utility: 'Utilities',
                salary: 'Salary',
                repair: 'Repair',
                other: 'Other'
            }
        },
        
        // Profit Analysis
        profit: {
            title: 'Profit Analysis',
            costSettings: 'Cost Settings',
            rent: 'Monthly Rent (¥)',
            labor: 'Monthly Labor Cost (¥)',
            utility: 'Monthly Utilities (¥)',
            other: 'Other Fixed Costs (¥/month)',
            saveCost: 'Save Cost Settings',
            productCost: 'Product Cost Configuration',
            productName: 'Product Name',
            materialCost: 'Material Cost (¥)',
            setCost: 'Set Product Cost',
            noCostConfig: 'No product cost configuration',
            totalRevenue: 'Total Monthly Revenue',
            totalCost: 'Total Monthly Cost',
            fixedCost: 'Fixed Cost',
            variableCost: 'Variable Cost',
            netProfit: 'Net Profit',
            profitMargin: 'Profit Margin',
            productProfit: 'Product Profit Analysis',
            salesVolume: 'Sales Volume',
            salesAmount: 'Sales Amount',
            cost: 'Cost',
            grossProfit: 'Gross Profit',
            grossMargin: 'Gross Margin',
            noData: 'No data available',
            breakeven: 'Break-even Analysis',
            avgPrice: 'Average Price',
            avgCost: 'Average Cost',
            monthlyFixed: 'Monthly Fixed Cost',
            breakevenQty: 'Need to sell',
            breakevenQtyUnit: 'units to break even',
            breakevenRevenue: 'Revenue needed',
            profitTrend: 'Last 6 Months Profit Trend',
            revenue: 'Revenue',
            profit: 'Profit',
            costSaved: 'Cost settings saved!',
            productCostSaved: 'Cost set to'
        },
        
        // Reports
        reports: {
            title: 'Reports Analysis',
            selectMonth: 'Select Month',
            generate: 'Generate Report',
            totalSales: 'Total Sales',
            totalExpenses: 'Total Expenses',
            netProfit: 'Net Profit',
            profitMargin: 'Profit Margin',
            productDistribution: 'Product Sales Distribution',
            expenseDistribution: 'Expense Type Distribution',
            noData: 'No data available',
            selectMonthPrompt: 'Please select a month'
        },
        
        // AI Analysis
        ai: {
            title: 'AI Smart Analysis',
            config: 'AI Configuration',
            platform: 'Select AI Platform',
            apiKey: 'API Key',
            apiKeyPlaceholder: 'Enter your API Key',
            saveConfig: 'Save Configuration',
            tip: 'Tip: API Key is only saved locally in your browser and will not be uploaded to any server',
            configSaved: 'AI configuration saved!',
            enterApiKey: 'Please enter API Key',
            configFirst: 'Please configure AI API Key first',
            // Analysis Types
            business: 'Business Analysis',
            businessDesc: 'Analyze overall business situation and provide improvement suggestions',
            salesTrend: 'Sales Trend',
            salesTrendDesc: 'Predict sales trends and recommend marketing strategies',
            costOpt: 'Cost Optimization',
            costOptDesc: 'Identify high-cost areas and provide saving solutions',
            inventoryAdv: 'Inventory Advice',
            inventoryAdvDesc: 'Smart inventory management to reduce waste',
            profitAnalysis: 'Profit Analysis',
            profitAnalysisDesc: 'Deep profit analysis to find growth points',
            customQuestion: 'Custom Question',
            customQuestionDesc: 'Ask AI your specific questions',
            askAI: 'Ask AI',
            questionPlaceholder: 'e.g., How to increase sales of signature dishes?',
            submit: 'Submit Question',
            result: '💡 AI Analysis Result',
            close: 'Close',
            analyzing: 'AI is analyzing, please wait...',
            copyResult: '📋 Copy Result',
            exportResult: '💾 Export Text',
            copied: 'Copied to clipboard!',
            copyFailed: 'Copy failed, please select text manually',
            analysisFailed: 'Analysis failed',
            enterQuestion: 'Please enter your question',
            // AI Platforms
            platforms: {
                openai: 'OpenAI (ChatGPT)',
                tongyi: 'Alibaba Tongyi',
                gemini: 'Google Gemini',
                deepseek: 'DeepSeek'
            }
        },
        
        // Common
        common: {
            currency: '¥',
            noData: 'No data available',
            loading: 'Loading...',
            success: 'Success',
            error: 'Error',
            confirm: 'Confirm',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            save: 'Save',
            back: 'Back',
            month: 'Month'
        }
    }
};

// 当前语言
let currentLang = localStorage.getItem('language') || 'zh';

// 获取翻译文本
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    
    for (const k of keys) {
        value = value[k];
        if (!value) return key;
    }
    
    return value;
}

// 切换语言
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // 更新按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('lang-' + lang)?.classList.add('active');
    
    updatePageLanguage();
}

// 更新页面语言
function updatePageLanguage() {
    // 更新所有带data-i18n属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        
        if (!translation || translation === key) return;
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.hasAttribute('placeholder')) {
                element.placeholder = translation;
            }
        } else if (element.tagName === 'OPTION') {
            element.textContent = translation;
        } else {
            // 保留HTML标签（如图标）
            const html = element.innerHTML;
            const iconMatch = html.match(/^([📊💰📦💳🤖📈🍴➕🇨🇳🇰🇷🇺🇸💡]+\s*)/);
            if (iconMatch) {
                element.innerHTML = iconMatch[0] + translation;
            } else if (element.children.length === 0 || element.tagName === 'H2' || element.tagName === 'H3' || element.tagName === 'LABEL' || element.tagName === 'TH' || element.tagName === 'BUTTON') {
                // 保存子元素
                const children = Array.from(element.children);
                if (children.length > 0 && (element.tagName === 'H3' || element.tagName === 'LABEL')) {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        }
    });
    
    // 更新货币符号
    updateCurrencySymbols();
    
    // 更新图表标题
    updateChartTitles();
    
    // 重新渲染表格
    if (typeof renderSalesTable === 'function') renderSalesTable();
    if (typeof renderInventoryTable === 'function') renderInventoryTable();
    if (typeof renderExpenseTable === 'function') renderExpenseTable();
    if (typeof calculateProfit === 'function') calculateProfit();
}

// 更新货币符号（由currency.js处理）
function updateCurrencySymbols() {
    // 现在由独立的货币模块处理
    if (typeof updateAllAmounts === 'function') {
        updateAllAmounts();
    }
}

// 更新图表标题
function updateChartTitles() {
    if (typeof updateDashboard === 'function') {
        updateDashboard();
    }
}

// 页面加载时初始化语言
document.addEventListener('DOMContentLoaded', () => {
    // 设置当前语言按钮为活动状态
    const savedLang = localStorage.getItem('language') || 'zh';
    document.getElementById('lang-' + savedLang)?.classList.add('active');
    
    // 延迟一下再更新，确保所有元素都已加载
    setTimeout(() => {
        updatePageLanguage();
    }, 100);
});


