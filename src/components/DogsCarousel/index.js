import React from "react";
import StyledComponent from "./styled.js";
import Image from "next/image";
import HorizontalCarousel from "horizontal_carousel";
import Link from "next/link";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
  }
  componentDidMount() {
    console.log("componentDidMount()");
    /*
     * Mount carousel
     */
    this.carousel = new HorizontalCarousel(this.carouselRef.current);
  }
  componentWillUnmount() {
    /*
     * Unmount carousels
     */
    this.carousel.end();
  }
  render() {
    const breeds = this.props.breeds;
    if (!breeds || !breeds[0] || !breeds[0].images || !breeds[0].images[0]) return null;
    /*
     * Format content
     */
    let Images = [];
    for (let breed of breeds) {
      Images.push(
        <Link key={breed.type.toString()} href={`/dogs/${breed.type.join("/")}`}>
          <a className="slide">
            <Image
              className="slideImage nextImage"
              title={[...breed.type].reverse().join(" ")}
              height={200}
              width={200}
              src={breed.images[0]}
            />
            <span className="slideImageCaption">{!!breed.type[1] && breed.type[1]}</span>
          </a>
        </Link>
      );
    }
    /*
     * Render
     */
    return (
      <StyledComponent>
        <div className="horizontal_carousel" ref={this.carouselRef}>
          <div className="slides">{Images}</div>
          <div className="arrows">
            <span className="arrow prev">
              <span className="icon-chevron-left-light" />
            </span>
            <span className="arrow next">
              <span className="icon-chevron-right-light" />
            </span>
          </div>
        </div>
      </StyledComponent>
    );
  }
}
