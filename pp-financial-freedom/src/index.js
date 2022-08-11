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

  if (nper === 0 || rate === 0) {
    return (0);
  }

  return pmt / rate * (1 - Math.pow(1 + rate, -nper));
} // end pv()


/** Calculates de PMT according to the 
 * parameters informed by the user 
 */
function pmt(rate, nper, pv, fv) {

  if (rate === 0)
    return -(pv + fv) / nper;

  return (rate * (pv * Math.pow((rate + 1), nper) + fv)) / ((rate + 1) * (Math.pow((rate + 1), nper) - 1));
} // end pmt()


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

    this.handleFormatNumeric = this.handleFormatNumeric.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCalcFreedom = this.handleCalcFreedom.bind(this);

  }

  handleFormatNumeric(event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const parsedValue = parseFloat(value.replaceAll(".", "").replaceAll(",", "."));

    this.setState({
      [name]: parsedValue.toLocaleString()
    });

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

    const rate = parseFloat(this.state.rate.replaceAll(".", "").replaceAll(",", ".") / 100);
    const monthlyRevenue = parseFloat(this.state.monthlyRevenue.replaceAll(".", "").replaceAll(",", "."));
    const finFreedomTime = parseFloat(this.state.freedomAge - this.state.age);
    const finFreedomTimeUse = parseFloat(this.state.lifeExpectancy - this.state.freedomAge);
    const nper1 = parseFloat(finFreedomTime * 12);
    const nper2 = parseFloat(finFreedomTimeUse * 12);

    const patrimony = pv(rate, nper2, monthlyRevenue);
    const monthlyAmount = pmt(rate, nper1, 0, patrimony);

    const patrimonyRounded = Math.round(patrimony * 100) / 100
    const monthlyAmountRounded = Math.round(monthlyAmount * 100) / 100

    this.setState({
      finFreedomTime: finFreedomTime,
      finFreedomTimeUse: finFreedomTimeUse,
      patrimony: patrimonyRounded.toLocaleString(),
      monthlyAmount: monthlyAmountRounded.toLocaleString()
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
            <Form.Control name="monthlyRevenue" type="text" value={this.state.monthlyRevenue} onChange={this.handleChange} onBlur={this.handleFormatNumeric} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Taxa de rentabilidade média mensal (%)</Form.Label>
          <Col>
            <Form.Control name="rate" type="text" value={this.state.rate} onChange={this.handleChange} onBlur={this.handleFormatNumeric} />
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
            <Form.Control name="monthlyAmount" type="text" value={this.state.monthlyAmount} onChange={this.handleChange} disabled />
          </Col>
        </Form.Group>

        <Button color="primary" onClick={this.handleCalcFreedom}>Calcular</Button>
      </Form >
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FinancialFreedomForm />);