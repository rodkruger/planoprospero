import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class FinancialFreedomForm extends React.Component {

  render() {

    return (
      <div>
        <form>
          <label>
            Nome <input name="name" type="text" />
          </label>
          <label>
            Qual é sua idade? <input name="age" type="text" />
          </label>
          <label>
            Qual idade que atingir a Liberdade Financeira: <input name="finFreedomAge" type="text" />
          </label>
          <label>
            Tempo para a Liberdade Financeira <input name="finFreedomTime" type="text" />
          </label>
          <label>
            Expectativa de Vida <input name="lifeExpectancy" type="text" />
          </label>
          <label>
            Tempo desfrutando a Liberdade Financeira <input name="finFreedomTimeUse" type="text" />
          </label>
          <label>
            Renda Mensal pretendida após os 65 anos <input name="monthlyRevenue" type="text" />
          </label>
          <label>
            Taxa de rentabilidade média mensal <input name="rate" type="text" />
          </label>
          <label>
            Qual o patrimônio acumulado aos 65 anos? <input name="patrimony" type="text" />
          </label>
          <label>
            Quanto devo depositar mensalmente? <input name="monthlyAmount" type="text" />
          </label>
        </form>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FinancialFreedomForm />);