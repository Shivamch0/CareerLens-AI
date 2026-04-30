// Models Import
import { User } from "../models/user.model.js";

// Utils Imports
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//Custom method for generation access and refresh token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }


    const accessToken =  user.generateAccessToken();
    const refreshToken =  user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {accessToken , refreshToken}
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while generating access and refreshToken ${error}`,
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    throw new ApiError(400, "Fill all the fields...");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "User already registered with this email...");
  }

  const user = await User.create({
    userName,
    email: email.toLowerCase(),
    password,
  });

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  if (!createdUser) {
    throw new ApiError(400, "Something went wrong while registering user");
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    smaeSite: "None",
    path: "/",
    maxAge: "7 * 24 * 60 * 60 * 1000",
  };

  return res
    .status(200)
    .cookie("accessToken", options, accessToken)
    .cookie("refreshToken", options, refreshToken)
    .json(
      new ApiResponse(200, { user: createdUser }, "User Created Successfully"),
    );
});

const loginUser = asyncHandler(async (req, res) => {
  // get data from req.body
  const { userName, email, password } = req.body;
  if (!email && !userName) {
    throw new ApiError(400, "Username or email is required...");
  }

  //find the user
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (!user) {
    throw new ApiError(
      404,
      "User with this email or Username does not exists...",
    );
  }

  // password check
  const checkPassword = await user.isPasswordCorrect(password);
  if (!checkPassword) {
    throw new ApiError(401, "Incorrect Password...");
  }

  // generate accesstoken and refreshToken
  const { accessToken , refreshToken } = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select(
    " -password -refreshToken ",
  );

  if (!loggedInUser) {
    throw new ApiError(400, "Something went wrong while logging...");
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  // send response
  return res
    .status(200)
    .cookie("accessToken", accessToken , options)
    .cookie("refreshToken", refreshToken , options)
    .json(
      new ApiResponse(200, { user: loggedInUser , accessToken , refreshToken } , "User Logged in Successfully..."),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshToken : undefined
            }
        },
        {
            new : true
        }
    )

    const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  return res.status(200)
            .clearCookie("accessToken" , options)
            .clearCookie("refreshToken" , options)
            .json(new ApiResponse(200 , {} , "User Logged Out successfully..."))
});

const getCurrentUser = asyncHandler(async (req, res) => {});

const refreshToken = asyncHandler(async (req, res) => {});

export { registerUser, loginUser, logoutUser, getCurrentUser, refreshToken };
