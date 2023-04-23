import { Schema, Model, model, Types } from 'mongoose';
import { IUser, User } from './user';


interface ITask {
  title: string;
  category: string;
  description: string;
  carriedOut: boolean;
  startDate: Date;
  estimatedDate: Date;
  endDate: Date;
  user: Types.ObjectId | IUser;
}

// Création d'un schéma de tâche avec toutes les propriétés requises.
const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  carriedOut: {
    type: Boolean,
    default: false
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  estimatedDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Création d'un modèle de tâche basé sur le schéma défini ci-dessus.
const Task: Model<ITask> = model('Task', taskSchema);

// Exportation de l'interface ITask et du modèle Task pour être utilisés ailleurs dans le code.
export { ITask, Task };