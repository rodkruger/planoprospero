import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure'
import Form from 'react-bootstrap/Form';
import React from 'react';
import ReactDOM from 'react-dom';
import Row from 'react-bootstrap/Row';


/** Calculates the Present Value according to the
 *  parameters informed by the user */
function pv(rate, nper, pmt) {

  rate = parseFloat(rate) / 100;
  nper = parseFloat(nper);
  pmt = parseFloat(pmt);

  var value = 0;

  if (nper === 0 || rate === 0) {
    return (0);
  }

  value = pmt / rate * (1 - Math.pow(1 + rate, -nper))
  value = Math.round(value * 100) / 100;

  return value.toLocaleString();
} // end pv()


class FinancialFreedomForm extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      age: 0,
      freedomAge: 0,
      finFreedomTime: 0,
      lifeExpectancy: 0,
      finFreedomTimeUse: 0,
      monthlyRevenue: 0,
      rate: 0,
      patrimony: 0,
      monthlyAmount: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCalcFreedom = this.handleCalcFreedom.bind(this);

  }

  handleChange(event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  handleCalcFreedom(e) {
    const finFreedomTime = this.state.freedomAge - this.state.age;
    const finFreedomTimeUse = this.state.lifeExpectancy - this.state.freedomAge;

    const patrimony = pv(this.state.rate,
      (finFreedomTimeUse * 12),
      this.state.monthlyRevenue);

    this.setState({
      finFreedomTime: finFreedomTime,
      finFreedomTimeUse: finFreedomTimeUse,
      patrimony: patrimony,
    });
  }

  render() {

    return (
      <Form className="content">

        <center>
          <Figure>
            <Figure.Image
              src="./images/pp-logo.png"
            />
          </Figure>
        </center>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Nome</Form.Label>
          <Col>
            <Form.Control name="name" type="text" size="sm" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Idade (anos)</Form.Label>
          <Col>
            <Form.Control name="age" type="number" value={this.state.age} onChange={this.handleChange} size="sm" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Idade para Liberdade Financeira (anos)</Form.Label>
          <Col>
            <Form.Control name="freedomAge" type="number" value={this.state.freedomAge} onChange={this.handleChange} size="sm" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Tempo para a Liberdade Financeira (anos)</Form.Label>
          <Col>
            <Form.Control name="finFreedomTime" type="number" value={this.state.finFreedomTime} onChange={this.handleChange} disabled />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Expectativa de Vida (anos)</Form.Label>
          <Col>
            <Form.Control name="lifeExpectancy" type="number" value={this.state.lifeExpectancy} onChange={this.handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Tempo de Liberdade Financeira (anos)</Form.Label>
          <Col>
            <Form.Control name="finFreedomTimeUse" type="number" value={this.state.finFreedomTimeUse} onChange={this.handleChange} disabled />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Renda Mensal após os 65 anos ($)</Form.Label>
          <Col>
            <Form.Control name="monthlyRevenue" type="number" value={this.state.monthlyRevenue} onChange={this.handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Taxa de rentabilidade média mensal (%)</Form.Label>
          <Col>
            <Form.Control name="rate" type="number" value={this.state.rate} onChange={this.handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Patrimônio acumulado até os 65 anos? ($)</Form.Label>
          <Col>
            <Form.Control name="patrimony" type="text" value={this.state.patrimony} onChange={this.handleChange} disabled />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Quanto devo depositar mensalmente? ($)</Form.Label>
          <Col>
            <Form.Control name="monthlyAmount" type="number" value={this.state.monthlyAmount} onChange={this.handleChange} disabled />
          </Col>
        </Form.Group>

        <Button color="primary" onClick={this.handleCalcFreedom}>Calcular</Button>
      </Form >
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FinancialFreedomForm />);