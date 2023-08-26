//estilização
import "./style.css";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function VisualizarServico() {
    const { idServico} = useParams ();
    const[ nome, setNome]= useState < string>("");
    const[ Valor, setValor]= useState < string>("");
    const[ descricao, setDescricao]= useState < string>("");
    const[ listaSkills, setListaSkills]= useState < string []>([]);


    function buscarServicoPorId() {
        api.get("servicos/"+ idServico)
            .then((response: any) => {
                console.log(response);
                setNome(response.data.nome);
                setValor(response.data.valor);
                setDescricao(response.data.descricao);
                setListaSkills(response.data.listaTechs);
            })
            .catch((error: any) => {
                console.log("Error ao realizar um requisição:", error);
            })
    }
    useEffect(() => {

        buscarServicoPorId();
    }, [])


    return (
        <main id="main_visualizarservico">
            <div className="container">
                <h1>Serviço</h1>
                <div className="servico">
                    <div className="topo_servico">
                        <h2>{nome}</h2>
                        <span>{Valor}</span>
                    </div>
                    <p>{descricao}</p>
                    <div className="techs">
                       {
                        listaSkills.map((tech: string, indice: number) => {
                            return <span key={indice}>{tech}</span>
                        })
                    }
                    
                       
                    </div>
                </div>
            </div>

        </main>);
}

export default VisualizarServico;


