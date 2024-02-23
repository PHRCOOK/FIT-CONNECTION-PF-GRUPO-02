const modifyUserData = (name) => {
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
  
          img {
            max-width: 100px;
            margin-bottom: 20px;
          }
  
          h1 {
            color: #e74c3c;
            font-weight: bold;
          }
  
          h1 span {
            color: #000;
          }
  
          p {
            margin-bottom: 10px;
            line-height: 1.5;
            color: whitesmoke; 
            font-size: 16px; 
          }
  
          /* Nuevos estilos */
          .warning-message {
            background-color: #e74c3c;
            color: #fff;
            padding: 10px;
            border-radius: 5px;
          }
  
          h1 span, .warning-message {
            background-color: #e74c3c;
            color: #fff;
          }
  
          .gym-logo {
            border-radius: 50%;
            border: 2px solid #e74c3c;
            padding: 5px;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
  
        </style>
      </head>
      <body>
        <div class="container">
          <img class="gym-logo" src="https://res.cloudinary.com/dsx7vnkzm/image/upload/v1707071610/l8x5r0mdoi0pfsmd2olv.png" alt="Logo del Gimnasio">
          <h1>¡Hola, <span>${name} !</span></h1>
          <div class="warning-message">
            <p>Queremos informarte que tus datos han sido modificados con exito!</p>
            <p>Por favor, comunícate con el área administrativa si tienes alguna duda o consulta</p>
          </div>
        </div>
      </body>
    </html>
  `;
  
    return styledHtmlBody;
  };
  
  module.exports = { modifyUserData };