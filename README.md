# 王者荣耀英雄战力查询系统

## 项目简介
一个基于 React + TypeScript + Vite 构建的王者荣耀英雄战力查询系统。支持英雄搜索、战力查询、数据置顶等功能，支持安卓QQ、安卓微信、iOS QQ、iOS微信四大平台的数据查询。

## 🚀 在线演示
[在线预览](https://wzryzlcx.vercel.app/)

## ⚡ 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FWindyskr%2Fvite-react-wzry)

1. 点击上方按钮，跳转至 Vercel 部署页面
2. 使用 GitHub 账号登录 Vercel
3. 设置项目名称
4. 点击 "Deploy" 开始部署
## 🚀 特性
- 📱 支持四大平台战力查询
- 🔍 实时英雄搜索
- 📌 英雄置顶功能（本地保存）
- 💪 区/市/省/国标战力展示
- 📊 实时数据更新
- 💻 响应式布局设计

## 🛠️ 技术栈
- React 18
- TypeScript
- Vite
- CSS Modules
- LocalStorage
- RESTful API

## 📦 安装
```bash
克隆项目
git clone [项目地址]
进入项目目录
cd [项目名]
安装依赖
npm install
启动开发服务器
npm run dev
构建生产版本
npm run build
```

## 🎯 使用方法

1. **英雄搜索**
   - 在搜索框输入英雄名称或称号
   - 支持实时搜索过滤

2. **平台选择**
   - 支持切换不同平台：
     - iOS QQ
     - iOS 微信
     - 安卓 QQ
     - 安卓 微信

3. **战力查询**
   - 点击英雄卡片查看详细战力信息
   - 显示区级/市级/省级/国标战力
   - 显示具体地理位置信息

4. **英雄置顶**
   - 点击英雄卡片右上角的置顶按钮
   - 置顶信息本地保存，刷新页面不会丢失

## 📁 项目结构
```bash
project-root/
├── src/
│ ├── assets/ # 静态资源文件
│ │ └── react.svg
│ │
│ ├── components/ # 组件文件夹
│ │ ├── HeroList/ # 英雄列表组件
│ │ │ ├── index.tsx # 组件主文件
│ │ │ └── style.module.css # 组件样式
│ │ │
│ │ └── HeroPowerModal/ # 战力详情模态框
│ │ ├── index.tsx
│ │ └── style.module.css
│ │
│ ├── types/ # TypeScript 类型定义
│ │ └── hero.ts # 英雄相关类型定义
│ │
│ ├── hooks/ # 自定义 Hooks
│ │ └── useLocalStorage.ts # localStorage 封装
│ │
│ ├── utils/ # 工具函数
│ │ └── request.ts # API 请求封装
│ │
│ ├── App.tsx # 根组件
│ ├── App.css # 根组件样式
│ ├── main.tsx # 应用入口文件
│ └── index.css # 全局样式
│
├── public/ # 公共资源文件夹
│ └── vite.svg
│
├── .gitignore # Git 忽略文件
├── index.html # HTML 模板
├── package.json # 项目依赖和脚本
├── tsconfig.json # TypeScript 配置
├── vite.config.ts # Vite 构建配置
└── README.md # 项目文档
```

## 📝 待办事项
- [ ] 添加数据统计图表
- [ ] 支持多英雄数据对比
- [ ] 添加历史记录功能
- [ ] 支持数据导出功能

## 🤝 贡献指南
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 🙏 致谢
- [王者荣耀官方](https://pvp.qq.com/)
- [API 提供方](https://api.xxoo.team/)