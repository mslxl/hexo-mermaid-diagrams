'use strict';
/* global hexo */

const log = hexo.log || console;


hexo.config.mermaid = Object.assign({
    enable: true,
    theme: 'default',
    puppeteerConfig: { 
        args: ['--disable-setuid-sandbox', '--no-sandbox'],
        dumpio: true 
    },
    defaultViewport:{
        width: 1024,
        height: 512,
    },
    backgroundColor: 'white'
}, hexo.config.mermaid);


if (hexo.config.mermaid.enable) {
    const util = require('hexo-util');
    const path = require('path');
    const puppeteer = require('puppeteer');
    let browser;
    hexo.extend.tag.register('mermaid', function (args, content) {
        log['info']('POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!POI!')
        return (async () => {
           
            if(!browser){
                log['info']("Starting browser for puppereer")
                browser = await puppeteer.launch(hexo.config.mermaid.puppeteerConfig)
            }
            const page = await browser.newPage();
            
    
            await page.goto(`file://${path.join(__dirname, 'index.html')}`)
            await page.evaluate(`document.body.style.background = '${hexo.config.mermaid.backgroundColor}'`)
            
            //TODO
            let mermaidConfig = { 
                theme:hexo.config.mermaid.theme
            }
            let css;
    
            await page.$eval('#container', (container, definition, mermaidConfig, css) => {
                container.innerHTML = definition
                window.mermaid.initialize(mermaidConfig)
                window.mermaid.init(undefined, container)
            }, content, mermaidConfig, css)
            const svg = await page.$eval('#container', container => container.innerHTML)

            browser.close()

            return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1">${svg}</svg>`
        })()


    }, { async: true,ends: true });
}