import bcrypt from "bcrypt";
import User from "../models/todos/user.model.js"
import { generateAccessToken, generateRefreshToken } from '../utils/tokenGenerator.js';

export const registerUser = async (req, res) => {
    try {
        const { email, username, password, number } = req.body
        if (!email || !username || !password || !number) {
            res.status(400).send({
                status: "failed",
                message: "All the Fields are Required"
            })
        }

        const isUser = await User.findOne({ username })

        if (isUser) {
            res.status(400).send({
                status: "failed",
                message: "User with Username is Already Available"
            })
        }

        // created a hashed password
        const hashedPass = await bcrypt.hash(password, 10)

        // created a access and refresh token
        const accessToken = generateAccessToken(username)
        const refreshToken = generateRefreshToken(username)

        console.log("\n\n✅ Password Token : " + hashedPass + "\n✅ Access Token : " + accessToken + "\n✅ Refresh Token : " + refreshToken + "\n\n");

        const user = new User({
            username,
            email,
            number,
            password: hashedPass,
            refreshToken: refreshToken
        })

        const savedUser = await user.save()

        res
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            })
            .status(200).
            send({
                status: "Success",
                message: "User Registered Succesfully",
                userDetails: savedUser,
                accessToken: accessToken,
                refreshToken: refreshToken
            })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Something Went Wrong!!!" + error
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).send({ status: "failed", message: "All fields required" })
        }

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).send({ status: "failed", message: "No user found" })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(400).send({ status: "failure", message: "Wrong Password" })
        }

        const accessToken = generateAccessToken(username)
        const refreshToken = user.refreshToken

        return res
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            })
            .status(200)
            .send({ status: "success", message: "User Logged in Successfully" })
    } catch (error) {
        return res.status(500).send({ status: "failed", message: "Something went wrong: " + error })
    }
}

export const getUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password -number -email -createdAt -updatedAt -__v")

        if (!users) {
            res.status(203).send({
                status: "Success",
                message: "No Users Found"
            })
        }
        res.status(200).send({
            status: "success",
            total: users.length,
            users: users
        })

    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Something Went Wrong : " + error
        })
    }
}

export const changePassword = async (req, res) => {
    if (req.body == undefined) {
        return res.status(500).send({
            status: "failed",
            message: "Body is Required !!"
        })
    }
    try {
        const { username, oldPassword, newPassword } = req.body
        if (!username || !oldPassword || !newPassword) {
            return res.status(500).send({
                status: "failed",
                message: "All the Fields are Required"
            })
        }

        const accessToken = req.cookies?.accessToken
        const refreshToken = req.cookies?.refreshToken

        if (!accessToken || !refreshToken) {
            console.log(`\n\nAccess Token : ${accessToken} \nRefresh Token : ${refreshToken} \n\n`);
            return res.status(500).send({
                status: "failed",
                message: "Token Missing !! Login Again"
            })
        }

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).send({ status: "failed", message: "No user found" })
        }
        // check the refresh token and old password
        if (refreshToken === user.refreshToken) {
            const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
            if (!isPasswordMatch) {
                return res.status(400).send({ status: "failed", message: "Wrong Password" })
            }
            const newHashPassword = await bcrypt.hash(newPassword, 10)
            const updated = await User.updateOne({ username }, {
                password: newHashPassword
            })
            return res.status(200).send({
                status: "success",
                message: "Password Changed Succesfully",
                details: updated
            })
        }
        else {
            return res.status(400).send({
                status: "failed",
                message: "Session Ended, Login Again !!"
            })
        }

    }
    catch (error) {
        return res.status(400).send({
            status: "failed",
            message: "Something Went Wrong !! : " + error
        })
    }
}