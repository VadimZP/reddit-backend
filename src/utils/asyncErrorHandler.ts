// @ts-nocheck TODO: fix typescript
const asyncErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(err => next(err));
  }
}

export default asyncErrorHandler;