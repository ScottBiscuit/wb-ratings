import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';
import { type } from 'os';
import { timeStamp } from 'console';

export const db = await connectToDB('postgres://scottjohnstone:admin@localhost:5432/ratings');

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Movie extends Model {
  [util.inspect.custom](){
    return this.toJSON()
  }
}

export class Rating extends Model {
  [util.inspect.custom](){
    return this.toJSON()
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    modelName: 'user',
    sequelize: db,
  },
);


Movie.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
  },
  overview: {
    type: DataTypes.TEXT
  },
  releaseDate: {
    type: DataTypes.DATE
  },
  posterPath: {
    type: DataTypes.STRING
  }
},
{
  modelName: 'movie',
  sequelize: db
}
)

Rating.init(
  {
    ratingId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    },
  {
    modelName: 'rating',
    sequelize: db,
    timestamps: true,
    updatedAt: false
  }
)

Movie.hasMany(Rating, {foreignKey: 'movieId'})
Rating.belongsTo(Movie, {foreignKey: 'movieId'})

User.hasMany(Rating, {foreignKey: 'userId'})
Rating.belongsTo(User, {foreignKey: 'userId'})