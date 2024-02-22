const generateWelcomeEmail = (fullname) => {
  const styledHtmlBody = `
  <html>
    <head>
      <style>
        body {
          font-family: 'Montserrat', sans-serif;
          background: linear-gradient(180deg, #ffffff 0%, #e0e0e0 100%);
          color: #333;
          padding: 20px;
          transition: background 0.3s ease; /* Agregamos la transición al fondo */
        }
        
        body:hover {
          background: linear-gradient(180deg, #e0e0e0 0%, #ffffff 100%); /* Cambiamos el fondo al pasar el mouse */
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
          color: #000;
          font-weight: bold;
        }

        h1 span {
          background: linear-gradient(90deg, #000, #333);
          color: #fff;
          padding: 5px;
          border-radius: 5px;
        }

        p {
          margin-bottom: 10px;
          line-height: 1.5;
          color: whitesmoke; 
          font-size: 16px; 
          background: linear-gradient(90deg, #e74c3c, #333); 
          padding: 10px;
          border-radius: 8px;
        }

        .gym-logo {
          border-radius: 50%;
          border: 2px solid #e74c3c;
          padding: 5px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        h1 span, .gym-logo {
          background-color: #e74c3c;
          color: #fff;
        }

 
      </style>
    </head>
    <body>
      <div class="container">
        <img class="gym-logo" src="https://res.cloudinary.com/dsx7vnkzm/image/upload/v1707071610/l8x5r0mdoi0pfsmd2olv.png" alt="Logo del Gimnasio">
        <h1>Bienvenido a nuestro gimnasio, <span>${fullname} 🏋🏽‍♂️ !</span></h1>
        <p>¡Estamos emocionados de tenerte como parte de nuestra comunidad!</p>
        <p>Disfruta de todos nuestros servicios y no dudes en ponerte en contacto si necesitas ayuda.</p>
        <p>¡Que tengas un excelente día 😎 !</p>
      </div>
    </body>
  </html>
`;

  return styledHtmlBody;
};

module.exports = { generateWelcomeEmail };
