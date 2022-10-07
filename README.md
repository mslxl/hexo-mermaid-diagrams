Hexo plugin for rendering mermaid diagrams by puppeteer.

Thanks to [mermaid.cli](https://github.com/mermaidjs/mermaid.cli)

This is my first time to write nodejs package, you can contract me if there are some things wrong.

* mermaid 9.1.7
* @fortawesome/fontawesome-free 5.7.0

Install:

```shell
npm i hexo-mermaid-diagrams
```

<hr/>

```
{% mermaid %}
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
{% endmermaid %}
```

[![Source](https://github.com/knsv/mermaid/raw/master/img/flow.png)](https://github.com/knsv/mermaid)]
