const Member = require("../model/member");
const Team = require("../model/team");

const findAll = async (req, res) => {
  try {
    const members = await Member.findAll({
      include: {
        model: Team,
        as: "Team",
        attributes: ["id", "name"],
      },
    });
    return res.json(members);
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    const {
      name,
      address,
      birthdate,
      gender,
      race,
      role,
      team: teamId,
    } = req.body;
    const newMember = await Member.create({
      name,
      address,
      birthdate,
      gender,
      race,
      role,
    });

    if (teamId) {
      await newMember.setTeam(+teamId);
    }

    return res.status(201).json(newMember);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { team } = req.body;
  delete req.body.team;

  try {
    if (team) {
      let existingTeam = await Team.findByPk(+team);
      if (!existingTeam) {
        return res.status(404).json({ message: "Time não encontrado" });
      }
    }
    const [updated] = await Member.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedMember = await Member.findOne({ where: { id: id } });
      if (team) {
        updatedMember.setTeam(+team);
      } else {
        updatedMember.setTeam(null);
      }
      return res.json(updatedMember);
    }
    throw new Error("Profissional não encontrado");
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ error: "ID é obrigatório" });
    }

    const member = await Member.findByPk(id, {
      include: {
        model: Team,
        as: "Team",
        attributes: ["id", "name"],
      },
    });
    if (member) {
      return res.json(member);
    }
    throw new Error("Membro não encontrado");
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await Member.destroy({ where: { id: id } });
    if (deletedCount > 0) {
      return res.json({ message: "Membro removido com sucesso" });
    }
    throw new Error("Member não encontrado");
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
