import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import QuotesList from './QuotesList'


const Quotes = () =>
  (
    <div id='quotes'>
      <Container>
        <Row>
          <Col>
            <QuotesList />
          </Col>
        </Row>
      </Container>
    </div>
  )

export default Quotes
