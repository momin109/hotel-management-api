import AuthService from "./auth.service.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const { accessToken } = await AuthService.register({
      name,
      email,
      password,
    });

    //Generate JWT token

    const response = {
      code: 201,
      message: "signup Successful",
      data: {
        access_token: accessToken,
      },
      links: {
        self: req.url,
        login: "/auth/login",
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { accessToken } = await AuthService.login({ email, password });

    const response = {
      code: 200,
      message: "successful",
      data: {
        access_token: accessToken,
      },
      links: {
        self: req.url,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export default { register, login };
