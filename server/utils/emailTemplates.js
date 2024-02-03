
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
            border: 2px solid #e74c3c; /* Rojo - Cambia a tu color de borde preferido */
          }
          
          h1 {
            color: #e74c3c; /* Rojo - Cambia a tu color de encabezado preferido */
          }
          
          p {
            margin-bottom: 10px;
            line-height: 1.5;
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="ruta al logo" alt="Logo del Gimnasio" style="max-width: 100px; margin-bottom: 20px;">
          <h1>Bienvenido a nuestro gimnasio, ${fullname} 🏋🏽‍♂️ !</h1>
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
  