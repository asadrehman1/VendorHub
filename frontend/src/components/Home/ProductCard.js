import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const ProductCard = ({ product }) => {
  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover", // Use 'cover' to maintain aspect ratio and fill the container
  };
  const options = {
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Card
      style={{
        width: "18rem",
        marginTop: "100px",
        marginBottom: "100px",
        marginLeft: "30px",
      }}
    >
     
      <Card.Img
        variant="top"
        src={product?.images[0]?.url}
        style={imageStyle}
      />

  
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <div className="row">
            <div className="col-6">
              <Rating {...options} />
            </div>
            <div className="col-6">{product?.numOfReviews} Reviews</div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>{`RS: ${product?.price}`}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link as={Link} to={`/product/${product?._id}`}>
          Read more
        </Card.Link>
      </Card.Body>
    </Card>
  );
  // return (
  //   <Link className="productCard" to={`/product/${product?._id}`}>
  //     <img src={product?.images[0]?.url} alt={product?.name} />
  //     <p>{product.name}</p>
  //     <div>
  //       <Rating {...options} />{" "}
  //       <span className="productCardSpan">
  //         {" "}
  //         ({product?.numOfReviews} Reviews)
  //       </span>
  //     </div>
  //     <p style={{fontSize:"12px"}} className="product-description">{product?.description}</p>
  //     <span>{`RS: ${product?.price}`}</span>
  //   </Link>
  // );
};

export default ProductCard;
