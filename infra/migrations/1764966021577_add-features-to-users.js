// @ts-check
/** @param {import("node-pg-migrate").MigrationBuilder} pgm */

exports.up = (pgm) => {
  pgm.addColumn("users", {
    features: {
      type: "varchar[]",
      notNull: true,
      default: "{}",
    },
  });
};

exports.down = false;
