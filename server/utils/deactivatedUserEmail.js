const deactivatedUserEmail = (name) => {
    const styledHtmlBody = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Montserrat', sans-serif;
            background-color: #f5f5f5;
            color: #333;
            padding: 20px;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border: 2px solid #e74c3c;
          }
          
          h1 {
            color: #e74c3c;
          }
  
          h1 span {
            color: #000;
          }
          
          p {
            margin-bottom: 10px;
            line-height: 1.5;
            color: #555;
          }
          
          img {
            max-width: 100px;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://res.cloudinary.com/dsx7vnkzm/image/upload/v1707071610/l8x5r0mdoi0pfsmd2olv.png" alt="Logo del Gimnasio">
          <h1>Como estas, <span>${name} 🏋🏽‍♂️ !</span></h1>
          <p>Le queremos notificar que en este momento ha sido desactivado por uno de nuestros administradores. Por favor, póngase en contacto con el área administrativa para poder brindarle una solución.</p>
        </div>
      </body>
    </html>
  `;
  
    return styledHtmlBody;
  };
  
  module.exports = { deactivatedUserEmail };
  