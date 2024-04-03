import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form, ListGroup, Spinner, Col,Image, Row } from 'react-bootstrap';
import { FaLink } from 'react-icons/fa';
import pedidosImage from'./img/pedidos.png';
import ic from'./img/ic.png';
const App = () => {
  const [scrapeUrl, setScrapeUrl] = useState('');
  const [productsFidalga, setProductsFidalga] = useState(null);
  const [productsIcnorte, setProductsIcnorte] = useState(null);
  const [productsAmarket, setProductsAmarket] = useState(null);
  const [productsPedidosYa, setProductsPedidosYa] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScrape = async (url, userAgent) => {
    try {
      setLoading(true);
      const response = await axios.get(url, { headers: { 'User-Agent': userAgent } });
      const sortedProducts = response.data.sort((a, b) => a.price - b.price);
      console.log(sortedProducts)
      return sortedProducts.map(product => ({ ...product, source: url }));
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchButtonClick = async () => {
    const productsFidalga = await handleScrape(`https://scrapbasico-production.up.railway.app/fidalga?q=${scrapeUrl}`);
    const productsAmarket = await handleScrape(`https://scrapbasico-production.up.railway.app/amarket?q=${scrapeUrl}`);
    const productsPedidosYa = await handleScrape(`https://scrapbasico-production.up.railway.app/pedidosya?q=${scrapeUrl}`, 'Your Custom User Agent');
    const productsIcnorte = await handleScrape(`https://scrapbasico-production.up.railway.app/icnorte?q=${scrapeUrl}`, 'Your Custom User Agent');
    setProductsFidalga(productsFidalga);
    setProductsPedidosYa(productsPedidosYa);
    setProductsAmarket(productsAmarket);
    setProductsIcnorte(productsIcnorte);

  };

  return (
    <Container className="d-flex mt-5 mb-5 align-items-center justify-content-center ">
      <Card className="text-center p-4" style={{ width: '100%', backgroundColor: '#f8f9fa' }}>
        <Card.Header as="h5" className="bg-primary text-white mb-4">Buscador</Card.Header>
        <Form className=" flex-grow-1">
          <Form.Group controlId="scrapeUrl">
            <Form.Label>Producto </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del producto"
              value={scrapeUrl}
              onChange={(e) => setScrapeUrl(e.target.value)}
            />
          </Form.Group>
          <br />
          <Button variant="primary" onClick={handleSearchButtonClick}>
            Buscar
          </Button>
        </Form>

        {loading ? (
          <Spinner animation="border" variant="primary" className="mx-auto mt-4" />
        ) : (
          <>
            <Row>
              <Col>
                {productsFidalga && productsFidalga.length > 0 ? (
                  <Card className="text-center mt-4" style={{ width: '100%', backgroundColor: '#d4edda' }}>
                    <Card.Header as="h5"  style={{ width: '100%', backgroundColor: '#00bf5a' }} className="text-white mb-4"> <Image style={{ width: '200px', height: 'auto' }} src={`https://www.fidalga.com/cdn/shop/files/LOGO_CARRITO1.png?v=1656886410`}/></Card.Header>
                    <ListGroup variant="flush">
                      {productsFidalga.map((product, index) => (
                        <ListGroup.Item key={index} className=" align-items-center" >
                          <div>
                            <h6>{product.name}</h6>
                            <p className="mb-1">Precio: Bs {product.price} <a href={`https://www.fidalga.com/${product.link}`} target="_blank" rel="noopener noreferrer">
                              <FaLink size={20} color="#007BFF" />
                            </a></p>
                            <Image src={`https://${product.image}`} alt={product.name} thumbnail style={{ width: '150px', height: 'auto' }} /> </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                ) : null}
              </Col>
              <Col>
                {productsPedidosYa && productsPedidosYa.length > 0 ? (
                  <Card className="text-center mt-4" style={{ width: '100%', backgroundColor: 'rgb(234, 4, 78,0.2)' }}>
                    <Card.Header as="h5" style={{ width: '100%', backgroundColor: 'rgb(234, 4, 78)' }} className="text-white mb-4"><Image style={{ width: '130px', height: 'auto' }} src={pedidosImage}/></Card.Header>
                    <ListGroup variant="flush">
                      {productsPedidosYa.map((product, index) => (
                        <ListGroup.Item key={index} className=" align-items-center" >
                          <div>
                            <h6>{product.name}</h6>
                            <p className="mb-1">Precio: Bs {product.price} <a href={`https://www.pedidosya.com/${product.link}`} target="_blank" rel="noopener noreferrer">
                              <FaLink size={20} color="#007BFF" />
                            </a></p>
                            <Image src={`https://images.deliveryhero.io/image/pedidosya/products//${product.image}`} alt={product.name} thumbnail style={{ width: '150px', height: 'auto' }} />

                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                ) : null}
              </Col>

              <Col>
                {productsIcnorte && productsIcnorte.length > 0 ? (
                  <Card className="text-center mt-4" style={{ width: '100%', backgroundColor: 'rgb(13, 64, 0,0.2)' }}>
                   <Card.Header as="h5" style={{ width: '100%', backgroundColor: 'rgb(13, 64, 0)' }} className="text-white mb-4">
      <Image style={{ width: '105px', height: 'auto', marginBlock:'-8px' }} src={ic}/>    </Card.Header> <ListGroup variant="flush">
                      {productsIcnorte.map((product, index) => (
                        <ListGroup.Item key={index} className=" align-items-center" >
                          <div>
                            <h6>{product.name}</h6>
                            <p className="mb-1">Precio: Bs {product.price} <a href={''+product.link} target="_blank" rel="noopener noreferrer">
                              <FaLink size={20} color="#007BFF" />
                            </a></p>
                            <Image src={`${product.image}`} alt={product.name} thumbnail style={{ width: '150px', height: 'auto' }} />

                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                ) : null}
              </Col>

              <Col>
                {productsAmarket && productsAmarket.length > 0 ? (
                  <Card className="text-center mt-4" style={{ width: '100%', backgroundColor: 'rgb(235, 23, 0,0.1)' }}>
                    <Card.Header as="h5"  style={{ width: '100%', backgroundColor: 'rgb(255, 255, 255)' }} className="text-white mb-4"><Image style={{ width: '145px', height: 'auto',  }} src='https://amarket.com.bo/cdn/shop/files/Logo_Amarket_1_1200x600_crop_center.png?v=1665431461'></Image></Card.Header>
                    <ListGroup variant="flush">
                      {productsAmarket.map((product, index) => (
                        <ListGroup.Item key={index} className=" align-items-center" >
                          <div>
                            <h6>{product.name}</h6>
                            <p className="mb-1">Precio: Bs {product.price} <a href={`https://www.fidalga.com/${product.link}`} target="_blank" rel="noopener noreferrer">
                              <FaLink size={20} color="#007BFF" />
                            </a></p>
                            <Image src={`https://${product.image}`} alt={product.name} thumbnail style={{ width: '150px', height: 'auto' }} /> </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                ) : null}
              </Col>
            </Row>
          </>
        )}
      </Card>
    </Container>
  );
};

export default App;
