import {model, Schema} from 'mongoose';

const projectSchema = new Schema(
  {
    /* REQUIRED */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    domain: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },

    /* BASIC */
    shortDescription: {
      type: String,
    },

    /* CORE DETAILS */
    problemStatement: {
      type: String,
    },

    objectives: {
      type: String,
    },

    solution: {
      type: String,
    },

    /* TECHNICAL */
    architecture: {
      type: String,
    },

    hardware: {
      type: String,
    },

    software: {
      type: String,
    },

    algorithms: {
      type: String,
    },

    tech: {
      type: [String], // ["ESP32", "React", "Node"]
      default: [],
    },

    /* IMPLEMENTATION */
    implementation: {
      type: String,
    },

    results: {
      type: String,
    },

    challenges: {
      type: String,
    },

    /* EXTRAS */
    applications: {
      type: String,
    },

    futureScope: {
      type: String,
    },

    github: {
      type: String,
    },

    demo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project = model('Project', projectSchema);

export default Project;