import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form, ListGroup, Spinner } from 'react-bootstrap';
import { FaLink } from 'react-icons/fa';

const App = () => {
  const [scrapeUrl, setScrapeUrl] = useState('');
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://scrapbasico-production.up.railway.app/scrape?q=${scrapeUrl}`);
      const sortedProducts = response.data.sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchButtonClick = () => {
    // Realizar la búsqueda solo cuando se hace clic en el botón
    handleScrape();
  };

  return (
    <Container className="d-flex mt-5 mb-5 align-items-center justify-content-center ">
      <Card className="text-center p-4" style={{ width: '100%', backgroundColor: '#f8f9fa' }}>
        <Card.Header as="h5" className="bg-success text-white mb-4">Buscador</Card.Header>
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
          <Button variant="success" onClick={handleSearchButtonClick}>
            Buscar
          </Button>
        </Form>

        {loading ? (
          <Spinner animation="border" variant="success" className="mx-auto mt-4" />
        ) : (
          <>
            {products !== null ? (
              products.length > 0 ? (
                <Card className="text-center mt-4" style={{ width: '100%', backgroundColor: '#d4edda' }}>
                  <Card.Header as="h5" className="bg-success text-white mb-4">Productos</Card.Header>
                  <ListGroup variant="flush">
                    {products.map((product) => (
                      <ListGroup.Item key={product.order} className=" align-items-center" >
                        <div>
                          <h6>{product.name}</h6>
                          <p className="mb-1">Precio: Bs {product.price} <a href={`https://www.fidalga.com/${product.link}`} target="_blank" rel="noopener noreferrer">
                            <FaLink size={20} color="#007BFF" />
                          </a></p>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              ) : (
                <Card className="text-center mt-4" style={{ width: '100%', backgroundColor: '#d4edda' }}>
                  <Card.Header as="h5" className="bg-danger text-white mb-4">No se encontraron productos</Card.Header>
                </Card>
              )
            ) : null}
          </>
        )}
      </Card>
    </Container>
  );
};

export default App;
