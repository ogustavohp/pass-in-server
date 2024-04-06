import {
  registerForEvent
} from "./chunk-263JD76M.mjs";
import {
  errorHandler
} from "./chunk-5WHOQTKD.mjs";
import {
  checkIn
} from "./chunk-QGIYE4GG.mjs";
import {
  createEvent
} from "./chunk-BBA3A4TM.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-LQ2I3CSU.mjs";
import {
  getEventAttendees
} from "./chunk-TRPEOXPT.mjs";
import {
  getEvent
} from "./chunk-VOPSXZTK.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
  // Change in production
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application.json"],
    info: {
      title: "pass.in",
      description: "The pass.in API is a versatile tool designed to streamline user management processes within event applications. From user registration to event check-in, pass.in offers a comprehensive suite of functionalities aimed at enhancing attendee experiences. With seamless integration capabilities, developers can effortlessly incorporate pass.in API into their applications, ensuring efficient control and organization of event attendees.",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running in http://localhost:3333/");
});
