const generateWelcomeEmail = (fullname) => {
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
        }

        h1 span {
          color: #000;
        }

        p {
          margin-bottom: 10px;
          line-height: 1.5;
          color: #555;
        }

        /* Nuevos estilos */
        .gym-logo {
          border-radius: 50%;
          border: 2px solid #e74c3c;
          padding: 5px;
        }

        h1 span, .gym-logo {
          background-color: #e74c3c;
          color: #fff;
        }

        p {
          color: #333;
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
