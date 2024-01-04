import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Mytube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Please log in");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Please log out");
    return res.redirect("/");
  }
};

export const uploadFileMiddleware = multer({
  dest: "uploads/avatars",
  limits: {
    fileSize: 3000000,
  },
});
export const uploadVideoMiddleware = multer({ dest: "uploads/videos" });

export const deleteSuccess = (req, res, next) => {
  req.flash("success", "Done deleting comments");
  next();
};
