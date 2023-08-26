import React from 'react';
import ReactDOM from 'react-dom/client';

//componentes
import Home from "./pages/Home/";
import ListaServicos from "./pages/ListaServicos/";
import ListaDevs from "./pages/ListaDevs";
import Footer from "./components/Footer"
import Header from './components/Header';
import Perfil from "./pages/PerfilUsuario"
import Servico from "./pages/VisualizarServico"
import Usuario from "./pages/PerfilUsuario"
import Login from './pages/Login';

//estilização global
import "./index.css";

//rotas
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VisualizarServico from './pages/VisualizarServico';
import CadastroUsuario from './pages/PerfilUsuario';
import secureLocalStorage from 'react-secure-storage';

function logado() {
  if (secureLocalStorage.getItem("user")) {
    const objetoUsuario: any = secureLocalStorage.getItem("user");
    const nome: string = objetoUsuario.user.nome.trim().split(" ")[0]

    return { logado: true, nomeUsuario: nome }

  }
  else {
    return { logado: false, nomeUsuario: null }
  }
}



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/*Indica que aplicação terá rotas*/}

      <Routes>{/*Indica uma lista de rotas*/}

        <Header usuario { }></Header>
        <Route path='/' element={<Home />} />
        <Route path='lista/servicos' element={<ListaServicos />} />
        <Route path='perfil/:idUsuario' element={<Perfil />} />
        <Route path='lista/devs' element={<ListaDevs />} />
        <Route path='servico/:idServico' element={<Servico />} />
        <Route path='usuario/:usuario' element={<Usuario />} />
        <Route path='login' element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
)



