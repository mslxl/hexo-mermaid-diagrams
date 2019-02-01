"use strict";
/* global hexo */

const hexo = global.hexo

module.exports = (content)=>{
    return (async () => {
        const path = require('path');
        const puppeteer = require('puppeteer');
        
        let browser = await puppeteer.launch(hexo.config.mermaid.puppeteerConfig);
        
        const page = await browser.newPage();
        page.setViewport(hexo.config.mermaid.defaultViewport);

        await page.goto(`file://${path.join(__dirname, 'index.html')}`);
        await page.evaluate(`document.body.style.background = '${hexo.config.mermaid.backgroundColor}'`);
        
        //TODO
        let mermaidConfig = { 
            theme:hexo.config.mermaid.theme
        };
        let css;

        await page.$eval('#container', (container, definition, mermaidConfig, css) => {
            container.innerHTML = definition;
            window.mermaid.initialize(mermaidConfig);
            window.mermaid.init(undefined, container);
        }, content, mermaidConfig, css);
        const svg = await page.$eval('#container', container => container.innerHTML);

        browser.close()

        return svg;
    })(content)
}