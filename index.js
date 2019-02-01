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
        width: 2048,
        height: 1024,
    },
    backgroundColor: 'white'
}, hexo.config.mermaid);

global.hexo = Object.assign(hexo,global.hexo)

if (hexo.config.mermaid.enable) {
    const util = require('hexo-util');
    
    const builder = require('./builder');
    //const filter = require('./lib/filter');
    //hexo.extend.filter.register('before_post_render', filter, 9)
    hexo.extend.tag.register('mermaid',(arg,content)=>{
        log['info'](content)
        return builder(content);
    } , { async: true,ends: true });

}