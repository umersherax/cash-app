import React from "react";
import { Carousel } from "react-bootstrap";

export default function index() {
  return (
    <div className="mt-2 d-lg-block d-none">
      <Carousel variant="dark" fade={true}>
        <Carousel.Item interval={2000}>
          <img className="d-block w-100" src="gray.png" alt="First slide" />
          <Carousel.Caption>
            <h3 className="text-dark">Umer sheraz</h3>
            <q className="text-dark">
              <i>Cash App has changed my life !</i>
            </q>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img className="d-block w-100" src="gray.png" alt="First slide" />
          <Carousel.Caption>
          <h3 className="text-dark">Arbaz khan</h3>
            <q className="text-dark">
              <i>I won 1 Million !</i>
            </q>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="gray.png" alt="First slide" />

          <Carousel.Caption>
          <h3 className="text-dark">Waqas khan</h3>
            <q className="text-dark">
              <i>I recommend every one to try their lucks</i>
            </q>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
