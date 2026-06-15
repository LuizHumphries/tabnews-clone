exports.up = (pgm) => {
  pgm.addColumn("users", {
    features: {
      type: "varchar[]",
      notNull: true,
      default: "{}", // array value on Postgres
    },
  });
};

exports.down = false;
