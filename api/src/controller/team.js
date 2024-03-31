const Team = require("../model/team");
const Project = require("../model/project");

const findAll = async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: {
        model: Project,
        as: "Project",
        attributes: ["id", "name", "startDate", "finalDate"],
      }
    });
    return res.json(teams);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    const { name, project } = req.body;
    if (project) {
      let existingProject = await Project.findByPk(+project);
      if (!existingProject) {
        return res.status(400).json({ error: "Projeto não encontrado" });
      }
    }

    const newTeam = await Team.create({
      name,
    });

    if (project) {
      newTeam.setProject(project);
    }
  
    return res.status(201).json(newTeam);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { project } = req.body;
  try {
    if (project) {
      let existingProject = await Project.findByPk(+project);
      if (!existingProject) {
        return res.status(400).json({ error: "Projeto não encontrado" });
      }
    }
    const [updated] = await Team.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedTeam = await Team.findOne({ where: { id: id } });
      if (project) {
        updatedTeam.setProject(+project);
      } else {
        updatedTeam.setProject(null);
      }
      return res.json(updatedTeam);
    }
    throw new Error("Time não encontrado");
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

    const team = await Team.findByPk(id, {
      include: {
        model: Project,
        as: "Project",
        attributes: ["id", "name", "startDate", "finalDate"],
      }
    });
    if (team) {
      return res.json(team);
    }
    throw new Error("Time não encontrado");
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const existingTeam = await Team.findByPk(+id);
    if (!existingTeam) {
      return res.status(404).send({message: "Time não encontrado"});
    }

    if (existingTeam.getProject()) {
      existingTeam.setProject(null);
    }
    await existingTeam.destroy();
    
    return res.json({ message: "Time removido com sucesso" });
    
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
