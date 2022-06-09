// Custom Css
import "../styles/components/explore.css";
// Oas
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function MansoryForExplore(props) {
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="masonry-style-exp" data-aos="fade-up">
      {props.imageUrls.map((img, index) => (
        <img
          src={process.env.PUBLIC_URL + `${img}`}
          key={index}
          className="images-explore"
          alt="Gambar Explore"
        />
      ))}
    </div>
  );
}
