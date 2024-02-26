// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebook,
//   faInstagram,
//   faWhatsapp,
// } from "@fortawesome/free-brands-svg-icons";
// import { Container, Row, Col } from "react-bootstrap";

// export default function Footer() {
//   return (
//     <div className="bg-primary text-white">
//       <Container>
//         <footer className="py-5">
//           <Row>
//             <Col xs="12" md="8" className="text-white">
//               <div>
//                 <span className="fw-bold">Contacto:</span> +54 011 - 156 -
//                 809032
//               </div>
//               <div>
//                 <span className="fw-bold">Dirección:</span> Valle del sol 2541 -
//                 BUENOS AIRES - ARGENTINA
//               </div>
//               <div className="fw-bold my-3">
//                 PROYECTO FINAL SOY HENRY PT-15B GRUPO - 02
//               </div>
//             </Col>
//             <Col xs="12" md="4" className="fs-2 text-md-end text-center my-3">
//               <a
//                 className="mx-3"
//                 href="https://www.facebook.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{ color: "white" }}
//               >
//                 <FontAwesomeIcon icon={faFacebook} />
//               </a>
//               <a
//                 className="mx-3"
//                 href="https://wa.me/+542616396981"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{ color: "white" }}
//               >
//                 <FontAwesomeIcon icon={faWhatsapp} />
//               </a>
//               <a
//                 className="mx-3"
//                 href="https://www.instagram.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{ color: "white" }}
//               >
//                 <FontAwesomeIcon icon={faInstagram} />
//               </a>
//             </Col>
//           </Row>
//           <div className="border-top text-center py-3">
//             {new Date().getFullYear()}
//           </div>
//         </footer>
//       </Container>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function Footer() {
  const [gymInfo, setGymInfo] = useState({
    name:"",
    phone: "",
    address: "",
    map:""
  });

  useEffect(() => {
    const fetchGymInfo = async () => {
      try {
        const { data } = await axios.get("/api/gym");
        setGymInfo(data);
      } catch (error) {
        console.error("Error fetching gym information:", error);
      }
    };

    fetchGymInfo();
  }, []);

  return (
    <div className="bg-primary text-white">
      <Container>
        <footer className="py-5">
          <Row>
            <Col xs="12" md="8" className="text-white">
              <div>
                <span className="fw-bold">Contacto:</span> {gymInfo.phone}
              </div>
              <div>
                <span className="fw-bold">Dirección:</span> {`${gymInfo.address} - ${gymInfo.map}`}
              </div>
              <div className="fw-bold my-3">
                {gymInfo.name}
              </div>
            </Col>
            <Col xs="12" md="4" className="fs-2 text-md-end text-center my-3">
              <a
                className="mx-3"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                className="mx-3"
                href="https://wa.me/+542616396981"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a
                className="mx-3"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </Col>
          </Row>
          <div className="border-top text-center py-3">
            {new Date().getFullYear()}
          </div>
        </footer>
      </Container>
    </div>
  );
}
