import responses from "./responses";

export const task = {
  "/tasks": {
    post: {
      tags: ["Tasks"],
      security: [{ JWT: [] }],
      summary: "Create a new task",
      parameters: [
        {
          in: "body",
          name: "taskData",
          required: true,
          schema: {
            example: {
              title: "Study Math",
              description: "Chapter 4 exercises",
              deadline: "2025-07-01T10:00:00Z"
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },

    get: {
      tags: ["Tasks"],
      security: [{ JWT: [] }],
      summary: "Get all tasks (optionally by userId)",
      responses,
    },
  },

  "/tasks/{id}": {
    get: {
      tags: ["Tasks"],
      security: [{ JWT: [] }],
      summary: "Get a task by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "task1234-id",
          },
        },
      ],
      responses,
    },

    patch: {
      tags: ["Tasks"],
      security: [{ JWT: [] }],
      summary: "Update a task",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "task1234-id",
          },
        },
        {
          in: "body",
          name: "taskUpdateData",
          required: true,
          schema: {
            example: {
              title: "Updated Task Title",
              description: "Updated details...",
              deadline: "2025-07-15T08:00:00Z",
              isCompleted: true
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },

    delete: {
      tags: ["Tasks"],
      security: [{ JWT: [] }],
      summary: "Delete a task by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "task1234-id",
          },
        },
      ],
      responses,
    },
  },
};

export default task;
