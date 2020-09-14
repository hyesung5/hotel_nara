import React, {Component} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class ImageGallaryComponent extends Component {
    render() {
        const {imgfiles}=this.props;
        return (
            <div>
                <h2>My Image Gallery</h2>
                <Carousel autoPlay interval="5000" transitionTime="5000">
                    {imgfiles.map((image)=> (
                         <div>
                         <img src={image} />
                         <p className="legend">My Classic Still 1</p>
                     </div>
                    ))}
                </Carousel>
            </div>
        )
    };
}

export default ImageGallaryComponent;