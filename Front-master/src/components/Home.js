import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import "./Home.css";

function Home() {
  const baseUrl = "http://localhost/apiNewM/";
  const [data, setData] = useState([]);
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalApagar, setModalApagar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  //Guardar os atributos que o usuario digite
  const [clienteSelecionado, setClienteSelecionado] = useState({
    id: "",
    nome: "",
    nascimento: "",
    cpf: "",
    celular: "",
    email: "",
    endereco: "",
    observacao: "",
  });

  //POST

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteSelecionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(clienteSelecionado);
  };

  const valida = (nome) => {
    return !!nome.match(/[A-Z][a-z]* [A-Z][a-z]*/);
  };

  const isValidCPF = (cpf) => {
    if (typeof cpf !== "string") return false;
    cpf = cpf.replace(/[\s.-]*/gim, "");
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      return false;
    }
    var soma = 0;
    var resto;
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  };

  //POST

  const abrirfecharModalAdicionar = () => {
    setModalAdicionar(!modalAdicionar);
  };

  //GET

  const abrirfecharModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  //DELETE

  const abrirfecharModalApagar = () => {
    setModalApagar(!modalApagar);
  };

  //GET

  const peticaoGet = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
    });
  };

  //POST

  const peticaoPost = async () => {
    if (
      clienteSelecionado.nome != "" &&
      clienteSelecionado.nascimento != "" &&
      clienteSelecionado.cpf != "" &&
      clienteSelecionado.celular != "" &&
      clienteSelecionado.email != "" &&
      clienteSelecionado.endereco != ""
    ) {
      if (isValidCPF(clienteSelecionado.cpf)) {
        if (clienteSelecionado.observacao.length <= 300) {
          if (valida(clienteSelecionado.nome)) {
            var f = new FormData();
            f.append("nome", clienteSelecionado.nome);
            f.append("nascimento", clienteSelecionado.nascimento);
            f.append("cpf", clienteSelecionado.cpf);
            f.append("celular", clienteSelecionado.celular);
            f.append("email", clienteSelecionado.email);
            f.append("endereco", clienteSelecionado.endereco);
            f.append("observacao", clienteSelecionado.observacao);
            //Adicionar o atributo METHOD o atributo adicional para diferenciar o tipo de petição que estamos fazendo
            f.append("METHOD", "POST");

            await axios
              .post(baseUrl, f)
              .then((response) => {
                //Se a resposta é correta concatena com o estado data e fechar a janela modal
                setData(data.concat(response.data));
                abrirfecharModalAdicionar();
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            alert("O nome não pode ter caracteres especiais");
          }
        } else {
          alert("Observação máximo de 300 caracteres");
        }
      } else {
        alert("CPF não válido");
      }
    } else {
      alert("Todos os campos com * são obrigatórios");
    }
  };

  //PUT

  const peticaoPut = async () => {
    if (
      clienteSelecionado.nome != "" &&
      clienteSelecionado.nascimento != "" &&
      clienteSelecionado.cpf != "" &&
      clienteSelecionado.celular != "" &&
      clienteSelecionado.email != "" &&
      clienteSelecionado.endereco != ""
    ) {
      if (isValidCPF(clienteSelecionado.cpf)) {
        if (clienteSelecionado.observacao.length <= 300) {
          if (valida(clienteSelecionado.nome)) {
            var f = new FormData();
            f.append("nome", clienteSelecionado.nome);
            f.append("nascimento", clienteSelecionado.nascimento);
            f.append("cpf", clienteSelecionado.cpf);
            f.append("celular", clienteSelecionado.celular);
            f.append("email", clienteSelecionado.email);
            f.append("endereco", clienteSelecionado.endereco);
            f.append("observacao", clienteSelecionado.observacao);
            //Adicionar o atributo METHOD o atributo adicional para diferenciar o tipo de petição que estamos fazendo
            f.append("METHOD", "PUT");

            await axios
              .post(baseUrl, f, { params: { id: clienteSelecionado.id } })
              .then((response) => {
                var dataNova = data;
                dataNova.map((clientes) => {
                  if (clientes.id === clienteSelecionado.id) {
                    clientes.nome = clienteSelecionado.nome;
                    clientes.nascimento = clienteSelecionado.nascimento;
                    clientes.cpf = clienteSelecionado.cpf;
                    clientes.celular = clienteSelecionado.celular;
                    clientes.email = clienteSelecionado.email;
                    clientes.endereco = clienteSelecionado.endereco;
                    clientes.observacao = clienteSelecionado.observacao;
                  }
                });
                setData(dataNova);
                abrirfecharModalEditar();
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            alert("O nome não pode ter caracteres especiais");
          }
        } else {
          alert("Observação máximo de 300 caracteres");
        }
      } else {
        alert("CPF não válido");
      }
    } else {
      alert("Todos os campos com * são obrigatórios");
    }
  };

  //DELETE

  const peticaoDelete = async () => {
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(baseUrl, f, { params: { id: clienteSelecionado.id } })
      .then((response) => {
        setData(data.filter((cliente) => cliente.id !== clienteSelecionado.id));
        abrirfecharModalApagar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selecionarCliente = (clientes, caso) => {
    setClienteSelecionado(clientes);
    caso === "Editar" ? abrirfecharModalEditar() : abrirfecharModalApagar();
  };

  useEffect(() => {
    //Chamamos a petição get dentro do modal
    peticaoGet();
  }, []);

  //HTML

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Procura pelo nome ou pelo e-mail do cliente..."
          aria-describedby="basic-addon2"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <br />
      <button
        className="btn btn-success"
        onClick={() => abrirfecharModalAdicionar()}
      >
        Cadastrar
      </button>
      <br />
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Nascimento</th>
            <th>CPF</th>
            <th>Celular</th>
            <th>Email</th>
            <th>Endereço</th>
            <th>Observação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.nome.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val.email.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((clientes) => (
              <tr key={clientes.id}>
                <td>{clientes.id}</td>
                <td>{clientes.nome}</td>
                <td>{clientes.nascimento}</td>
                <td>{clientes.cpf}</td>
                <td>{clientes.celular}</td>
                <td>{clientes.email}</td>
                <td>{clientes.endereco}</td>
                <td>{clientes.observacao}</td>
                <td className="button">
                  <button
                    className="btn btn-primary"
                    onClick={() => selecionarCliente(clientes, "Editar")}
                  >
                    Editar
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => selecionarCliente(clientes, "Apagar")}
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* MODAL ADICIONAR CLIENTE*/}

      <Modal isOpen={modalAdicionar}>
        <ModalHeader>Cadastrar Cliente</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>* Nome:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              placeholder="Nome Completo do Cliente"
              onChange={handleChange}
            />
            <br />
            <label>* Nascimento: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nascimento"
              placeholder="Data de Nascimento do Cliente"
              onChange={handleChange}
            />
            <br />
            <label>* CPF: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="cpf"
              placeholder="Número CPF do Cliente"
              onChange={handleChange}
            />
            <br />
            <label>* Celular: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="celular"
              placeholder="Número Telefone do Cliente"
              onChange={handleChange}
            />
            <br />
            <label>* E-mail: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="E-mail do Cliente"
              onChange={handleChange}
            />
            <br />
            <label>* Endereço: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="endereco"
              placeholder="Endereço do Cliente"
              onChange={handleChange}
            />
            <br />
            <label>Observação: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="observacao"
              placeholder="Observações"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticaoPost()}>
            Cadastrar
          </button>{" "}
          <button
            className="btn btn-danger"
            onClick={() => abrirfecharModalAdicionar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      {/* MODAL EDITAR CLIENTE */}

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Cliente</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>* Nome:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
              value={clienteSelecionado && clienteSelecionado.nome}
            />
            <br />
            <label>* Nascimento: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nascimento"
              onChange={handleChange}
              value={clienteSelecionado && clienteSelecionado.nascimento}
            />
            <br />
            <label>* CPF: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="cpf"
              onChange={handleChange}
              value={clienteSelecionado && clienteSelecionado.cpf}
            />
            <br />
            <label>* Celular: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="celular"
              onChange={handleChange}
              value={clienteSelecionado && clienteSelecionado.celular}
            />
            <br />
            <label>* E-mail: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={clienteSelecionado && clienteSelecionado.email}
            />
            <br />
            <label>* Endereço: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="endereco"
              onChange={handleChange}
              value={clienteSelecionado && clienteSelecionado.endereco}
            />
            <br />
            <label>Observação: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="observacao"
              onChange={handleChange}
              value={clienteSelecionado && clienteSelecionado.observacao}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticaoPut()}>
            Editar
          </button>{" "}
          <button
            className="btn btn-danger"
            onClick={() => abrirfecharModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      {/* MODAL APAGAR CLIENTE */}

      <Modal isOpen={modalApagar}>
        <ModalBody>
          Tem certeza de que deseja excluir o cliente{" "}
          {clienteSelecionado && clienteSelecionado.nome}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticaoDelete()}>
            Sim
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirfecharModalApagar()}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Home;
