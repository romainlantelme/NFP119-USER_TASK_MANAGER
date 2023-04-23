import { Schema, Model, model } from 'mongoose';


interface IUser {
  email: string;
  pseudo: string;
  firstName: string;
  surname: string;
}

// Création d'un schéma d'utilisateur avec toutes les propriétés requises.
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  pseudo: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  surname: {
    type: String,
    default: ''
  }
});

// Création d'un modèle d'utilisateur basé sur le schéma défini ci-dessus.
const User: Model<IUser> = model('User', userSchema);

// Exportation de l'interface IUser et du modèle User pour être utilisés ailleurs dans le code.
export { IUser, User };