import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React from 'react';
import ReactDOM from 'react-dom';
import { Row } from 'react-bootstrap';


class FinancialFreedomForm extends React.Component {

  render() {

    return (
      <Form className="content">
        <center>
          <h1>Intellect AI</h1>
          <h2>Liberdade Financeira</h2>
        </center>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Qual o seu nome?</Form.Label>
          <Col>
            <Form.Control name="name" type="text" size="sm" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Qual a sua idade?</Form.Label>
          <Col>
            <Form.Control name="age" type="number" size="sm" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Qual idade que atingir a Liberdade Financeira</Form.Label>
          <Col>
            <Form.Control name="freedomAge" type="number" size="sm" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Tempo para a Liberdade Financeira</Form.Label>
          <Col>
            <Form.Control id="freedomTime" name="finFreedomTime" type="number" disabled />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Expectativa de Vida</Form.Label>
          <Col>
            <Form.Control name="lifeExpectancy" type="number" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Tempo desfrutando a Liberdade Financeira</Form.Label>
          <Col>
            <Form.Control name="finFreedomTimeUse" type="number" disabled />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Renda Mensal pretendida após os 65 anos</Form.Label>
          <Col>
            <Form.Control name="monthlyRevenue" type="number" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Taxa de rentabilidade média mensal</Form.Label>
          <Col>
            <Form.Control name="rate" type="number" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Qual o patrimônio acumulado aos 65 anos?</Form.Label>
          <Col>
            <Form.Control name="patrimony" type="number" disabled />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Quanto devo depositar mensalmente?</Form.Label>
          <Col>
            <Form.Control name="monthlyAmount" type="number" disabled />
          </Col>
        </Form.Group>

      </Form >
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FinancialFreedomForm />);