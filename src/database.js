const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class DatabaseHandler {
  async insertData(table, parameters) {
    return prisma[table].create({
      data: parameters,
    });
  }

  async updateData(table, parameters, condition) {
    const where = this.parseCondition(condition);
    return prisma[table].update({
      data: parameters,
      where,
    });
  }

  async deleteData(table, condition) {
    const where = this.parseCondition(condition);
    return prisma[table].delete({
      where,
    });
  }

  async selectData(table, columns = "*", condition = "") {
    const where = this.parseCondition(condition);
    return prisma[table].findMany({
      select: {
        ...this.parseColumns(columns),
      },
      where,
    });
  }

  parseCondition(condition) {
    const conditionObj = {};
    if (condition) {
      const [key, value] = condition.split("=");
      conditionObj[key.trim()] = value.trim();
    }
    return conditionObj;
  }

  parseColumns(columns) {
    const columnsObj = {};
    if (columns) {
      const columnList = columns.split(",");
      columnList.forEach((column) => {
        const trimmedColumn = column.trim();
        columnsObj[trimmedColumn] = true;
      });
    }
    return columnsObj;
  }
}

module.exports = new DatabaseHandler();