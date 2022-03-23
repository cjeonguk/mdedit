import { unified } from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';

const mdToHtml = (mdText) => {
  const htmlText = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(html)
    .processSync(mdText);

  return htmlText;
};

export default mdToHtml;
