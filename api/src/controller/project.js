const Project = require("../model/project");
const Team = require('../model/team');

const findAll = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: {
        model: Team,
        as: "Teams",
        attributes: ["id", "name"],
      }
    });
    return res.json(projects);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    const { name, client_name, goal, startDate, finalDate, price, team } = req.body;
    const newProject = await Project.create({
      name,
      client_name,
      goal,
      startDate,
      price,
      finalDate,
    });

    if (team) {
      const existingTeam = await Team.findByPk(+team);
      if (existingTeam) {
        existingTeam.setProject(newProject);
      } else {
        existingTeam.setProject(null);
      }
    }
    return res.status(201).json(newProject);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { team } = req.body;
  delete req.body?.team;
  try {
    const [updated] = await Project.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedProject = await Project.findOne({ where: { id: id } });
      if (team) {
        const existingTeam = await Team.findByPk(+team);
        if (existingTeam) {
          existingTeam.setProject(updatedProject);
        }
      }
      return res.json(updatedProject);
    }
    throw new Error("Projeto não encontrado");
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ error: "Id é obrigatório" });
    }

    const project = await Project.findByPk(id);
    if (project) {
      return res.json(project);
    }
    throw new Error("Projeto não encontrado");
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const existingProject = await Project.findByPk(+id);
    if(!existingProject) {
      return res.status(404).json({message: "Time não encontrado"});
    }

    existingProject.destroy();

    return res.json({ message: "Projeto removido com sucesso" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  findAll,
  create,
  update,
  findOne,
  remove,
};
