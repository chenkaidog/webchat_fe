import markdownit from 'markdown-it'
import hljs from 'highlight.js' // https://highlightjs.org

// Actual default values
const md = markdownit({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return `<pre><div class="hljs-header"> <label>${lang}</label> </div>` +
                        '<code class="hljs">' +
                        hljs.highlight(str, {language: lang, ignoreIllegals: true}).value +
                        '</code></pre>';
                } catch (e) {
                    console.error(e);
                    return ' ';
                }
            }

            return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    })
        .use(require('markdown-it-code-copy'), {
            element: '<svg style="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
                '<path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg>',
            iconClass: 'code-copy-icon',
            iconStyle: '',
            buttonClass: 'code-copy-btn',
            buttonStyle: '',
        })
;

export function RenderMarkdown(content) {
    return md.render(content)
}