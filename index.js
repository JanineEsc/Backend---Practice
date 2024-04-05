const http = require( 'http')
const fs = require( 'fs')
const path = require( 'path')




const server = http.createServer((req, res) => {
 console.log(req.url)
  
  let filename = req.url === '/' ? 'index.html' : req.url 
  let extname = path.extname(filename)
  let contentType = 'text/html'

  
  
  switch(extname) {
    case '.css':
       contentType = 'text/css'
      break;
      case 'json':
       contentType = 'application/json'
      break;
      case 'jpg':
        contentType = 'image/jpg'
        break;
      case 'png':
        contentType = 'image/png'
         break;
      case '.ico':
        contentType = 'image/x-icon'
        break;

    }
    
    if (contentType == 'text/html' && extname == '') {
      filename += '.html'
    }
    
    
  let filepath = path.join(__dirname, 'src', filename)

  console.log({extname})

  
  fs.readFile(filepath, (err, data) => {
    if(err) {
      
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'src', '404.html'), (err, content) => {

          if(err) {
            console.log(err)
            return
          }

          res.writeHead(404, { 'Content-type': 'text/html'})
          res.end(content)
        })
      }
      else {

        res.writeHead(500)
        res.end(`Server error: ${err.code}`)

      }
    
    
    } else {
     
      res.writeHead(200, {'Content-type' : contentType})
      res.end(data, 'utf8')
    }
      
  })
})

const PORT = process.env.PORT  || 9997;

server.listen(PORT,  () => console.log('server running on http://localhost:' + PORT ))