module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'aleteia',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
