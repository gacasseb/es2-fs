import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from 'pages/Home';

import Project from "pages/Project";
import CadastroProjeto from "pages/Project/Cadastro";
import UpdateProjeto from "pages/Project/Update";

import Team from 'pages/Team';
import CadastroTeam from "pages/Team/Cadastro";
import UpdateTeam from "pages/Team/Update";

import Member from "pages/Member";
import CadastroMember from "pages/Member/Cadastro";
import UpdateMembro from "pages/Member/Update";

import NavBar from "./components/Navbar";


function App() {
  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/project" element={<Project />} />
        <Route path="/project/register" element={<CadastroProjeto />} />
        <Route path="/project/update/:id" element={<UpdateProjeto />} />

        <Route path="/team" element={<Team />} />
        <Route path="/team/register" element={<CadastroTeam />} />
        <Route path="/team/update/:id" element={<UpdateTeam />} />

        <Route path="/member" element={<Member />} />
        <Route path="/member/register" element={<CadastroMember />} />
        <Route path="/member/update/:id" element={<UpdateMembro />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
