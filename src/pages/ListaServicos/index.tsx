//estilização
import "./style.css"; /* const [listaServicosFiltrados, setListaServicosFiltrados] = useState<any[]>(servicos); */

//hooks
import { useEffect, useState } from "react";

//componentes
import CardServico from "../../components/CardServico";

import api from "../../utils/api";

function ListaServicos() {
    //STATE SERVICOS
    const [servicos, setServicos] = useState<any[]>([]);

    const [skillDigitado, setSkillDigitado] = useState<string>("");

    //função onde pega o que o usuario digitou
    function verificarCampoSkill(event: any) {
        if (event.target.value === "") {
            ListaServicos();
        }
        setSkillDigitado(event.target.value);
    }

    function buscarServicoPorSkill(event: any) {
        //não recarrega a pagina
        event.preventDefault();

        //filtrar devs pela skill digitada no campo buscar
        const servicosFiltrados = servicos.filter((servico: any) => servico.techs.includes(skillDigitado.toLocaleUpperCase()));

        if (servicosFiltrados.length === 0) {
            alert("Nenhum desenvolvedor(a) com essa skill :(")
        } else {
            //atribui valor de devs filtrado, ao state ListaDevsFiltrados 
            setServicos(servicosFiltrados);
        }


    }

    function ListaServicos() {
        api.get("servicos")
            .then((response: any) => {
                console.log(response);
                setServicos(response.data)
            })
            .catch((error: any) => {
                console.log("Error ao realizar uma requisicao", error)
            })

    }

    useEffect(() => {
        ListaServicos();
    }, [])

    return (
        <main id="main_listaservicos">
            <div className="container container_lista_servicos">
                <div className="lista_servicos_conteudo">
                    <h1>Lista de Serviços</h1>
                    <hr />
                    <form method="post" onSubmit={buscarServicoPorSkill}>
                        <div className="wrapper_form">
                            <label htmlFor="busca">Procurar serviços</label>
                            <div className="campo-label">
                                <input
                                    type="search"
                                    name="campo-busca"
                                    id="busca"
                                    placeholder="Buscar serviços por tecnologias..."
                                    onChange={verificarCampoSkill}
                                    autoComplete="off"
                                />
                                <button type="submit">Buscar</button>
                            </div>
                        </div>
                    </form>
                    <div className="wrapper_lista">
                        <ul>
                            {
                                servicos.map((servico: any, indice: number) => {
                                    return <li key={indice}>
                                        <CardServico
                                            id={servico.id}
                                            titulo={servico.nome}
                                            proposta={servico.valor}
                                            descricao={servico.descricao}
                                            listaTechs={servico.techs}
                                        />
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ListaServicos;