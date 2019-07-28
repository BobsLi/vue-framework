简基HealthOS系统前台

基于Vue

### 目录结构
```bash
├── src/  
│   ├── api/                 # api接口存放  
|   |   ├── common-api.js    # 通用的api  
|   │   └── module-api.js    # 模块通用api  
│   ├── assets/              # 常规资源文件,会被webpack作为模块处理  
│   ├── statics/             # 静态资源文件，希望保持原有的文件名称或者动态加载放在这里  
│   ├── components/          # 用于页面和布局的.vue组件  
|   |   ├── Pagination.vue   # 分页组件
│   ├── css/                 # CSS/Stylus/Sass/...文件  
|   |   ├── <mixins>         # 全局公用样式或者片段 
|   |       ├──buttons.styl  # 按钮类样式  
|   |       ├──form.styl     # 表单类样式  
|   |       ├──index.styl    # 全局样式入口
|   |   ├── <folder>         # 单页面组件内样式 
|   |   ├── app.styl         # 定义全局css样式  
|   │   └── quasar.variables.styl # 所有Quasar主题的常用Stylus变量  
│   ├── layouts/             # 布局.vue 文件  
|   |   ├── BaseLayout.vue   # 最基础的页面布局
|   |   ├── FooterLayout.vue # 页脚布局
|   |   ├── HeaderLayout.vue # 页头布局
│   ├── pages/               # 页面 .vue 文件  
|   |   ├── <folder>         # 模块化页面组件  
│   ├── boot/                # boot files 一些需要在vue实例化之前运行的代码  
|   |   ├── axios.js         # axios二次封装  
|   │   └── permission.js    # 用户角色权限认证
│   ├── router/              # Vue路由器  
|   |   ├── index.js         # Vue路由器定义  
|   │   └── routes.js        # App路由器定义  
│   ├── store/               # Vuex Store  
|   |   ├── index.js         # Vuex Store 定义  
|   │   ├── <folder>         # Vuex Store 模块...  
|   │   └── <folder>         # Vuex Store 模块...  
│   ├── App.vue              # APP的根Vue组件  
│   └── index.template.html  # index.html模板  
├── dist/                    # 生产版本代码，用于部署  
│   └── ....  
├── quasar.conf.js           # Quasar App配置文件  
├── babel.config.js          # babel配置  
├── .editorconfig            # editor配置  
├── .eslintignore            # ESlint忽略路径  
├── .eslintrc.js             # ESlint配置  
├── .postcssrc.js            # PostCSS配置  
├── .stylintrc               # Stylus lint配置  
├── .gitignore               # GIT忽略路径  
├── package.json             # npm脚本和依赖项  
└── README.md                # 您的网站/应用程序的自述文件  
```

### 注意事项
#### 1. 所有api接口请求header头带有token，字段名为Authorization，当刷新token请求时，Authorization的值为 Bearer-token
#### 2. 关于分页组件使用
* 组件<templete>里面使用：

```bash
    <Pagination @give-data="changList"></Pagination>
```
其中@give-data是组件自定义回调事件，用来接收组件内传递过来的分页数据信息

* 组件script中

```bash
    //导入分页组件
    import Pagination from 'components/Pagination.vue' 
    export default {
    name: 'pagination-test',
    data () {
        return {
            list: []
        }
    },
    components: {
        Pagination //使用组件
    },
    methods: {
        changList (data) {
            this.list = data
        }
    }
    }
```
#### 3. 全局样式
    所有的自定义全局样式变量都在css/quasar.variables.styl定义的
