import fs from 'fs'

/**
 * routerConfig
 * 路由配置
 */
const routerConfig = {
    path: `${process.cwd()}/src/view`,
    warning: '\x1B[33m%s\x1B[39m',
    routePath: `${process.cwd()}/router/routes.js`
}


/**
 * mapViews 
 * 映射生成视图字典 
 */
const mapViews = (views = []) =>
    new Promise((reslove) => {
        const { path, warning } = routerConfig
        let routes = [],
            warningSelect = [],
            hasDefault = false
        if (views === [] || !views) {
            reslove(routes)
            return
        }
        views.map((item) => {
            try {
                const view = `${path}/${item}/index.vue`
                fs.statSync(view)
                routes = [...routes, `{
                    path: '/${item === 'Index' ? '': item}',
                    component: import ('${[view]}')
                }`]
            } catch {
                warningSelect = [...warningSelect, item]
            }
        })
        if (warningSelect > 0)
            console.log(warning, `${warningSelect.join('、')}页面不存在！`)
        reslove(routes)
    })


/**
 * 生成路由
 * generateRoutes
 */
const generateRoutes = async() => {
    const { path, routePath, warning } = routerConfig
    // 捕获类型报错，阻止抛出
    process.on('unhandledRejection', (reason, p) => {
        return
    })
    const views = await fs.readdirSync(path),
        routes = await mapViews(views)

    const template = `
      import { createRouter, createWebHistory } from "vue-router"
      export default createRouter({
        history: createWebHistory(),
        routes: [${routes}]
      })
    `
    await fs.writeFileSync(`${routePath}`, template)
}

generateRoutes()