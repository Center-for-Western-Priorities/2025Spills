const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const MIME = { html: 'text/html', css: 'text/css', js: 'application/javascript', json: 'application/json', png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml' };
http.createServer((req, res) => {
  const url = req.url === '/' ? '/colorado_historic_spills_report.html' : req.url;
  const file = path.join(ROOT, url.split('?')[0]);
  try {
    const data = fs.readFileSync(file);
    const ext = path.extname(file).slice(1);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  } catch (e) {
    res.writeHead(404); res.end('Not found');
  }
}).listen(3456, () => console.log('Server ready on port 3456'));
