import catchAsync from "./catchAsync.js";

export function createRoutesFromArray(router, routesArray) {
  for (const route of routesArray) {
    const { method, path, controller, middlewares } = route
    router[method](path, ...middlewares, catchAsync(controller))
  }

  return router
}

export default {
  createRoutesFromArray,
}
